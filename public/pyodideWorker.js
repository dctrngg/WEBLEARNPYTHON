/* eslint-disable no-undef */
// Dedicated Web Worker for Pyodide CPython WASM Execution
// Supports:
// 1. Real-time stdout / stderr streaming
// 2. Interactive input() via SharedArrayBuffer + Atomics OR Continuation Replay Bridge
// 3. Automated Deterministic Test Case Grading with ms latency telemetry

const PYODIDE_INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
let pyodide = null;
let initPromise = null;

// State for Interactive Continuation Replay when SharedArrayBuffer is unavailable
let activeSession = null;

// Giới hạn kích thước output để vòng lặp in vô hạn không làm treo/tràn bộ nhớ tab
const MAX_OUTPUT_CHARS = 200000;

class OutputLimitError extends Error {}

/** Tạo bộ thu stdout/stderr có giới hạn tổng số ký tự. */
function createCappedCollector(limit) {
  const chunks = [];
  let size = 0;
  let exceeded = false;
  return {
    chunks,
    get exceeded() {
      return exceeded;
    },
    push(text) {
      size += text.length + 1;
      if (size > limit) {
        exceeded = true;
        // Ném lỗi để dừng chương trình Python ngay tại lệnh print()
        throw new OutputLimitError("Output limit exceeded");
      }
      chunks.push(text);
    },
  };
}

/**
 * Nạp Pyodide đúng một lần. Mọi lời gọi đồng thời dùng chung một Promise,
 * tránh lỗi chạy code khi runtime còn đang tải (pyodide === null).
 */
function initRuntime() {
  if (pyodide) return Promise.resolve();
  if (initPromise) return initPromise;

  self.postMessage({
    type: "STATUS",
    state: "initializing",
    message: "INITIALIZING PYODIDE WASM (CPYTHON 3.12)...",
  });

  initPromise = (async () => {
    try {
      importScripts(`${PYODIDE_INDEX_URL}pyodide.js`);
      pyodide = await self.loadPyodide({
        indexURL: PYODIDE_INDEX_URL,
      });
      self.postMessage({
        type: "STATUS",
        state: "ready",
        message: "RUNTIME READY // CPYTHON 3.12 WASM",
      });
    } catch (err) {
      self.postMessage({
        type: "STATUS",
        state: "error",
        message: `WASM INIT ERROR: ${err && err.message ? err.message : String(err)}`,
      });
    } finally {
      // Cho phép thử lại nếu lần nạp thất bại
      if (!pyodide) initPromise = null;
    }
  })();
  return initPromise;
}

// Kick off initialization immediately when worker spawns
initRuntime();

async function executeInteractiveStep() {
  if (!activeSession || !pyodide) return;

  const { code, inputs, emittedStdoutLen, seed } = activeSession;
  const stdoutCollector = createCappedCollector(MAX_OUTPUT_CHARS);
  const stderrCollector = createCappedCollector(MAX_OUTPUT_CHARS);
  const stdoutChunks = stdoutCollector.chunks;
  const stderrChunks = stderrCollector.chunks;

  pyodide.setStdout({ batched: (text) => stdoutCollector.push(text) });
  pyodide.setStderr({ batched: (text) => stderrCollector.push(text) });
  pyodide.globals.set("__chroma_seed", seed);

  // Pass current inputs list into Python globals
  pyodide.globals.set("__chroma_user_code", code);
  pyodide.globals.set("__chroma_inputs", pyodide.toPy(inputs));

  const harnessCode = `
import builtins
import sys
import traceback

import random as _chroma_random

# Mỗi lần nhập input() chương trình được chạy lại từ đầu (continuation replay).
# Cố định seed để random cho cùng kết quả ở mọi lần chạy lại trong một phiên.
_chroma_random.seed(__chroma_seed)

class _ChromaInputRequest(BaseException):
    def __init__(self, prompt=""):
        self.prompt = str(prompt) if prompt is not None else ""

_chroma_input_idx = 0
_chroma_input_list = list(__chroma_inputs)

def _chroma_custom_input(prompt=""):
    global _chroma_input_idx
    if _chroma_input_idx < len(_chroma_input_list):
        val = _chroma_input_list[_chroma_input_idx]
        _chroma_input_idx += 1
        return str(val)
    raise _ChromaInputRequest(prompt)

builtins.input = _chroma_custom_input

_chroma_status = "COMPLETED"
_chroma_prompt = ""
_chroma_error = ""

_exec_globals = {"__name__": "__main__"}
try:
    exec(compile(__chroma_user_code, "<solution.py>", "exec"), _exec_globals)
except _ChromaInputRequest as req:
    _chroma_status = "INPUT_REQUIRED"
    _chroma_prompt = req.prompt
except SystemExit:
    _chroma_status = "COMPLETED"
except BaseException as exc:
    _chroma_status = "ERROR"
    tb_lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
    # Filter internal harness frames for clean student tracebacks
    clean_lines = [l for l in tb_lines if "<string>" not in l]
    _chroma_error = "".join(clean_lines)
`;

  const t0 = performance.now();
  try {
    await pyodide.runPythonAsync(harnessCode);
  } catch (rawErr) {
    self.postMessage({
      type: "STDERR",
      text: String(rawErr),
    });
    self.postMessage({
      type: "EXECUTION_COMPLETE",
      durationMs: Math.round((performance.now() - t0) * 10) / 10,
      exitCode: 1,
    });
    activeSession = null;
    return;
  }

  if (stdoutCollector.exceeded) {
    stderrChunks.push(
      `OutputLimitError: Chương trình in ra quá ${MAX_OUTPUT_CHARS.toLocaleString("vi-VN")} ký tự — có thể do vòng lặp vô hạn.`
    );
  }

  const fullStdout = stdoutChunks.join("\n");
  if (fullStdout.length > emittedStdoutLen) {
    const delta = fullStdout.slice(emittedStdoutLen);
    const cleanDelta = delta.startsWith("\n") && emittedStdoutLen > 0 ? delta.slice(1) : delta;
    if (cleanDelta) {
      self.postMessage({
        type: "STDOUT",
        text: cleanDelta,
      });
    }
    activeSession.emittedStdoutLen = fullStdout.length;
  }

  if (stderrChunks.length > 0) {
    self.postMessage({
      type: "STDERR",
      text: stderrChunks.join("\n"),
    });
  }

  const status = pyodide.globals.get("_chroma_status");
  const promptText = pyodide.globals.get("_chroma_prompt");
  const errorText = pyodide.globals.get("_chroma_error");

  if (status === "INPUT_REQUIRED" && !stdoutCollector.exceeded) {
    self.postMessage({
      type: "INPUT_REQUEST",
      prompt: promptText || "",
    });
    return;
  }

  if (status === "ERROR" && errorText) {
    self.postMessage({
      type: "STDERR",
      text: errorText.trimEnd(),
    });
  }

  const totalDuration = Math.round((performance.now() - activeSession.startTime) * 10) / 10;
  self.postMessage({
    type: "EXECUTION_COMPLETE",
    durationMs: totalDuration,
    exitCode: status === "ERROR" || stdoutCollector.exceeded ? 1 : 0,
  });

  activeSession = null;
}

function removeDiacritics(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function normalizeOutputForMatching(str) {
  return String(str ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function normalizeToken(tok) {
  let s = removeDiacritics(tok).toLowerCase();
  s = s.replace(/[:;,]/g, "");
  return s;
}

const COMMON_UNITS = [
  "vnd",
  "vnđ",
  "d",
  "đ",
  "dong",
  "kwh",
  "gio",
  "h",
  "giay",
  "s",
  "phut",
  "m",
  "cm",
  "mm",
  "km",
  "kg",
  "g",
  "mb",
  "mb/s",
  "gb",
  "kb",
  "byte",
  "bytes",
  "nam",
  "thang",
  "ngay",
  "tuoi",
  "hoc sinh",
  "hs",
  "goi",
  "phan qua",
  "do",
  "c",
  "f",
];

function isTokenEqual(eTok, aTok) {
  const normE = normalizeToken(eTok);
  const normA = normalizeToken(aTok);
  if (normE === normA) return true;

  const eNum = Number(normE.replace(/[^0-9.-]/g, ""));
  const aNum = Number(normA.replace(/[^0-9.-]/g, ""));
  const eHasNum = normE.replace(/[^0-9]/g, "") !== "";
  const aHasNum = normA.replace(/[^0-9]/g, "") !== "";

  if (!isNaN(eNum) && !isNaN(aNum) && eHasNum && aHasNum) {
    if (Math.abs(eNum - aNum) < 1e-3) {
      const eUnit = normE.replace(/[0-9.-]/g, "").trim();
      const aUnit = normA.replace(/[0-9.-]/g, "").trim();
      if (eUnit === aUnit) return true;
      if (
        (eUnit === "%" && aUnit === "") ||
        (eUnit === "" && aUnit === "%")
      )
        return true;
      if (COMMON_UNITS.includes(eUnit) && COMMON_UNITS.includes(aUnit))
        return true;
      if (COMMON_UNITS.includes(eUnit) && aUnit === "") return true;
      if (eUnit === "" && COMMON_UNITS.includes(aUnit)) return true;
    }
  }

  return false;
}

/**
 * Trích dãy số xuất hiện trong một dòng (bỏ dấu tiếng Việt trước).
 * Dấu "-" chỉ được coi là dấu âm khi không đứng ngay sau chữ/số (VD "3-4" -> [3, 4]).
 */
function extractNumbers(line) {
  const src = removeDiacritics(line);
  const out = [];
  const re = /(^|[^\w.])(-?)(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m[3] !== undefined) out.push(Number((m[2] || "") + m[3]));
    else out.push(Number(m[4]));
  }
  return out;
}

function sameNumbers(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i] - b[i]) >= 1e-3) return false;
  }
  return true;
}

function cleanLineTokens(line) {
  let s = removeDiacritics(line).toLowerCase();
  s = s.replace(/^[=\-*#_]{2,}\s*/, "").replace(/\s*[=\-*#_]{2,}$/, "");
  s = s.replace(/[:;,]/g, " ");
  s = s.replace(/%/g, " % ");
  return s.split(/\s+/).filter(Boolean).filter((tok) => tok !== "%");
}

function isLineMatch(expLine, actLine) {
  if (expLine === actLine) return true;

  const eTokens = cleanLineTokens(expLine);
  const aTokens = cleanLineTokens(actLine);

  if (eTokens.join(" ") === aTokens.join(" ")) return true;

  if (eTokens.length === aTokens.length) {
    if (eTokens.every((tok, i) => isTokenEqual(tok, aTokens[i]))) return true;
  }

  // Các phép so khớp "khoan dung" bên dưới bắt buộc dãy số của hai dòng phải trùng nhau,
  // tránh chấm đúng nhầm khi chỉ số cuối dòng trùng (VD "3 + 4 = 7" vs "1 + 6 = 7").
  const numbersAgree = sameNumbers(extractNumbers(expLine), extractNumbers(actLine));

  // Handle optional unit tokens (e.g. ['5000000', 'vnd'] vs ['5000000'])
  const eCore = eTokens.filter((t) => !COMMON_UNITS.includes(t));
  const aCore = aTokens.filter((t) => !COMMON_UNITS.includes(t));
  if (eCore.length === aCore.length && eCore.length > 0) {
    if (eCore.every((tok, i) => isTokenEqual(tok, aCore[i]))) return true;
  }

  // Single-value line match (e.g. expected "Tiền lãi: 40000.0", actual chỉ in "40000.0")
  if (aCore.length === 1 && eCore.length > 1) {
    const lastETok = eCore[eCore.length - 1];
    if (isTokenEqual(lastETok, aCore[0])) return true;
  }

  // Nhãn diễn đạt khác nhưng cùng kết quả cuối dòng và cùng toàn bộ các số
  if (numbersAgree && eCore.length > 0 && aCore.length > 0) {
    if (isTokenEqual(eCore[eCore.length - 1], aCore[aCore.length - 1])) {
      return true;
    }
  }

  return false;
}

/**
 * Smart / Lenient Output Matcher for High School Python Pedagogy:
 * - Tolerates missing or extra colons (:), commas, hyphens
 * - Tolerates missing percent sign (%) or currency units (vnđ, đ, kWh)
 * - Tolerates unaccented Vietnamese (Tiếng Việt không dấu)
 * - Tolerates case mismatch (e.g. vnđ vs VNĐ, true vs True)
 * - Tolerates numeric equivalence (e.g. 40000 vs 40000.0)
 * - Tolerates leaked input() prompts (e.g. input("Nhap n: "))
 * - Aligns core calculation output values
 */
function isOutputMatch(expectedRaw, actualRaw) {
  if (expectedRaw === actualRaw) return true;

  const normExpected = normalizeOutputForMatching(expectedRaw);
  const normActual = normalizeOutputForMatching(actualRaw);
  if (normExpected === normActual) return true;

  let expLines = normExpected
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  let actLines = normActual
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 1. Direct or unaccented case-insensitive full text match
  if (
    removeDiacritics(normExpected).toLowerCase() ===
    removeDiacritics(normActual).toLowerCase()
  ) {
    return true;
  }

  // 2. Leaked prompt filter in first line
  if (actLines.length > 0 && expLines.length > 0) {
    const promptRegex =
      /^(.*?(?:nhập|nhap|enter|input|cho|hãy|hay|prompt).*?[:\?]\s*)/i;
    if (promptRegex.test(actLines[0])) {
      actLines[0] = actLines[0].replace(promptRegex, "").trim();
      actLines = actLines.filter((l) => l.length > 0);
      if (
        removeDiacritics(expLines.join("\n")).toLowerCase() ===
        removeDiacritics(actLines.join("\n")).toLowerCase()
      ) {
        return true;
      }
    }
  }

  // 3. Line by line match
  if (expLines.length === actLines.length && expLines.length > 0) {
    if (expLines.every((l, i) => isLineMatch(l, actLines[i]))) return true;
  }

  // 4. Value extraction comparison (tolerates different Vietnamese label wording)
  const extractCoreValues = (lines) => {
    const vals = [];
    for (const line of lines) {
      const tokens = cleanLineTokens(line).filter(
        (t) => !COMMON_UNITS.includes(t)
      );
      if (tokens.length > 0) {
        vals.push(tokens[tokens.length - 1]);
      }
    }
    return vals;
  };

  const expValues = extractCoreValues(expLines);
  const actValues = extractCoreValues(actLines);

  if (
    expValues.length > 0 &&
    expValues.length === actValues.length &&
    expLines.length === actLines.length
  ) {
    const allAgree = expValues.every(
      (ev, i) =>
        isTokenEqual(ev, actValues[i]) &&
        (cleanLineTokens(actLines[i]).length === 1 ||
          sameNumbers(extractNumbers(expLines[i]), extractNumbers(actLines[i])))
    );
    if (allAgree) return true;
  }

  return false;
}

async function runAutomatedTests(code, testCases, indexOffset = 0) {
  if (!pyodide) {
    await initRuntime();
  }
  if (!pyodide) {
    // Không nạp được runtime: trả về kết quả lỗi thay vì treo
    const results = testCases.map((tc, i) => ({
      index: indexOffset + i + 1,
      input: tc.input,
      expectedOutput: String(tc.expectedOutput || "").trim(),
      actualOutput: "",
      stderr: "RuntimeError: Không nạp được Python runtime (kiểm tra kết nối mạng).",
      passed: false,
      isHidden: Boolean(tc.isHidden),
      durationMs: 0,
    }));
    results.forEach((result) => self.postMessage({ type: "TEST_PROGRESS", result }));
    self.postMessage({ type: "TEST_RESULTS", results });
    return;
  }

  self.postMessage({
    type: "STATUS",
    state: "running",
    message: "EXECUTING AUTOMATED TEST SUITE...",
  });

  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    // Bỏ dòng trống cuối do giáo viên nhập thừa xuống dòng
    const inputLines = tc.input ? String(tc.input).replace(/\r\n?/g, "\n").replace(/\n+$/, "").split("\n") : [];
    const stdoutCollector = createCappedCollector(MAX_OUTPUT_CHARS);
    const stderrCollector = createCappedCollector(MAX_OUTPUT_CHARS);
    const stdoutLines = stdoutCollector.chunks;
    const stderrLines = stderrCollector.chunks;

    pyodide.setStdout({ batched: (text) => stdoutCollector.push(text) });
    pyodide.setStderr({ batched: (text) => stderrCollector.push(text) });

    pyodide.globals.set("__tc_code", code);
    pyodide.globals.set("__tc_inputs", pyodide.toPy(inputLines));

    // Báo cho luồng chính biết test nào đang chạy để đặt đồng hồ timeout riêng cho từng test
    self.postMessage({
      type: "TEST_STARTED",
      index: indexOffset + i + 1,
      total: indexOffset + testCases.length,
    });

    const testRunnerScript = `
import builtins
import traceback
import random

random.seed(0)
_tc_idx = 0
_tc_input_list = list(__tc_inputs)

def _tc_input(prompt=""):
    global _tc_idx
    if _tc_idx < len(_tc_input_list):
        val = _tc_input_list[_tc_idx]
        _tc_idx += 1
        return str(val)
    # Hành vi chuẩn của Python khi hết dữ liệu vào
    raise EOFError("EOF when reading a line")

builtins.input = _tc_input
_tc_err = ""
_tc_globals = {"__name__": "__main__"}

try:
    exec(compile(__tc_code, "<solution.py>", "exec"), _tc_globals)
except SystemExit:
    pass
except BaseException as exc:
    tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
    _tc_err = "".join([line for line in tb if "<string>" not in line])
`;

    const startMs = performance.now();
    try {
      await pyodide.runPythonAsync(testRunnerScript);
    } catch (err) {
      stderrLines.push(String(err));
    }
    const durationMs = Math.round((performance.now() - startMs) * 10) / 10;

    const tbErr = pyodide.globals.get("_tc_err");
    if (stdoutCollector.exceeded) {
      stderrLines.length = 0;
      stderrLines.push(
        `OutputLimitError: Chương trình in ra quá ${MAX_OUTPUT_CHARS.toLocaleString("vi-VN")} ký tự — có thể do vòng lặp vô hạn.`
      );
    } else if (tbErr) {
      stderrLines.push(tbErr.trimEnd());
    }

    const actualOutput = stdoutLines.join("\n").trim();
    const expectedOutput = String(tc.expectedOutput || "").trim();
    const stderr = stderrLines.join("\n").trim();
    const passed = stderr === "" && isOutputMatch(expectedOutput, actualOutput);

    const result = {
      index: indexOffset + i + 1,
      input: tc.input,
      expectedOutput,
      actualOutput,
      stderr,
      passed,
      isHidden: Boolean(tc.isHidden),
      durationMs,
    };
    results.push(result);
    self.postMessage({ type: "TEST_PROGRESS", result });
  }

  self.postMessage({
    type: "TEST_RESULTS",
    results,
  });

  self.postMessage({
    type: "STATUS",
    state: "ready",
    message: "RUNTIME READY // CPYTHON 3.12 WASM",
  });
}

async function traceCodeExecution(code, inputs = []) {
  if (!pyodide) {
    await initRuntime();
  }
  if (!pyodide) {
    return { steps: [], error: "RuntimeError: Python runtime chưa sẵn sàng.", totalStdout: "", limitReached: false };
  }

  pyodide.globals.set("__trace_code", code);
  pyodide.globals.set("__trace_inputs", pyodide.toPy(inputs));

  const traceHarness = `
import sys
import io
import json
import builtins
import traceback

def _run_trace():
    _inputs = list(__trace_inputs)
    _input_idx = 0
    def _trace_input(prompt=""):
        nonlocal _input_idx
        if _input_idx < len(_inputs):
            val = str(_inputs[_input_idx])
            _input_idx += 1
            return val
        return ""

    old_stdout = sys.stdout
    captured_stdout = io.StringIO()
    sys.stdout = captured_stdout

    steps = []
    MAX_STEPS = 150

    def _trace_func(frame, event, arg):
        if len(steps) >= MAX_STEPS:
            return None
        if frame.f_code.co_filename != "<solution.py>":
            return _trace_func
        
        if event in ("line", "return"):
            lineno = frame.f_lineno
            combined = {}
            for k, v in frame.f_globals.items():
                if not k.startswith("__") and not k.startswith("_"):
                    combined[k] = v
            for k, v in frame.f_locals.items():
                if not k.startswith("__") and not k.startswith("_"):
                    combined[k] = v
            
            all_vars = {}
            for k, v in combined.items():
                # Filter out the injected input function and module/builtin imports
                if k == "input" or type(v).__name__ in ("module", "builtin_function_or_method"):
                    continue
                try:
                    val_repr = repr(v)
                    if len(val_repr) > 100:
                        val_repr = val_repr[:97] + "..."
                    type_str = type(v).__name__
                    all_vars[k] = {
                        "value": val_repr,
                        "type": type_str
                    }
                except Exception:
                    all_vars[k] = {
                        "value": "<unprintable>",
                        "type": type(v).__name__
                    }

            steps.append({
                "step": len(steps) + 1,
                "line": lineno,
                "event": event,
                "variables": all_vars,
                "stdout": captured_stdout.getvalue()
            })
        return _trace_func

    _globals = {
        "__name__": "__main__",
        "__builtins__": builtins,
        "input": _trace_input
    }
    
    _err = None
    try:
        compiled = compile(__trace_code, "<solution.py>", "exec")
        sys.settrace(_trace_func)
        try:
            exec(compiled, _globals)
        finally:
            sys.settrace(None)
    except SystemExit:
        pass
    except BaseException as exc:
        tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
        _err = "".join([l for l in tb if "<string>" not in l])
    finally:
        sys.settrace(None)
        sys.stdout = old_stdout

    return json.dumps({
        "steps": steps,
        "error": _err,
        "totalStdout": captured_stdout.getvalue(),
        "limitReached": len(steps) >= MAX_STEPS
    })

__trace_output = _run_trace()
`;

  try {
    await pyodide.runPythonAsync(traceHarness);
    const rawJson = pyodide.globals.get("__trace_output");
    return JSON.parse(rawJson);
  } catch (err) {
    return {
      steps: [],
      error: String(err),
      totalStdout: "",
      limitReached: false,
    };
  }
}

self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || !msg.type) return;

  if (msg.type === "INIT") {
    await initRuntime();
    return;
  }

  if (msg.type === "RUN_CODE") {
    if (!pyodide) {
      await initRuntime();
    }
    if (!pyodide) {
      self.postMessage({ type: "STDERR", text: "RuntimeError: Không nạp được Python runtime (kiểm tra kết nối mạng)." });
      self.postMessage({ type: "EXECUTION_COMPLETE", durationMs: 0, exitCode: 1 });
      return;
    }

    self.postMessage({
      type: "STATUS",
      state: "running",
      message: "EXECUTING PYTHON BYTECODE...",
    });

    activeSession = {
      code: msg.code || "",
      inputs: [],
      emittedStdoutLen: 0,
      startTime: performance.now(),
      seed: Math.floor(Math.random() * 2 ** 31),
    };

    await executeInteractiveStep();
    return;
  }

  if (msg.type === "INPUT_RESPONSE") {
    if (!activeSession) return;
    activeSession.inputs.push(msg.value ?? "");
    self.postMessage({
      type: "STATUS",
      state: "running",
      message: "RESUMING EXECUTION...",
    });
    await executeInteractiveStep();
    return;
  }

  if (msg.type === "RUN_TESTS") {
    await runAutomatedTests(msg.code || "", msg.testCases || [], msg.indexOffset || 0);
    return;
  }

  if (msg.type === "TRACE_CODE") {
    if (!pyodide) {
      await initRuntime();
    }
    if (!pyodide) return;

    self.postMessage({
      type: "STATUS",
      state: "running",
      message: "TRACING VARIABLE EXECUTION...",
    });

    const result = await traceCodeExecution(msg.code || "", msg.inputs || []);

    self.postMessage({
      type: "TRACE_RESULTS",
      traceId: msg.traceId,
      result,
    });

    self.postMessage({
      type: "STATUS",
      state: "ready",
      message: "RUNTIME READY // CPYTHON 3.12 WASM",
    });
    return;
  }
};

