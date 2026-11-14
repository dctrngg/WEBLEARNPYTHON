import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth, normalizeUsername } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { usePyodide } from "../hooks/usePyodide";
import {
  deleteAssignmentById,
  deleteUserById,
  getAllSubmissions,
  getAllUsers,
  getAssignments,
  saveAssignment,
  seedCloudFirestoreData,
  syncAssignmentsFromCloud,
  upsertUserProfile,
} from "../services/firestoreService";
import { GRADE_10_CLASSES, localizeAssignment } from "../services/seedData";
import {
  PYTHON_CURRICULUM_LESSONS,
  LessonTopic,
} from "../services/curriculumData";
import {
  Assignment,
  DifficultyLevel,
  Submission,
  TestCase,
  UserProfile,
} from "../types/ide";
import { TopNavigationBar } from "../components/layout/TopNavigationBar";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { FirebaseConfigModal } from "../components/ui/FirebaseConfigModal";
import { activeConfig, isFirebaseConfigured } from "../firebase/config";
import {
  BentoCell,
  BentoGrid,
  BentoSection,
  SectionBadge,
  SectionHeader,
} from "../components/ui/BentoPrimitives";
import { AssignmentStatus, StatusGlyph } from "../components/ui/StatusGlyph";
import {
  Badge,
  buildAsciiBar,
  Button,
  Checkbox,
  ConfirmDialog,
  DifficultyBadge,
  EmptyState,
  Input,
  Modal,
  Select,
  Table,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
  useToast,
} from "../components/ui/Primitives";

// Strictly exclude U+25CA lozenge per D2
const GLYPH_OPTIONS = ["◇", "◆", "●", "◐", "▣"];

type AdminTab = "ASSIGNMENTS" | "SUBMISSIONS" | "OVERVIEW" | "STUDENTS";

function formatWhitespacePreview(str: string): string {
  return (str || "")
    .split("\n")
    .map((line) => line.replace(/ /g, "·").replace(/\t/g, "→"))
    .join("↵\n");
}

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang, t } = useLanguage();
  const { pushToast } = useToast();
  const { engineState, runTests } = usePyodide();

  const [activeTab, setActiveTab] = useState<AdminTab>("ASSIGNMENTS");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [firebaseModalOpen, setFirebaseModalOpen] = useState(false);

  // --- TAB: ASSIGNMENTS (BUILDER) STATE ---
  const [asgnSearch, setAsgnSearch] = useState<string>("");
  const [asgnLessonFilter, setAsgnLessonFilter] = useState<string>("ALL");
  const [selectedLessonViewId, setSelectedLessonViewId] = useState<string>(
    PYTHON_CURRICULUM_LESSONS[0].id
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string>("bai_16");
  const [glyph, setGlyph] = useState<string>("◆");
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Beginner");
  const [description, setDescription] = useState<string>("");
  const [descTab, setDescTab] = useState<"EDIT" | "PREVIEW">("EDIT");
  const [starterCode, setStarterCode] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "10", expectedOutput: "20", isHidden: false },
  ]);
  const [showTestWhitespace, setShowTestWhitespace] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // P1: Reference Solution (session-only, never persisted to Firestore)
  const [referenceSolution, setReferenceSolution] = useState<string>(
    "# Session-only Reference Solution (not saved to Firestore)\nn = int(input())\nprint(n * 2)\n"
  );
  const [isGeneratingExpected, setIsGeneratingExpected] =
    useState<boolean>(false);
  const [verifySummary, setVerifySummary] = useState<string | null>(null);

  // Delete Assignment ConfirmDialog (requireText = assignment title)
  const [deleteTargetAsgn, setDeleteTargetAsgn] = useState<Assignment | null>(
    null
  );

  // --- TAB: SUBMISSIONS & MATRIX STATE ---
  const [subViewMode, setSubViewMode] = useState<"MATRIX" | "LIST">("MATRIX");
  const [subClassFilter, setSubClassFilter] = useState<string>("ALL");
  const [subLessonFilter, setSubLessonFilter] = useState<string>("ALL");
  const [subStatusFilter, setSubStatusFilter] = useState<string>("ALL");
  const [subSearch, setSubSearch] = useState<string>("");
  const [subSortDir, setSubSortDir] = useState<"asc" | "desc">("asc");
  const [subPage, setSubPage] = useState<number>(1);
  const PAGE_SIZE = 50;
  const [inspectedSubmission, setInspectedSubmission] =
    useState<Submission | null>(null);

  // --- TAB: STUDENTS MANAGEMENT STATE ---
  const [studentClassFilter, setStudentClassFilter] = useState<string>("ALL");
  const [studentSearch, setStudentSearch] = useState<string>("");
  const [showPasswordsInTable, setShowPasswordsInTable] =
    useState<boolean>(false);
  const [editingStudentUid, setEditingStudentUid] = useState<string | null>(
    null
  );
  const [stuUsername, setStuUsername] = useState<string>("");
  const [stuFullName, setStuFullName] = useState<string>("");
  const [stuClassName, setStuClassName] = useState<string>(GRADE_10_CLASSES[0]);
  const [stuPassword, setStuPassword] = useState<string>("123456");
  const [inspectedStudentProfile, setInspectedStudentProfile] =
    useState<UserProfile | null>(null);

  // Warn before unload if assignment form has unsaved edits (Section 7.2)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFormDirty]);

  const loadDashboardData = async () => {
    const [asgnData, subData, usrData] = await Promise.all([
      getAssignments(),
      getAllSubmissions(),
      getAllUsers(),
    ]);
    setAssignments(asgnData);
    setSubmissions(subData);
    setUsers(usrData);

    if (!editingId && asgnData.length > 0) {
      populateFormWithAssignment(localizeAssignment(asgnData[0], lang), false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- ASSIGNMENT CRUD HANDLERS ---
  const populateFormWithAssignment = (asgn: Assignment, checkDirty = true) => {
    if (
      checkDirty &&
      isFormDirty &&
      !window.confirm("Discard unsaved changes to current assignment?")
    ) {
      return;
    }
    setEditingId(asgn.id);
    setLessonId(asgn.lessonId || "bai_16");
    setGlyph(asgn.glyph && asgn.glyph !== "\u25CA" ? asgn.glyph : "◆");
    setTitle(asgn.title);
    setDifficulty(asgn.difficulty);
    setDescription(asgn.description);
    setStarterCode(asgn.starterCode);
    setTestCases(
      asgn.testCases.length > 0
        ? asgn.testCases
        : [{ input: "", expectedOutput: "", isHidden: false }]
    );
    setVerifySummary(null);
    setIsFormDirty(false);
  };

  const handleInitNewAssignment = () => {
    if (
      isFormDirty &&
      !window.confirm("Discard unsaved changes to current assignment?")
    ) {
      return;
    }
    setEditingId(null);
    setLessonId(selectedLessonViewId || "bai_16");
    setGlyph("◇");
    setTitle(`New Assignment (${selectedLessonViewId.toUpperCase()})`);
    setDifficulty("Beginner");
    setDescription(
      `### Problem Statement\nWrite a Python program to solve the following task.\n\n### Input\n- Line 1: ...\n\n### Output\n- Print the result using \`print()\`.`
    );
    setStarterCode(`# Write your Python solution here\nn = int(input())\nprint(n)\n`);
    setTestCases([
      { input: "10", expectedOutput: "10", isHidden: false },
      { input: "25", expectedOutput: "25", isHidden: true },
    ]);
    setVerifySummary(null);
    setIsFormDirty(true);
    pushToast("INITIALIZED NEW ASSIGNMENT DRAFT", "info");
  };

  const handleSaveAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const saved = await saveAssignment({
      id: editingId || "",
      lessonId,
      glyph,
      title: title.trim(),
      difficulty,
      description,
      starterCode,
      testCases: testCases.filter(
        (tc) => tc.input.trim() !== "" || tc.expectedOutput.trim() !== ""
      ),
      createdBy: user?.uid || "usr_admin",
      createdAt: new Date().toISOString(),
    });

    await loadDashboardData();
    setEditingId(saved.id);
    setIsFormDirty(false);
    pushToast(`SAVED ASSIGNMENT "${saved.title}"`, "success");
  };

  const handleConfirmDeleteAssignment = async () => {
    if (!deleteTargetAsgn) return;
    await deleteAssignmentById(deleteTargetAsgn.id);
    const removedTitle = deleteTargetAsgn.title;
    setDeleteTargetAsgn(null);
    setIsFormDirty(false);

    const updated = await getAssignments();
    setAssignments(updated);
    if (updated.length > 0) {
      populateFormWithAssignment(localizeAssignment(updated[0], lang), false);
    } else {
      handleInitNewAssignment();
    }
    pushToast(`DELETED "${removedTitle}"`, "danger");
  };

  const handleAddTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      { input: "", expectedOutput: "", isHidden: false },
    ]);
    setIsFormDirty(true);
  };

  const handleUpdateTestCase = (
    idx: number,
    field: keyof TestCase,
    value: string | boolean
  ) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === idx ? { ...tc, [field]: value } : tc))
    );
    setIsFormDirty(true);
  };

  const handleMoveTestCase = (idx: number, direction: -1 | 1) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= testCases.length) return;
    setTestCases((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
    setIsFormDirty(true);
  };

  const handleRemoveTestCase = (idx: number) => {
    if (testCases.length <= 1) return;
    setTestCases((prev) => prev.filter((_, i) => i !== idx));
    setIsFormDirty(true);
  };

  // P1: Generate expected outputs from Reference Solution via Pyodide
  const handleGenerateExpectedFromRef = async () => {
    if (engineState !== "ready" || !referenceSolution.trim()) return;
    setIsGeneratingExpected(true);
    setVerifySummary(null);
    const results = await runTests(referenceSolution, testCases);
    setIsGeneratingExpected(false);

    const hasError = results.some((r) => Boolean(r.stderr));
    if (hasError) {
      pushToast("ERR_REF_SOLUTION: Reference code raised an error", "danger");
      setVerifySummary(
        `✕ Reference solution failed on test #${results.find((r) => r.stderr)?.index
        }`
      );
      return;
    }

    setTestCases((prev) =>
      prev.map((tc, idx) => ({
        ...tc,
        expectedOutput: results[idx]?.actualOutput ?? tc.expectedOutput,
      }))
    );
    setIsFormDirty(true);
    setVerifySummary(`✓ Generated expected outputs for ${results.length} tests`);
    pushToast(
      `GENERATED EXPECTED OUTPUTS (${results.length} TESTS)`,
      "success"
    );
  };

  const handleVerifyRefSolution = async () => {
    if (engineState !== "ready" || !referenceSolution.trim()) return;
    setIsGeneratingExpected(true);
    const results = await runTests(referenceSolution, testCases);
    setIsGeneratingExpected(false);

    const passed = results.filter((r) => r.passed).length;
    setVerifySummary(
      `${passed === results.length ? "✓" : "✕"} VERIFIED: ${passed}/${results.length
      } TESTS PASSED`
    );
    pushToast(
      `VERIFIED ${passed}/${results.length} PASSED`,
      passed === results.length ? "success" : "warn"
    );
  };

  // --- STUDENT CRUD HANDLERS ---
  const handleEditStudentClick = (stu: UserProfile) => {
    setEditingStudentUid(stu.uid);
    setStuUsername(stu.username || stu.uid.replace(/^usr_/, ""));
    setStuFullName(stu.displayName);
    setStuClassName(
      stu.className && GRADE_10_CLASSES.includes(stu.className)
        ? stu.className
        : GRADE_10_CLASSES[0]
    );
    setStuPassword(stu.password || "123456");
  };

  const handleResetStudentForm = () => {
    setEditingStudentUid(null);
    setStuUsername("");
    setStuFullName("");
    setStuClassName(
      studentClassFilter !== "ALL" ? studentClassFilter : GRADE_10_CLASSES[0]
    );
    setStuPassword("123456");
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = normalizeUsername(stuUsername);
    const cleanName = stuFullName.trim();
    const cleanPass = stuPassword.trim();

    if (cleanUser.length < 3 || cleanName.length < 2 || cleanPass.length < 4) {
      pushToast(
        "ERR_VALIDATION: Username (>=3), Name and Password (>=4) required",
        "warn"
      );
      return;
    }

    const uid = editingStudentUid || `usr_${cleanUser}`;
    const existing = users.find((u) => u.uid === uid);

    const profile: UserProfile = {
      uid,
      username: cleanUser,
      email: `${cleanUser}@tinhoc10.edu.vn`,
      displayName: cleanName,
      className: stuClassName,
      password: cleanPass,
      role: "student",
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    await upsertUserProfile(profile);
    await loadDashboardData();
    handleResetStudentForm();
    pushToast(`SAVED STUDENT "${cleanName}" (${stuClassName})`, "success");
  };

  const handleDeleteStudent = async (stu: UserProfile) => {
    await deleteUserById(stu.uid);
    await loadDashboardData();
    if (editingStudentUid === stu.uid) {
      handleResetStudentForm();
    }
    pushToast(`DELETED STUDENT "${stu.displayName}"`, "danger");
  };

  const handleForcePullFirestore = async () => {
    pushToast("ĐANG ĐỒNG BỘ DỮ LIỆU TỪ CLOUD FIRESTORE...", "info");
    const res = await syncAssignmentsFromCloud();
    if (res.success) {
      await loadDashboardData();
      pushToast(`✓ ĐÃ ĐỒNG BỘ THÀNH CÔNG ${res.count} BÀI TẬP TỪ FIREBASE!`, "success");
    } else {
      pushToast(`ERR_FIRESTORE_SYNC: ${res.error}`, "danger");
    }
  };

  const handleForceSyncFirestore = async () => {
    pushToast("ĐẨY TOÀN BỘ SEED DATA LÊN CLOUD FIRESTORE…", "info");
    const res = await seedCloudFirestoreData();
    if (res.success) {
      await loadDashboardData();
      pushToast(`ĐÃ ĐẨY ${res.count} BÀI TẬP LÊN FIRESTORE!`, "success");
    } else {
      pushToast(`ERR_FIRESTORE_SYNC: ${res.error}`, "danger");
    }
  };

  // --- ANALYTICS & METRICS COMPUTATION ---
  const studentList = useMemo(
    () => users.filter((u) => u.role === "student"),
    [users]
  );
  const totalAssignments = assignments.length;
  const passedSubmissions = submissions.filter((s) => s.status === "passed");
  const passRate =
    submissions.length > 0
      ? Math.round((passedSubmissions.length / submissions.length) * 100)
      : 0;
  const activeStudentCount = useMemo(
    () => new Set(submissions.map((s) => s.userId)).size,
    [submissions]
  );

  // Submission lookup map: `${userId}_${assignmentId}` -> Submission
  const submissionMap = useMemo(() => {
    const map: Record<string, Submission> = {};
    submissions.forEach((s) => {
      map[`${s.userId}_${s.assignmentId}`] = s;
    });
    return map;
  }, [submissions]);

  // PerformanceBento pass rate by difficulty (Section 7.3)
  const difficultyBreakdown = useMemo(() => {
    const levels: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];
    return levels.map((lvl) => {
      const lvlAsgnIds = new Set(
        assignments.filter((a) => a.difficulty === lvl).map((a) => a.id)
      );
      const lvlSubs = submissions.filter((s) => lvlAsgnIds.has(s.assignmentId));
      const lvlPassed = lvlSubs.filter((s) => s.status === "passed").length;
      const rate =
        lvlSubs.length > 0 ? Math.round((lvlPassed / lvlSubs.length) * 100) : 0;
      return {
        level: lvl,
        assignmentCount: lvlAsgnIds.size,
        submissionCount: lvlSubs.length,
        passedCount: lvlPassed,
        rate,
      };
    });
  }, [assignments, submissions]);

  const getStudentStats = (stuUid: string) => {
    const stuSubs = submissions.filter((s) => s.userId === stuUid);
    const passedSet = new Set(
      stuSubs.filter((s) => s.status === "passed").map((s) => s.assignmentId)
    );
    const pct =
      totalAssignments > 0
        ? Math.round((passedSet.size / totalAssignments) * 100)
        : 0;
    return {
      passedCount: passedSet.size,
      totalSubmissions: stuSubs.length,
      progressPct: pct,
    };
  };

  // Class analytics for Overview tab
  const classAnalytics = GRADE_10_CLASSES.map((cls) => {
    const studentsInClass = studentList.filter(
      (s) => (s.className || "10A7") === cls
    );
    const statsList = studentsInClass.map((s) => ({
      student: s,
      stats: getStudentStats(s.uid),
    }));
    const activeStudentsCount = statsList.filter(
      (x) => x.stats.totalSubmissions > 0
    ).length;
    const totalPassedInClass = statsList.reduce(
      (acc, x) => acc + x.stats.passedCount,
      0
    );
    const avgProgressPct =
      studentsInClass.length > 0
        ? Math.round(
          statsList.reduce((acc, x) => acc + x.stats.progressPct, 0) /
          studentsInClass.length
        )
        : 0;
    const topStudent =
      statsList.sort((a, b) => b.stats.passedCount - a.stats.passedCount)[0]
        ?.student || null;

    return {
      className: cls,
      studentCount: studentsInClass.length,
      activeStudentsCount,
      totalPassedInClass,
      avgProgressPct,
      topStudent,
    };
  });

  // Filtered assignments for Builder left list
  const builderFilteredAssignments = useMemo(() => {
    const q = asgnSearch.trim().toLowerCase();
    return assignments.filter((a) => {
      const matchLesson =
        asgnLessonFilter === "ALL" || a.lessonId === asgnLessonFilter;
      if (!matchLesson) return false;
      if (!q) return true;
      const loc = localizeAssignment(a, lang);
      return (
        loc.title.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [assignments, asgnSearch, asgnLessonFilter, lang]);

  // Filtered students for Matrix & Student Roster
  const matrixStudents = useMemo(() => {
    const q = subSearch.trim().toLowerCase();
    const list = studentList.filter((stu) => {
      const matchClass =
        subClassFilter === "ALL" || (stu.className || "10A7") === subClassFilter;
      if (!matchClass) return false;
      if (!q) return true;
      return (
        stu.displayName.toLowerCase().includes(q) ||
        stu.email.toLowerCase().includes(q) ||
        (stu.username || "").toLowerCase().includes(q)
      );
    });
    return list.sort((a, b) =>
      subSortDir === "asc"
        ? a.displayName.localeCompare(b.displayName)
        : b.displayName.localeCompare(a.displayName)
    );
  }, [studentList, subClassFilter, subSearch, subSortDir]);

  const matrixAssignments = useMemo(() => {
    if (subLessonFilter === "ALL") return assignments;
    return assignments.filter((a) => a.lessonId === subLessonFilter);
  }, [assignments, subLessonFilter]);

  const paginatedMatrixStudents = useMemo(() => {
    const start = (subPage - 1) * PAGE_SIZE;
    return matrixStudents.slice(start, start + PAGE_SIZE);
  }, [matrixStudents, subPage]);

  // Filtered submissions for List view
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const stu = users.find((u) => u.uid === sub.userId);
      const stuClass = sub.userClassName || stu?.className || "10A7";
      const asgn = assignments.find((a) => a.id === sub.assignmentId);

      const matchClass =
        subClassFilter === "ALL" || stuClass === subClassFilter;
      const matchLesson =
        subLessonFilter === "ALL" || asgn?.lessonId === subLessonFilter;
      const matchStatus =
        subStatusFilter === "ALL" || sub.status === subStatusFilter;
      const q = subSearch.trim().toLowerCase();
      const stuName = (
        sub.userDisplayName ||
        stu?.displayName ||
        sub.userId
      ).toLowerCase();
      const matchSearch = !q || stuName.includes(q);

      return matchClass && matchLesson && matchStatus && matchSearch;
    });
  }, [
    submissions,
    users,
    assignments,
    subClassFilter,
    subLessonFilter,
    subStatusFilter,
    subSearch,
  ]);

  // EXPORT CSV Client-Side Generator (Section 7.3)
  const handleExportCsv = () => {
    const headers = [
      "Student UID",
      "Display Name",
      "Class",
      "Email",
      ...matrixAssignments.map((a) => a.id),
    ];
    const rows = matrixStudents.map((stu) => {
      const cols = matrixAssignments.map((a) => {
        const sub = submissionMap[`${stu.uid}_${a.id}`];
        return sub ? sub.status : "not_started";
      });
      return [
        stu.uid,
        `"${stu.displayName.replace(/"/g, '""')}"`,
        stu.className || "10A7",
        stu.email,
        ...cols,
      ].join(",");
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chroma_submissions_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    pushToast("EXPORTED CSV REPORT", "success");
  };

  // Filtered students for Tab STUDENTS
  const filteredStudents = studentList.filter((stu) => {
    const matchClass =
      studentClassFilter === "ALL" ||
      (stu.className || "10A7") === studentClassFilter;
    const q = studentSearch.trim().toLowerCase();
    if (!q) return matchClass;
    const uname = (stu.username || stu.uid).toLowerCase();
    return (
      matchClass &&
      (stu.displayName.toLowerCase().includes(q) || uname.includes(q))
    );
  });

  const activeLessonTopic: LessonTopic =
    PYTHON_CURRICULUM_LESSONS.find((l) => l.id === selectedLessonViewId) ||
    PYTHON_CURRICULUM_LESSONS[0];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      <TopNavigationBar
        breadcrumb="CHROMA_IDE // INSTRUCTOR"
        engineState={engineState}
        engineStatusText="INSTRUCTOR STUDIO"
      />

      {/* D4: /instructor uses max-w-screen-2xl with border-x border-grid */}
      <BentoSection className="max-w-screen-2xl flex-1 w-full">
        {/* 1. TOP METRICS STRIP (3 Primary Columns with Definition Tooltips per Section 7.1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-grid gap-[1px] border-b border-grid font-mono text-mono-sm">
          <div className="bg-surface px-6 py-4 flex items-center justify-between">
            <Tooltip content="Total coding assignments published in the curriculum bank">
              <span className="text-secondary uppercase cursor-help border-b border-dotted border-grid-strong">
                TOTAL ASSIGNMENTS
              </span>
            </Tooltip>
            <div className="flex items-center gap-3">
              <strong className="text-2xl text-primary">
                {assignments.length}
              </strong>
              <Button
                variant="outline"
                size="sm"
                onClick={handleForcePullFirestore}
                title="Tải lại toàn bộ dữ liệu mới nhất từ Cloud Firestore"
              >
                🔄 LÀM MỚI
              </Button>
            </div>
          </div>

          <div className="bg-surface px-6 py-4 flex items-center justify-between">
            <Tooltip content="Active students: distinct students with at least one saved or graded submission">
              <span className="text-secondary uppercase cursor-help border-b border-dotted border-grid-strong">
                ACTIVE STUDENTS
              </span>
            </Tooltip>
            <div className="text-right">
              <strong className="text-2xl text-brand-text">
                {activeStudentCount}
              </strong>
              <span className="text-muted text-mono-xs ml-2">
                / {studentList.length} REGISTERED
              </span>
            </div>
          </div>

          <div className="bg-surface px-6 py-4 flex items-center justify-between">
            <Tooltip content="Overall pass rate: percentage of total submissions with status === 'passed'">
              <span className="text-secondary uppercase cursor-help border-b border-dotted border-grid-strong">
                OVERALL PASS RATE
              </span>
            </Tooltip>
            <div className="flex items-center gap-2">
              <span className="text-success-text" aria-hidden="true">
                {buildAsciiBar(passRate, 8)}
              </span>
              <strong className="text-2xl text-success-text">
                {passRate}%
              </strong>
            </div>
          </div>

          <div className="bg-surface p-4">
            <div className="text-[11px] text-secondary uppercase">
              {t("TỔNG LƯỢT NỘP BÀI", "SUBMISSIONS")}
            </div>
            <div className="text-2xl font-bold text-primary mt-1">
              {submissions.length}
            </div>
            <div className="text-[10px] text-success mt-0.5">
              {passedSubmissions.length} lượt đạt 100%
            </div>
          </div>

          <div className="bg-surface p-4">
            <div className="text-[11px] text-secondary uppercase">
              {t("TỶ LỆ LÀM ĐẠT", "PASS RATE")}
            </div>
            <div className="text-2xl font-bold text-success mt-1">
              {passRate}%
            </div>
            <div className="text-[10px] text-muted mt-0.5">
              Trên toàn bộ bài nộp
            </div>
          </div>

          <div className="bg-surface p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-secondary uppercase">
              <span>{t("KẾT NỐI FIREBASE", "FIREBASE CLOUD")}</span>
              <span className={isFirebaseConfigured ? "text-success font-bold" : "text-brand font-bold"}>
                {isFirebaseConfigured ? "● ONLINE" : "◆ LOCAL"}
              </span>
            </div>
            <div className="text-[10px] text-muted truncate mt-0.5">
              {isFirebaseConfigured
                ? `Project: ${activeConfig?.projectId}`
                : "Chế độ Mock cục bộ"}
            </div>
            <div className="flex gap-1.5 mt-2">
              <button
                type="button"
                onClick={handleForcePullFirestore}
                title="Đồng bộ / Tải dữ liệu mới nhất từ Cloud Firestore về trang Admin"
                className="flex-1 py-1.5 bg-brand text-white font-semibold text-[11px] hover:opacity-90 transition-opacity text-center truncate flex items-center justify-center gap-1"
              >
                <span>🔄</span>
                <span>ĐỒNG BỘ CLOUD</span>
              </button>
              <button
                type="button"
                onClick={handleForceSyncFirestore}
                title="Đẩy bộ dữ liệu mẫu lên Cloud Firestore"
                className="px-2 py-1.5 bg-subtle border border-grid text-secondary hover:text-primary hover:border-brand text-[11px] font-semibold transition-colors"
              >
                🚀 ĐẨY LÊN
              </button>
              <button
                type="button"
                onClick={() => setFirebaseModalOpen(true)}
                title="Xem hoặc thiết lập kết nối Firebase"
                className="px-2.5 py-1.5 bg-subtle border border-grid text-primary hover:border-brand text-[11px] font-semibold transition-colors"
              >
                ⚙
              </button>
            </div>
          </div>
        </div>

        {/* 2. PRIMARY INSTRUCTOR TABS */}
        <div className="border-b border-grid bg-subtle px-4">
          <Tabs
            ariaLabel="Instructor Dashboard Sections"
            items={[
              {
                id: "ASSIGNMENTS",
                label: `ASSIGNMENTS (${assignments.length})`,
              },
              {
                id: "SUBMISSIONS",
                label: `SUBMISSIONS (${submissions.length})`,
              },
              {
                id: "OVERVIEW",
                label: `CLASS OVERVIEW (6 CLASSES)`,
              },
              {
                id: "STUDENTS",
                label: `STUDENTS (${studentList.length})`,
              },
            ]}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id as AdminTab)}
          />
        </div>

        {/* ===================================================================
            TAB 1: ASSIGNMENTS (SPLIT-PANE BUILDER - SECTION 7.2)
           =================================================================== */}
        {activeTab === "ASSIGNMENTS" && (
          <div>
            <SectionHeader
              glyph="[◆]"
              badge="ASSIGNMENT BUILDER STUDIO"
              title={t(
                "Soạn thảo Bài tập Python, Preview Markdown & Bộ Test Cases",
                "Author Python Assignments, Markdown Preview & Test Suite"
              )}
              rightElement={
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleInitNewAssignment}
                >
                  [+ NEW ASSIGNMENT]
                </Button>
              }
            />

            <BentoGrid cols={12}>
              {/* Left 4/12: Searchable Assignment List with DifficultyBadge & Test Count */}
              <BentoCell colSpan="md:col-span-4" noPadding>
                <div className="p-3 bg-subtle border-b border-grid space-y-2">
                  <Input
                    value={asgnSearch}
                    onChange={(e) => setAsgnSearch(e.target.value)}
                    placeholder="Search assignments by title..."
                    aria-label="Search assignments"
                  />
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-secondary font-medium">BÀI HỌC:</span>
                    <select
                      value={asgnLessonFilter}
                      onChange={(e) => setAsgnLessonFilter(e.target.value)}
                      className="bg-surface border border-grid px-2 py-1 text-primary text-xs focus:outline-none focus:border-brand font-semibold"
                    >
                      <option value="ALL">TẤT CẢ ({assignments.length} bài)</option>
                      {PYTHON_CURRICULUM_LESSONS.map((l) => {
                        const count = assignments.filter(
                          (a) => a.lessonId === l.id
                        ).length;
                        return (
                          <option key={l.id} value={l.id}>
                            {l.code} ({count} bài)
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="max-h-[820px] overflow-y-auto divide-y divide-grid">
                  {builderFilteredAssignments.map((rawItem) => {
                    const item = localizeAssignment(rawItem, lang);
                    const isEditing = editingId === item.id;
                    const lessonMeta = PYTHON_CURRICULUM_LESSONS.find(
                      (l) => l.id === rawItem.lessonId
                    );
                    return (
                      <div
                        key={item.id}
                        onClick={() => populateFormWithAssignment(item)}
                        className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${isEditing
                          ? "bg-active border-l-2 border-l-brand"
                          : "bg-surface hover:bg-subtle"
                          }`}
                      >
                        <div className="min-w-0 space-y-1.5">
                          <div className="text-xs font-semibold text-primary truncate">
                            {item.title}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 font-mono text-mono-xs">
                            {lessonMeta && (
                              <Badge variant="brand">{lessonMeta.code}</Badge>
                            )}
                            <DifficultyBadge difficulty={item.difficulty} />
                            <span className="text-muted">
                              {item.testCases.length} TESTS
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Link
                            to={`/workspace/${item.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 border border-grid bg-surface font-mono text-mono-xs text-secondary hover:text-primary"
                          >
                            IDE ↗
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTargetAsgn(item);
                            }}
                            aria-label={`Delete ${item.title}`}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BentoCell>

              {/* Right 8/12: Assignment Editor Form */}
              <BentoCell colSpan="md:col-span-8" noPadding>
                <form
                  onSubmit={handleSaveAssignment}
                  className="divide-y divide-grid"
                >
                  {/* Metadata & Markdown Description with EDIT | PREVIEW Tabs */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <SectionBadge
                        glyph={glyph}
                        label={
                          editingId
                            ? `EDITING ASSIGNMENT // ${editingId}`
                            : "NEW ASSIGNMENT DRAFT"
                        }
                        className="mb-0"
                      />
                      <div className="flex items-center gap-1 font-mono text-mono-xs">
                        {GLYPH_OPTIONS.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setGlyph(g);
                              setIsFormDirty(true);
                            }}
                            className={`w-7 h-7 border flex items-center justify-center ${glyph === g
                              ? "border-brand bg-subtle text-brand-text font-bold"
                              : "border-grid bg-surface text-secondary"
                              }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-5">
                        <Input
                          label="ASSIGNMENT TITLE"
                          required
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                            setIsFormDirty(true);
                          }}
                        />
                      </div>

                      <div className="md:col-span-4">
                        <Select
                          label="LESSON MODULE"
                          value={lessonId}
                          onChange={(e) => {
                            setLessonId(e.target.value);
                            setIsFormDirty(true);
                          }}
                        >
                          {PYTHON_CURRICULUM_LESSONS.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.code}: {l.titleVi}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div className="md:col-span-3">
                        <Select
                          label="DIFFICULTY"
                          value={difficulty}
                          onChange={(e) => {
                            setDifficulty(e.target.value as DifficultyLevel);
                            setIsFormDirty(true);
                          }}
                        >
                          <option value="Beginner">BEGINNER</option>
                          <option value="Intermediate">INTERMEDIATE</option>
                          <option value="Advanced">ADVANCED</option>
                        </Select>
                      </div>
                    </div>

                    {/* Markdown Problem Description: EDIT | PREVIEW Tabs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-grid">
                        <span className="font-mono text-mono-xs uppercase text-secondary font-semibold">
                          PROBLEM DESCRIPTION (MARKDOWN)
                        </span>
                        <Tabs
                          ariaLabel="Markdown Editor Mode"
                          items={[
                            { id: "EDIT", label: "EDIT" },
                            { id: "PREVIEW", label: "PREVIEW" },
                          ]}
                          activeId={descTab}
                          onChange={(id) =>
                            setDescTab(id as "EDIT" | "PREVIEW")
                          }
                        />
                      </div>

                      {descTab === "EDIT" ? (
                        <Textarea
                          rows={6}
                          required
                          monospace
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                            setIsFormDirty(true);
                          }}
                        />
                      ) : (
                        <div className="p-4 border border-grid bg-background min-h-[150px]">
                          <MarkdownRenderer content={description} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Starter Code + P1 Reference Solution Mini Monaco Editors */}
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-mono text-mono-xs uppercase text-secondary font-semibold">
                        STARTER CODE (STUDENT TEMPLATE)
                      </div>
                      <div className="h-44 border border-grid bg-terminal">
                        <Editor
                          height="100%"
                          language="python"
                          theme={theme === "dark" ? "vs-dark" : "vs"}
                          value={starterCode}
                          onChange={(val) => {
                            setStarterCode(val ?? "");
                            setIsFormDirty(true);
                          }}
                          options={{
                            fontSize: 12,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                          }}
                        />
                      </div>
                    </div>

                    {/* P1: Reference Solution (session-only) to generate expected outputs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-mono-xs uppercase text-secondary font-semibold">
                          REFERENCE SOLUTION (SESSION ONLY)
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            loading={isGeneratingExpected}
                            loadingText="RUNNING…"
                            disabled={engineState !== "ready"}
                            onClick={handleGenerateExpectedFromRef}
                          >
                            GENERATE EXPECTED
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={
                              engineState !== "ready" || isGeneratingExpected
                            }
                            onClick={handleVerifyRefSolution}
                          >
                            VERIFY
                          </Button>
                        </div>
                      </div>
                      <div className="h-44 border border-grid bg-terminal">
                        <Editor
                          height="100%"
                          language="python"
                          theme={theme === "dark" ? "vs-dark" : "vs"}
                          value={referenceSolution}
                          onChange={(val) => setReferenceSolution(val ?? "")}
                          options={{
                            fontSize: 12,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                          }}
                        />
                      </div>
                      {verifySummary && (
                        <div className="font-mono text-mono-xs text-brand-text">
                          {verifySummary}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Test Case Builder (Add/Delete/Reorder, Hidden Toggle, Whitespace Toggle) */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-mono-sm uppercase text-secondary font-semibold">
                        TEST CASES ({testCases.length})
                      </span>
                      <div className="flex items-center gap-4">
                        <Toggle
                          checked={showTestWhitespace}
                          onChange={setShowTestWhitespace}
                          label="SHOW WHITESPACE (· → ↵)"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddTestCase}
                        >
                          [+ ADD TEST CASE]
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {testCases.map((tc, index) => (
                        <div
                          key={index}
                          className="border border-grid bg-subtle p-4 space-y-3 font-mono text-mono-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                TEST #{String(index + 1).padStart(2, "0")}
                              </span>
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMoveTestCase(index, -1)}
                                className="px-1.5 py-0.5 border border-grid bg-surface text-secondary hover:text-primary disabled:opacity-40"
                                title="Move test up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={index === testCases.length - 1}
                                onClick={() => handleMoveTestCase(index, 1)}
                                className="px-1.5 py-0.5 border border-grid bg-surface text-secondary hover:text-primary disabled:opacity-40"
                                title="Move test down"
                              >
                                ▼
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <Checkbox
                                checked={tc.isHidden}
                                onChange={(val) =>
                                  handleUpdateTestCase(index, "isHidden", val)
                                }
                                label="HIDDEN"
                              />
                              {testCases.length > 1 && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleRemoveTestCase(index)}
                                >
                                  DELETE
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Textarea
                                label="INPUT (STDIN)"
                                rows={2}
                                monospace
                                value={tc.input}
                                onChange={(e) =>
                                  handleUpdateTestCase(
                                    index,
                                    "input",
                                    e.target.value
                                  )
                                }
                              />
                              {showTestWhitespace && (
                                <pre className="p-2 bg-terminal text-term-muted text-mono-xs border border-grid whitespace-pre-wrap">
                                  {formatWhitespacePreview(tc.input)}
                                </pre>
                              )}
                            </div>
                            <div className="space-y-1">
                              <Textarea
                                label="EXPECTED OUTPUT (STDOUT)"
                                rows={2}
                                monospace
                                value={tc.expectedOutput}
                                onChange={(e) =>
                                  handleUpdateTestCase(
                                    index,
                                    "expectedOutput",
                                    e.target.value
                                  )
                                }
                              />
                              {showTestWhitespace && (
                                <pre className="p-2 bg-terminal text-term-success text-mono-xs border border-grid whitespace-pre-wrap">
                                  {formatWhitespacePreview(tc.expectedOutput)}
                                </pre>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono text-mono-xs text-muted">
                        {isFormDirty
                          ? "● UNSAVED CHANGES"
                          : "✓ ALL CHANGES SAVED"}
                      </span>
                      <Button variant="primary" type="submit">
                        [✓] SAVE & PUBLISH ASSIGNMENT
                      </Button>
                    </div>
                  </div>
                </form>
              </BentoCell>
            </BentoGrid>
          </div>
        )}

        {/* ===================================================================
            TAB 2: SUBMISSIONS & ANALYTICS (MATRIX + PERFORMANCE BENTO - 7.3)
           =================================================================== */}
        {activeTab === "SUBMISSIONS" && (
          <div>
            {/* PerformanceBento: Pass Rate by Difficulty (Section 7.3) */}
            <SectionHeader
              glyph="[▲]"
              badge="PERFORMANCE ANALYTICS"
              title="Pass Rate by Difficulty & Student × Assignment Matrix"
              rightElement={
                <div className="flex items-center gap-2">
                  <Tabs
                    ariaLabel="Submission View Mode"
                    items={[
                      { id: "MATRIX", label: "MATRIX VIEW" },
                      { id: "LIST", label: "LOG VIEW" },
                    ]}
                    activeId={subViewMode}
                    onChange={(id) => setSubViewMode(id as "MATRIX" | "LIST")}
                  />
                  <Button variant="outline" size="sm" onClick={handleExportCsv}>
                    [↓] EXPORT CSV
                  </Button>
                </div>
              }
            />

            <BentoGrid cols={3}>
              {difficultyBreakdown.map((item) => (
                <BentoCell key={item.level} colSpan="md:col-span-1">
                  <div className="flex items-center justify-between mb-3">
                    <DifficultyBadge difficulty={item.level} />
                    <span className="font-mono text-mono-xs text-muted">
                      {item.assignmentCount} ASSIGNMENTS
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-2xl font-bold text-primary">
                      {item.rate}%
                    </span>
                    <span className="text-mono-xs text-success-text">
                      {buildAsciiBar(item.rate, 8)} {item.rate}%
                    </span>
                  </div>
                  <div className="font-mono text-mono-xs text-secondary mt-2">
                    {item.passedCount} passed / {item.submissionCount} total
                    submissions
                  </div>
                </BentoCell>
              ))}
            </BentoGrid>

            {/* Filter Bar */}
            <div className="p-4 bg-subtle border-b border-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Select
                label="FILTER BY CLASS"
                value={subClassFilter}
                onChange={(e) => {
                  setSubClassFilter(e.target.value);
                  setSubPage(1);
                }}
              >
                <option value="ALL">ALL 6 CLASSES (10A7 → 10A16)</option>
                {GRADE_10_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    CLASS {cls}
                  </option>
                ))}
              </Select>

              <Select
                label="FILTER BY LESSON"
                value={subLessonFilter}
                onChange={(e) => setSubLessonFilter(e.target.value)}
              >
                <option value="ALL">ALL LESSONS (16 → 31)</option>
                {PYTHON_CURRICULUM_LESSONS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.code}: {l.titleVi}
                  </option>
                ))}
              </Select>

              <Select
                label="FILTER BY STATUS"
                value={subStatusFilter}
                onChange={(e) => setSubStatusFilter(e.target.value)}
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="passed">● PASSED</option>
                <option value="failed">◆ FAILED</option>
                <option value="in_progress">◐ IN PROGRESS</option>
              </Select>

              <Input
                label="SEARCH STUDENT"
                value={subSearch}
                onChange={(e) => {
                  setSubSearch(e.target.value);
                  setSubPage(1);
                }}
                placeholder="Search by student name or email..."
              />
            </div>

            {subViewMode === "MATRIX" ? (
              /* Student × Assignment Matrix with Sticky Row & Column (Section 7.3) */
              <div className="bg-surface">
                <Table className="max-h-[600px]">
                  <TableHead>
                    <tr>
                      <TableHeaderCell
                        sortable
                        sortDirection={subSortDir}
                        onSort={() =>
                          setSubSortDir((d) => (d === "asc" ? "desc" : "asc"))
                        }
                        className="sticky left-0 z-20 bg-subtle min-w-[200px]"
                      >
                        STUDENT ({matrixStudents.length})
                      </TableHeaderCell>
                      <TableHeaderCell className="text-center">
                        CLASS
                      </TableHeaderCell>
                      {matrixAssignments.map((asgn, i) => (
                        <TableHeaderCell
                          key={asgn.id}
                          className="text-center min-w-[64px]"
                          title={asgn.title}
                        >
                          #{String(i + 1).padStart(2, "0")}
                        </TableHeaderCell>
                      ))}
                    </tr>
                  </TableHead>
                  <tbody>
                    {paginatedMatrixStudents.map((stu) => {
                      const isRowSelected =
                        inspectedSubmission?.userId === stu.uid;
                      return (
                        <TableRow key={stu.uid} selected={isRowSelected}>
                          <TableCell
                            className={`sticky left-0 z-10 font-semibold ${isRowSelected ? "bg-active" : "bg-surface"
                              }`}
                          >
                            <div className="truncate max-w-[190px]">
                              {stu.displayName}
                            </div>
                            <div className="text-muted text-mono-xs truncate">
                              {stu.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="brand">
                              {stu.className || "10A7"}
                            </Badge>
                          </TableCell>
                          {matrixAssignments.map((asgn) => {
                            const sub = submissionMap[`${stu.uid}_${asgn.id}`];
                            const status: AssignmentStatus = sub
                              ? sub.status
                              : "not_started";
                            return (
                              <TableCell
                                key={asgn.id}
                                className="text-center p-0"
                              >
                                <button
                                  type="button"
                                  disabled={!sub}
                                  onClick={() => sub && setInspectedSubmission(sub)}
                                  title={
                                    sub
                                      ? `${stu.displayName} — ${asgn.title}: ${sub.status.toUpperCase()} (Click to inspect code)`
                                      : `${stu.displayName} — ${asgn.title}: NOT STARTED`
                                  }
                                  className={`w-full py-2.5 flex items-center justify-center ${sub
                                    ? "hover:bg-subtle cursor-pointer"
                                    : "cursor-default opacity-60"
                                    }`}
                                >
                                  <StatusGlyph status={status} />
                                </button>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </tbody>
                </Table>

                {matrixStudents.length > PAGE_SIZE && (
                  <div className="p-3 bg-subtle border-t border-grid flex items-center justify-between font-mono text-mono-xs">
                    <span>
                      SHOWING {(subPage - 1) * PAGE_SIZE + 1}–
                      {Math.min(subPage * PAGE_SIZE, matrixStudents.length)} OF{" "}
                      {matrixStudents.length}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={subPage <= 1}
                        onClick={() => setSubPage((p) => p - 1)}
                      >
                        PREV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={subPage * PAGE_SIZE >= matrixStudents.length}
                        onClick={() => setSubPage((p) => p + 1)}
                      >
                        NEXT
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Detailed Submissions Log Table */
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell>STUDENT</TableHeaderCell>
                    <TableHeaderCell>CLASS</TableHeaderCell>
                    <TableHeaderCell>ASSIGNMENT</TableHeaderCell>
                    <TableHeaderCell>STATUS</TableHeaderCell>
                    <TableHeaderCell>LAST OUTPUT</TableHeaderCell>
                    <TableHeaderCell>UPDATED AT</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      ACTION
                    </TableHeaderCell>
                  </tr>
                </TableHead>
                <tbody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-8 text-center text-muted"
                      >
                        No submissions match the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((sub) => {
                      const rawAsgn = assignments.find(
                        (a) => a.id === sub.assignmentId
                      );
                      const student = users.find((u) => u.uid === sub.userId);
                      const stuClass =
                        sub.userClassName || student?.className || "10A7";
                      return (
                        <TableRow
                          key={sub.id}
                          interactive
                          selected={inspectedSubmission?.id === sub.id}
                          onClick={() => setInspectedSubmission(sub)}
                        >
                          <TableCell className="font-semibold">
                            {sub.userDisplayName ||
                              student?.displayName ||
                              sub.userId}
                          </TableCell>
                          <TableCell>
                            <Badge variant="brand">{stuClass}</Badge>
                          </TableCell>
                          <TableCell>
                            {rawAsgn ? rawAsgn.title : sub.assignmentId}
                          </TableCell>
                          <TableCell>
                            <StatusGlyph status={sub.status} showLabel />
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-muted">
                            {sub.lastExecutedOutput || "—"}
                          </TableCell>
                          <TableCell className="text-muted">
                            {new Date(sub.updatedAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInspectedSubmission(sub);
                              }}
                            >
                              VIEW CODE
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </tbody>
              </Table>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 3: OVERVIEW DASHBOARD (6 GRADE 10 CLASSES & CURRICULUM)
           =================================================================== */}
        {activeTab === "OVERVIEW" && (
          <div>
            <SectionHeader
              glyph="[📊]"
              badge="CLASS ANALYTICS // 6 GRADE 10 CLASSES"
              title="Tình hình Học tập của 6 Lớp (10A7, 10A12 → 10A16)"
            />

            <BentoGrid cols={3}>
              {classAnalytics.map((cls) => (
                <BentoCell key={cls.className} colSpan="md:col-span-1">
                  <div>
                    <div className="flex items-center justify-between font-mono text-mono-xs mb-3">
                      <Badge variant="brand">LỚP {cls.className}</Badge>
                      <span className="text-secondary">
                        Sĩ số:{" "}
                        <strong className="text-primary">
                          {cls.studentCount} HS
                        </strong>
                      </span>
                    </div>

                    <div className="mb-4 font-mono text-mono-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-secondary">PROGRESS:</span>
                        <span className="text-success-text font-bold">
                          {buildAsciiBar(cls.avgProgressPct, 8)}{" "}
                          {cls.avgProgressPct}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 bg-grid gap-[1px] border border-grid font-mono text-center text-mono-xs mb-4">
                      <div className="bg-subtle p-2.5">
                        <div className="text-secondary">REGISTERED</div>
                        <div className="text-base font-bold text-primary mt-0.5">
                          {cls.studentCount}
                        </div>
                      </div>
                      <div className="bg-subtle p-2.5">
                        <div className="text-secondary">ACTIVE</div>
                        <div className="text-base font-bold text-brand-text mt-0.5">
                          {cls.activeStudentsCount}
                        </div>
                      </div>
                      <div className="bg-subtle p-2.5">
                        <div className="text-secondary">PASSED</div>
                        <div className="text-base font-bold text-success-text mt-0.5">
                          {cls.totalPassedInClass}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-grid flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStudentClassFilter(cls.className);
                        setActiveTab("STUDENTS");
                      }}
                    >
                      STUDENTS ({cls.studentCount})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubClassFilter(cls.className);
                        setActiveTab("SUBMISSIONS");
                      }}
                    >
                      SUBMISSIONS
                    </Button>
                  </div>
                </BentoCell>
              ))}
            </BentoGrid>

            {/* Curriculum Lessons Inspection */}
            <SectionHeader
              glyph="[📚]"
              badge="CURRICULUM MODULES (BÀI 16 → BÀI 31)"
              title="Nội dung Lý thuyết theo Chuyên đề"
            />
            <div className="p-4 bg-subtle border-b border-grid flex flex-wrap gap-1.5">
              {PYTHON_CURRICULUM_LESSONS.map((l) => (
                <Button
                  key={l.id}
                  variant={selectedLessonViewId === l.id ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLessonViewId(l.id)}
                >
                  {l.code}
                </Button>
              ))}
            </div>
            <div className="p-6 bg-surface">
              <h3 className="text-h3 text-primary mb-3">
                {activeLessonTopic.titleVi}
              </h3>
              <MarkdownRenderer content={activeLessonTopic.theoryMarkdownVi} />
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: STUDENT MANAGEMENT BY CLASS (10A7, 10A12..10A16)
           =================================================================== */}
        {activeTab === "STUDENTS" && (
          <div>
            <SectionHeader
              glyph="[👥]"
              badge="STUDENT ROSTER MANAGEMENT"
              title="Quản lý Tài khoản Học sinh theo Lớp"
              rightElement={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordsInTable((p) => !p)}
                >
                  {showPasswordsInTable ? "HIDE PASSWORDS" : "SHOW PASSWORDS"}
                </Button>
              }
            />

            <div className="p-4 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  variant={studentClassFilter === "ALL" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setStudentClassFilter("ALL")}
                >
                  ALL ({studentList.length})
                </Button>
                {GRADE_10_CLASSES.map((cls) => {
                  const count = studentList.filter(
                    (s) => (s.className || "10A7") === cls
                  ).length;
                  return (
                    <Button
                      key={cls}
                      variant={
                        studentClassFilter === cls ? "primary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStudentClassFilter(cls)}
                    >
                      {cls} ({count})
                    </Button>
                  );
                })}
              </div>

              <div className="w-full sm:w-72">
                <Input
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search student by name or @username..."
                  aria-label="Search students"
                />
              </div>
            </div>

            <BentoGrid cols={12}>
              <BentoCell colSpan="md:col-span-4">
                <form onSubmit={handleSaveStudent} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-grid pb-3">
                    <SectionBadge
                      glyph="◆"
                      label={
                        editingStudentUid ? "EDIT STUDENT" : "ADD NEW STUDENT"
                      }
                      className="mb-0"
                    />
                    {editingStudentUid && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetStudentForm}
                      >
                        [+ NEW]
                      </Button>
                    )}
                  </div>

                  <Input
                    label="1. USERNAME"
                    required
                    value={stuUsername}
                    onChange={(e) => setStuUsername(e.target.value)}
                    placeholder="e.g. an10a7"
                  />

                  <Input
                    label="2. FULL NAME"
                    required
                    value={stuFullName}
                    onChange={(e) => setStuFullName(e.target.value)}
                    placeholder="e.g. Nguyễn Minh An"
                  />

                  <Select
                    label="3. CLASS"
                    value={stuClassName}
                    onChange={(e) => setStuClassName(e.target.value)}
                  >
                    {GRADE_10_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </Select>

                  <Input
                    label="4. PASSWORD"
                    required
                    value={stuPassword}
                    onChange={(e) => setStuPassword(e.target.value)}
                  />

                  <Button variant="primary" type="submit" className="w-full">
                    {editingStudentUid ? "UPDATE STUDENT" : "ADD STUDENT"}
                  </Button>
                </form>
              </BentoCell>

              <BentoCell colSpan="md:col-span-8" noPadding>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeaderCell>#</TableHeaderCell>
                      <TableHeaderCell>FULL NAME</TableHeaderCell>
                      <TableHeaderCell>USERNAME / PASSWORD</TableHeaderCell>
                      <TableHeaderCell>CLASS</TableHeaderCell>
                      <TableHeaderCell>PROGRESS</TableHeaderCell>
                      <TableHeaderCell className="text-right">
                        ACTIONS
                      </TableHeaderCell>
                    </tr>
                  </TableHead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-8 text-center text-muted"
                        >
                          No students found in this filter.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((stu, idx) => {
                        const st = getStudentStats(stu.uid);
                        const uname =
                          stu.username || stu.uid.replace(/^usr_/, "");
                        return (
                          <TableRow
                            key={stu.uid}
                            selected={editingStudentUid === stu.uid}
                          >
                            <TableCell className="text-muted">
                              #{idx + 1}
                            </TableCell>
                            <TableCell className="font-bold">
                              {stu.displayName}
                            </TableCell>
                            <TableCell>
                              <div className="text-brand-text font-semibold">
                                @{uname}
                              </div>
                              <div className="text-secondary">
                                PW:{" "}
                                {showPasswordsInTable
                                  ? stu.password || "123456"
                                  : "••••••"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="brand">
                                {stu.className || "10A7"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-success-text font-semibold">
                                {st.passedCount}/{totalAssignments}{" "}
                                {buildAsciiBar(st.progressPct, 6)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right space-x-1 whitespace-nowrap">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setInspectedStudentProfile(stu)}
                              >
                                REPORT CARD
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditStudentClick(stu)}
                              >
                                EDIT
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteStudent(stu)}
                              >
                                ✕
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </BentoCell>
            </BentoGrid>
          </div>
        )}
      </BentoSection>

      {/* Confirm Delete Assignment Dialog (Section 7.2: requireText = assignment title) */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetAsgn)}
        onClose={() => setDeleteTargetAsgn(null)}
        onConfirm={handleConfirmDeleteAssignment}
        title="Delete Assignment"
        description={
          deleteTargetAsgn
            ? `Permanently delete "${deleteTargetAsgn.title}"? Type the exact assignment title below to confirm.`
            : ""
        }
        requireText={deleteTargetAsgn?.title}
        confirmLabel="DELETE ASSIGNMENT"
        variant="danger"
      />

      {/* MODAL: STUDENT REPORT CARD */}
      <Modal
        isOpen={Boolean(inspectedStudentProfile)}
        onClose={() => setInspectedStudentProfile(null)}
        title={
          inspectedStudentProfile
            ? `${inspectedStudentProfile.displayName} (${inspectedStudentProfile.className || "10A7"
            })`
            : "Student Report Card"
        }
        badgeLabel="STUDENT REPORT CARD"
        maxWidthClass="max-w-3xl"
      >
        {inspectedStudentProfile && (
          <div className="divide-y divide-grid border border-grid font-mono text-mono-xs">
            {assignments.map((asgn) => {
              const sub =
                submissionMap[`${inspectedStudentProfile.uid}_${asgn.id}`];
              const status: AssignmentStatus = sub ? sub.status : "not_started";
              return (
                <div
                  key={asgn.id}
                  className="p-3 bg-surface flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <StatusGlyph status={status} />
                    <span className="font-semibold text-primary">
                      {asgn.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusGlyph status={status} showLabel />
                    {sub && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInspectedSubmission(sub)}
                      >
                        VIEW CODE
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Modal>

      {/* MODAL: SUBMISSION VIEWER (P0 Section 7.3 — Read-Only Monaco Editor + Output + Status + UpdatedAt) */}
      <Modal
        isOpen={Boolean(inspectedSubmission)}
        onClose={() => setInspectedSubmission(null)}
        title={
          inspectedSubmission
            ? `Submission // ${inspectedSubmission.userDisplayName ||
            inspectedSubmission.userId
            }`
            : "Submission Viewer"
        }
        badgeLabel="READ-ONLY SUBMISSION SNAPSHOT"
        maxWidthClass="max-w-3xl"
      >
        {inspectedSubmission && (
          <div className="space-y-4 font-mono text-mono-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-subtle border border-grid">
              <div className="flex items-center gap-3">
                <StatusGlyph status={inspectedSubmission.status} showLabel />
                <span className="text-secondary">
                  ASSIGNMENT:{" "}
                  <strong className="text-primary">
                    {assignments.find(
                      (a) => a.id === inspectedSubmission.assignmentId
                    )?.title || inspectedSubmission.assignmentId}
                  </strong>
                </span>
              </div>
              <span className="text-muted">
                UPDATED:{" "}
                {new Date(inspectedSubmission.updatedAt).toLocaleString()}
              </span>
            </div>

            <div>
              <div className="text-secondary uppercase font-semibold mb-1.5">
                SUBMITTED PYTHON CODE (READ-ONLY MONACO)
              </div>
              <div className="h-72 border border-grid bg-terminal">
                <Editor
                  height="100%"
                  language="python"
                  theme={theme === "dark" ? "vs-dark" : "vs"}
                  value={inspectedSubmission.code}
                  options={{
                    readOnly: true,
                    fontSize: 13,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="text-secondary uppercase font-semibold mb-1.5">
                LAST EXECUTED OUTPUT (STDOUT)
              </div>
              <pre className="p-3 bg-terminal text-term-success border border-grid overflow-x-auto whitespace-pre-wrap">
                {inspectedSubmission.lastExecutedOutput || "(empty output)"}
              </pre>
            </div>
          </div>
        )}
      </Modal>

      <FirebaseConfigModal
        isOpen={firebaseModalOpen}
        onClose={() => setFirebaseModalOpen(false)}
      />
    </div>
  );
};
