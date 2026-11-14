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
} from "../types/ide";
import { TopNavigationBar } from "../components/layout/TopNavigationBar";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { SectionBadge } from "../components/ui/BentoPrimitives";
import { PythonCheatSheetModal } from "../components/ui/PythonCheatSheetModal";

const GLYPHS = ["◇", "◆", "●", "◐", "▣", "◊"];

const QUICK_STUDENT_SNIPPETS = [
  {
    label: "input()",
    code: 'input()',
    tipVi: "Đọc 1 dòng chuỗi từ bàn phím",
    tipEn: "Read a string line from stdin",
  },
  {
    label: "int(input())",
    code: "n = int(input())",
    tipVi: "Đọc 1 số nguyên từ bàn phím",
    tipEn: "Read an integer from stdin",
  },
  {
    label: "float(input())",
    code: "x = float(input())",
    tipVi: "Đọc 1 số thực (thập phân) từ bàn phím",
    tipEn: "Read a float from stdin",
  },
  {
    label: "Danh sách số",
    code: "nums = [int(x) for x in input().split()]",
    tipVi: "Đọc nhiều số nguyên trên 1 dòng thành danh sách (list)",
    tipEn: "Read space-separated integers into a list",
  },
  {
    label: 'print(f"...")',
    code: 'print(f"{ket_qua}")',
    tipVi: "In biến ra màn hình với f-string",
    tipEn: "Print formatted f-string",
  },
  {
    label: "for i in range(n):",
    code: "for i in range(n):\n    print(i)",
    tipVi: "Vòng lặp chạy từ 0 đến n - 1",
    tipEn: "Loop from 0 to n - 1",
  },
  {
    label: "if / else:",
    code: "if dieu_kien:\n    pass\nelse:\n    pass",
    tipVi: "Câu lệnh điều kiện Nếu ... thì ... ngược lại ...",
    tipEn: "If / Else conditional block",
  },
  {
    label: "def ham():",
    code: "def ten_ham(tham_so):\n    return tham_so",
    tipVi: "Tạo hàm mới trong Python",
    tipEn: "Define a new Python function",
  },
];

export const StudentWorkspacePage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang, t } = useLanguage();

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
  const [leftContentTab, setLeftContentTab] = useState<"PROBLEM" | "THEORY">(
    "PROBLEM"
  );
  const [code, setCode] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("in_progress");
  const [syncBadge, setSyncBadge] = useState<string>("");
  const [activeBottomTab, setActiveBottomTab] = useState<
    "CONSOLE" | "TEST_CASES"
  >("CONSOLE");
  const [stdinValue, setStdinValue] = useState<string>("");
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [leftSectionMode, setLeftSectionMode] = useState<"SPLIT" | "PROBLEM">(
    "SPLIT"
  );
  const [cheatSheetOpen, setCheatSheetOpen] = useState<boolean>(false);

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const stdinInputRef = useRef<HTMLInputElement | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);

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

  // Load saved submission or starter code when assignment changes
  useEffect(() => {
    let active = true;
    async function loadAssignmentCode() {
      if (!selectedAssignment) return;
      isInitialLoadRef.current = true;
      setTestResults(null);

      if (user) {
        const existingSub = await getSubmission(
          user.uid,
          selectedAssignment.id
        );
        if (!active) return;
        if (existingSub) {
          setCode(existingSub.code);
          setSubmissionStatus(existingSub.status);
          const timeStr = new Date(existingSub.updatedAt)
            .toTimeString()
            .split(" ")[0];
          setSyncBadge(t(`✓ ĐÃ LƯU LÚC ${timeStr}`, `✓ SYNCED ${timeStr}`));
          setTimeout(() => {
            isInitialLoadRef.current = false;
          }, 150);
          return;
        }
      }

      if (!active) return;
      setCode(selectedAssignment.starterCode);
      setSubmissionStatus("in_progress");
      setSyncBadge(t("● ĐANG DÙNG CODE MẪU", "● STARTER TEMPLATE"));
      setTimeout(() => {
        isInitialLoadRef.current = false;
      }, 150);
    }

    loadAssignmentCode();
    return () => {
      active = false;
    };
  }, [selectedAssignment, user, setTestResults, t]);

  // Persist code helper
  const persistCodeToCloud = useCallback(
    async (
      codeToSave: string,
      overrideStatus?: SubmissionStatus,
      passedCount?: number,
      totalCount?: number
    ) => {
      if (!user || !selectedAssignment) return;
      setSyncBadge(t("◐ ĐANG LƯU BÀI...", "◐ SAVING..."));
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
      setSubmissionStatus(nextStatus);
      setUserSubmissionsMap((prev) => ({
        ...prev,
        [selectedAssignment.id]: saved,
      }));
      const stamp = new Date().toTimeString().split(" ")[0];
      setSyncBadge(t(`✓ ĐÃ LƯU ${stamp}`, `✓ SAVED ${stamp}`));
    },
    [user, selectedAssignment, submissionStatus, lastStdoutText, t]
  );

  // 10-second Auto-Save Debounce Mechanism
  useEffect(() => {
    if (isInitialLoadRef.current || !selectedAssignment || !user) return;

    setSyncBadge(
      t("● ĐÃ SỬA (TỰ LƯU SAU 10 GIÂY)", "● MODIFIED (AUTO-SAVE IN 10S)")
    );
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      persistCodeToCloud(code);
    }, 10000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [code, selectedAssignment, user, persistCodeToCloud, t]);

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

  const handleSelectAssignment = (asgn: Assignment) => {
    setSelectedAssignment(asgn);
    navigate(`/workspace/${asgn.id}`, { replace: true });
  };

  const handleRunCode = () => {
    setActiveBottomTab("CONSOLE");
    runCode(code);
  };

  const handleResetCode = () => {
    if (!selectedAssignment) return;
    setCode(selectedAssignment.starterCode);
    setTestResults(null);
    setSyncBadge(t("↺ ĐÃ KHÔI PHỤC CODE MẪU", "↺ RESET TO STARTER"));
  };

  const handleManualSave = async () => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    await persistCodeToCloud(code);
  };

  const handleSubmitAndGrade = async () => {
    if (!selectedAssignment) return;
    setIsGrading(true);
    setActiveBottomTab("TEST_CASES");

    const results = await runTests(code, selectedAssignment.testCases);
    setIsGrading(false);

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
        { token: "keyword", foreground: "FF6433", fontStyle: "bold" },
        { token: "string", foreground: "34D399" },
        { token: "number", foreground: "FBBF24" },
        { token: "comment", foreground: "71717A", fontStyle: "italic" },
        { token: "identifier", foreground: "FAFAFA" },
        { token: "type", foreground: "38BDF8" },
      ],
      colors: {
        "editor.background": "#050505",
        "editor.foreground": "#FAFAFA",
        "editorLineNumber.foreground": "#52525B",
        "editorLineNumber.activeForeground": "#FF6433",
        "editorCursor.foreground": "#FF6433",
        "editor.selectionBackground": "#FF643333",
        "editor.lineHighlightBackground": "#111111",
        "editorIndentGuide.background1": "#18181B",
        "editorIndentGuide.activeBackground1": "#3F3F46",
        "editorSuggestWidget.background": "#111111",
        "editorSuggestWidget.border": "#3F3F46",
        "editorSuggestWidget.selectedBackground": "#27272A",
        "editorSuggestWidget.highlightForeground": "#FF6433",
      },
    });

    monaco.editor.defineTheme("chroma-carbon-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "FF5722", fontStyle: "bold" },
        { token: "string", foreground: "059669" },
        { token: "number", foreground: "D97706" },
        { token: "comment", foreground: "71717A", fontStyle: "italic" },
        { token: "identifier", foreground: "09090B" },
        { token: "type", foreground: "0284C7" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#09090B",
        "editorLineNumber.foreground": "#A1A1AA",
        "editorLineNumber.activeForeground": "#FF5722",
        "editorCursor.foreground": "#FF5722",
        "editor.selectionBackground": "#FF572220",
        "editor.lineHighlightBackground": "#F4F4F5",
        "editorIndentGuide.background1": "#E4E4E7",
        "editorIndentGuide.activeBackground1": "#D4D4D8",
        "editorSuggestWidget.background": "#FFFFFF",
        "editorSuggestWidget.border": "#E4E4E7",
        "editorSuggestWidget.selectedBackground": "#F4F4F5",
        "editorSuggestWidget.highlightForeground": "#FF5722",
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

  const activeLessonForSelected = PYTHON_CURRICULUM_LESSONS.find(
    (l) => l.id === selectedAssignment?.lessonId
  );

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
    if (st === "passed") return t("✓ ĐÃ HOÀN THÀNH", "✓ PASSED");
    if (st === "failed") return t("✕ CHƯA ĐẠT", "✕ FAILED");
    return t("◐ ĐANG LÀM", "◐ IN_PROGRESS");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-primary">
      {/* 1. Student-Friendly Top Status Bar */}
      <TopNavigationBar
        breadcrumb={t(
          "HỌC PYTHON TRỰC TUYẾN // CHROMA IDE",
          "LEARN PYTHON ONLINE // CHROMA IDE"
        )}
        engineState={engineState}
        engineStatusText={statusMessage}
        syncStatus={syncBadge || t("✓ ĐÃ LƯU TỰ ĐỘNG", "✓ AUTO-SAVED")}
        studentProgressText={t(
          `HOÀN THÀNH: ${completedCount}/${assignments.length} BÀI`,
          `COMPLETED: ${completedCount}/${assignments.length}`
        )}
        onOpenCheatSheet={() => setCheatSheetOpen(true)}
      />

      {/* 2. Main Full-Viewport 3-Pane Split Layout */}
      <div className="flex-1 overflow-hidden bg-grid">
        <PanelGroup direction="horizontal" className="h-full w-full">
          {/* LEFT PANE: Exercise Selector + Problem Specification */}
          <Panel
            defaultSize={34}
            minSize={24}
            className="bg-surface flex flex-col h-full"
          >
            {/* Left Pane Header + Difficulty Filter */}
            <div className="px-4 py-2.5 bg-subtle border-b border-grid space-y-2 shrink-0 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-brand">◆</span>
                  <span className="uppercase tracking-wider text-primary font-semibold">
                    {t(
                      `DANH SÁCH BÀI TẬP (${filteredAssignments.length})`,
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
                    ? t("[▲] ẨN DANH SÁCH", "[▲] HIDE LIST")
                    : t("[▼] CHỌN BÀI KHÁC", "[▼] CHANGE EXERCISE")}
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
                              className={`uppercase ${
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
                              {t("TEST CHẤM", "TESTS")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submission Status Badge */}
                      <div className="font-mono text-[10px] shrink-0 mt-0.5">
                        {sub?.status === "passed" ? (
                          <span className="px-1.5 py-0.5 bg-success/10 text-success border border-success/30 font-semibold">
                            ✓ {t("ĐẠT", "PASSED")}
                          </span>
                        ) : sub?.status === "failed" ? (
                          <span className="px-1.5 py-0.5 bg-brand/10 text-brand border border-brand/30">
                            ✕ {t("CHƯA ĐẠT", "FAILED")}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-subtle text-muted border border-grid">
                            ○ {t("MỚI", "TODO")}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Toggle Tabs: [📝 ĐỀ BÀI TẬP] vs [📚 LÝ THUYẾT BÀI HỌC] */}
            <div className="grid grid-cols-2 bg-grid gap-[1px] border-b border-grid font-mono text-xs shrink-0">
              <button
                onClick={() => setLeftContentTab("PROBLEM")}
                className={`py-2 px-3 text-center font-semibold transition-colors ${
                  leftContentTab === "PROBLEM"
                    ? "bg-surface text-brand border-b-2 border-b-brand"
                    : "bg-subtle text-secondary hover:text-primary"
                }`}
              >
                📝 {t("ĐỀ BÀI TẬP", "PROBLEM")}
              </button>
              <button
                onClick={() => setLeftContentTab("THEORY")}
                className={`py-2 px-3 text-center font-semibold transition-colors ${
                  leftContentTab === "THEORY"
                    ? "bg-surface text-brand border-b-2 border-b-brand"
                    : "bg-subtle text-secondary hover:text-primary"
                }`}
              >
                📚{" "}
                {activeLessonForSelected
                  ? `${t("LÝ THUYẾT", "THEORY")} (${activeLessonForSelected.code})`
                  : t("LÝ THUYẾT BÀI HỌC", "LESSON THEORY")}
              </button>
            </div>

            {/* Problem Description OR Lesson Theory */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {leftContentTab === "THEORY" && activeLessonForSelected ? (
                <div className="space-y-4">
                  <div className="border-b border-grid pb-3">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs mb-1">
                      <span className="px-2 py-0.5 bg-brand text-white font-semibold">
                        {activeLessonForSelected.code}
                      </span>
                      <button
                        onClick={() => navigate("/")}
                        className="text-brand hover:underline"
                      >
                        [📖 {t("Xem toàn bộ lộ trình", "Full Curriculum")}]
                      </button>
                    </div>
                    <h2 className="text-base font-bold text-primary mt-1">
                      {lang === "vi"
                        ? activeLessonForSelected.titleVi
                        : activeLessonForSelected.titleEn}
                    </h2>
                  </div>

                  <MarkdownRenderer
                    content={
                      lang === "vi"
                        ? activeLessonForSelected.theoryMarkdownVi
                        : activeLessonForSelected.theoryMarkdownEn
                    }
                  />

                  <div className="border border-grid bg-subtle p-3 font-mono text-xs">
                    <div className="text-[11px] text-brand font-semibold mb-1.5">
                      💻 {t("VÍ DỤ MẪU TRONG BÀI HỌC:", "LESSON CODE EXAMPLE:")}
                    </div>
                    <pre className="bg-surface text-primary border border-grid p-3 overflow-x-auto whitespace-pre">
                      {activeLessonForSelected.sampleCode}
                    </pre>
                  </div>
                </div>
              ) : localizedSelected ? (
                <>
                  <div className="border-b border-grid pb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <SectionBadge
                        glyph={localizedSelected.glyph || "◆"}
                        label={`${t("MỨC ĐỘ", "LEVEL")}: ${localizeDifficulty(
                          localizedSelected.difficulty,
                          lang
                        )}`}
                        className="mb-0"
                      />
                      <span
                        className={`font-mono text-[11px] px-2 py-0.5 border uppercase ${
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
                    <div className="font-mono text-xs uppercase tracking-wider text-secondary flex items-center justify-between">
                      <span>
                        [▣]{" "}
                        {t("VÍ DỤ INPUT / OUTPUT MẪU", "SAMPLE INPUT / OUTPUT")}
                      </span>
                      <span className="text-muted">
                        +{hiddenTestCount} {t("TEST ẨN", "HIDDEN")}
                      </span>
                    </div>

                    {publicTestCases.map((tc, i) => (
                      <div
                        key={i}
                        className="border border-grid bg-subtle font-mono text-xs"
                      >
                        <div className="px-3 py-1.5 border-b border-grid flex items-center justify-between text-[11px] text-secondary bg-surface">
                          <span className="font-semibold text-primary">
                            {t(`VÍ DỤ MẪU #${i + 1}`, `EXAMPLE #${i + 1}`)}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tc.input);
                            }}
                            className="text-brand hover:underline"
                          >
                            {t("[SAO CHÉP INPUT]", "[COPY INPUT]")}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 bg-grid gap-[1px]">
                          <div className="bg-surface p-3">
                            <div className="text-[10px] text-muted uppercase mb-1">
                              {t("DỮ LIỆU NHẬP (INPUT)", "INPUT")}
                            </div>
                            <pre className="text-primary whitespace-pre-wrap">
                              {tc.input || t("(trống)", "(empty)")}
                            </pre>
                          </div>
                          <div className="bg-surface p-3">
                            <div className="text-[10px] text-muted uppercase mb-1">
                              {t("KẾT QUẢ IN RA (OUTPUT)", "EXPECTED OUTPUT")}
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
                    "CHỌN MỘT BÀI TẬP ĐỂ BẮT ĐẦU...",
                    "SELECT AN ASSIGNMENT TO BEGIN..."
                  )}
                </div>
              )}
            </div>
          </Panel>

          {/* 1px Vertical Structural Hairline Handle */}
          <PanelResizeHandle className="w-[1px] bg-grid hover:bg-brand transition-colors cursor-col-resize" />

          {/* CENTER + RIGHT/BOTTOM PANES: Monaco Editor & Interactive Terminal */}
          <Panel defaultSize={66} minSize={40}>
            <PanelGroup direction="vertical" className="h-full w-full">
              {/* CENTER PANE: Monaco Code Editor */}
              <Panel
                defaultSize={62}
                minSize={28}
                className="bg-terminal flex flex-col"
              >
                {/* Row 1: Primary Editor Action Toolbar */}
                <div className="h-11 px-4 bg-surface border-b border-grid flex items-center justify-between font-mono text-xs shrink-0 gap-2 overflow-x-auto">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 bg-subtle border border-grid text-primary font-semibold">
                      🐍 bai_lam.py
                    </span>
                    <button
                      onClick={handleTriggerAutocomplete}
                      title={t(
                        "Bật bảng gợi ý code ngay tại con trỏ (Ctrl+Space)",
                        "Trigger code completion popup (Ctrl+Space)"
                      )}
                      className="px-2.5 py-1 bg-subtle border border-grid hover:border-brand text-secondary hover:text-primary transition-colors"
                    >
                      💡 {t("GỢI Ý CODE (Ctrl+Space)", "SUGGEST (Ctrl+Space)")}
                    </button>
                  </div>

                  {/* Primary Execution & Cloud Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleRunCode}
                      disabled={engineState === "initializing"}
                      title={t(
                        "Chạy thử chương trình Python (Phím tắt: Ctrl+Enter)",
                        "Run Python program (Shortcut: Ctrl+Enter)"
                      )}
                      className="px-3.5 py-1.5 bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                    >
                      <span>[▶]</span>
                      <span>{t("CHẠY THỬ", "RUN CODE")}</span>
                    </button>

                    <button
                      onClick={stopExecution}
                      title={t(
                        "Dừng chương trình ngay lập tức (khi bị lặp vô hạn)",
                        "Stop running program immediately"
                      )}
                      className="px-3 py-1.5 bg-surface border border-grid hover:border-brand hover:text-brand text-secondary transition-colors"
                    >
                      [■] {t("DỪNG", "STOP")}
                    </button>

                    <button
                      onClick={handleResetCode}
                      title={t(
                        "Đặt lại về code gợi ý ban đầu",
                        "Reset to starter code"
                      )}
                      className="px-2.5 py-1.5 bg-surface border border-grid hover:bg-subtle text-secondary hover:text-primary transition-colors"
                    >
                      {t("LÀM LẠI", "RESET")}
                    </button>

                    <button
                      onClick={handleManualSave}
                      title={t("Lưu bài làm", "Save code")}
                      className="px-2.5 py-1.5 bg-surface border border-grid hover:bg-subtle text-secondary hover:text-primary transition-colors"
                    >
                      {t("LƯU BÀI", "SAVE")}
                    </button>

                    <button
                      onClick={handleSubmitAndGrade}
                      disabled={isGrading || engineState === "initializing"}
                      title={t(
                        "Nộp bài và chấm điểm tự động với bộ Test Cases",
                        "Submit & grade automatically against all test cases"
                      )}
                      className="px-4 py-1.5 bg-brand text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isGrading
                        ? t("◐ ĐANG CHẤM ĐIỂM...", "◐ GRADING...")
                        : t("[✓] NỘP BÀI & CHẤM ĐIỂM", "[✓] SUBMIT & GRADE")}
                    </button>
                  </div>
                </div>

                {/* Row 2: Quick Student Function & Snippet Bar */}
                <div className="px-4 py-1.5 bg-subtle border-b border-grid flex items-center gap-1.5 overflow-x-auto font-mono text-[11px] shrink-0">
                  <span className="text-secondary font-medium shrink-0 mr-1">
                    {t("Chèn nhanh lệnh:", "Quick Insert:")}
                  </span>
                  {QUICK_STUDENT_SNIPPETS.map((snip) => (
                    <button
                      key={snip.label}
                      onClick={() => handleInsertSnippetIntoEditor(snip.code)}
                      title={lang === "vi" ? snip.tipVi : snip.tipEn}
                      className="px-2 py-0.5 bg-surface border border-grid hover:border-brand text-primary hover:text-brand transition-colors shrink-0"
                    >
                      + {snip.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setCheatSheetOpen(true)}
                    className="ml-auto px-2.5 py-0.5 bg-surface border border-brand/50 text-brand hover:bg-brand hover:text-white transition-colors shrink-0 font-semibold"
                  >
                    {t("Xem tất cả hàm Python →", "All Python Functions →")}
                  </button>
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
                      fontSize: 14,
                      fontFamily:
                        "'JetBrains Mono', 'Geist Mono', 'Fira Code', monospace",
                      lineHeight: 23,
                      minimap: { enabled: false },
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
                        strings: false,
                      },
                      quickSuggestionsDelay: 20,
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
                {/* Terminal Header Tabs */}
                <div className="h-9 px-4 bg-subtle border-b border-grid flex items-center justify-between font-mono text-xs shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveBottomTab("CONSOLE")}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-2 ${
                        activeBottomTab === "CONSOLE"
                          ? "bg-surface text-primary border-t-2 border-t-brand font-semibold"
                          : "text-secondary hover:text-primary"
                      }`}
                    >
                      <span className="text-brand">[▣]</span>
                      <span>
                        {t("MÀN HÌNH KẾT QUẢ (CONSOLE)", "CONSOLE OUTPUT")}
                      </span>
                      {engineState === "awaiting_input" && (
                        <span className="px-1.5 py-0.2 bg-brand text-white text-[10px] animate-pulse">
                          {t("NHẬP DỮ LIỆU", "INPUT()")}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveBottomTab("TEST_CASES")}
                      className={`px-3 py-1.5 transition-colors flex items-center gap-2 ${
                        activeBottomTab === "TEST_CASES"
                          ? "bg-surface text-primary border-t-2 border-t-brand font-semibold"
                          : "text-secondary hover:text-primary"
                      }`}
                    >
                      <span className="text-brand">[◆]</span>
                      <span>
                        {t("BẢNG CHẤM ĐIỂM (TEST CASES)", "GRADING RESULTS")}
                      </span>
                      {testResults && (
                        <span
                          className={`px-1.5 py-0.2 text-[10px] font-bold ${
                            testResults.every((r) => r.passed)
                              ? "bg-emerald-500/20 text-emerald-500"
                              : "bg-brand/20 text-brand"
                          }`}
                        >
                          {testResults.filter((r) => r.passed).length}/
                          {testResults.length}
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span className="hidden sm:inline">
                      {t(
                        "Gõ lệnh tự hiện gợi ý hàm • Ctrl+Enter để chạy",
                        "Type for function hints • Ctrl+Enter to run"
                      )}
                    </span>
                    <button
                      onClick={clearConsole}
                      className="px-2 py-0.5 border border-grid hover:text-primary hover:border-brand text-secondary transition-colors"
                    >
                      {t("XÓA MÀN HÌNH", "CLEAR")}
                    </button>
                  </div>
                </div>

                {/* Tab 1: Interactive Console Output + Stdin Input Prompt */}
                {activeBottomTab === "CONSOLE" ? (
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 bg-terminal">
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
                          {t("NHẬP DỮ LIỆU CHO INPUT() >", "STDIN >")}
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
                          className="px-3.5 py-1 bg-brand text-white text-xs font-semibold uppercase hover:opacity-90 transition-opacity"
                        >
                          {t("GỬI DỮ LIỆU [↵]", "SEND [↵]")}
                        </button>
                      </form>
                    )}

                    <div ref={consoleEndRef} />
                  </div>
                ) : (
                  /* Tab 2: Automated Test Case Execution Results Table */
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-terminal">
                    {!testResults ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-grid bg-subtle/50">
                        <div className="text-brand text-base mb-2">[◆]</div>
                        <div className="text-primary font-semibold mb-1">
                          {t(
                            "BẠN CHƯA CHẤM ĐIỂM BÀI TẬP NÀY",
                            "NO GRADING RESULTS YET"
                          )}
                        </div>
                        <p className="text-secondary max-w-md mb-4">
                          {t("Hãy nhấn nút ", "Click ")}
                          <span className="text-brand font-semibold">
                            {t("[✓] NỘP BÀI & CHẤM ĐIỂM", "[✓] SUBMIT & GRADE")}
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
                            "CHẤM ĐIỂM BÀI LÀM NGAY",
                            "GRADE MY SOLUTION NOW"
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Summary Banner */}
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 border border-grid bg-subtle">
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
                                    "🎉 CHÚC MỪNG! BẠN ĐÃ LÀM ĐÚNG TẤT CẢ CÁC TEST!",
                                    "🎉 CONGRATULATIONS! ALL TEST CASES PASSED!"
                                  )
                                : t(
                                    "✕ MỘT SỐ TEST CHƯA ĐÚNG, HÃY KIỂM TRA LẠI KẾT QUẢ BÊN DƯỚI",
                                    "✕ SOME TEST CASES FAILED, CHECK DETAILS BELOW"
                                  )}
                            </span>
                            <span className="text-grid-strong">|</span>
                            <span className="text-secondary font-semibold">
                              {t("ĐIỂM ĐẠT:", "SCORE:")}{" "}
                              <strong className="text-primary">
                                {testResults.filter((r) => r.passed).length} /{" "}
                                {testResults.length}
                              </strong>
                            </span>
                          </div>
                          <span className="text-muted">
                            {t("THỜI GIAN CHẠY:", "TIME:")}{" "}
                            {testResults
                              .reduce((acc, r) => acc + r.durationMs, 0)
                              .toFixed(1)}
                            ms
                          </span>
                        </div>

                        {/* Technical Results Table */}
                        <div className="border border-grid divide-y divide-grid">
                          <div className="grid grid-cols-12 bg-subtle px-3 py-2 text-[11px] text-muted uppercase">
                            <div className="col-span-2">
                              {t("BỘ TEST", "TEST")}
                            </div>
                            <div className="col-span-2">
                              {t("KẾT QUẢ", "STATUS")}
                            </div>
                            <div className="col-span-3">
                              {t("DỮ LIỆU VÀO (INPUT)", "INPUT")}
                            </div>
                            <div className="col-span-2">
                              {t("ĐÁP ÁN ĐÚNG", "EXPECTED")}
                            </div>
                            <div className="col-span-2">
                              {t("CODE CỦA BẠN IN RA", "YOUR OUTPUT")}
                            </div>
                            <div className="col-span-1 text-right">
                              {t("TỐC ĐỘ", "TIME")}
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
                                    {t("ẨN", "HIDDEN")}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-2">
                                {res.passed ? (
                                  <span className="text-emerald-500 font-semibold">
                                    ✓ {t("ĐÚNG", "PASS")}
                                  </span>
                                ) : (
                                  <span className="text-brand font-semibold">
                                    ✕ {t("CHƯA ĐÚNG", "FAIL")}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-3 text-secondary whitespace-pre-wrap break-all">
                                {res.isHidden
                                  ? t("[Test ẩn của giáo viên]", "[Hidden Test]")
                                  : res.input || t("(trống)", "(empty)")}
                              </div>

                              <div className="col-span-2 text-emerald-500 whitespace-pre-wrap break-all">
                                {res.isHidden
                                  ? t("[Đã ẩn]", "[Hidden]")
                                  : res.expectedOutput}
                              </div>

                              <div className="col-span-2 whitespace-pre-wrap break-all">
                                {res.stderr ? (
                                  <span className="text-brand">
                                    {res.stderr.split("\n").slice(-1)[0]}
                                  </span>
                                ) : res.isHidden ? (
                                  <span className="text-muted">
                                    {res.passed
                                      ? t("Khớp đáp án", "Matched")
                                      : t("Khác đáp án", "Mismatch")}
                                  </span>
                                ) : (
                                  <span
                                    className={
                                      res.passed
                                        ? "text-primary"
                                        : "text-brand"
                                    }
                                  >
                                    {res.actualOutput ||
                                      t("(chưa in gì)", "(no output)")}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-1 text-right text-emerald-500">
                                {res.durationMs}ms
                              </div>
                            </div>
                          ))}
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
    </div>
  );
};
