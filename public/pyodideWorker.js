/* eslint-disable no-undef */
// Dedicated Web Worker for Pyodide CPython WASM Execution
// Supports:
// 1. Real-time stdout / stderr streaming
// 2. Interactive input() via SharedArrayBuffer + Atomics OR Continuation Replay Bridge
// 3. Automated Deterministic Test Case Grading with ms latency telemetry

const PYODIDE_INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
let pyodide = null;
let isInitializing = false;

// State for Interactive Continuation Replay when SharedArrayBuffer is unavailable
let activeSession = null;

async function initRuntime() {
  if (pyodide || isInitializing) return;
  isInitializing = true;

  self.postMessage({
    type: "STATUS",
    state: "initializing",
    message: "INITIALIZING PYODIDE WASM (CPYTHON 3.12)...",
  });

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
    isInitializing = false;
  }
}

// Kick off initialization immediately when worker spawns
initRuntime();

async function executeInteractiveStep() {
  if (!activeSession || !pyodide) return;

  const { code, inputs, emittedStdoutLen } = activeSession;
  const stdoutChunks = [];
  const stderrChunks = [];

  pyodide.setStdout({
    batched: (text) => {
      stdoutChunks.push(text);
    },
  });

  pyodide.setStderr({
    batched: (text) => {
      stderrChunks.push(text);
    },
  });

  // Pass current inputs list into Python globals
  pyodide.globals.set("__chroma_user_code", code);
  pyodide.globals.set("__chroma_inputs", pyodide.toPy(inputs));

  const harnessCode = `
import builtins
import sys
import traceback

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

  if (status === "INPUT_REQUIRED") {
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
    exitCode: status === "ERROR" ? 1 : 0,
  });

  activeSession = null;
}

async function runAutomatedTests(code, testCases) {
  if (!pyodide) {
    await initRuntime();
  }

  self.postMessage({
    type: "STATUS",
    state: "running",
    message: "EXECUTING AUTOMATED TEST SUITE...",
  });

  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const inputLines = tc.input ? String(tc.input).split(/\r?\n/) : [];
    const stdoutLines = [];
    const stderrLines = [];

    pyodide.setStdout({
      batched: (text) => stdoutLines.push(text),
    });
    pyodide.setStderr({
      batched: (text) => stderrLines.push(text),
    });

    pyodide.globals.set("__tc_code", code);
    pyodide.globals.set("__tc_inputs", pyodide.toPy(inputLines));

    const testRunnerScript = `
import builtins
import traceback

_tc_idx = 0
_tc_input_list = list(__tc_inputs)

def _tc_input(prompt=""):
    global _tc_idx
    if _tc_idx < len(_tc_input_list):
        val = _tc_input_list[_tc_idx]
        _tc_idx += 1
        return str(val)
    return ""

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
    if (tbErr) {
      stderrLines.push(tbErr.trimEnd());
    }

    const actualOutput = stdoutLines.join("\n").trim();
    const expectedOutput = String(tc.expectedOutput || "").trim();
    const stderr = stderrLines.join("\n").trim();
    const passed = stderr === "" && actualOutput === expectedOutput;

    results.push({
      index: i + 1,
      input: tc.input,
      expectedOutput,
      actualOutput,
      stderr,
      passed,
      isHidden: Boolean(tc.isHidden),
      durationMs,
    });
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
    if (!pyodide) return;

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
    await runAutomatedTests(msg.code || "", msg.testCases || []);
  }
};

