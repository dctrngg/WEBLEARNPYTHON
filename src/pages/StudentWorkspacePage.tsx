import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor, { OnMount } from "@monaco-editor/react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { usePyodide } from "../hooks/usePyodide";
import {
  getAssignments,
  getSubmission,
  getUserSubmissions,
  saveSubmission,
} from "../services/firestoreService";
import {
  localizeAssignment,
  localizeDifficulty,
} from "../services/seedData";
import { PYTHON_CURRICULUM_LESSONS } from "../services/curriculumData";
import { registerPythonIntellisense } from "../services/pythonIntellisense";
import {
  Assignment,
  DifficultyLevel,
  Submission,
  SubmissionStatus,
  TraceStep,
} from "../types/ide";
import { TopNavigationBar } from "../components/layout/TopNavigationBar";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { SectionBadge } from "../components/ui/BentoPrimitives";
import { PythonCheatSheetModal } from "../components/ui/PythonCheatSheetModal";
import { useToast } from "../components/ui/Primitives";
import {
  parseAndTranslatePythonError,
  TranslatedError,
} from "../services/pythonErrorTranslator";
import { diagnose } from "../services/answerDiagnostic";
import {
  Eraser,
  ListChecks,
  Loader2,
  Play,
  RotateCcw,
  Save,
  ScanSearch,
  Send,
  Square,
  TerminalSquare,
} from "lucide-react";

const GLYPHS = ["◇", "◆", "●", "◐", "▣", "◊"];

function computeCodeHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

export const StudentWorkspacePage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang, t } = useLanguage();
  const { pushToast } = useToast();

  const {
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
  } = usePyodide();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [userSubmissionsMap, setUserSubmissionsMap] = useState<
    Record<string, Submission>
  >({});

  const [difficultyFilter, setDifficultyFilter] = useState<
    "ALL" | DifficultyLevel
  >("ALL");
  const [lessonFilter, setLessonFilter] = useState<string>("ALL");
  const [code, setCode] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("in_progress");
  const [syncBadge, setSyncBadge] = useState<string>("");
  const [activeBottomTab, setActiveBottomTab] = useState<
    "CONSOLE" | "TEST_CASES" | "TRACER"
  >("CONSOLE");
  const [stdinValue, setStdinValue] = useState<string>("");
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [leftSectionMode, setLeftSectionMode] = useState<"SPLIT" | "PROBLEM">(
    "PROBLEM"
  );
  const [cheatSheetOpen, setCheatSheetOpen] = useState<boolean>(false);
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("chroma_py_workspace_left_pane");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  const toggleLeftPane = () => {
    setIsLeftPaneOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("chroma_py_workspace_left_pane", String(next));
      } catch {}
      return next;
    });
  };

  const [editorFontSize, setEditorFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("chroma_py_editor_font_size");
    const parsed = saved ? parseInt(saved, 10) : 14;
    return Number.isFinite(parsed) && parsed >= 10 && parsed <= 32 ? parsed : 14;
  });

  // Feature 4: Friendly Error Translator state
  const [translatedError, setTranslatedError] = useState<TranslatedError | null>(
    null
  );

  // Feature 3: Step-by-Step Variable Tracer state
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceSteps, setTraceSteps] = useState<TraceStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [traceSpeedMs, setTraceSpeedMs] = useState<number>(1000);
  const [isTraceLoading, setIsTraceLoading] = useState<boolean>(false);
  const [traceInputModalOpen, setTraceInputModalOpen] = useState<boolean>(false);
  const [traceInputValue, setTraceInputValue] = useState<string>("");
  const traceDecorationsRef = useRef<string[]>([]);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Anti-Cheat: Chống copy đề bài và chống dán code vào Editor
  const [antiPasteEnabled, setAntiPasteEnabled] = useState<boolean>(true);
  const antiPasteRef = useRef<boolean>(true);

  useEffect(() => {
    antiPasteRef.current = antiPasteEnabled;
  }, [antiPasteEnabled]);

  const handleZoomIn = () => {
    setEditorFontSize((prev) => {
      const next = Math.min(prev + 2, 32);
      localStorage.setItem("chroma_py_editor_font_size", next.toString());
      return next;
    });
  };

  const handleZoomOut = () => {
    setEditorFontSize((prev) => {
      const next = Math.max(prev - 2, 10);
      localStorage.setItem("chroma_py_editor_font_size", next.toString());
      return next;
    });
  };

  const handleResetZoom = () => {
    setEditorFontSize(14);
    localStorage.setItem("chroma_py_editor_font_size", "14");
  };

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const stdinInputRef = useRef<HTMLInputElement | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);
  const lastSyncedHashRef = useRef<string>("");
  const codeRef = useRef<string>(code);
  codeRef.current = code;

  // Re-register Python IntelliSense whenever language changes
  useEffect(() => {
    if (monacoRef.current) {
      registerPythonIntellisense(monacoRef.current, lang);
    }
  }, [lang]);

  // Synchronize Monaco Editor theme with global Dark / Light theme
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(
        theme === "dark" ? "chroma-carbon-dark" : "chroma-carbon-light"
      );
    }
  }, [theme]);

  // Load assignments and student submissions on mount
  useEffect(() => {
    let mounted = true;
    async function loadWorkspaceData() {
      const [asgnList, subsList] = await Promise.all([
        getAssignments(),
        user ? getUserSubmissions(user.uid) : Promise.resolve([]),
      ]);
      if (!mounted) return;

      setAssignments(asgnList);
      const map: Record<string, Submission> = {};
      subsList.forEach((s) => {
        map[s.assignmentId] = s;
      });
      setUserSubmissionsMap(map);

      if (asgnList.length > 0) {
        const target =
          asgnList.find((a) => a.id === assignmentId) || asgnList[0];
        setSelectedAssignment(target);
      }
    }
    loadWorkspaceData();
    return () => {
      mounted = false;
    };
  }, [assignmentId, user]);

  // Load saved submission, starter code, or newest local draft when assignment changes
  useEffect(() => {
    let active = true;
    async function loadAssignmentCode() {
      if (!selectedAssignment) return;
      isInitialLoadRef.current = true;
      setTestResults(null);

      // 1. Inspect local draft in localStorage first
      const draftKey = user
        ? `chroma_draft_${user.uid}_${selectedAssignment.id}`
        : `chroma_draft_anon_${selectedAssignment.id}`;
      let localDraft: { code: string; updatedAt: number } | null = null;
      try {
        const raw = localStorage.getItem(draftKey);
        if (raw) localDraft = JSON.parse(raw);
      } catch {}

      // 2. Fetch submission from Cloud Firestore
      if (user) {
        const existingSub = await getSubmission(
          user.uid,
          selectedAssignment.id
        );
        if (!active) return;
        if (existingSub) {
          const cloudTime = new Date(existingSub.updatedAt).getTime();
          // If local draft is newer than cloud by at least 1s, restore draft
          if (
            localDraft &&
            localDraft.updatedAt > cloudTime + 1000 &&
            localDraft.code !== existingSub.code
          ) {
            setCode(localDraft.code);
            setSubmissionStatus(existingSub.status);
            lastSyncedHashRef.current = computeCodeHash(existingSub.code);
            setSyncBadge(
              t("● Đã khôi phục bản nháp cục bộ", "● Local draft restored")
            );
          } else {
            setCode(existingSub.code);
            setSubmissionStatus(existingSub.status);
            lastSyncedHashRef.current = computeCodeHash(existingSub.code);
            const timeStr = new Date(existingSub.updatedAt)
              .toTimeString()
              .split(" ")[0];
            setSyncBadge(t(`✓ ĐÃ LƯU LÚC ${timeStr}`, `✓ SYNCED ${timeStr}`));
          }
          setTimeout(() => {
            isInitialLoadRef.current = false;
          }, 150);
          return;
        }
      }

      if (!active) return;
      // 3. Fallback for new assignment: check local draft or use starterCode
      if (localDraft && localDraft.code) {
        setCode(localDraft.code);
        setSubmissionStatus("in_progress");
        lastSyncedHashRef.current = computeCodeHash(
          selectedAssignment.starterCode
        );
        setSyncBadge(
          t("● Đã khôi phục bản nháp cục bộ", "● Local draft restored")
        );
      } else {
        setCode(selectedAssignment.starterCode);
        setSubmissionStatus("in_progress");
        lastSyncedHashRef.current = computeCodeHash(
          selectedAssignment.starterCode
        );
        setSyncBadge(t("● Đang dùng code mẫu", "● Starter template"));
      }
      setTimeout(() => {
        isInitialLoadRef.current = false;
      }, 150);
    }

    loadAssignmentCode();
    return () => {
      active = false;
    };
  }, [selectedAssignment, user, setTestResults, t]);

  // Persist code helper (synchronizes to Firestore & updates lastSyncedHash)
  const persistCodeToCloud = useCallback(
    async (
      codeToSave: string,
      overrideStatus?: SubmissionStatus,
      passedCount?: number,
      totalCount?: number
    ) => {
      if (!user || !selectedAssignment) return;
      const targetHash = computeCodeHash(codeToSave);
      setSyncBadge(t("◐ Đang lưu bài...", "◐ Saving..."));
      const nextStatus = overrideStatus || submissionStatus;
      const saved = await saveSubmission({
        id: `${user.uid}_${selectedAssignment.id}`,
        userId: user.uid,
        userDisplayName: user.displayName,
        userClassName: user.className || "10A1",
        userEmail: user.email,
        assignmentId: selectedAssignment.id,
        code: codeToSave,
        status: nextStatus,
        lastExecutedOutput: lastStdoutText,
        passedCount,
        totalCount,
        updatedAt: new Date().toISOString(),
      });
      lastSyncedHashRef.current = targetHash;
      setSubmissionStatus(nextStatus);
      setUserSubmissionsMap((prev) => ({
        ...prev,
        [selectedAssignment.id]: saved,
      }));
      const stamp = new Date().toTimeString().split(" ")[0];
      setSyncBadge(t(`✓ ĐÃ ĐỒNG BỘ ${stamp}`, `✓ SYNCED ${stamp}`));
    },
    [user, selectedAssignment, submissionStatus, lastStdoutText, t]
  );

  // Auto-Save: Instant LocalStorage Draft + 25-second Debounced Cloud Sync with Hash Verification
  useEffect(() => {
    if (isInitialLoadRef.current || !selectedAssignment || !user) return;

    // Step A: Immediately save draft to localStorage
    const draftKey = `chroma_draft_${user.uid}_${selectedAssignment.id}`;
    try {
      localStorage.setItem(
        draftKey,
        JSON.stringify({ code, updatedAt: Date.now() })
      );
    } catch {}

    // Step B: Compare hash with last cloud-synced code. If identical, skip Firestore write!
    const currentHash = computeCodeHash(code);
    if (currentHash === lastSyncedHashRef.current) {
      return;
    }

    // Step C: Mark modified and debounce Cloud Sync for 25 seconds
    setSyncBadge(
      t(
        "● Đã lưu bản nháp (đồng bộ đám mây sau 25s)",
        "● Draft saved (sync in 25s)"
      )
    );

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      if (computeCodeHash(codeRef.current) !== lastSyncedHashRef.current) {
        persistCodeToCloud(codeRef.current);
      }
    }, 25000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [code, selectedAssignment, user, persistCodeToCloud, t]);

  // Flush cloud sync immediately when user switches tabs (blur) or navigates away (beforeunload)
  useEffect(() => {
    const handleFlushSync = () => {
      const cur = codeRef.current;
      if (!user || !selectedAssignment || isInitialLoadRef.current) return;
      if (computeCodeHash(cur) !== lastSyncedHashRef.current) {
        persistCodeToCloud(cur);
      }
    };

    window.addEventListener("beforeunload", handleFlushSync);
    window.addEventListener("blur", handleFlushSync);

    return () => {
      window.removeEventListener("beforeunload", handleFlushSync);
      window.removeEventListener("blur", handleFlushSync);
    };
  }, [user, selectedAssignment, persistCodeToCloud]);

  // Scroll console to bottom on new output
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs, inputPrompt]);

  // Focus stdin input when Python requests input()
  useEffect(() => {
    if (inputPrompt !== null) {
      setActiveBottomTab("CONSOLE");
      setTimeout(() => {
        stdinInputRef.current?.focus();
      }, 50);
    }
  }, [inputPrompt]);

  // Jump to specific code line in Monaco Editor
  const handleJumpToLine = (lineNum: number) => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.revealLineInCenter(lineNum);
      editorRef.current.setPosition({ lineNumber: lineNum, column: 1 });
    }
  };

  // Automatically parse and translate errors when new stderr is produced
  useEffect(() => {
    const stderrEntries = consoleLogs.filter((l) => l.type === "stderr");
    if (stderrEntries.length > 0) {
      const lastStderr = stderrEntries[stderrEntries.length - 1].text;
      if (!lastStderr.includes("SIGKILL") && !lastStderr.includes("Process exited")) {
        const translated = parseAndTranslatePythonError(lastStderr, code);
        setTranslatedError(translated);
      }
    } else {
      setTranslatedError(null);
    }
  }, [consoleLogs, code]);

  // Monaco line decoration for active step in Tracer
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    if (
      !isTracing ||
      traceSteps.length === 0 ||
      currentStepIdx < 0 ||
      currentStepIdx >= traceSteps.length
    ) {
      traceDecorationsRef.current = editorRef.current.deltaDecorations(
        traceDecorationsRef.current,
        []
      );
      return;
    }

    const currentStep = traceSteps[currentStepIdx];
    if (!currentStep || !currentStep.line) return;

    traceDecorationsRef.current = editorRef.current.deltaDecorations(
      traceDecorationsRef.current,
      [
        {
          range: new monacoRef.current.Range(
            currentStep.line,
            1,
            currentStep.line,
            1
          ),
          options: {
            isWholeLine: true,
            className: "bg-amber-500/20 border-l-4 border-amber-500",
            glyphMarginClassName: "bg-amber-500 text-black font-bold",
          },
        },
      ]
    );

    editorRef.current.revealLineInCenter(currentStep.line);
  }, [isTracing, traceSteps, currentStepIdx]);

  // Tracer Auto-play loop
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentStepIdx((prev) => {
        if (prev + 1 < traceSteps.length) {
          return prev + 1;
        } else {
          setIsAutoPlaying(false);
          return prev;
        }
      });
    }, traceSpeedMs);

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, currentStepIdx, traceSteps.length, traceSpeedMs]);

  const handleInitiateTrace = () => {
    if (code.includes("input(")) {
      const defaultInput = selectedAssignment?.testCases[0]?.input || "";
      setTraceInputValue(defaultInput);
      setTraceInputModalOpen(true);
    } else {
      executeTrace([]);
    }
  };

  const executeTrace = async (inputLines: string[]) => {
    setIsTraceLoading(true);
    setTraceInputModalOpen(false);
    setIsAutoPlaying(false);

    const res = await traceCode(code, inputLines);
    setIsTraceLoading(false);

    if (res.error) {
      setActiveBottomTab("CONSOLE");
      const trans = parseAndTranslatePythonError(res.error, code);
      setTranslatedError(trans);
      pushToast(trans?.descriptionVi || res.error, "danger");
      return;
    }

    if (res.steps.length === 0) {
      pushToast(
        t(
          "Chương trình không có câu lệnh hợp lệ để chạy từng bước.",
          "No executable statements found."
        ),
        "info"
      );
      return;
    }

    setTraceSteps(res.steps);
    setCurrentStepIdx(0);
    setIsTracing(true);
    setActiveBottomTab("TRACER");
    pushToast(
      t(
        `Đã ghi nhận ${res.steps.length} bước thực thi. Hãy quan sát bảng biến đổi giá trị bên dưới!`,
        `Recorded ${res.steps.length} steps. Inspect variable mutations below!`
      ),
      "success"
    );
  };

  const handleStopTracing = () => {
    setIsTracing(false);
    setIsAutoPlaying(false);
    setTraceSteps([]);
    setCurrentStepIdx(0);
    if (traceDecorationsRef.current.length > 0 && editorRef.current) {
      traceDecorationsRef.current = editorRef.current.deltaDecorations(
        traceDecorationsRef.current,
        []
      );
    }
  };

  const handlePrevStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1));
  };

  const handleFirstStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleLastStep = () => {
    setIsAutoPlaying(false);
    setCurrentStepIdx(traceSteps.length - 1);
  };

  const handleSelectAssignment = (asgn: Assignment) => {
    setSelectedAssignment(asgn);
    navigate(`/workspace/${asgn.id}`, { replace: true });
    setLeftSectionMode("PROBLEM");
  };

  const handleRunCode = () => {
    handleStopTracing();
    setTranslatedError(null);
    setActiveBottomTab("CONSOLE");
    runCode(code);
  };

  const handleResetCode = () => {
    handleStopTracing();
    setTranslatedError(null);
    if (!selectedAssignment) return;
    setCode(selectedAssignment.starterCode);
    setTestResults(null);
    setSyncBadge(t("↺ Đã khôi phục code mẫu", "↺ Reset to starter"));
  };

  const handleManualSave = async () => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    await persistCodeToCloud(code);
  };

  const handleSubmitAndGrade = async () => {
    handleStopTracing();
    setTranslatedError(null);
    if (!selectedAssignment || isGrading) return;
    if (selectedAssignment.testCases.length === 0) {
      pushToast(
        t(
          "Bài này chưa có test case để chấm. Hãy báo giáo viên!",
          "This assignment has no test cases yet."
        ),
        "warn"
      );
      return;
    }
    setIsGrading(true);
    setActiveBottomTab("TEST_CASES");

    const results = await runTests(code, selectedAssignment.testCases);
    setIsGrading(false);

    // Bị dừng giữa chừng (nút STOP) → không ghi nhận kết quả 0 điểm
    if (results.length === 0) {
      pushToast(t("Đã huỷ lượt chấm bài.", "Grading cancelled."), "info");
      return;
    }

    const passedCount = results.filter((r) => r.passed).length;
    const totalCount = results.length;
    const allPassed = totalCount > 0 && passedCount === totalCount;
    const finalStatus: SubmissionStatus = allPassed ? "passed" : "failed";

    await persistCodeToCloud(code, finalStatus, passedCount, totalCount);
  };

  const handleStdinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInput(stdinValue);
    setStdinValue("");
  };

  // Insert code snippet at current cursor position in Monaco Editor
  const handleInsertSnippetIntoEditor = (snippetText: string) => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (editor && monaco) {
      const selection = editor.getSelection();
      const range = selection || new monaco.Range(1, 1, 1, 1);
      editor.executeEdits("student-quick-helper", [
        {
          range,
          text: snippetText + "\n",
          forceMoveMarkers: true,
        },
      ]);
      editor.focus();
    } else {
      setCode((prev) => `${prev}\n${snippetText}\n`);
    }
  };

  const handleTriggerAutocomplete = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.trigger(
        "keyboard",
        "editor.action.triggerSuggest",
        {}
      );
    }
  };

  // Configure Monaco Editor with Chroma Carbon Dark & Light themes & full Student Python IntelliSense
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme("chroma-carbon-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "C792EA", fontStyle: "bold" },
        { token: "string", foreground: "A5E3A0" },
        { token: "number", foreground: "F5B971" },
        { token: "comment", foreground: "7C8AA5", fontStyle: "italic" },
        { token: "identifier", foreground: "E8EDF5" },
        { token: "type", foreground: "7DCFFF" },
        { token: "delimiter", foreground: "A9B5C7" },
      ],
      colors: {
        "editor.background": "#0E1627",
        "editor.foreground": "#E8EDF5",
        "editorLineNumber.foreground": "#4A5A78",
        "editorLineNumber.activeForeground": "#8FB0FF",
        "editorCursor.foreground": "#8FB0FF",
        "editor.selectionBackground": "#5B8CFF40",
        "editor.lineHighlightBackground": "#16203A",
        "editor.lineHighlightBorder": "#00000000",
        "editorIndentGuide.background1": "#1C2742",
        "editorIndentGuide.activeBackground1": "#31415F",
        "editorWidget.background": "#111A2E",
        "editorSuggestWidget.background": "#111A2E",
        "editorSuggestWidget.border": "#31415F",
        "editorSuggestWidget.foreground": "#E8EDF5",
        "editorSuggestWidget.selectedForeground": "#FFFFFF",
        "editorSuggestWidget.selectedBackground": "#22304A",
        "editorSuggestWidget.highlightForeground": "#8FB0FF",
        "editorSuggestWidget.focusHighlightForeground": "#8FB0FF",
        "list.hoverBackground": "#18233A",
        "list.focusBackground": "#22304A",
      },
    });

    monaco.editor.defineTheme("chroma-carbon-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "7C3AED", fontStyle: "bold" },
        { token: "string", foreground: "15803D" },
        { token: "number", foreground: "C2410C" },
        { token: "comment", foreground: "64748B", fontStyle: "italic" },
        { token: "identifier", foreground: "0F172A" },
        { token: "type", foreground: "0369A1" },
        { token: "delimiter", foreground: "475569" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#0F172A",
        "editorLineNumber.foreground": "#94A3B8",
        "editorLineNumber.activeForeground": "#2563EB",
        "editorCursor.foreground": "#2563EB",
        "editor.selectionBackground": "#2563EB26",
        "editor.lineHighlightBackground": "#F1F5FB",
        "editor.lineHighlightBorder": "#00000000",
        "editorIndentGuide.background1": "#E3E8EF",
        "editorIndentGuide.activeBackground1": "#CDD5DF",
        "editorWidget.background": "#FFFFFF",
        "editorSuggestWidget.background": "#FFFFFF",
        "editorSuggestWidget.border": "#CDD5DF",
        "editorSuggestWidget.foreground": "#0F172A",
        "editorSuggestWidget.selectedForeground": "#0F172A",
        "editorSuggestWidget.selectedBackground": "#E8EFFF",
        "editorSuggestWidget.highlightForeground": "#1D4ED8",
        "editorSuggestWidget.focusHighlightForeground": "#1D4ED8",
        "list.hoverBackground": "#F1F5FB",
        "list.focusBackground": "#E8EFFF",
      },
    });

    monaco.editor.setTheme(
      theme === "dark" ? "chroma-carbon-dark" : "chroma-carbon-light"
    );

    // Register comprehensive Python autocomplete, signature help & hover docs
    registerPythonIntellisense(monaco, lang);

    // Automatically trigger suggestions after typing '=', '+', '-', '*', '/' so student variables (a, b, a + b) pop up
    editor.onDidChangeModelContent((event: any) => {
      const change = event?.changes?.[0];
      if (!change || !change.text) return;
      const typed = change.text;
      if (
        typed === "=" ||
        typed === "+" ||
        typed === "-" ||
        typed === "*" ||
        typed === "/" ||
        typed === "("
      ) {
        setTimeout(() => {
          editor.trigger("auto-var", "editor.action.triggerSuggest", {});
        }, 40);
      }
    });

    // Anti-Cheat: Chặn phím tắt Dán (Ctrl+V / Cmd+V / Shift+Insert) vào Code Editor
    editor.onKeyDown((e: any) => {
      if (!antiPasteRef.current) return;
      const isPaste =
        ((e.ctrlKey || e.metaKey) && e.code === "KeyV") ||
        (e.shiftKey && e.code === "Insert");
      if (isPaste) {
        e.preventDefault();
        e.stopPropagation();
        pushToast(
          "⚠️ Chống gian lận: Tính năng Dán (Paste) bị vô hiệu hóa! Học sinh hãy tự gõ code để rèn luyện kỹ năng lập trình.",
          "warn"
        );
      }
    });

    // Chặn sự kiện dán chuột (Right-click Paste / Middle click / Clipboard Paste) trên DOM của Editor
    const domNode = editor.getDomNode();
    if (domNode) {
      domNode.addEventListener(
        "paste",
        (e: any) => {
          if (!antiPasteRef.current) return;
          e.preventDefault();
          e.stopPropagation();
          pushToast(
            "⚠️ Chống gian lận: Tính năng Dán (Paste) bị vô hiệu hóa! Học sinh hãy tự gõ code để rèn luyện kỹ năng lập trình.",
            "warn"
          );
        },
        true
      );
    }

    // Ghi đè lệnh paste của Monaco Editor
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      if (!antiPasteRef.current) {
        editor.trigger("keyboard", "editor.action.clipboardPasteAction", null);
        return;
      }
      pushToast(
        "⚠️ Chống gian lận: Tính năng Dán (Paste) bị vô hiệu hóa! Học sinh hãy tự gõ code để rèn luyện kỹ năng lập trình.",
        "warn"
      );
    });

    // Add Ctrl+Enter / Cmd+Enter shortcut to run code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode(editor.getValue());
    });
  };

  const filteredAssignments = assignments.filter((a) => {
    const matchesDiff =
      difficultyFilter === "ALL" ? true : a.difficulty === difficultyFilter;
    const matchesLesson =
      lessonFilter === "ALL" ? true : a.lessonId === lessonFilter;
    return matchesDiff && matchesLesson;
  });

  const completedCount = assignments.filter(
    (a) => userSubmissionsMap[a.id]?.status === "passed"
  ).length;

  const localizedSelected = selectedAssignment
    ? localizeAssignment(selectedAssignment, lang)
    : null;

  const publicTestCases =
    localizedSelected?.testCases.filter((tc) => !tc.isHidden) || [];
  const hiddenTestCount =
    localizedSelected?.testCases.filter((tc) => tc.isHidden).length || 0;

  const formatStatusLabel = (st: SubmissionStatus) => {
    if (st === "passed") return t("✓ Đã hoàn thành", "✓ Passed");
    if (st === "failed") return t("✕ Chưa đạt", "✕ Failed");
    return t("◐ Đang làm", "◐ In progress");
  };

  return (
    <div className="h-screen min-h-[480px] w-full overflow-hidden flex flex-col bg-background text-primary">
      {/* 1. Student-Friendly Top Status Bar */}
      <TopNavigationBar
        breadcrumb={t(
          "Học Python trực tuyến",
          "Learn Python online"
        )}
        engineState={engineState}
        engineStatusText={statusMessage}
        syncStatus={syncBadge || t("✓ Đã lưu tự động", "✓ Auto-saved")}
        studentProgressText={t(
          `HOÀN THÀNH: ${completedCount}/${assignments.length} BÀI`,
          `COMPLETED: ${completedCount}/${assignments.length}`
        )}
        onOpenCheatSheet={() => setCheatSheetOpen(true)}
      />

      {/* 2. Main Full-Viewport 3-Pane Split Layout */}
      <div className="flex-1 min-h-0 overflow-hidden bg-grid">
        <PanelGroup
          key={isLeftPaneOpen ? "with-left" : "without-left"}
          direction="horizontal"
          className="h-full w-full"
        >
          {/* LEFT PANE: Exercise Selector + Problem Specification */}
          {isLeftPaneOpen && (
            <>
              <Panel
                defaultSize={50}
                minSize={20}
                className="bg-surface flex flex-col h-full min-w-0"
              >
            {/* Left Pane Header + Difficulty Filter */}
            <div className="px-4 py-2.5 bg-subtle border-b border-grid space-y-2 shrink-0 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-brand">◆</span>
                  <span className=" text-primary font-semibold">
                    {t(
                      `Danh sách bài tập (${filteredAssignments.length})`,
                      `EXERCISES (${filteredAssignments.length})`
                    )}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setLeftSectionMode((m) =>
                      m === "SPLIT" ? "PROBLEM" : "SPLIT"
                    )
                  }
                  className="text-[11px] text-secondary hover:text-primary px-2 py-0.5 border border-grid bg-surface"
                >
                  {leftSectionMode === "SPLIT"
                    ? t("▲ Ẩn danh sách", "▲ Hide list")
                    : t("▼ Chọn bài khác", "▼ Change exercise")}
                </button>
              </div>

              {/* Filter by Lesson + Filter by Difficulty */}
              {leftSectionMode === "SPLIT" && (
                <div className="space-y-1.5">
                  <select
                    value={lessonFilter}
                    onChange={(e) => setLessonFilter(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-surface border border-grid text-primary font-mono text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="ALL">
                      📚{" "}
                      {t(
                        "Tất cả bài học (Bài 16 → Bài 31)",
                        "All Lessons (Lesson 16 → 31)"
                      )}
                    </option>
                    {PYTHON_CURRICULUM_LESSONS.map((l) => (
                      <option key={l.id} value={l.id}>
                        {lang === "vi"
                          ? `${l.code}: ${l.titleVi}`
                          : `${l.code}: ${l.titleEn}`}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-4 bg-grid gap-[1px] border border-grid text-[11px]">
                    {(
                      [
                        { id: "ALL", label: t("Tất cả", "All") },
                        { id: "Beginner", label: t("Cơ bản", "Easy") },
                        { id: "Intermediate", label: t("T.Bình", "Medium") },
                        { id: "Advanced", label: t("Nâng cao", "Hard") },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setDifficultyFilter(tab.id)}
                        className={`py-1 px-1.5 text-center transition-colors ${
                          difficultyFilter === tab.id
                            ? "bg-surface text-brand font-semibold"
                            : "bg-subtle text-secondary hover:text-primary"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Selector List (Exposed 1px dividers) */}
            {leftSectionMode === "SPLIT" && (
              <div className="max-h-52 overflow-y-auto divide-y divide-grid border-b border-grid shrink-0">
                {filteredAssignments.map((rawItem, idx) => {
                  const item = localizeAssignment(rawItem, lang);
                  const isSelected = selectedAssignment?.id === item.id;
                  const sub = userSubmissionsMap[item.id];
                  const glyph = item.glyph || GLYPHS[idx % GLYPHS.length];
                  const lessonMeta = PYTHON_CURRICULUM_LESSONS.find(
                    (l) => l.id === rawItem.lessonId
                  );

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectAssignment(rawItem)}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-subtle border-l-2 border-l-brand"
                          : "bg-surface hover:bg-subtle/60"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span
                          className={`font-mono text-sm mt-0.5 ${
                            isSelected ? "text-brand" : "text-muted"
                          }`}
                        >
                          {glyph}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-primary truncate">
                            {item.title}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-[10px]">
                            {lessonMeta && (
                              <>
                                <span className="px-1.5 py-0.2 bg-brand/10 border border-brand/30 text-brand font-semibold">
                                  {lessonMeta.code}
                                </span>
                                <span className="text-muted">•</span>
                              </>
                            )}
                            <span
                              className={` ${
                                item.difficulty === "Beginner"
                                  ? "text-success"
                                  : item.difficulty === "Intermediate"
                                  ? "text-warn"
                                  : "text-brand"
                              }`}
                            >
                              {localizeDifficulty(item.difficulty, lang)}
                            </span>
                            <span className="text-muted">•</span>
                            <span className="text-muted">
                              {item.testCases.length}{" "}
                              {t("Test chấm", "Tests")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submission Status Badge */}
                      <div className="font-mono text-[10px] shrink-0 mt-0.5">
                        {sub?.status === "passed" ? (
                          <span className="px-1.5 py-0.5 bg-success/10 text-success border border-success/30 font-semibold">
                            ✓ {t("Đạt", "Passed")}
                          </span>
                        ) : sub?.status === "failed" ? (
                          <span className="px-1.5 py-0.5 bg-brand/10 text-brand border border-brand/30">
                            ✕ {t("Chưa đạt", "Failed")}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-subtle text-muted border border-grid">
                            ○ {t("Mới", "Todo")}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Problem Description */}
            <div
              className={`flex-1 overflow-y-auto p-5 space-y-5 ${
                antiPasteEnabled ? "select-none" : ""
              }`}
              onCopy={(e) => {
                if (antiPasteEnabled) {
                  e.preventDefault();
                  pushToast(
                    "⚠️ Chế độ chống gian lận: Đã khóa tính năng sao chép đề bài nhằm khuyến khích học sinh tự đọc hiểu và làm bài!",
                    "warn"
                  );
                }
              }}
              onContextMenu={(e) => {
                if (antiPasteEnabled) {
                  e.preventDefault();
                }
              }}
              onDragStart={(e) => {
                if (antiPasteEnabled) {
                  e.preventDefault();
                }
              }}
            >
              {localizedSelected ? (
                <>
                  <div className="border-b border-grid pb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <SectionBadge
                        glyph={localizedSelected.glyph || "◆"}
                        label={`${t("Mức độ", "Level")}: ${localizeDifficulty(
                          localizedSelected.difficulty,
                          lang
                        )}`}
                        className="mb-0"
                      />
                      <span
                        className={`font-mono text-[11px] px-2 py-0.5 border ${
                          submissionStatus === "passed"
                            ? "border-success/40 bg-success/10 text-success"
                            : "border-grid bg-subtle text-secondary"
                        }`}
                      >
                        {formatStatusLabel(submissionStatus)}
                      </span>
                    </div>
                    <h1 className="text-lg font-semibold text-primary tracking-tight">
                      {localizedSelected.title}
                    </h1>
                  </div>

                  {/* Markdown Problem Statement */}
                  <MarkdownRenderer content={localizedSelected.description} />

                  {/* Public Sample Input / Output Blocks */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-xs text-secondary flex items-center justify-between">
                      <span>
                        [▣]{" "}
                        {t("Ví dụ input / output mẫu", "Sample input / output")}
                      </span>
                      <span className="text-muted">
                        +{hiddenTestCount} {t("Test ẩn", "Hidden")}
                      </span>
                    </div>

                    {publicTestCases.map((tc, i) => (
                      <div
                        key={i}
                        className="neo-box-sm bg-subtle font-mono text-xs overflow-hidden"
                      >
                        <div className="px-3 py-1.5 border-b border-grid flex items-center justify-between text-[11px] text-secondary bg-surface">
                          <span className="font-semibold text-primary">
                            {t(`Ví dụ mẫu #${i + 1}`, `Example #${i + 1}`)}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tc.input);
                            }}
                            className="text-brand hover:underline"
                          >
                            {t("Sao chép input", "Copy input")}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 bg-grid gap-[1px]">
                          <div className="bg-surface p-3">
                            <div className="text-[10px] text-muted mb-1">
                              {t("Dữ liệu nhập (input)", "Input")}
                            </div>
                            <pre className="text-primary whitespace-pre-wrap">
                              {tc.input || t("(trống)", "(empty)")}
                            </pre>
                          </div>
                          <div className="bg-surface p-3">
                            <div className="text-[10px] text-muted mb-1">
                              {t("Kết quả in ra (output)", "Expected output")}
                            </div>
                            <pre className="text-emerald-500 whitespace-pre-wrap">
                              {tc.expectedOutput}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="font-mono text-xs text-muted">
                  {t(
                    "Chọn một bài tập để bắt đầu...",
                    "Select an assignment to begin..."
                  )}
                </div>
              )}
            </div>
          </Panel>

          {/* 1px Vertical Structural Hairline Handle */}
          <PanelResizeHandle className="w-[1px] bg-grid hover:bg-brand transition-colors cursor-col-resize" />
        </>
      )}

      {/* CENTER + RIGHT/BOTTOM PANES: Monaco Editor & Interactive Terminal */}
      <Panel defaultSize={isLeftPaneOpen ? 50 : 100} minSize={25} className="min-w-0">
        <PanelGroup direction="vertical" className="h-full w-full">
              {/* CENTER PANE: Monaco Code Editor */}
              <Panel
                defaultSize={62}
                minSize={28}
                className="bg-terminal flex flex-col"
              >
                {/* Row 1: Primary Editor Action Toolbar (Responsive for high browser zoom / scaling) */}
                <div className="min-h-[44px] h-auto py-1.5 px-3 bg-surface border-b border-grid flex flex-wrap items-center justify-between font-mono text-xs shrink-0 gap-1.5 sm:gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
                    {/* Nút Thu gọn / Mở rộng Đề bài */}
                    <button
                      type="button"
                      onClick={toggleLeftPane}
                      title={
                        isLeftPaneOpen
                          ? t("Thu gọn đề bài để mở rộng khung code", "Collapse problem panel")
                          : t("Mở lại đề bài tập", "Show problem panel")
                      }
                      className="neo-btn px-2.5 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <span className="text-brand font-bold">{isLeftPaneOpen ? "◀" : "▶"}</span>
                      <span className="font-semibold text-xs">
                        {isLeftPaneOpen ? t("Ẩn đề", "Hide problem") : t("Xem đề", "Show problem")}
                      </span>
                    </button>

                    <span className="px-2.5 py-1 bg-subtle border border-grid text-primary font-semibold hidden md:inline shrink-0">
                      🐍 bai_lam.py
                    </span>

                    {/* Bộ công cụ Zoom / Chỉnh cỡ chữ */}
                    <div className="flex items-center border border-grid bg-subtle shrink-0">
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        disabled={editorFontSize <= 10}
                        title={t("Thu nhỏ cỡ chữ (A-)", "Zoom out code font size (A-)")}
                        className="px-2 py-1 text-secondary hover:text-primary hover:bg-surface border-r border-grid disabled:opacity-30 font-bold transition-colors"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={handleResetZoom}
                        title={t(
                          "Cỡ chữ hiện tại - Bấm để đặt lại về 14px",
                          "Current font size - Click to reset to 14px"
                        )}
                        className="px-2 py-1 text-primary hover:text-brand font-semibold text-[11px] min-w-[38px] text-center transition-colors"
                      >
                        {editorFontSize}px
                      </button>
                      <button
                        type="button"
                        onClick={handleZoomIn}
                        disabled={editorFontSize >= 32}
                        title={t("Phóng to cỡ chữ (A+)", "Zoom in code font size (A+)")}
                        className="px-2 py-1 text-secondary hover:text-primary hover:bg-surface border-l border-grid disabled:opacity-30 font-bold transition-colors"
                      >
                        A+
                      </button>
                    </div>

                    {/* Nút Sổ tay hàm Python */}
                    <button
                      type="button"
                      onClick={() => setCheatSheetOpen(true)}
                      title={t("Mở sổ tay tra cứu hàm Python cơ bản", "Open Python Cheat Sheet")}
                      className="px-2.5 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>📖</span>
                      <span className="hidden sm:inline">{t("Sổ tay hàm", "Cheat sheet")}</span>
                    </button>
                  </div>

                  {/* Primary Execution & Cloud Actions */}
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleRunCode}
                      disabled={engineState === "initializing"}
                      title={t("Chạy thử chương trình (Ctrl+Enter)", "Run program (Ctrl+Enter)")}
                      className="btn btn-sm btn-success"
                    >
                      <Play size={15} fill="currentColor" />
                      <span>{t("Chạy thử", "Run")}</span>
                    </button>

                    <button
                      onClick={handleSubmitAndGrade}
                      disabled={isGrading || engineState === "initializing"}
                      title={t("Nộp bài và chấm điểm tự động", "Submit and auto-grade")}
                      className="btn btn-sm btn-primary"
                    >
                      {isGrading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      <span>{isGrading ? t("Đang chấm...", "Grading...") : t("Nộp bài", "Submit")}</span>
                    </button>

                    <button
                      onClick={isTracing ? handleStopTracing : handleInitiateTrace}
                      disabled={engineState === "initializing" || isTraceLoading}
                      title={t("Chạy từng dòng và xem giá trị biến thay đổi", "Step through code and watch variables")}
                      className={`btn btn-sm ${isTracing ? "bg-warn-soft text-warn" : "btn-secondary"}`}
                    >
                      {isTraceLoading ? <Loader2 size={15} className="animate-spin" /> : <ScanSearch size={15} />}
                      <span>
                        {isTraceLoading
                          ? t("Đang nạp...", "Loading...")
                          : isTracing
                          ? t("Thoát soi biến", "Exit tracer")
                          : t("Soi biến", "Trace")}
                      </span>
                    </button>

                    <span className="w-px h-6 bg-grid mx-0.5" aria-hidden />

                    <button
                      onClick={() => {
                        stopExecution();
                        handleStopTracing();
                      }}
                      title={t("Dừng chương trình ngay (khi bị lặp vô hạn)", "Stop the program now")}
                      aria-label={t("Dừng", "Stop")}
                      className="btn btn-sm btn-ghost hover:!text-danger"
                    >
                      <Square size={14} fill="currentColor" />
                      <span className="hidden xl:inline">{t("Dừng", "Stop")}</span>
                    </button>

                    <button
                      onClick={handleResetCode}
                      title={t("Đặt lại về code ban đầu", "Reset to starter code")}
                      aria-label={t("Làm lại", "Reset")}
                      className="btn btn-sm btn-ghost"
                    >
                      <RotateCcw size={15} />
                      <span className="hidden xl:inline">{t("Làm lại", "Reset")}</span>
                    </button>

                    <button
                      onClick={handleManualSave}
                      title={t("Lưu bài làm", "Save code")}
                      aria-label={t("Lưu", "Save")}
                      className="btn btn-sm btn-ghost"
                    >
                      <Save size={15} />
                      <span className="hidden xl:inline">{t("Lưu", "Save")}</span>
                    </button>
                  </div>
                </div>

                {/* Monaco Editor Surface with Active IntelliSense & Parameter Hints */}
                <div
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex-1 relative overflow-hidden bg-surface"
                >
                  <Editor
                    height="100%"
                    language="python"
                    theme={
                      theme === "dark"
                        ? "chroma-carbon-dark"
                        : "chroma-carbon-light"
                    }
                    value={code}
                    onChange={(val) => setCode(val ?? "")}
                    onMount={handleEditorMount}
                    options={{
                      // Disable Chrome EditContext bug so Spacebar & Vietnamese Unikey/Telex work 100% smoothly
                      editContext: false,
                      fontSize: editorFontSize,
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      fontLigatures: false,
                      lineHeight: Math.round(editorFontSize * 1.6),
                      mouseWheelZoom: true,
                      minimap: { enabled: false },
                      glyphMargin: true,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 4,
                      insertSpaces: true,
                      bracketPairColorization: { enabled: true },
                      padding: { top: 14, bottom: 14 },
                      renderLineHighlight: "all",
                      cursorBlinking: "smooth",
                      smoothScrolling: true,
                      // Full IntelliSense & Function Suggestion Settings
                      quickSuggestions: {
                        other: true,
                        comments: false,
                        strings: true,
                      },
                      quickSuggestionsDelay: 10,
                      suggestOnTriggerCharacters: true,
                      acceptSuggestionOnCommitCharacter: false,
                      acceptSuggestionOnEnter: "on",
                      tabCompletion: "on",
                      wordBasedSuggestions: "currentDocument",
                      parameterHints: {
                        enabled: true,
                        cycle: true,
                      },
                      suggest: {
                        showFunctions: true,
                        showKeywords: true,
                        showSnippets: true,
                        showMethods: true,
                        showVariables: true,
                        preview: false,
                        filterGraceful: true,
                        localityBonus: true,
                        shareSuggestSelections: true,
                      },
                    }}
                  />
                </div>
              </Panel>

              {/* 1px Horizontal Structural Hairline Handle */}
              <PanelResizeHandle className="h-[1px] bg-grid hover:bg-brand transition-colors cursor-row-resize" />

              {/* BOTTOM PANE: Interactive Terminal & Test Suite Results */}
              <Panel
                defaultSize={38}
                minSize={20}
                className="bg-terminal text-primary flex flex-col"
              >
                {/* Terminal Header Tabs (Responsive for high browser zoom / scaling) */}
                <div className="min-h-[44px] h-auto py-1.5 px-3 bg-subtle border-b border-grid flex flex-wrap items-center justify-between text-xs shrink-0 gap-1.5">
                  <div role="tablist" className="flex flex-wrap items-center gap-1 shrink-0">
                    {(
                      [
                        { id: "CONSOLE", icon: TerminalSquare, label: t("Kết quả chạy", "Output") },
                        { id: "TEST_CASES", icon: ListChecks, label: t("Chấm điểm", "Tests") },
                        { id: "TRACER", icon: ScanSearch, label: t("Soi biến", "Tracer") },
                      ] as const
                    ).map(({ id, icon: Icon, label }) => {
                      const active = activeBottomTab === id;
                      return (
                        <button
                          key={id}
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveBottomTab(id)}
                          className={`h-8 px-3 text-[13px] font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                            active
                              ? "bg-surface text-primary shadow-card"
                              : "text-secondary hover:text-primary"
                          }`}
                        >
                          <Icon size={15} className={active ? "text-brand" : ""} />
                          <span>{label}</span>
                          {id === "CONSOLE" && engineState === "awaiting_input" && (
                            <span className="chip chip-brand animate-pulse !py-0">
                              {t("Chờ nhập", "Input")}
                            </span>
                          )}
                          {id === "TEST_CASES" && testResults && testResults.length > 0 && (
                            <span
                              className={`chip !py-0 tabular-nums ${
                                testResults.every((r) => r.passed) ? "chip-success" : "chip-danger"
                              }`}
                            >
                              {testResults.filter((r) => r.passed).length}/{testResults.length}
                            </span>
                          )}
                          {id === "TRACER" && isTracing && (
                            <span className="chip chip-warn !py-0 tabular-nums">
                              {currentStepIdx + 1}/{traceSteps.length}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-muted shrink-0">
                    <span className="hidden lg:inline">
                      {t(
                        "Gõ lệnh tự gợi ý hàm • Ctrl+Enter để chạy",
                        "Function hints enabled • Ctrl+Enter to run"
                      )}
                    </span>
                    <button onClick={clearConsole} className="btn btn-ghost btn-sm h-8">
                      <Eraser size={14} />
                      {t("Xoá màn hình", "Clear")}
                    </button>
                  </div>
                </div>

                {/* Tab 1: Interactive Console Output + Stdin Input Prompt */}
                {activeBottomTab === "CONSOLE" && (
                  <div className="flex-1 overflow-y-auto p-4 font-code text-[13px] leading-relaxed space-y-1 bg-terminal">
                    {/* Feature 4: Friendly Error Translator Banner */}
                    {translatedError && (
                      <div className="mb-4 p-3.5 bg-danger-soft border border-danger/30 rounded-[12px] font-sans animate-in fade-in duration-200">
                        <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-danger/20">
                          <div className="flex flex-wrap items-center gap-2 font-mono">
                            <span className="px-1.5 py-0.5 bg-danger text-white rounded font-bold text-[10px]">
                              🎯 Giải thích lỗi
                            </span>
                            <span className="text-danger font-bold text-xs">
                              {translatedError.titleVi}
                            </span>
                            {translatedError.lineNumber && (
                              <span className="px-2 py-0.5 bg-brand/20 border border-brand/40 text-danger text-[10px] font-semibold">
                                DÒNG {translatedError.lineNumber}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {translatedError.lineNumber && (
                              <button
                                onClick={() => handleJumpToLine(translatedError.lineNumber!)}
                                className="px-2.5 py-1 bg-danger text-white rounded text-[11px] font-mono font-semibold hover:opacity-90 transition-opacity flex items-center gap-1"
                              >
                                <span>🔍</span>
                                <span>Xem dòng {translatedError.lineNumber} trong Code</span>
                              </button>
                            )}
                            <button
                              onClick={() => setTranslatedError(null)}
                              title={t("Đóng hộp giải thích lỗi", "Dismiss")}
                              className="text-muted hover:text-primary px-1.5 py-0.5 text-xs font-mono"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        <div className="mt-2.5 space-y-2 text-xs">
                          <p className="text-primary leading-relaxed">
                            <span className="font-semibold text-danger">📌 Giải thích chi tiết: </span>
                            {translatedError.descriptionVi}
                          </p>

                          <div className="p-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 font-mono text-[11px] leading-relaxed">
                            <span className="font-bold text-success">💡 Gợi ý khắc phục: </span>
                            {translatedError.suggestionVi}
                          </div>

                          {(translatedError.wrongExample || translatedError.correctExample) && (
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[11px]">
                              {translatedError.wrongExample && (
                                <div className="p-2 bg-black/40 border border-brand/30">
                                  <div className="text-danger font-bold mb-1">✕ Code chưa đúng:</div>
                                  <pre className="text-muted whitespace-pre-wrap">{translatedError.wrongExample}</pre>
                                </div>
                              )}
                              {translatedError.correctExample && (
                                <div className="p-2 bg-black/40 border border-emerald-500/40">
                                  <div className="text-emerald-400 font-bold mb-1">✓ Nên sửa thành:</div>
                                  <pre className="text-success whitespace-pre-wrap">{translatedError.correctExample}</pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {consoleLogs.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-muted select-none shrink-0 text-[11px]">
                          [{entry.timestamp}]
                        </span>
                        <pre
                          className={`whitespace-pre-wrap break-all font-mono flex-1 ${
                            entry.type === "stderr"
                              ? "text-brand"
                              : entry.type === "success"
                              ? "text-emerald-500"
                              : entry.type === "system"
                              ? "text-muted font-semibold"
                              : entry.type === "stdin-prompt"
                              ? "text-amber-500"
                              : entry.type === "stdin-echo"
                              ? "text-sky-500"
                              : "text-primary"
                          }`}
                        >
                          {entry.text}
                        </pre>
                      </div>
                    ))}

                    {/* Interactive input() Form when Python blocks on input() */}
                    {inputPrompt !== null && (
                      <form
                        onSubmit={handleStdinSubmit}
                        className="mt-3 p-3 bg-subtle border-2 border-brand flex items-center gap-2"
                      >
                        <span className="text-brand font-semibold shrink-0">
                          {t("Nhập dữ liệu cho input() >", "STDIN >")}
                        </span>
                        <input
                          ref={stdinInputRef}
                          type="text"
                          value={stdinValue}
                          onChange={(e) => setStdinValue(e.target.value)}
                          placeholder={
                            inputPrompt
                              ? `${inputPrompt} ${t(
                                  "(Nhập giá trị rồi nhấn Enter)",
                                  "(Type value and press Enter)"
                                )}`
                              : t(
                                  "Nhập giá trị từ bàn phím rồi nhấn Enter (VD: 100)...",
                                  "Type input value and press Enter..."
                                )
                          }
                          className="flex-1 bg-surface border border-grid px-3 py-1 font-mono text-xs text-primary focus:outline-none focus:border-brand"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-1 bg-brand text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                        >
                          {t("Gửi dữ liệu [↵]", "Send [↵]")}
                        </button>
                      </form>
                    )}

                    <div ref={consoleEndRef} />
                  </div>
                )}

                {/* Tab 2: Automated Test Case Execution Results Table */}
                {activeBottomTab === "TEST_CASES" && (
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-terminal">
                    {!testResults ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-grid bg-subtle/50">
                        <div className="text-brand text-base mb-2">[◆]</div>
                        <div className="text-primary font-semibold mb-1">
                          {t(
                            "Bạn chưa chấm điểm bài tập này",
                            "No grading results yet"
                          )}
                        </div>
                        <p className="text-secondary max-w-md mb-4">
                          {t("Hãy nhấn nút ", "Click ")}
                          <span className="text-brand font-semibold">
                            {t("✓ Nộp bài & chấm điểm", "✓ Submit & grade")}
                          </span>{" "}
                          {t(
                            `để hệ thống tự động kiểm tra bài làm của bạn với ${
                              localizedSelected?.testCases.length || 0
                            } bộ dữ liệu mẫu.`,
                            `to test your program against all ${
                              localizedSelected?.testCases.length || 0
                            } test cases.`
                          )}
                        </p>
                        <button
                          onClick={handleSubmitAndGrade}
                          className="px-5 py-2.5 bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                          [✓]{" "}
                          {t(
                            "Chấm điểm bài làm ngay",
                            "Grade my solution now"
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Summary Banner */}
                        <div className="neo-box-sm flex flex-wrap items-center justify-between gap-2 p-3 bg-subtle">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-sm font-semibold ${
                                testResults.every((r) => r.passed)
                                  ? "text-emerald-500"
                                  : "text-brand"
                              }`}
                            >
                              {testResults.every((r) => r.passed)
                                ? t(
                                    "🎉 Chúc mừng! bạn đã làm đúng tất cả các test!",
                                    "🎉 Congratulations! all test cases passed!"
                                  )
                                : t(
                                    "✕ Một số test chưa đúng, hãy kiểm tra lại kết quả bên dưới",
                                    "✕ Some test cases failed, check details below"
                                  )}
                            </span>
                            <span className="text-grid-strong">|</span>
                            <span className="text-secondary font-semibold">
                              {t("Điểm đạt:", "SCORE:")}{" "}
                              <strong className="text-primary">
                                {testResults.filter((r) => r.passed).length} /{" "}
                                {testResults.length}
                              </strong>
                            </span>
                          </div>
                          <span className="text-muted">
                            {t("Thời gian chạy:", "TIME:")}{" "}
                            {testResults
                              .reduce((acc, r) => acc + r.durationMs, 0)
                              .toFixed(1)}
                            ms
                          </span>
                        </div>

                        {/* Top Wrong Answer Diagnostic Highlight */}
                        {(() => {
                          const firstFailed = testResults.find(
                            (r) => !r.passed && !r.isHidden && !r.stderr
                          );
                          if (!firstFailed) return null;
                          const diag = diagnose(
                            firstFailed.expectedOutput,
                            firstFailed.actualOutput
                          );
                          return (
                            <div className="neo-box-sm p-3 bg-amber-500/10 border-amber-500/40 text-xs font-sans flex items-start gap-2.5">
                              <span className="text-amber-500 font-bold text-sm shrink-0">
                                💡
                              </span>
                              <div>
                                <div className="font-bold text-amber-400">
                                  Chẩn đoán nhanh (Test #{firstFailed.index}):{" "}
                                  {diag.titleVi}
                                </div>
                                <p className="text-secondary mt-0.5">
                                  {diag.messageVi}
                                </p>
                                {diag.suggestionVi && (
                                  <p className="text-emerald-400 font-mono text-[11px] mt-1">
                                    ↳ Gợi ý: {diag.suggestionVi}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Technical Results Table */}
                        <div className="neo-box-sm overflow-hidden divide-y divide-grid">
                          <div className="grid grid-cols-12 bg-subtle px-3 py-2 text-[11px] text-muted">
                            <div className="col-span-2">
                              {t("Bộ test", "Test")}
                            </div>
                            <div className="col-span-2">
                              {t("Kết quả", "Status")}
                            </div>
                            <div className="col-span-3">
                              {t("Dữ liệu vào (input)", "Input")}
                            </div>
                            <div className="col-span-2">
                              {t("Đáp án đúng", "Expected")}
                            </div>
                            <div className="col-span-2">
                              {t("Code của bạn in ra", "Your output")}
                            </div>
                            <div className="col-span-1 text-right">
                              {t("Tốc độ", "Time")}
                            </div>
                          </div>

                          {testResults.map((res) => (
                            <div
                              key={res.index}
                              className="grid grid-cols-12 px-3 py-2.5 items-start gap-2 text-xs bg-surface"
                            >
                              <div className="col-span-2 flex items-center gap-1.5 text-primary">
                                <span>Test #{res.index}</span>
                                {res.isHidden && (
                                  <span className="px-1 py-0.2 bg-subtle border border-grid text-muted text-[10px]">
                                    {t("Ẩn", "Hidden")}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-2">
                                {res.passed ? (
                                  <span className="text-emerald-500 font-semibold">
                                    ✓ {t("Đúng", "Pass")}
                                  </span>
                                ) : (
                                  <span className="text-brand font-semibold">
                                    ✕ {t("Chưa đúng", "Fail")}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-3 text-secondary whitespace-pre-wrap break-all font-mono">
                                {res.isHidden
                                  ? t("[Test ẩn của giáo viên]", "[Hidden Test]")
                                  : res.input || t("(trống)", "(empty)")}
                              </div>

                              <div className="col-span-2 text-emerald-500 whitespace-pre-wrap break-all font-mono">
                                {res.isHidden
                                  ? t("[Đã ẩn]", "[Hidden]")
                                  : res.expectedOutput}
                              </div>

                              <div className="col-span-2 whitespace-pre-wrap break-all">
                                {res.stderr ? (
                                  <span className="text-brand font-mono">
                                    {res.stderr.split("\n").slice(-1)[0]}
                                  </span>
                                ) : res.isHidden ? (
                                  <span className="text-muted font-mono">
                                    {res.passed
                                      ? t("Khớp đáp án", "Matched")
                                      : t("Khác đáp án", "Mismatch")}
                                  </span>
                                ) : (
                                  <div>
                                    <span
                                      className={
                                        res.passed
                                          ? "text-primary font-mono"
                                          : "text-brand font-mono font-semibold"
                                      }
                                    >
                                      {res.actualOutput ||
                                        t("(chưa in gì)", "(no output)")}
                                    </span>
                                    {!res.passed &&
                                      (() => {
                                        const diag = diagnose(
                                          res.expectedOutput,
                                          res.actualOutput
                                        );
                                        return (
                                          <div className="mt-1.5 p-1.5 bg-amber-500/10 border-l-2 border-amber-500 font-sans text-[11px] leading-relaxed">
                                            <div className="font-bold text-amber-400">
                                              💡 {diag.titleVi}
                                            </div>
                                            <p className="text-secondary mt-0.5 text-[10px]">
                                              {diag.messageVi}
                                            </p>
                                          </div>
                                        );
                                      })()}
                                  </div>
                                )}
                              </div>

                              <div className="col-span-1 text-right text-emerald-500 font-mono">
                                {res.durationMs}ms
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Step-by-Step Variable Tracer */}
                {activeBottomTab === "TRACER" && (
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-terminal flex flex-col">
                    {!isTracing || traceSteps.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-grid bg-subtle/40">
                        <div className="text-amber-500 text-3xl mb-3">🔍</div>
                        <div className="text-primary font-bold text-sm mb-1">
                          {t(
                            "Chế độ trực quan hóa biến theo từng dòng (variable tracer)",
                            "Step-by-step variable tracer"
                          )}
                        </div>
                        <p className="text-secondary max-w-md text-xs mb-4 leading-relaxed font-sans">
                          {t(
                            "Theo dõi trực tiếp sự biến đổi giá trị của từng biến (i, s, list...) qua mỗi vòng lặp và câu lệnh, giúp hiểu sâu bản chất thuật toán.",
                            "Inspect variable mutations line-by-line through loops and statements to understand the algorithm deeply."
                          )}
                        </p>
                        <button
                          onClick={handleInitiateTrace}
                          disabled={engineState === "initializing" || isTraceLoading}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors flex items-center gap-2"
                        >
                          <span>{isTraceLoading ? "◐" : "▶"}</span>
                          <span>
                            {isTraceLoading
                              ? t("Đang nạp bước...", "TRACING...")
                              : t("Bắt đầu chạy từng bước", "Start tracing")}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col gap-3 min-h-0">
                        {/* Tracer Toolbar / Playback Controls */}
                        <div className="p-2.5 bg-subtle border border-grid flex flex-wrap items-center justify-between gap-3 shrink-0">
                          {/* Navigation Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={handleFirstStep}
                              disabled={currentStepIdx === 0}
                              title={t("Về bước đầu tiên", "First step")}
                              className="px-2 py-1 bg-surface border border-grid hover:border-amber-500 disabled:opacity-30 text-xs"
                            >
                              ⏮
                            </button>
                            <button
                              onClick={handlePrevStep}
                              disabled={currentStepIdx === 0}
                              title={t("Lùi 1 bước", "Previous step")}
                              className="px-2.5 py-1 bg-surface border border-grid hover:border-amber-500 disabled:opacity-30 text-xs font-bold"
                            >
                              ◀ {t("Lùi", "Prev")}
                            </button>
                            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-500 font-bold text-xs">
                              {t("Bước", "Step")} {currentStepIdx + 1} / {traceSteps.length}
                            </div>
                            <button
                              onClick={handleNextStep}
                              disabled={currentStepIdx === traceSteps.length - 1}
                              title={t("Tiến 1 bước", "Next step")}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold disabled:opacity-30 text-xs"
                            >
                              {t("Tiếp", "Next")} ▶
                            </button>
                            <button
                              onClick={handleLastStep}
                              disabled={currentStepIdx === traceSteps.length - 1}
                              title={t("Đến bước cuối cùng", "Last step")}
                              className="px-2 py-1 bg-surface border border-grid hover:border-amber-500 disabled:opacity-30 text-xs"
                            >
                              ⏭
                            </button>
                          </div>

                          {/* Auto-Play Toggle & Speed Control */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (currentStepIdx === traceSteps.length - 1) {
                                  setCurrentStepIdx(0);
                                }
                                setIsAutoPlaying((prev) => !prev);
                              }}
                              className={`px-3 py-1 font-bold text-xs flex items-center gap-1.5 transition-colors ${
                                isAutoPlaying
                                  ? "bg-red-600 text-white animate-pulse"
                                  : "bg-surface border border-grid hover:border-amber-500 text-primary"
                              }`}
                            >
                              <span>{isAutoPlaying ? "⏸" : "⏯"}</span>
                              <span>
                                {isAutoPlaying
                                  ? t("Tạm dừng", "Pause")
                                  : t("Tự động chạy", "Auto play")}
                              </span>
                            </button>

                            <select
                              value={traceSpeedMs}
                              onChange={(e) => setTraceSpeedMs(Number(e.target.value))}
                              className="bg-surface border border-grid px-2 py-1 text-xs text-primary focus:outline-none"
                            >
                              <option value={1500}>0.7x (1.5s)</option>
                              <option value={1000}>1.0x (1.0s)</option>
                              <option value={500}>2.0x (0.5s)</option>
                            </select>

                            <button
                              onClick={handleStopTracing}
                              className="px-2.5 py-1 bg-surface border border-grid hover:border-brand text-muted hover:text-brand transition-colors text-xs"
                            >
                              ✕ {t("Thoát", "Exit")}
                            </button>
                          </div>
                        </div>

                        {/* Active Statement Banner */}
                        {(() => {
                          const currentStep = traceSteps[currentStepIdx];
                          const lines = code.split(/\r?\n/);
                          const activeLineContent =
                            currentStep && currentStep.line <= lines.length
                              ? lines[currentStep.line - 1]
                              : "";
                          return (
                            <div className="px-3 py-2 bg-subtle border-l-4 border-l-amber-500 border border-grid flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 truncate">
                                <span className="px-1.5 py-0.5 bg-amber-500 text-black font-bold text-[10px]">
                                  DÒNG {currentStep?.line}
                                </span>
                                <span className="text-secondary font-mono text-xs">
                                  {activeLineContent.trim() || t("(kết thúc chương trình)", "(program exit)")}
                                </span>
                              </div>
                              <span className="text-muted text-[11px] shrink-0">
                                {currentStep?.event === "return" ? "✓ RETURN" : "▶ EXECUTING"}
                              </span>
                            </div>
                          );
                        })()}

                        {/* Split Inspector: Variable Watcher on Left, Stdout on Right */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
                          {/* Variables Watcher Table (2 cols) */}
                          <div className="lg:col-span-2 border border-grid bg-surface flex flex-col overflow-hidden">
                            <div className="h-8 px-3 bg-subtle border-b border-grid flex items-center justify-between font-bold text-[11px] text-secondary">
                              <span>📊 Bảng theo dõi giá trị biến</span>
                              <span className="text-muted text-[10px]">
                                {Object.keys(traceSteps[currentStepIdx]?.variables || {}).length} BIẾN
                              </span>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                              {(() => {
                                const currentStep = traceSteps[currentStepIdx];
                                const prevStep = currentStepIdx > 0 ? traceSteps[currentStepIdx - 1] : null;
                                const vars = currentStep?.variables || {};
                                const varEntries = Object.entries(vars);

                                if (varEntries.length === 0) {
                                  return (
                                    <div className="p-6 text-center text-muted">
                                      {t(
                                        "(Chưa có biến nào được gán ở bước này. Bấm [TIẾP ▶] để chạy qua các dòng tiếp theo)",
                                        "(No variables declared yet in this scope. Click [NEXT ▶] to advance)"
                                      )}
                                    </div>
                                  );
                                }

                                return (
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="border-b border-grid bg-subtle/50 text-[10px] text-muted">
                                        <th className="px-3 py-1.5">Tên biến</th>
                                        <th className="px-3 py-1.5">Kiểu (Type)</th>
                                        <th className="px-3 py-1.5">Giá trị hiện thời (Value)</th>
                                        <th className="px-3 py-1.5 text-right">Trạng thái</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-grid">
                                      {varEntries.map(([vName, vInfo]) => {
                                        const prevVal = prevStep?.variables?.[vName]?.value;
                                        const isChanged = !prevStep || prevVal === undefined || prevVal !== vInfo.value;

                                        return (
                                          <tr
                                            key={vName}
                                            className={`transition-colors ${
                                              isChanged
                                                ? "bg-amber-500/10 font-semibold"
                                                : "hover:bg-subtle/40"
                                            }`}
                                          >
                                            <td className="px-3 py-2 text-primary font-bold">
                                              {vName}
                                            </td>
                                            <td className="px-3 py-2">
                                              <span
                                                className={`px-1.5 py-0.5 border text-[10px] font-mono ${
                                                  vInfo.type === "int"
                                                    ? "bg-amber-500/20 text-amber-500 border-amber-500/40"
                                                    : vInfo.type === "str"
                                                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                                    : vInfo.type === "list"
                                                    ? "bg-sky-500/20 text-sky-400 border-sky-500/40"
                                                    : vInfo.type === "float"
                                                    ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                                                    : vInfo.type === "bool"
                                                    ? "bg-pink-500/20 text-pink-400 border-pink-500/40"
                                                    : "bg-subtle text-secondary border-grid"
                                                }`}
                                              >
                                                {vInfo.type}
                                              </span>
                                            </td>
                                            <td className="px-3 py-2 font-mono text-primary break-all">
                                              {vInfo.value}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                              {isChanged ? (
                                                <span className="px-1.5 py-0.5 bg-amber-500 text-black font-bold text-[10px] animate-pulse">
                                                  ● MỚI ĐỔI
                                                </span>
                                              ) : (
                                                <span className="text-muted text-[10px]">
                                                  giữ nguyên
                                                </span>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                );
                              })()}
                            </div>
                          </div>

                          {/* Stdout Console Output at this step (1 col) */}
                          <div className="border border-grid bg-surface flex flex-col overflow-hidden">
                            <div className="h-8 px-3 bg-subtle border-b border-grid flex items-center justify-between font-bold text-[11px] text-secondary">
                              <span>🖥️ OUTPUT IN RA TÍNH ĐẾN BƯỚC NÀY</span>
                            </div>
                            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs whitespace-pre-wrap text-emerald-400 bg-black/30">
                              {traceSteps[currentStepIdx]?.stdout ? (
                                traceSteps[currentStepIdx].stdout
                              ) : (
                                <span className="text-muted italic">
                                  {t("(Chưa có lệnh print nào in ra kết quả)", "(No print output produced yet)")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {/* Student Python Function Reference Modal */}
      <PythonCheatSheetModal
        isOpen={cheatSheetOpen}
        onClose={() => setCheatSheetOpen(false)}
        onInsertSnippet={handleInsertSnippetIntoEditor}
      />

      {/* Modal: Input values for Step-by-Step Tracer */}
      {traceInputModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-surface border-2 border-amber-500 shadow-2xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-grid">
              <div className="flex items-center gap-2 font-bold text-amber-500 text-sm">
                <span>🔍</span>
                <span>DỮ LIỆU ĐẦU VÀO CHO CHẠY TỪNG BƯỚC</span>
              </div>
              <button
                onClick={() => setTraceInputModalOpen(false)}
                className="text-muted hover:text-primary text-base px-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-3 font-sans text-secondary text-xs">
              <p>
                Chương trình của em có sử dụng lệnh{" "}
                <code className="text-brand font-mono font-bold">input()</code>. Hãy
                nhập trước các giá trị đầu vào (mỗi dòng một giá trị):
              </p>

              <textarea
                rows={4}
                value={traceInputValue}
                onChange={(e) => setTraceInputValue(e.target.value)}
                placeholder={"Ví dụ:\n5\n10"}
                className="w-full bg-subtle border border-grid p-2.5 font-mono text-xs text-primary focus:outline-none focus:border-amber-500"
              />

              {selectedAssignment?.testCases?.[0] && (
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted">Gợi ý từ Test Case 1:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setTraceInputValue(selectedAssignment.testCases[0].input || "")
                    }
                    className="text-amber-500 hover:underline font-mono"
                  >
                    + Dùng dữ liệu Test 1
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-grid flex items-center justify-end gap-2 font-mono">
              <button
                onClick={() => setTraceInputModalOpen(false)}
                className="px-3 py-1.5 bg-subtle border border-grid hover:text-primary text-secondary text-xs transition-colors"
              >
                HỦY
              </button>
              <button
                onClick={() => {
                  const inputLines = traceInputValue
                    .split(/\r?\n/)
                    .map((s) => s.trimEnd());
                  executeTrace(inputLines);
                }}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
              >
                ▶ Bắt đầu chạy từng bước
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
