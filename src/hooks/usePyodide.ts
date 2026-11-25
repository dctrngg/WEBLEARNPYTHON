import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConsoleEntry,
  ConsoleLogType,
  PyodideEngineState,
  TestCase,
  TestCaseResult,
  TraceExecutionResult,
} from "../types/ide";

/** Thời gian tối đa cho MỖI test case (tính từ lúc test đó bắt đầu chạy). */
const PER_TEST_TIMEOUT_MS = 5000;
/** Thời gian chờ tối đa để nạp runtime trước test đầu tiên (mạng chậm khi tải Pyodide). */
const RUNTIME_BOOT_TIMEOUT_MS = 60000;
const TRACE_TIMEOUT_MS = 10000;
const READY_MESSAGE = "RUNTIME READY // CPYTHON 3.12 WASM";

function nowStamp(): string {
  const d = new Date();
  return d.toTimeString().split(" ")[0];
}

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const testResolverRef = useRef<((results: TestCaseResult[]) => void) | null>(
    null
  );
  /** Các hook sự kiện của phiên chấm bài đang chạy (để đặt lại đồng hồ theo từng test). */
  const testSessionRef = useRef<{
    onStarted: (index: number) => void;
    onProgress: (result: TestCaseResult) => void;
    /** Người dùng bấm DỪNG: huỷ cả lượt chấm, trả về mảng rỗng. */
    cancel: () => void;
  } | null>(null);
  const traceResolverRef = useRef<
    ((result: TraceExecutionResult) => void) | null
  >(null);
  const [engineState, setEngineState] =
    useState<PyodideEngineState>("initializing");
  const [statusMessage, setStatusMessage] = useState<string>(
    "INITIALIZING PYODIDE WASM..."
  );
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([
    {
      id: "boot-0",
      type: "system",
      text: "CHROMA_PY // WASM KERNEL INITIALIZING (CPython 3.12 WebWorker)...",
      timestamp: nowStamp(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[] | null>(null);
  const [lastStdoutText, setLastStdoutText] = useState<string>("");

  const appendLog = useCallback((type: ConsoleLogType, text: string) => {
    setConsoleLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type,
        text,
        timestamp: nowStamp(),
      },
    ]);
  }, []);

  const spawnWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const workerUrl = `${import.meta.env.BASE_URL}pyodideWorker.js`.replace(
      /\/\//g,
      "/"
    );
    const worker = new Worker(workerUrl);
    workerRef.current = worker;

    worker.onmessage = (event) => {
      const data = event.data;
      if (!data || !data.type) return;

      switch (data.type) {
        case "STATUS": {
          setEngineState(data.state);
          setStatusMessage(data.message);
          if (data.state === "ready") {
            setConsoleLogs((prev) => {
              const alreadyReady = prev.some((l) =>
                l.text.includes("RUNTIME READY")
              );
              if (alreadyReady) return prev;
              return [
                ...prev,
                {
                  id: `ready-${Date.now()}`,
                  type: "success",
                  text: "✓ RUNTIME READY // Pyodide CPython 3.12 WebAssembly Engine mounted.",
                  timestamp: nowStamp(),
                },
              ];
            });
          }
          break;
        }

        case "STDOUT": {
          appendLog("stdout", data.text);
          setLastStdoutText((prev) => (prev ? `${prev}\n${data.text}` : data.text));
          break;
        }

        case "STDERR": {
          appendLog("stderr", data.text);
          break;
        }

        case "INPUT_REQUEST": {
          setEngineState("awaiting_input");
          setStatusMessage("AWAITING STDIN INPUT()...");
          setInputPrompt(data.prompt || "");
          if (data.prompt) {
            appendLog("stdin-prompt", data.prompt);
          }
          break;
        }

        case "EXECUTION_COMPLETE": {
          setInputPrompt(null);
          setEngineState("ready");
          setStatusMessage(READY_MESSAGE);
          if (data.exitCode === 0) {
            appendLog(
              "success",
              `✓ Process exited with code 0 (${data.durationMs}ms)`
            );
          } else {
            appendLog(
              "stderr",
              `✕ Process exited with code ${data.exitCode} (${data.durationMs}ms)`
            );
          }
          break;
        }

        case "TEST_STARTED": {
          testSessionRef.current?.onStarted(data.index);
          setStatusMessage(`ĐANG CHẤM TEST ${data.index}/${data.total}...`);
          break;
        }

        case "TEST_PROGRESS": {
          if (data.result) testSessionRef.current?.onProgress(data.result);
          break;
        }

        case "TEST_RESULTS": {
          const results: TestCaseResult[] = data.results || [];
          setTestResults(results);
          setEngineState("ready");
          setStatusMessage(READY_MESSAGE);
          testSessionRef.current = null;
          if (testResolverRef.current) {
            testResolverRef.current(results);
            testResolverRef.current = null;
          }
          break;
        }

        case "TRACE_RESULTS": {
          const res: TraceExecutionResult = data.result || {
            steps: [],
            error: null,
            totalStdout: "",
            limitReached: false,
          };
          setEngineState("ready");
          setStatusMessage(READY_MESSAGE);
          if (traceResolverRef.current) {
            traceResolverRef.current(res);
            traceResolverRef.current = null;
          }
          break;
        }
      }
    };

    worker.onerror = (err) => {
      setEngineState("error");
      setStatusMessage("WORKER RUNTIME ERROR");
      appendLog("stderr", `Worker Error: ${err.message}`);
    };
  }, [appendLog]);

  useEffect(() => {
    spawnWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, [spawnWorker]);

  const runCode = useCallback(
    (code: string) => {
      if (!workerRef.current) {
        spawnWorker();
      }
      setInputPrompt(null);
      setLastStdoutText("");
      setConsoleLogs([
        {
          id: `exec-${Date.now()}`,
          type: "system",
          text: "$ python3 solution.py",
          timestamp: nowStamp(),
        },
      ]);
      setEngineState("running");
      setStatusMessage("EXECUTING PYTHON BYTECODE...");
      workerRef.current?.postMessage({
        type: "RUN_CODE",
        code,
      });
    },
    [spawnWorker]
  );

  const submitInput = useCallback(
    (value: string) => {
      if (!workerRef.current) return;
      appendLog("stdin-echo", `> ${value}`);
      setInputPrompt(null);
      setEngineState("running");
      setStatusMessage("RESUMING EXECUTION...");
      workerRef.current.postMessage({
        type: "INPUT_RESPONSE",
        value,
      });
    },
    [appendLog]
  );

  /** Huỷ worker đang chạy và tạo lại worker mới. `reason` = thông báo hiển thị trong console. */
  const killWorker = useCallback(
    (reason: string) => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      setInputPrompt(null);
      const session = testSessionRef.current;
      testSessionRef.current = null;
      if (session) {
        session.cancel();
      } else if (testResolverRef.current) {
        const resolve = testResolverRef.current;
        testResolverRef.current = null;
        resolve([]);
      }
      if (traceResolverRef.current) {
        const resolve = traceResolverRef.current;
        traceResolverRef.current = null;
        resolve({
          steps: [],
          error: "Execution terminated",
          totalStdout: "",
          limitReached: false,
        });
      }
      appendLog("stderr", reason);
      spawnWorker();
    },
    [appendLog, spawnWorker]
  );

  const stopExecution = useCallback(() => {
    killWorker(
      "[■] SIGKILL // Execution terminated by user. Respawning isolated Pyodide Web Worker..."
    );
  }, [killWorker]);

  const runTests = useCallback(
    (code: string, testCases: TestCase[]): Promise<TestCaseResult[]> => {
      if (!workerRef.current) {
        spawnWorker();
      }
      // Huỷ phiên chấm cũ (nếu còn) để không bị ghi đè resolver
      if (testSessionRef.current) {
        const prev = testSessionRef.current;
        testSessionRef.current = null;
        prev.cancel();
      }
      setInputPrompt(null);
      setEngineState("running");
      setStatusMessage("RUNNING AUTOMATED GRADING SUITE...");

      if (testCases.length === 0) {
        setTestResults([]);
        setEngineState("ready");
        setStatusMessage(READY_MESSAGE);
        return Promise.resolve([]);
      }

      return new Promise((resolve) => {
        const completed = new Map<number, TestCaseResult>();
        let currentIndex = 0;
        let timer: ReturnType<typeof setTimeout> | null = null;

        const arm = (ms: number) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(onTimeout, ms);
        };

        const collect = (): TestCaseResult[] =>
          testCases.map(
            (tc, idx) =>
              completed.get(idx + 1) || {
                index: idx + 1,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                actualOutput: "",
                stderr: "RuntimeError: Không nhận được kết quả cho test này.",
                passed: false,
                isHidden: tc.isHidden,
                durationMs: 0,
              }
          );

        const finish = () => {
          if (timer) clearTimeout(timer);
          if (testResolverRef.current === finish) testResolverRef.current = null;
          testSessionRef.current = null;
          const results = collect();
          setTestResults(results);
          setEngineState("ready");
          setStatusMessage(READY_MESSAGE);
          resolve(results);
        };

        /** Gửi các test từ vị trí `fromIdx` (0-based) tới worker hiện tại. */
        const dispatch = (fromIdx: number) => {
          arm(RUNTIME_BOOT_TIMEOUT_MS);
          workerRef.current?.postMessage({
            type: "RUN_TESTS",
            code,
            testCases: testCases.slice(fromIdx),
            indexOffset: fromIdx,
          });
        };

        // Quá thời gian: chỉ đánh trượt test đang treo, khởi động lại worker
        // rồi tiếp tục chấm các test còn lại (không bỏ qua test ẩn).
        const onTimeout = () => {
          if (testResolverRef.current !== finish) return;
          if (currentIndex === 0) {
            // Runtime không khởi động được (mạng chậm / CDN lỗi)
            testCases.forEach((tc, idx) => {
              completed.set(idx + 1, {
                index: idx + 1,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                actualOutput: "",
                stderr: "RuntimeError: Không nạp được Python runtime (kiểm tra kết nối mạng).",
                passed: false,
                isHidden: tc.isHidden,
                durationMs: 0,
              });
            });
            workerRef.current?.terminate();
            workerRef.current = null;
            spawnWorker();
            finish();
            return;
          }

          const tc = testCases[currentIndex - 1];
          completed.set(currentIndex, {
            index: currentIndex,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput: "",
            stderr: `TimeoutError: Test vượt quá ${PER_TEST_TIMEOUT_MS / 1000}s — có thể do vòng lặp vô hạn hoặc thiếu dữ liệu vào.`,
            passed: false,
            isHidden: tc.isHidden,
            durationMs: PER_TEST_TIMEOUT_MS,
          });
          appendLog(
            "stderr",
            `✕ Test #${currentIndex} quá thời gian ${PER_TEST_TIMEOUT_MS / 1000}s — đã dừng và khởi động lại runtime.`
          );

          workerRef.current?.terminate();
          workerRef.current = null;
          spawnWorker();

          const nextIdx = currentIndex; // 0-based vị trí test kế tiếp
          currentIndex = 0;
          if (nextIdx >= testCases.length) {
            finish();
          } else {
            dispatch(nextIdx);
          }
        };

        testResolverRef.current = finish;
        testSessionRef.current = {
          onStarted: (index) => {
            currentIndex = index;
            arm(PER_TEST_TIMEOUT_MS);
          },
          onProgress: (result) => {
            completed.set(result.index, result);
          },
          cancel: () => {
            if (timer) clearTimeout(timer);
            if (testResolverRef.current === finish) testResolverRef.current = null;
            setTestResults(null);
            resolve([]);
          },
        };
        dispatch(0);
      });
    },
    [spawnWorker, appendLog, setTestResults]
  );

  const traceCode = useCallback(
    (code: string, inputs: string[] = []): Promise<TraceExecutionResult> => {
      if (!workerRef.current) {
        spawnWorker();
      }
      setInputPrompt(null);
      setEngineState("running");
      setStatusMessage("TRACING VARIABLE EXECUTION...");

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (traceResolverRef.current) {
            traceResolverRef.current = null;
            killWorker("✕ Chạy từng bước quá thời gian. Đã dừng và khởi động lại runtime.");
            resolve({
              steps: [],
              error:
                "TimeoutError: Tracing exceeded 10,000ms limit (Infinite loop detected).",
              totalStdout: "",
              limitReached: false,
            });
          }
        }, TRACE_TIMEOUT_MS);

        traceResolverRef.current = (result) => {
          clearTimeout(timer);
          resolve(result);
        };

        workerRef.current?.postMessage({
          type: "TRACE_CODE",
          code,
          inputs,
        });
      });
    },
    [spawnWorker, killWorker]
  );

  const clearConsole = useCallback(() => {
    setConsoleLogs([
      {
        id: `clr-${Date.now()}`,
        type: "system",
        text: "CONSOLE BUFFER CLEARED // READY",
        timestamp: nowStamp(),
      },
    ]);
  }, []);

  return {
    engineState,
    statusMessage,
    consoleLogs,
    inputPrompt,
    testResults,
    lastStdoutText,
    setTestResults,
    runCode,
    submitInput,
    stopExecution,
    runTests,
    traceCode,
    clearConsole,
  };
}

