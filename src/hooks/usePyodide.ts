import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConsoleEntry,
  ConsoleLogType,
  PyodideEngineState,
  TestCase,
  TestCaseResult,
} from "../types/ide";

function nowStamp(): string {
  const d = new Date();
  return d.toTimeString().split(" ")[0];
}

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const testResolverRef = useRef<((results: TestCaseResult[]) => void) | null>(
    null
  );
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
          setStatusMessage("RUNTIME READY // CPYTHON 3.12 WASM");
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

        case "TEST_RESULTS": {
          const results: TestCaseResult[] = data.results || [];
          setTestResults(results);
          setEngineState("ready");
          setStatusMessage("RUNTIME READY // CPYTHON 3.12 WASM");
          if (testResolverRef.current) {
            testResolverRef.current(results);
            testResolverRef.current = null;
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

  const stopExecution = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setInputPrompt(null);
    if (testResolverRef.current) {
      testResolverRef.current([]);
      testResolverRef.current = null;
    }
    appendLog(
      "stderr",
      "[■] SIGKILL // Execution terminated by user. Respawning isolated Pyodide Web Worker..."
    );
    spawnWorker();
  }, [appendLog, spawnWorker]);

  const runTests = useCallback(
    (code: string, testCases: TestCase[]): Promise<TestCaseResult[]> => {
      if (!workerRef.current) {
        spawnWorker();
      }
      setInputPrompt(null);
      setEngineState("running");
      setStatusMessage("RUNNING AUTOMATED GRADING SUITE...");

      return new Promise((resolve) => {
        // Safety timeout of 12 seconds for infinite loops during test grading
        const timer = setTimeout(() => {
          if (testResolverRef.current) {
            const timeoutResults: TestCaseResult[] = testCases.map(
              (tc, idx) => ({
                index: idx + 1,
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                actualOutput: "",
                stderr: "TimeoutError: Execution exceeded 12,000ms limit (Infinite loop detected).",
                passed: false,
                isHidden: tc.isHidden,
                durationMs: 12000,
              })
            );
            setTestResults(timeoutResults);
            testResolverRef.current = null;
            stopExecution();
            resolve(timeoutResults);
          }
        }, 12000);

        testResolverRef.current = (results) => {
          clearTimeout(timer);
          resolve(results);
        };

        workerRef.current?.postMessage({
          type: "RUN_TESTS",
          code,
          testCases,
        });
      });
    },
    [spawnWorker, stopExecution]
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
    clearConsole,
  };
}

