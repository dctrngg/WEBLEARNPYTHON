import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CloudDownload,
  CloudUpload,
  Code,
  Download,
  Eye,
  EyeOff,
  FileSpreadsheet,
  HelpCircle,
  LoaderCircle,
  Pencil,
  Play,
  Plus,
  Presentation,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Settings,
  Trash2,
  TriangleAlert,
  UserPlus,
  Users,
  X,
} from "lucide-react";
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
  pushAssignmentsToCloud,
  saveAssignment,
  seedCloudFirestoreData,
  syncAssignmentsFromCloud,
  upsertUserProfile,
} from "../services/firestoreService";
import {
  exportGradesToCSV,
  exportGradesDetailedCSV,
} from "../services/gradeExportService";
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
import { AssignmentStatus } from "../components/ui/StatusGlyph";
import {
  ConfirmDialog,
  Modal,
  useToast,
} from "../components/ui/Primitives";

type AdminTab = "ASSIGNMENTS" | "SUBMISSIONS" | "OVERVIEW" | "STUDENTS";

const STATUS_CHIP_META: Record<
  AssignmentStatus,
  { label: string; chipClass: string; symbol: string }
> = {
  passed: { label: "Đạt", chipClass: "chip-success", symbol: "✓" },
  failed: { label: "Chưa đạt", chipClass: "chip-danger", symbol: "✗" },
  in_progress: { label: "Đang làm", chipClass: "chip-warn", symbol: "⋯" },
  not_started: { label: "Chưa nộp", chipClass: "chip-neutral", symbol: "—" },
};

const DIFFICULTY_META: Record<
  DifficultyLevel,
  { vi: string; en: string; chipClass: string }
> = {
  Beginner: {
    vi: "Cơ bản",
    en: "Beginner",
    chipClass: "chip chip-success font-medium",
  },
  Intermediate: {
    vi: "Trung bình",
    en: "Intermediate",
    chipClass: "chip chip-warn font-medium",
  },
  Advanced: {
    vi: "Nâng cao",
    en: "Advanced",
    chipClass: "chip chip-danger font-medium",
  },
};

const TAB_META: Record<AdminTab, { vi: string; en: string; icon: any }> = {
  ASSIGNMENTS: {
    vi: "Quản lý Bài tập",
    en: "Assignments",
    icon: Code,
  },
  SUBMISSIONS: {
    vi: "Bảng điểm & Bài nộp",
    en: "Gradebook & Submissions",
    icon: FileSpreadsheet,
  },
  OVERVIEW: {
    vi: "Tổng quan Lớp học",
    en: "Class Overview",
    icon: BookOpen,
  },
  STUDENTS: {
    vi: "Danh sách Học sinh",
    en: "Student Accounts",
    icon: Users,
  },
};

function formatVisibleWhitespace(str: string): string {
  return (str || "")
    .replace(/ /g, "·")
    .replace(/	/g, "→ ")
    .replace(/\r?\n/g, "↵\\n");
}

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { lang, t } = useLanguage();
  const { engineState, runTests } = usePyodide();
  const { pushToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>("ASSIGNMENTS");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firebaseModalOpen, setFirebaseModalOpen] = useState<boolean>(false);

  // --- TAB: ASSIGNMENTS (STUDIO) STATE ---
  const [asgnSearch, setAsgnSearch] = useState<string>("");
  const [asgnLessonFilter, setAsgnLessonFilter] = useState<string>("ALL");
  const [asgnDifficultyFilter, setAsgnDifficultyFilter] =
    useState<string>("ALL");
  const [asgnPage, setAsgnPage] = useState<number>(1);
  const ASGN_PAGE_SIZE = 25;

  // Assignment Editor Modal State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState<boolean>(false);
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

  // Reference Solution & Testing in modal
  const [referenceSolution, setReferenceSolution] = useState<string>(
    "# Lời giải mẫu của giáo viên (chỉ lưu trong phiên làm việc)\nn = int(input())\nprint(n * 2)\n"
  );
  const [isGeneratingExpected, setIsGeneratingExpected] =
    useState<boolean>(false);
  const [isVerifyingTests, setIsVerifyingTests] = useState<boolean>(false);
  const [verifySummary, setVerifySummary] = useState<string | null>(null);
  const [testRunResults, setTestRunResults] = useState<any[] | null>(null);

  // Delete Assignment ConfirmDialog
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
  const MATRIX_PAGE_SIZE = 50;
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
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [inspectedStudentProfile, setInspectedStudentProfile] =
    useState<UserProfile | null>(null);

  // Warn before unload if assignment form has unsaved edits
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

  const loadDashboardData = async (forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      const [asgnData, subData, usrData] = await Promise.all([
        getAssignments(forceRefresh),
        getAllSubmissions(),
        getAllUsers(),
      ]);
      setAssignments(asgnData);
      setSubmissions(subData);
      setUsers(usrData);
    } catch (err) {
      console.error("[InstructorDashboard] Load error:", err);
      pushToast(t("Lỗi tải dữ liệu", "Failed to load dashboard data"), "danger");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const studentList = useMemo(
    () => users.filter((u) => u.role === "student"),
    [users]
  );

  const activeStudentCount = useMemo(() => {
    const activeUids = new Set(submissions.map((s) => s.userId));
    return studentList.filter((s) => activeUids.has(s.uid)).length;
  }, [studentList, submissions]);

  const overallPassRate = useMemo(() => {
    if (submissions.length === 0) return 0;
    const passed = submissions.filter((s) => s.status === "passed").length;
    return Math.round((passed / submissions.length) * 100);
  }, [submissions]);

  const populateFormWithAssignment = (
    asgn: Assignment,
    markDirty: boolean = false
  ) => {
    setEditingId(asgn.id);
    setLessonId(asgn.lessonId || "bai_16");
    setGlyph(asgn.glyph || "●");
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
    setTestRunResults(null);
    setIsFormDirty(markDirty);
  };

  const handleOpenEditModal = (asgn: Assignment) => {
    populateFormWithAssignment(asgn, false);
    setIsEditorModalOpen(true);
  };

  const handleInitNewAssignment = () => {
    if (
      isFormDirty &&
      !window.confirm(
        t(
          "Huỷ các thay đổi chưa lưu của bài tập hiện tại?",
          "Discard unsaved changes to current assignment?"
        )
      )
    ) {
      return;
    }
    const defaultLesson =
      asgnLessonFilter !== "ALL" ? asgnLessonFilter : "bai_16";
    setEditingId(null);
    setLessonId(defaultLesson);
    setGlyph("●");
    setTitle(
      t(
        `Bài tập mới (Luyện tập Tin học 10)`,
        `New assignment (Grade 10 Practice)`
      )
    );
    setDifficulty("Beginner");
    setDescription(
      `### Đề bài\nViết chương trình Python giải quyết yêu cầu sau.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên hoặc chuỗi ký tự.\n\n### Kết quả ra (Output)\nIn ra màn hình kết quả theo mẫu.`
    );
    setStarterCode(`# Viết mã Python tại đây\n`);
    setTestCases([
      { input: "10", expectedOutput: "20", isHidden: false },
      { input: "25", expectedOutput: "50", isHidden: true },
    ]);
    setVerifySummary(null);
    setTestRunResults(null);
    setIsFormDirty(false);
    setIsEditorModalOpen(true);
  };

  const handleSaveAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
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
      setIsEditorModalOpen(false);
      pushToast(
        t(`Đã lưu bài tập "${saved.title}"`, `Saved assignment "${saved.title}"`),
        "success"
      );
    } catch (err: any) {
      pushToast(
        t(`Lỗi lưu bài tập: ${err?.message || err}`, `Save error: ${err}`),
        "danger"
      );
    }
  };

  const handleConfirmDeleteAssignment = async () => {
    if (!deleteTargetAsgn) return;
    try {
      await deleteAssignmentById(deleteTargetAsgn.id);
      const removedTitle = deleteTargetAsgn.title;
      setDeleteTargetAsgn(null);
      setIsFormDirty(false);

      const updated = await getAssignments();
      setAssignments(updated);
      pushToast(
        t(`Đã xoá "${removedTitle}"`, `Deleted "${removedTitle}"`),
        "danger"
      );
    } catch (err: any) {
      pushToast(
        t(`Lỗi xoá bài tập: ${err?.message || err}`, `Delete error: ${err}`),
        "danger"
      );
    }
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

  const handleGenerateExpectedFromRef = async () => {
    if (engineState !== "ready" || !referenceSolution.trim()) return;
    setIsGeneratingExpected(true);
    setVerifySummary(null);
    const results = await runTests(referenceSolution, testCases);
    setIsGeneratingExpected(false);

    const hasError = results.some((r) => Boolean(r.stderr));
    if (hasError) {
      pushToast(
        t("Lời giải mẫu gặp lỗi khi chạy", "Reference code raised an error"),
        "danger"
      );
      setVerifySummary(
        t(
          `Lời giải mẫu gặp lỗi ở test #${results.find((r) => r.stderr)?.index}`,
          `Reference solution failed on test #${results.find((r) => r.stderr)?.index}`
        )
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
    setVerifySummary(
      t(
        `Đã sinh kết quả mẫu cho ${results.length} test`,
        `Generated expected outputs for ${results.length} tests`
      )
    );
    pushToast(
      t(
        `Đã sinh kết quả mẫu (${results.length} test)`,
        `Generated expected outputs (${results.length} tests)`
      ),
      "success"
    );
  };

  const handleVerifyRefSolution = async () => {
    if (engineState !== "ready") return;
    const codeToTest = referenceSolution.trim() || starterCode.trim();
    if (!codeToTest) {
      pushToast(
        t("Chưa có code để chạy thử", "No code provided to test"),
        "warn"
      );
      return;
    }

    setIsVerifyingTests(true);
    setVerifySummary(null);
    try {
      const results = await runTests(codeToTest, testCases);
      setTestRunResults(results);
      const passedCount = results.filter((r) => r.passed).length;
      const total = results.length;
      if (passedCount === total) {
        setVerifySummary(`100% ĐẠT (${passedCount}/${total} test)`);
        pushToast(
          t(
            `Chạy thử thành công 100% (${passedCount}/${total} test pass)`,
            `All ${total} tests passed!`
          ),
          "success"
        );
      } else {
        setVerifySummary(`Đạt ${passedCount}/${total} test`);
        pushToast(
          t(
            `Chỉ đạt ${passedCount}/${total} test`,
            `Passed ${passedCount}/${total} tests`
          ),
          "warn"
        );
      }
    } catch (err: any) {
      setVerifySummary(`Lỗi: ${err?.message || err}`);
      pushToast(t("Lỗi khi kiểm tra", "Test execution failed"), "danger");
    } finally {
      setIsVerifyingTests(false);
    }
  };

  // Student accounts management
  const handleEditStudentClick = (stu: UserProfile) => {
    setEditingStudentUid(stu.uid);
    setStuUsername(stu.username || stu.uid);
    setStuFullName(stu.displayName);
    setStuClassName(stu.className || GRADE_10_CLASSES[0]);
    setStuPassword(stu.password || "123456");
    setIsStudentModalOpen(true);
  };

  const handleResetStudentForm = () => {
    setEditingStudentUid(null);
    setStuUsername("");
    setStuFullName("");
    setStuClassName(GRADE_10_CLASSES[0]);
    setStuPassword("123456");
    setIsStudentModalOpen(false);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const uname = normalizeUsername(stuUsername);
    if (!uname || !stuFullName.trim()) {
      pushToast(
        t(
          "Vui lòng điền đầy đủ thông tin học sinh",
          "Please fill in all student information"
        ),
        "warn"
      );
      return;
    }

    const uid = editingStudentUid || `usr_${uname}`;
    const profile: UserProfile = {
      uid,
      username: uname,
      email: `${uname}@python.edu.vn`,
      displayName: stuFullName.trim(),
      className: stuClassName,
      password: stuPassword || "123456",
      role: "student",
      createdAt: new Date().toISOString(),
    };

    await upsertUserProfile(profile);
    await loadDashboardData();
    handleResetStudentForm();
    pushToast(
      t(`Đã lưu tài khoản "${profile.displayName}"`, `Saved user "${profile.displayName}"`),
      "success"
    );
  };

  const handleDeleteStudent = async (stu: UserProfile) => {
    const ok = window.confirm(
      t(
        `Xác nhận xoá tài khoản học sinh "${stu.displayName}" (${stu.username})?`,
        `Confirm delete student "${stu.displayName}"?`
      )
    );
    if (!ok) return;

    await deleteUserById(stu.uid);
    await loadDashboardData();
    pushToast(
      t(`Đã xoá học sinh "${stu.displayName}"`, `Deleted student "${stu.displayName}"`),
      "danger"
    );
  };

  const handleForcePullFirestore = async () => {
    pushToast(
      t("Đang tải dữ liệu từ Cloud…", "Pulling data from Cloud…"),
      "info"
    );
    const res = await syncAssignmentsFromCloud();
    if (res.success) {
      await loadDashboardData(true);
      pushToast(
        t(
          `Đã tải thành công ${res.count} bài tập từ Cloud`,
          `Successfully pulled ${res.count} assignments from Cloud`
        ),
        "success"
      );
    } else {
      pushToast(
        t(`Lỗi đồng bộ: ${res.error}`, `Sync error: ${res.error}`),
        "danger"
      );
    }
  };

  const handlePushCurrentToCloud = async () => {
    pushToast(
      t(
        "Đang đẩy toàn bộ bài tập hiện tại lên Cloud…",
        "Pushing current assignments to Cloud…"
      ),
      "info"
    );
    const res = await pushAssignmentsToCloud(assignments);
    if (res.success) {
      await loadDashboardData(true);
      pushToast(
        t(
          `Đã lưu và đồng bộ ${res.count} bài tập lên Cloud`,
          `Saved and synced ${res.count} assignments to Cloud`
        ),
        "success"
      );
    } else {
      pushToast(
        t(`Lỗi đẩy dữ liệu: ${res.error}`, `Push error: ${res.error}`),
        "danger"
      );
    }
  };

  const handleResetSeedData = async () => {
    const ok = window.confirm(
      t(
        "Cảnh báo: Thao tác này sẽ nạp lại toàn bộ 145 bài tập mẫu từ mã nguồn lên Cloud.\n\nMọi bài tập đã xoá hoặc chỉnh sửa sẽ được khôi phục về trạng thái chuẩn.\n\nBạn có chắc chắn muốn khôi phục dữ liệu mẫu không?",
        "Warning: This will restore all 145 default assignments from source to Cloud.\n\nAny deleted or edited assignments will be restored.\n\nAre you sure you want to restore default seed data?"
      )
    );
    if (!ok) return;

    pushToast(
      t("Đang khôi phục dữ liệu mẫu…", "Restoring default seed data…"),
      "info"
    );
    const res = await seedCloudFirestoreData();
    if (res.success) {
      await loadDashboardData(true);
      pushToast(
        t(
          `Đã khôi phục thành công ${res.count} bài tập mẫu`,
          `Successfully restored ${res.count} default assignments`
        ),
        "success"
      );
    } else {
      pushToast(
        t(`Lỗi khôi phục: ${res.error}`, `Restore error: ${res.error}`),
        "danger"
      );
    }
  };

  // Submission lookup map
  const submissionMap = useMemo(() => {
    const map: Record<string, Submission> = {};
    submissions.forEach((s) => {
      const key = `${s.userId}_${s.assignmentId}`;
      if (
        !map[key] ||
        new Date(s.updatedAt) > new Date(map[key].updatedAt)
      ) {
        map[key] = s;
      }
    });
    return map;
  }, [submissions]);

  // Pass rate by difficulty
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
      assignments.length > 0
        ? Math.round((passedSet.size / assignments.length) * 100)
        : 0;
    return {
      passedCount: passedSet.size,
      totalSubmissions: stuSubs.length,
      progressPct: pct,
    };
  };

  // Class analytics for Overview tab
  const classAnalytics = useMemo(() => {
    return GRADE_10_CLASSES.map((cls) => {
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
  }, [GRADE_10_CLASSES, studentList, submissions, assignments]);

  // Filtered assignments for Tab 1 (Table Studio)
  const builderFilteredAssignments = useMemo(() => {
    const q = asgnSearch.trim().toLowerCase();
    return assignments.filter((a) => {
      const matchLesson =
        asgnLessonFilter === "ALL" || a.lessonId === asgnLessonFilter;
      if (!matchLesson) return false;
      const matchDiff =
        asgnDifficultyFilter === "ALL" || a.difficulty === asgnDifficultyFilter;
      if (!matchDiff) return false;
      if (!q) return true;
      const loc = localizeAssignment(a, lang);
      return (
        loc.title.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [assignments, asgnSearch, asgnLessonFilter, asgnDifficultyFilter, lang]);

  const totalAsgnPages = Math.max(
    1,
    Math.ceil(builderFilteredAssignments.length / ASGN_PAGE_SIZE)
  );

  const paginatedAssignments = useMemo(() => {
    const start = (asgnPage - 1) * ASGN_PAGE_SIZE;
    return builderFilteredAssignments.slice(start, start + ASGN_PAGE_SIZE);
  }, [builderFilteredAssignments, asgnPage]);

  // Filtered students for Matrix & Roster
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
    const start = (subPage - 1) * MATRIX_PAGE_SIZE;
    return matrixStudents.slice(start, start + MATRIX_PAGE_SIZE);
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
      const matchSearch =
        !q ||
        (sub.userDisplayName || "").toLowerCase().includes(q) ||
        (asgn?.title || "").toLowerCase().includes(q) ||
        sub.assignmentId.toLowerCase().includes(q);

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

  // Export CSV
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
  const filteredStudents = useMemo(() => {
    return studentList.filter((stu) => {
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
  }, [studentList, studentClassFilter, studentSearch]);

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      <TopNavigationBar
        breadcrumb={t("Quản trị", "Instructor")}
        engineState={engineState}
        engineStatusText={t("Bàn làm việc giáo viên", "Instructor studio")}
      />

      <BentoSection className="max-w-screen-2xl flex-1 w-full py-6 space-y-6">
        {/* TEACHER ACTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 card bg-surface">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-primary">
                {t("BÀN LÀM VIỆC GIÁO VIÊN", "INSTRUCTOR DASHBOARD")}
              </h1>
              <span
                className={
                  isFirebaseConfigured
                    ? "chip chip-success font-medium"
                    : "chip chip-neutral font-medium"
                }
              >
                <span
                  className={`status-dot ${
                    isFirebaseConfigured ? "bg-success" : "bg-grid-strong"
                  }`}
                />
                {isFirebaseConfigured
                  ? t("Firebase Cloud: Đã kết nối", "Firebase Cloud: Connected")
                  : t("Chế độ Offline LocalStorage", "Local Offline Mode")}
              </span>
            </div>
            <p className="text-xs text-muted mt-1">
              {t(
                "Quản lý 145 bài tập Python thực tế, theo dõi tiến độ nộp bài và quản lý tài khoản học sinh khối 10",
                "Manage 145 practical Python assignments, monitor live submissions and manage grade-10 student accounts"
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => loadDashboardData(true)}
              title={t("Làm mới dữ liệu từ hệ thống", "Refresh all data")}
              className="btn btn-secondary btn-sm"
            >
              <RefreshCw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />
              <span>{t("Làm mới", "Refresh")}</span>
            </button>

            <Link
              to="/projector"
              className="btn btn-secondary btn-sm"
              title={t(
                "Mở chế độ máy chiếu phóng to cho lớp học",
                "Open classroom projector mode"
              )}
            >
              <Presentation size={14} />
              <span>{t("Máy chiếu (F11)", "Projector")}</span>
            </Link>

            <div className="h-4 w-px bg-grid mx-1 hidden sm:block" />

            <button
              type="button"
              onClick={handleForcePullFirestore}
              title={t(
                "Tải bài tập mới nhất từ Cloud Firestore",
                "Pull assignments from Cloud"
              )}
              className="btn btn-ghost btn-sm"
            >
              <CloudDownload size={14} />
              <span>{t("Kéo Cloud", "Pull")}</span>
            </button>

            <button
              type="button"
              onClick={handlePushCurrentToCloud}
              title={t(
                "Đồng bộ toàn bộ bài tập hiện tại lên Cloud Firestore",
                "Push current assignments to Cloud"
              )}
              className="btn btn-ghost btn-sm"
            >
              <CloudUpload size={14} />
              <span>{t("Đẩy lên Cloud", "Push")}</span>
            </button>

            <button
              type="button"
              onClick={handleResetSeedData}
              title={t(
                "Khôi phục bộ 145 bài tập chuẩn từ mã nguồn lên Cloud",
                "Restore 145 default assignments from source"
              )}
              className="btn btn-ghost btn-sm text-secondary hover:text-danger"
            >
              <RotateCcw size={14} />
              <span>{t("Khôi phục gốc", "Restore")}</span>
            </button>

            <button
              type="button"
              onClick={() => setFirebaseModalOpen(true)}
              title={t("Cài đặt kết nối Cloud Firestore", "Cloud settings")}
              className="btn btn-ghost btn-sm btn-icon"
              aria-label={t("Cài đặt Cloud", "Cloud settings")}
            >
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* 1. TOP METRICS STRIP (CLEAN & SPACIOUS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Assignments */}
          <div className="card p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {t("Kho bài tập Tin học 10", "Assignment Repository")}
              </span>
              <span className="chip chip-brand font-medium tabular-nums">
                16 {t("bài học", "lessons")}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <strong className="text-3xl font-bold tabular-nums text-primary">
                {assignments.length}
              </strong>
              <span className="text-xs text-muted">
                {t("bài thực hành", "exercises")}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-grid text-xs text-secondary">
              <span className="text-success font-medium">
                {assignments.filter((a) => a.difficulty === "Beginner").length}{" "}
                Cơ bản
              </span>
              <span>•</span>
              <span className="text-warn font-medium">
                {
                  assignments.filter((a) => a.difficulty === "Intermediate")
                    .length
                }{" "}
                T.Bình
              </span>
              <span>•</span>
              <span className="text-danger font-medium">
                {assignments.filter((a) => a.difficulty === "Advanced").length}{" "}
                Nâng cao
              </span>
            </div>
          </div>

          {/* Card 2: Students */}
          <div className="card p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {t("Sĩ số học sinh", "Student Enrollment")}
              </span>
              <span className="chip chip-brand font-medium">
                {GRADE_10_CLASSES.length} {t("lớp", "classes")}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <strong className="text-3xl font-bold tabular-nums text-primary">
                {studentList.length}
              </strong>
              <span className="text-xs text-muted">
                {t("tài khoản học sinh", "registered")}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-grid text-xs text-secondary">
              <span>{t("Đang làm bài:", "Active:")}</span>
              <span className="font-semibold text-primary tabular-nums">
                {activeStudentCount} / {studentList.length} (
                {studentList.length > 0
                  ? Math.round((activeStudentCount / studentList.length) * 100)
                  : 0}
                %)
              </span>
            </div>
          </div>

          {/* Card 3: Submissions */}
          <div className="card p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {t("Lượt nộp bài", "Total Submissions")}
              </span>
              <span
                className={`chip font-medium tabular-nums ${
                  overallPassRate >= 70 ? "chip-success" : "chip-warn"
                }`}
              >
                {overallPassRate}% {t("đạt", "pass rate")}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <strong className="text-3xl font-bold tabular-nums text-primary">
                {submissions.length}
              </strong>
              <span className="text-xs text-muted">
                {t("lượt chấm", "evaluated")}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-grid text-xs text-secondary">
              <div className="flex-1 h-1.5 rounded-full bg-subtle overflow-hidden mr-3">
                <div
                  className="h-full bg-success transition-[width] duration-300"
                  style={{ width: `${overallPassRate}%` }}
                />
              </div>
              <span className="tabular-nums font-medium text-primary">
                {submissions.filter((s) => s.status === "passed").length} đạt
              </span>
            </div>
          </div>

          {/* Card 4: Evaluation Engine */}
          <div className="card p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {t("Máy chấm Pyodide", "Evaluation Engine")}
              </span>
              <span
                className={
                  engineState === "ready"
                    ? "chip chip-success font-medium"
                    : "chip chip-warn font-medium"
                }
              >
                <span
                  className={`status-dot ${
                    engineState === "ready" ? "bg-success" : "bg-warn"
                  }`}
                />
                {engineState === "ready" ? "Sẵn sàng" : "Đang khởi tạo"}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <strong className="text-xl font-bold text-primary">
                CPython 3.12
              </strong>
              <span className="text-xs text-muted">WebAssembly</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-grid text-xs text-secondary">
              <span>{t("Chấm bài:", "Execution:")}</span>
              <span className="text-success font-medium">
                100% Client Offline
              </span>
            </div>
          </div>
        </div>

        {/* 2. PRIMARY INSTRUCTOR TABS NAVIGATION */}
        <div
          role="tablist"
          aria-label={t("Điều hướng chức năng giáo viên", "Instructor tabs")}
          className="segmented w-full flex-wrap"
        >
          {(
            [
              "ASSIGNMENTS",
              "SUBMISSIONS",
              "OVERVIEW",
              "STUDENTS",
            ] as AdminTab[]
          ).map((tab) => {
            const meta = TAB_META[tab];
            const Icon = meta.icon;
            const isSel = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isSel}
                onClick={() => setActiveTab(tab)}
                className={`segmented-item flex-1 min-w-[150px] py-2.5 text-sm font-semibold flex items-center justify-center gap-2 ${
                  isSel ? "text-primary bg-surface shadow-sm" : "text-secondary"
                }`}
              >
                <Icon size={16} />
                <span>{t(meta.vi, meta.en)}</span>
              </button>
            );
          })}
        </div>

        {/* ===================================================================
            TAB 1: ASSIGNMENTS MANAGEMENT (FULL-WIDTH STUDIO & MODAL EDITOR)
           =================================================================== */}
        {activeTab === "ASSIGNMENTS" && (
          <div className="space-y-4">
            {/* Header & Filter Toolbar */}
            <div className="card p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-primary">
                    {t("Danh sách bài tập", "Assignment Catalog")} (
                    {builderFilteredAssignments.length} / {assignments.length}{" "}
                    {t("bài", "items")})
                  </h2>
                  <p className="text-xs text-muted">
                    {t(
                      "Quản lý 145 bài tập từ Bài 16 đến Bài 31 SGK Tin học 10",
                      "Manage 145 assignments across Lesson 16 to Lesson 31"
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleInitNewAssignment}
                  className="btn btn-primary btn-sm flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus size={16} />
                  <span>{t("Tạo bài tập mới", "New assignment")}</span>
                </button>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-grid">
                {/* Search */}
                <div className="md:col-span-4 relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="text"
                    value={asgnSearch}
                    onChange={(e) => {
                      setAsgnSearch(e.target.value);
                      setAsgnPage(1);
                    }}
                    placeholder={t(
                      "Tìm bài tập theo tên hoặc mã…",
                      "Search assignments…"
                    )}
                    className="input pl-9 h-9 text-sm w-full"
                  />
                </div>

                {/* Lesson Filter */}
                <div className="md:col-span-5 flex items-center gap-2">
                  <label
                    htmlFor="asgn-lesson-sel"
                    className="text-xs font-medium text-secondary shrink-0"
                  >
                    {t("Bài học:", "Lesson:")}
                  </label>
                  <select
                    id="asgn-lesson-sel"
                    value={asgnLessonFilter}
                    onChange={(e) => {
                      setAsgnLessonFilter(e.target.value);
                      setAsgnPage(1);
                    }}
                    className="input h-9 text-xs flex-1"
                  >
                    <option value="ALL">
                      {t(
                        `Tất cả bài học (${assignments.length} bài)`,
                        `All lessons (${assignments.length} items)`
                      )}
                    </option>
                    {PYTHON_CURRICULUM_LESSONS.map((l) => {
                      const count = assignments.filter(
                        (a) => a.lessonId === l.id
                      ).length;
                      return (
                        <option key={l.id} value={l.id}>
                          {l.code}: {l.titleVi} ({count} bài)
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="md:col-span-3 flex items-center gap-2">
                  <label
                    htmlFor="asgn-diff-sel"
                    className="text-xs font-medium text-secondary shrink-0"
                  >
                    {t("Độ khó:", "Difficulty:")}
                  </label>
                  <select
                    id="asgn-diff-sel"
                    value={asgnDifficultyFilter}
                    onChange={(e) => {
                      setAsgnDifficultyFilter(e.target.value);
                      setAsgnPage(1);
                    }}
                    className="input h-9 text-xs flex-1"
                  >
                    <option value="ALL">{t("Tất cả mức độ", "All levels")}</option>
                    <option value="Beginner">{t("Cơ bản", "Beginner")}</option>
                    <option value="Intermediate">
                      {t("Trung bình", "Intermediate")}
                    </option>
                    <option value="Advanced">{t("Nâng cao", "Advanced")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Assignments Full-Width Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-subtle/80 border-b border-grid text-secondary text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 font-semibold min-w-[120px]">
                        {t("Mã & Bài học", "Code & Lesson")}
                      </th>
                      <th className="px-4 py-3 font-semibold min-w-[280px]">
                        {t("Tên bài tập", "Assignment Title")}
                      </th>
                      <th className="px-3 py-3 font-semibold text-center min-w-[100px]">
                        {t("Mức độ", "Difficulty")}
                      </th>
                      <th className="px-3 py-3 font-semibold text-center min-w-[110px]">
                        {t("Bộ test", "Test cases")}
                      </th>
                      <th className="px-3 py-3 font-semibold text-center min-w-[110px]">
                        {t("Học sinh đạt", "Passed")}
                      </th>
                      <th className="px-4 py-3 font-semibold text-right min-w-[140px]">
                        {t("Thao tác", "Actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grid">
                    {paginatedAssignments.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted text-sm"
                        >
                          {t(
                            "Không tìm thấy bài tập nào phù hợp với bộ lọc.",
                            "No assignments found matching the filter."
                          )}
                        </td>
                      </tr>
                    ) : (
                      paginatedAssignments.map((item) => {
                        const lesson = PYTHON_CURRICULUM_LESSONS.find(
                          (l) => l.id === item.lessonId
                        );
                        const diffMeta =
                          DIFFICULTY_META[item.difficulty] ||
                          DIFFICULTY_META.Beginner;
                        const hiddenTestsCount = item.testCases.filter(
                          (tc) => tc.isHidden
                        ).length;

                        // Calculate passed students for this assignment
                        const asgnSubs = submissions.filter(
                          (s) => s.assignmentId === item.id
                        );
                        const passedStudents = new Set(
                          asgnSubs
                            .filter((s) => s.status === "passed")
                            .map((s) => s.userId)
                        ).size;

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-subtle/50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="font-mono text-xs text-primary font-bold">
                                {item.id}
                              </div>
                              <div className="text-[11px] text-muted truncate max-w-[140px]">
                                {lesson ? lesson.code : item.lessonId}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div
                                onClick={() => handleOpenEditModal(item)}
                                className="font-semibold text-primary hover:text-brand cursor-pointer line-clamp-2"
                                title={item.title}
                              >
                                {item.title}
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className={diffMeta.chipClass}>
                                {t(diffMeta.vi, diffMeta.en)}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className="chip chip-neutral tabular-nums text-xs">
                                {item.testCases.length} tests
                                {hiddenTestsCount > 0 && (
                                  <span
                                    className="ml-1 text-muted"
                                    title={`${hiddenTestsCount} test ẩn`}
                                  >
                                    ({hiddenTestsCount} ẩn)
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span
                                className={`chip tabular-nums text-xs ${
                                  passedStudents > 0
                                    ? "chip-success"
                                    : "chip-neutral"
                                }`}
                              >
                                {passedStudents} / {studentList.length}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditModal(item)}
                                  className="btn btn-secondary btn-sm"
                                  title={t(
                                    "Chỉnh sửa bài tập",
                                    "Edit assignment"
                                  )}
                                >
                                  <Pencil size={13} />
                                  <span>{t("Sửa", "Edit")}</span>
                                </button>
                                <Link
                                  to={`/workspace/${item.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-ghost btn-sm"
                                  title={t("Mở trong IDE", "Open in IDE")}
                                >
                                  <span>IDE</span>
                                  <ArrowUpRight size={13} />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setDeleteTargetAsgn(item)}
                                  className="btn btn-ghost btn-sm btn-icon text-secondary hover:text-danger"
                                  title={t("Xoá bài tập", "Delete assignment")}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              {totalAsgnPages > 1 && (
                <div className="p-3 border-t border-grid flex items-center justify-between text-xs text-secondary">
                  <span>
                    {t(
                      `Hiển thị ${(asgnPage - 1) * ASGN_PAGE_SIZE + 1} - ${Math.min(
                        asgnPage * ASGN_PAGE_SIZE,
                        builderFilteredAssignments.length
                      )} trên tổng số ${builderFilteredAssignments.length} bài`,
                      `Showing ${(asgnPage - 1) * ASGN_PAGE_SIZE + 1} - ${Math.min(
                        asgnPage * ASGN_PAGE_SIZE,
                        builderFilteredAssignments.length
                      )} of ${builderFilteredAssignments.length} items`
                    )}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={asgnPage <= 1}
                      onClick={() => setAsgnPage((p) => Math.max(1, p - 1))}
                      className="btn btn-secondary btn-sm"
                    >
                      <ChevronLeft size={14} />
                      <span>{t("Trước", "Prev")}</span>
                    </button>
                    <span className="px-2 font-medium tabular-nums text-primary">
                      {asgnPage} / {totalAsgnPages}
                    </span>
                    <button
                      type="button"
                      disabled={asgnPage >= totalAsgnPages}
                      onClick={() =>
                        setAsgnPage((p) => Math.min(totalAsgnPages, p + 1))
                      }
                      className="btn btn-secondary btn-sm"
                    >
                      <span>{t("Sau", "Next")}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: SUBMISSIONS & GRADEBOOK MATRIX
           =================================================================== */}
        {activeTab === "SUBMISSIONS" && (
          <div className="space-y-4">
            {/* Header & Controls */}
            <div className="card p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-primary">
                    {t("Bảng điểm & Bài nộp học sinh", "Gradebook & Submissions")}
                  </h2>
                  <p className="text-xs text-muted">
                    {t(
                      "Theo dõi tiến độ làm bài và xuất bảng điểm cho hệ thống VnEdu/SMAS",
                      "Track real-time student submissions and export VnEdu gradebook"
                    )}
                  </p>
                </div>

                {/* View Mode & Export Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="segmented inline-flex">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={subViewMode === "MATRIX"}
                      onClick={() => setSubViewMode("MATRIX")}
                      className={`segmented-item text-xs py-1.5 px-3 font-semibold ${
                        subViewMode === "MATRIX" ? "bg-surface text-primary" : ""
                      }`}
                    >
                      {t("Ma trận điểm", "Matrix")}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={subViewMode === "LIST"}
                      onClick={() => setSubViewMode("LIST")}
                      className={`segmented-item text-xs py-1.5 px-3 font-semibold ${
                        subViewMode === "LIST" ? "bg-surface text-primary" : ""
                      }`}
                    >
                      {t("Nhật ký nộp bài", "Logs")}
                    </button>
                  </div>

                  <div className="h-4 w-px bg-grid mx-1 hidden sm:block" />

                  <button
                    type="button"
                    onClick={() => {
                      exportGradesToCSV(
                        subClassFilter,
                        matrixStudents,
                        assignments,
                        submissions
                      );
                      pushToast(
                        t(
                          `Đã xuất bảng điểm VnEdu cho lớp ${subClassFilter}`,
                          `Exported gradebook (${subClassFilter}) for VnEdu`
                        ),
                        "success"
                      );
                    }}
                    className="btn btn-secondary btn-sm"
                    title={t("Xuất file điểm VnEdu / SMAS", "Export VnEdu CSV")}
                  >
                    <FileSpreadsheet size={14} />
                    <span>{t("Xuất điểm VnEdu", "VnEdu CSV")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      exportGradesDetailedCSV(
                        subClassFilter,
                        matrixStudents,
                        matrixAssignments,
                        submissions
                      );
                      pushToast(
                        t(
                          "Đã xuất ma trận điểm chi tiết",
                          "Exported detailed matrix CSV"
                        ),
                        "success"
                      );
                    }}
                    className="btn btn-secondary btn-sm"
                    title={t("Xuất ma trận CSV", "Export Matrix CSV")}
                  >
                    <Download size={14} />
                    <span>{t("Ma trận CSV", "Matrix CSV")}</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-grid">
                {/* Filter Class */}
                <div>
                  <label
                    htmlFor="sub-class-filter"
                    className="text-xs font-medium text-secondary mb-1 block"
                  >
                    {t("Lọc theo lớp:", "Class:")}
                  </label>
                  <select
                    id="sub-class-filter"
                    value={subClassFilter}
                    onChange={(e) => {
                      setSubClassFilter(e.target.value);
                      setSubPage(1);
                    }}
                    className="input h-9 text-xs w-full"
                  >
                    <option value="ALL">
                      {t("Tất cả các lớp (Khối 10)", "All Grade 10 classes")}
                    </option>
                    {GRADE_10_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {t(`Lớp ${cls}`, `Class ${cls}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter Lesson */}
                <div>
                  <label
                    htmlFor="sub-lesson-filter"
                    className="text-xs font-medium text-secondary mb-1 block"
                  >
                    {t("Lọc theo bài học:", "Lesson module:")}
                  </label>
                  <select
                    id="sub-lesson-filter"
                    value={subLessonFilter}
                    onChange={(e) => {
                      setSubLessonFilter(e.target.value);
                      setSubPage(1);
                    }}
                    className="input h-9 text-xs w-full"
                  >
                    <option value="ALL">
                      {t(
                        `Tất cả bài học (Tổng quan 145 bài)`,
                        `All lessons (Summary overview)`
                      )}
                    </option>
                    {PYTHON_CURRICULUM_LESSONS.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.code}: {l.titleVi}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Student */}
                <div>
                  <label
                    htmlFor="sub-search-filter"
                    className="text-xs font-medium text-secondary mb-1 block"
                  >
                    {t("Tìm kiếm học sinh:", "Search student:")}
                  </label>
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      id="sub-search-filter"
                      type="text"
                      value={subSearch}
                      onChange={(e) => {
                        setSubSearch(e.target.value);
                        setSubPage(1);
                      }}
                      placeholder={t("Họ tên, username…", "Name, username…")}
                      className="input pl-8 h-9 text-xs w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Mode or Log Mode */}
            {subViewMode === "MATRIX" ? (
              <div className="card overflow-hidden">
                {subLessonFilter === "ALL" ? (
                  /* OVERVIEW GRADEBOOK FOR ALL 145 ASSIGNMENTS */
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-subtle/80 border-b border-grid text-secondary text-xs uppercase tracking-wider">
                          <th className="px-4 py-3 font-semibold">
                            <button
                              type="button"
                              onClick={() =>
                                setSubSortDir((d) =>
                                  d === "asc" ? "desc" : "asc"
                                )
                              }
                              className="inline-flex items-center gap-1.5 text-secondary hover:text-primary"
                            >
                              <span>
                                {t("Học sinh", "Student")} (
                                {matrixStudents.length})
                              </span>
                              {subSortDir === "asc" ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                          </th>
                          <th className="px-3 py-3 font-semibold text-center">
                            {t("Lớp", "Class")}
                          </th>
                          <th className="px-4 py-3 font-semibold text-center min-w-[220px]">
                            {t("Tiến độ hoàn thành", "Progress (145 items)")}
                          </th>
                          <th className="px-3 py-3 font-semibold text-center">
                            {t("Đã đạt", "Passed")}
                          </th>
                          <th className="px-3 py-3 font-semibold text-center">
                            {t("Chưa đạt", "Pending/Failed")}
                          </th>
                          <th className="px-3 py-3 font-semibold text-center">
                            {t("Lần nộp cuối", "Last active")}
                          </th>
                          <th className="px-4 py-3 font-semibold text-right">
                            {t("Thao tác", "Action")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-grid">
                        {paginatedMatrixStudents.length === 0 ? (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-4 py-8 text-center text-muted"
                            >
                              {t("Không tìm thấy học sinh nào.", "No students found.")}
                            </td>
                          </tr>
                        ) : (
                          paginatedMatrixStudents.map((stu) => {
                            const stuSubs = submissions.filter(
                              (s) => s.userId === stu.uid
                            );
                            const passedSet = new Set(
                              stuSubs
                                .filter((s) => s.status === "passed")
                                .map((s) => s.assignmentId)
                            );
                            const passedCount = passedSet.size;
                            const totalCount = assignments.length || 145;
                            const progressPct = Math.round(
                              (passedCount / totalCount) * 100
                            );
                            const failedCount = stuSubs.filter(
                              (s) =>
                                s.status === "failed" &&
                                !passedSet.has(s.assignmentId)
                            ).length;
                            const lastSub =
                              stuSubs.length > 0 ? stuSubs[0] : null;

                            return (
                              <tr
                                key={stu.uid}
                                className="hover:bg-subtle/50 transition-colors"
                              >
                                <td className="px-4 py-3">
                                  <div className="font-semibold text-primary">
                                    {stu.displayName}
                                  </div>
                                  <div className="text-xs text-muted">
                                    @{stu.username || stu.uid} • {stu.email}
                                  </div>
                                </td>
                                <td className="px-3 py-3 text-center">
                                  <span className="chip chip-brand font-medium">
                                    {stu.className || "10A7"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2 max-w-[220px] mx-auto">
                                    <div className="flex-1 h-2 rounded-full bg-subtle overflow-hidden">
                                      <div
                                        className="h-full bg-success transition-[width] duration-300"
                                        style={{ width: `${progressPct}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-semibold tabular-nums text-primary shrink-0">
                                      {passedCount}/{totalCount} ({progressPct}%)
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-3 text-center">
                                  <span className="chip chip-success tabular-nums font-semibold text-xs">
                                    {passedCount} đạt
                                  </span>
                                </td>
                                <td className="px-3 py-3 text-center">
                                  {failedCount > 0 ? (
                                    <span className="chip chip-warn tabular-nums font-semibold text-xs">
                                      {failedCount} bài
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted">-</span>
                                  )}
                                </td>
                                <td className="px-3 py-3 text-center text-xs text-muted">
                                  {lastSub?.updatedAt
                                    ? new Date(
                                        lastSub.updatedAt
                                      ).toLocaleDateString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : t("Chưa nộp bài", "No submissions")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setInspectedStudentProfile(stu)
                                    }
                                    className="btn btn-ghost btn-sm text-xs"
                                  >
                                    {t("Xem bài", "Details")}
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* SPECIFIC LESSON MATRIX (e.g. BÀI 19 - EXACT 10 COLUMNS) */
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-subtle/80 border-b border-grid text-secondary text-xs uppercase tracking-wider">
                          <th className="px-4 py-3 font-semibold sticky left-0 z-10 bg-subtle border-r border-grid min-w-[180px]">
                            <button
                              type="button"
                              onClick={() =>
                                setSubSortDir((d) =>
                                  d === "asc" ? "desc" : "asc"
                                )
                              }
                              className="inline-flex items-center gap-1.5 text-secondary hover:text-primary"
                            >
                              <span>
                                {t("Học sinh", "Student")} (
                                {matrixStudents.length})
                              </span>
                              {subSortDir === "asc" ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                          </th>
                          <th className="px-3 py-3 font-semibold text-center border-r border-grid min-w-[70px]">
                            {t("Lớp", "Class")}
                          </th>
                          {matrixAssignments.map((asgn, i) => {
                            const lessonNum = (asgn.lessonId || "bai_16").replace("bai_", "");
                            const shortLabel = `${lessonNum}.${i + 1}`;
                            return (
                              <th
                                key={asgn.id}
                                className="px-2 py-2.5 font-semibold text-center min-w-[70px] border-r border-grid"
                                title={asgn.title}
                              >
                                <div className="text-primary font-bold text-xs">
                                  {shortLabel}
                                </div>
                                <div className="text-[10px] text-muted truncate max-w-[65px]">
                                  {asgn.difficulty.slice(0, 3)}
                                </div>
                              </th>
                            );
                          })}
                          <th className="px-3 py-3 font-semibold text-center min-w-[100px]">
                            {t("Tổng kết", "Summary")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-grid">
                        {paginatedMatrixStudents.map((stu) => {
                          let passedInLesson = 0;
                          return (
                            <tr
                              key={stu.uid}
                              className="hover:bg-subtle/50 transition-colors"
                            >
                              <td className="px-4 py-2.5 sticky left-0 z-10 bg-surface border-r border-grid">
                                <div className="font-semibold text-primary truncate max-w-[180px]">
                                  {stu.displayName}
                                </div>
                                <div className="text-xs text-muted truncate max-w-[180px]">
                                  @{stu.username || stu.uid}
                                </div>
                              </td>
                              <td className="px-3 py-2.5 text-center border-r border-grid">
                                <span className="chip chip-brand font-medium">
                                  {stu.className || "10A7"}
                                </span>
                              </td>
                              {matrixAssignments.map((asgn) => {
                                const sub =
                                  submissionMap[`${stu.uid}_${asgn.id}`];
                                const isPassed = sub?.status === "passed";
                                const isFailed = sub?.status === "failed";
                                if (isPassed) passedInLesson++;

                                return (
                                  <td
                                    key={asgn.id}
                                    className="px-2 py-2 text-center border-r border-grid cursor-pointer hover:bg-brand/5"
                                    onClick={() => {
                                      if (sub) setInspectedSubmission(sub);
                                    }}
                                    title={
                                      sub
                                        ? `${asgn.title}\nTrạng thái: ${sub.status}\nĐiểm: ${((sub.passedCount !== undefined && sub.totalCount) ? Math.round((sub.passedCount / sub.totalCount) * 100) : (sub.status === "passed" ? 100 : 0))}`
                                        : `${asgn.title}\nChưa nộp`
                                    }
                                  >
                                    {isPassed ? (
                                      <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-success/15 text-success font-bold text-xs">
                                        ✓
                                      </span>
                                    ) : isFailed ? (
                                      <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-danger/15 text-danger font-bold text-xs">
                                        ✗
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center justify-center w-7 h-7 text-muted text-xs">
                                        —
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="px-3 py-2.5 text-center">
                                <span
                                  className={`chip tabular-nums font-semibold text-xs ${
                                    passedInLesson === matrixAssignments.length &&
                                    matrixAssignments.length > 0
                                      ? "chip-success"
                                      : passedInLesson > 0
                                      ? "chip-brand"
                                      : "chip-neutral"
                                  }`}
                                >
                                  {passedInLesson}/{matrixAssignments.length} (
                                  {matrixAssignments.length > 0
                                    ? Math.round(
                                        (passedInLesson /
                                          matrixAssignments.length) *
                                          100
                                      )
                                    : 0}
                                  %)
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              /* LOGS VIEW */
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-subtle/80 border-b border-grid text-secondary text-xs uppercase tracking-wider">
                        <th className="px-4 py-3 font-semibold">
                          {t("Thời gian", "Timestamp")}
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          {t("Học sinh", "Student")}
                        </th>
                        <th className="px-3 py-3 font-semibold text-center">
                          {t("Lớp", "Class")}
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          {t("Bài tập", "Assignment")}
                        </th>
                        <th className="px-3 py-3 font-semibold text-center">
                          {t("Kết quả", "Result")}
                        </th>
                        <th className="px-3 py-3 font-semibold text-center">
                          {t("Điểm", "Score")}
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          {t("Thao tác", "Action")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-grid">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-8 text-center text-muted"
                          >
                            {t("Chưa có lượt nộp bài nào.", "No submissions found.")}
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.slice(0, 100).map((sub) => {
                          const asgn = assignments.find(
                            (a) => a.id === sub.assignmentId
                          );
                          const isPassed = sub.status === "passed";
                          return (
                            <tr
                              key={sub.id}
                              className="hover:bg-subtle/50 transition-colors"
                            >
                              <td className="px-4 py-3 text-xs text-muted tabular-nums">
                                {new Date(sub.updatedAt).toLocaleDateString(
                                  "vi-VN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-semibold text-primary">
                                  {sub.userDisplayName || sub.userId}
                                </div>
                              </td>
                              <td className="px-3 py-3 text-center">
                                <span className="chip chip-brand text-xs">
                                  {sub.userClassName || "10A7"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-medium text-primary line-clamp-1">
                                  {asgn?.title || sub.assignmentId}
                                </div>
                              </td>
                              <td className="px-3 py-3 text-center">
                                <span
                                  className={`chip text-xs font-semibold ${
                                    isPassed ? "chip-success" : "chip-danger"
                                  }`}
                                >
                                  {isPassed ? "Đạt" : "Chưa đạt"}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-center tabular-nums font-semibold text-primary">
                                {((sub.passedCount !== undefined && sub.totalCount) ? Math.round((sub.passedCount / sub.totalCount) * 100) : (isPassed ? 100 : 0))}/100
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => setInspectedSubmission(sub)}
                                  className="btn btn-secondary btn-sm"
                                >
                                  <Code size={13} />
                                  <span>{t("Xem code", "View")}</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 3: CLASS OVERVIEW (6 GRADE 10 CLASSES)
           =================================================================== */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classAnalytics.map((cls) => (
                <div key={cls.className} className="card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {t(`Lớp ${cls.className}`, `Class ${cls.className}`)}
                      </span>
                      <span className="chip chip-brand font-medium">
                        {cls.studentCount} {t("học sinh", "students")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubClassFilter(cls.className);
                        setActiveTab("SUBMISSIONS");
                      }}
                      className="btn btn-ghost btn-sm text-xs"
                      title={t("Xem chi tiết bảng điểm lớp này", "View gradebook")}
                    >
                      <span>{t("Xem điểm", "Grades")}</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>{t("Tiến độ trung bình:", "Average progress:")}</span>
                      <span className="font-bold text-primary tabular-nums">
                        {cls.avgProgressPct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-subtle overflow-hidden">
                      <div
                        className="h-full bg-success transition-[width] duration-300"
                        style={{ width: `${cls.avgProgressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-grid grid grid-cols-2 gap-2 text-xs text-secondary">
                    <div>
                      <span className="text-muted block">
                        {t("Đang làm bài:", "Active:")}
                      </span>
                      <span className="font-semibold text-primary tabular-nums">
                        {cls.activeStudentsCount} / {cls.studentCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block">
                        {t("Tổng bài đạt:", "Passed total:")}
                      </span>
                      <span className="font-semibold text-success tabular-nums">
                        {cls.totalPassedInClass} {t("lượt", "items")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: STUDENT ACCOUNTS MANAGEMENT
           =================================================================== */}
        {activeTab === "STUDENTS" && (
          <div className="space-y-4">
            {/* Header & Controls */}
            <div className="card p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-primary">
                    {t("Danh sách tài khoản học sinh", "Student Accounts")} (
                    {filteredStudents.length} / {studentList.length}{" "}
                    {t("học sinh", "accounts")})
                  </h2>
                  <p className="text-xs text-muted">
                    {t(
                      "Quản lý tài khoản đăng nhập, đặt lại mật khẩu và phân loại theo lớp",
                      "Manage student accounts, reset passwords and assign classes"
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordsInTable((v) => !v)}
                    className="btn btn-secondary btn-sm"
                  >
                    {showPasswordsInTable ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                    <span>
                      {showPasswordsInTable
                        ? t("Ẩn mật khẩu", "Hide passwords")
                        : t("Hiện mật khẩu", "Show passwords")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleResetStudentForm();
                      setIsStudentModalOpen(true);
                    }}
                    className="btn btn-primary btn-sm flex items-center gap-1.5"
                  >
                    <UserPlus size={15} />
                    <span>{t("Thêm học sinh", "Add student")}</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-grid">
                <div>
                  <label
                    htmlFor="stu-cls-filter"
                    className="text-xs font-medium text-secondary mb-1 block"
                  >
                    {t("Lọc theo lớp:", "Filter by class:")}
                  </label>
                  <select
                    id="stu-cls-filter"
                    value={studentClassFilter}
                    onChange={(e) => setStudentClassFilter(e.target.value)}
                    className="input h-9 text-xs w-full"
                  >
                    <option value="ALL">
                      {t("Tất cả các lớp (Khối 10)", "All classes")}
                    </option>
                    {GRADE_10_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {t(`Lớp ${cls}`, `Class ${cls}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="stu-search-filter"
                    className="text-xs font-medium text-secondary mb-1 block"
                  >
                    {t("Tìm kiếm theo tên / username:", "Search student:")}
                  </label>
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      id="stu-search-filter"
                      type="text"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      placeholder={t(
                        "Nhập tên học sinh hoặc tài khoản…",
                        "Search student name or username…"
                      )}
                      className="input pl-8 h-9 text-xs w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-subtle/80 border-b border-grid text-secondary text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 font-semibold">
                        {t("Họ và tên", "Full Name")}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {t("Tài khoản (Username)", "Username")}
                      </th>
                      <th className="px-3 py-3 font-semibold text-center">
                        {t("Lớp", "Class")}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {t("Mật khẩu", "Password")}
                      </th>
                      <th className="px-3 py-3 font-semibold text-center">
                        {t("Tiến độ", "Progress")}
                      </th>
                      <th className="px-4 py-3 font-semibold text-right">
                        {t("Thao tác", "Actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grid">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted"
                        >
                          {t("Không tìm thấy học sinh nào.", "No students found.")}
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((stu) => {
                        const stats = getStudentStats(stu.uid);
                        return (
                          <tr
                            key={stu.uid}
                            className="hover:bg-subtle/50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="font-semibold text-primary">
                                {stu.displayName}
                              </div>
                              <div className="text-xs text-muted">
                                {stu.email}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-mono text-xs text-primary font-bold">
                                {stu.username || stu.uid}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className="chip chip-brand font-medium">
                                {stu.className || "10A7"}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs">
                              {showPasswordsInTable ? (
                                <span className="text-primary font-semibold">
                                  {stu.password || "123456"}
                                </span>
                              ) : (
                                <span className="text-muted tracking-widest">
                                  ••••••
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span className="chip chip-neutral tabular-nums font-semibold text-xs">
                                {stats.passedCount} / {assignments.length} bài
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleEditStudentClick(stu)}
                                  className="btn btn-secondary btn-sm"
                                  title={t("Chỉnh sửa học sinh", "Edit student")}
                                >
                                  <Pencil size={13} />
                                  <span>{t("Sửa", "Edit")}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStudent(stu)}
                                  className="btn btn-ghost btn-sm btn-icon text-secondary hover:text-danger"
                                  title={t("Xoá học sinh", "Delete student")}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </BentoSection>

      {/* ===================================================================
          ASSIGNMENT FULL-FEATURED EDITOR MODAL (SPACIOUS 2-COLUMN)
         =================================================================== */}
      <Modal
        isOpen={isEditorModalOpen}
        onClose={() => {
          if (
            isFormDirty &&
            !window.confirm(
              t(
                "Đóng và huỷ bỏ các thay đổi chưa lưu?",
                "Discard unsaved changes?"
              )
            )
          ) {
            return;
          }
          setIsEditorModalOpen(false);
          setIsFormDirty(false);
        }}
        title={
          editingId
            ? t(`Chỉnh sửa bài tập: ${title || editingId}`, `Edit Assignment`)
            : t("Soạn thảo bài tập Python mới", "New Python Assignment")
        }
        badgeLabel={
          isFormDirty
            ? t("Chưa lưu thay đổi", "Unsaved changes")
            : t("Đã lưu", "Saved")
        }
        glyph="[✎]"
        maxWidthClass="max-w-6xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-muted flex items-center gap-2">
              {verifySummary && (
                <span
                  className={`chip font-medium ${
                    verifySummary.includes("100%")
                      ? "chip-success"
                      : "chip-warn"
                  }`}
                >
                  {verifySummary}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditorModalOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                {t("Đóng", "Close")}
              </button>
              <button
                type="button"
                onClick={handleSaveAssignment}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
              >
                <Save size={15} />
                <span>
                  {t("Lưu & Phát hành bài tập", "Save & Publish Assignment")}
                </span>
              </button>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* Left Column (6/12): Title, Lesson, Difficulty, Markdown Description */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label
                htmlFor="modal-asgn-title"
                className="text-xs font-semibold text-secondary mb-1 block"
              >
                {t("Tên bài tập *", "Assignment title *")}
              </label>
              <input
                id="modal-asgn-title"
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsFormDirty(true);
                }}
                placeholder="VD: Bài 19.1: Tính tổng các số..."
                className="input h-9 text-sm w-full font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="modal-asgn-lesson"
                  className="text-xs font-semibold text-secondary mb-1 block"
                >
                  {t("Chuyên đề bài học", "Lesson")}
                </label>
                <select
                  id="modal-asgn-lesson"
                  value={lessonId}
                  onChange={(e) => {
                    setLessonId(e.target.value);
                    setIsFormDirty(true);
                  }}
                  className="input h-9 text-xs w-full"
                >
                  {PYTHON_CURRICULUM_LESSONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.code}: {l.titleVi}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="modal-asgn-diff"
                  className="text-xs font-semibold text-secondary mb-1 block"
                >
                  {t("Độ khó", "Difficulty")}
                </label>
                <select
                  id="modal-asgn-diff"
                  value={difficulty}
                  onChange={(e) => {
                    setDifficulty(e.target.value as DifficultyLevel);
                    setIsFormDirty(true);
                  }}
                  className="input h-9 text-xs w-full"
                >
                  <option value="Beginner">{t("Cơ bản", "Beginner")}</option>
                  <option value="Intermediate">
                    {t("Trung bình", "Intermediate")}
                  </option>
                  <option value="Advanced">{t("Nâng cao", "Advanced")}</option>
                </select>
              </div>
            </div>

            {/* Markdown Prompt with Edit/Preview Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="modal-asgn-desc"
                  className="text-xs font-semibold text-secondary"
                >
                  {t("Đề bài Markdown", "Problem prompt (Markdown)")}
                </label>
                <div className="segmented inline-flex">
                  <button
                    type="button"
                    onClick={() => setDescTab("EDIT")}
                    className={`segmented-item text-xs py-1 px-2.5 ${
                      descTab === "EDIT" ? "bg-surface text-primary" : ""
                    }`}
                  >
                    {t("Soạn thảo", "Edit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescTab("PREVIEW")}
                    className={`segmented-item text-xs py-1 px-2.5 ${
                      descTab === "PREVIEW" ? "bg-surface text-primary" : ""
                    }`}
                  >
                    {t("Xem trước", "Preview")}
                  </button>
                </div>
              </div>

              {descTab === "EDIT" ? (
                <textarea
                  id="modal-asgn-desc"
                  rows={14}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setIsFormDirty(true);
                  }}
                  className="input font-mono text-xs w-full p-3 leading-relaxed"
                  placeholder="### Đề bài\nViết chương trình Python..."
                />
              ) : (
                <div className="border border-grid rounded-control p-4 bg-surface max-h-[350px] overflow-y-auto">
                  <MarkdownRenderer content={description} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column (6/12): Starter Code, Reference Code, Test Cases */}
          <div className="lg:col-span-6 space-y-4">
            {/* Starter Code */}
            <div>
              <label className="text-xs font-semibold text-secondary mb-1 block">
                {t("Mã nguồn khởi tạo cho học sinh", "Starter code for students")}
              </label>
              <div className="border border-grid rounded-control overflow-hidden h-[130px]">
                <Editor
                  height="130px"
                  language="python"
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  value={starterCode}
                  onChange={(val) => {
                    setStarterCode(val || "");
                    setIsFormDirty(true);
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Reference Solution & Pyodide Test Verification */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-secondary">
                  {t(
                    "Lời giải mẫu (kiểm tra bộ test)",
                    "Reference code (for test verification)"
                  )}
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleGenerateExpectedFromRef}
                    disabled={isGeneratingExpected || engineState !== "ready"}
                    className="btn btn-ghost btn-sm text-xs"
                    title={t(
                      "Chạy lời giải mẫu và tự điền kết quả mong muốn cho các test",
                      "Run reference solution to generate expected outputs"
                    )}
                  >
                    <span>{t("Sinh output mẫu", "Generate output")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyRefSolution}
                    disabled={isVerifyingTests || engineState !== "ready"}
                    className="btn btn-secondary btn-sm text-xs flex items-center gap-1"
                  >
                    <Play size={12} />
                    <span>
                      {isVerifyingTests
                        ? t("Đang chạy…", "Running…")
                        : t("Chạy thử bộ test", "Verify tests")}
                    </span>
                  </button>
                </div>
              </div>

              <div className="border border-grid rounded-control overflow-hidden h-[120px]">
                <Editor
                  height="120px"
                  language="python"
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  value={referenceSolution}
                  onChange={(val) => setReferenceSolution(val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Test Cases List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-secondary">
                  {t("Bộ Test Cases chấm điểm", "Evaluation test cases")} (
                  {testCases.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddTestCase}
                  className="btn btn-ghost btn-sm text-xs flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>{t("Thêm test", "Add test")}</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {testCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-grid rounded-control bg-subtle/40 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">
                        Test #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-[11px] text-secondary cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tc.isHidden || false}
                            onChange={(e) =>
                              handleUpdateTestCase(
                                idx,
                                "isHidden",
                                e.target.checked
                              )
                            }
                            className="rounded"
                          />
                          <span>{t("Test ẩn", "Hidden")}</span>
                        </label>
                        {testCases.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTestCase(idx)}
                            className="text-secondary hover:text-danger p-0.5"
                            title={t("Xoá test này", "Delete test")}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[11px] text-muted block mb-0.5">
                          Input:
                        </span>
                        <textarea
                          rows={2}
                          value={tc.input}
                          onChange={(e) =>
                            handleUpdateTestCase(idx, "input", e.target.value)
                          }
                          className="input font-mono text-xs w-full p-1.5"
                          placeholder="Dữ liệu vào..."
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-muted block mb-0.5">
                          Output mong muốn:
                        </span>
                        <textarea
                          rows={2}
                          value={tc.expectedOutput}
                          onChange={(e) =>
                            handleUpdateTestCase(
                              idx,
                              "expectedOutput",
                              e.target.value
                            )
                          }
                          className="input font-mono text-xs w-full p-1.5"
                          placeholder="Kết quả ra..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ===================================================================
          STUDENT DETAIL PROFILE MODAL
         =================================================================== */}
      <Modal
        isOpen={Boolean(inspectedStudentProfile)}
        onClose={() => setInspectedStudentProfile(null)}
        title={
          inspectedStudentProfile
            ? `${inspectedStudentProfile.displayName} (${inspectedStudentProfile.className})`
            : "Thông tin học sinh"
        }
        badgeLabel="Hồ sơ học sinh"
        glyph="[👤]"
      >
        {inspectedStudentProfile && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3 p-3 bg-subtle/50 rounded-control text-xs">
              <div>
                <span className="text-muted block">Tài khoản:</span>
                <span className="font-bold text-primary">
                  @{inspectedStudentProfile.username || inspectedStudentProfile.uid}
                </span>
              </div>
              <div>
                <span className="text-muted block">Lớp:</span>
                <span className="font-bold text-primary">
                  {inspectedStudentProfile.className}
                </span>
              </div>
              <div>
                <span className="text-muted block">Mật khẩu:</span>
                <span className="font-mono text-primary font-bold">
                  {inspectedStudentProfile.password || "123456"}
                </span>
              </div>
              <div>
                <span className="text-muted block">Email:</span>
                <span className="text-secondary">
                  {inspectedStudentProfile.email}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">
                Bài tập đã nộp:
              </h4>
              <div className="max-h-[220px] overflow-y-auto space-y-1.5">
                {submissions
                  .filter((s) => s.userId === inspectedStudentProfile.uid)
                  .map((sub) => {
                    const asgn = assignments.find(
                      (a) => a.id === sub.assignmentId
                    );
                    const isPassed = sub.status === "passed";
                    return (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-2 rounded bg-subtle text-xs"
                      >
                        <span className="font-medium text-primary line-clamp-1">
                          {asgn?.title || sub.assignmentId}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`chip text-[11px] font-semibold ${
                              isPassed ? "chip-success" : "chip-danger"
                            }`}
                          >
                            {isPassed ? "Đạt" : "Chưa đạt"}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setInspectedSubmission(sub);
                              setInspectedStudentProfile(null);
                            }}
                            className="btn btn-ghost btn-sm text-[11px] py-0.5 px-1.5"
                          >
                            Xem code
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ===================================================================
          SUBMISSION INSPECTION MODAL (CODE & TESTS)
         =================================================================== */}
      <Modal
        isOpen={Boolean(inspectedSubmission)}
        onClose={() => setInspectedSubmission(null)}
        title={
          inspectedSubmission
            ? `Bài làm của: ${inspectedSubmission.userDisplayName || inspectedSubmission.userId}`
            : "Chi tiết bài nộp"
        }
        badgeLabel={
          inspectedSubmission?.status === "passed"
            ? "Đạt yêu cầu"
            : "Chưa đạt"
        }
        glyph="[</>]"
        maxWidthClass="max-w-4xl"
      >
        {inspectedSubmission && (
          <div className="space-y-4 text-sm">
            <div className="border border-grid rounded-control overflow-hidden h-[260px]">
              <Editor
                height="260px"
                language="python"
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={inspectedSubmission.code || "# Không có code"}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            {inspectedSubmission.lastExecutedOutput && (
              <div className="space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-secondary">
                  Kết quả thực thi gần nhất:
                </h4>
                <pre className="p-3 rounded border border-grid bg-subtle font-mono text-xs max-h-[160px] overflow-y-auto whitespace-pre-wrap text-primary">
                  {inspectedSubmission.lastExecutedOutput}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* ===================================================================
          STUDENT CREATE/EDIT MODAL
         =================================================================== */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={handleResetStudentForm}
        title={
          editingStudentUid
            ? t("Chỉnh sửa học sinh", "Edit Student")
            : t("Thêm học sinh mới", "Add Student")
        }
        badgeLabel="Tài khoản"
        glyph="[👤]"
      >
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-secondary mb-1 block">
              {t("Tên đăng nhập (Username) *", "Username *")}
            </label>
            <input
              type="text"
              required
              disabled={Boolean(editingStudentUid)}
              value={stuUsername}
              onChange={(e) => setStuUsername(e.target.value)}
              placeholder="VD: an10a7"
              className="input h-9 text-sm w-full font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-secondary mb-1 block">
              {t("Họ và tên học sinh *", "Full Name *")}
            </label>
            <input
              type="text"
              required
              value={stuFullName}
              onChange={(e) => setStuFullName(e.target.value)}
              placeholder="VD: Nguyễn Văn An"
              className="input h-9 text-sm w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-secondary mb-1 block">
                {t("Lớp", "Class")}
              </label>
              <select
                value={stuClassName}
                onChange={(e) => setStuClassName(e.target.value)}
                className="input h-9 text-xs w-full"
              >
                {GRADE_10_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-secondary mb-1 block">
                {t("Mật khẩu", "Password")}
              </label>
              <input
                type="text"
                value={stuPassword}
                onChange={(e) => setStuPassword(e.target.value)}
                placeholder="123456"
                className="input h-9 text-sm w-full font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-grid">
            <button
              type="button"
              onClick={handleResetStudentForm}
              className="btn btn-secondary btn-sm"
            >
              {t("Huỷ", "Cancel")}
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={14} />
              <span>{t("Lưu tài khoản", "Save User")}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ===================================================================
          DELETE ASSIGNMENT CONFIRM DIALOG
         =================================================================== */}
      {deleteTargetAsgn && (
        <ConfirmDialog
          isOpen={Boolean(deleteTargetAsgn)}
          title={t("Xoá bài tập", "Delete Assignment")}
          description={t(
            `Bạn có chắc chắn muốn xoá bài tập "${deleteTargetAsgn.title}" không? Thao tác này sẽ xoá bài tập khỏi hệ thống.`,
            `Are you sure you want to delete assignment "${deleteTargetAsgn.title}"?`
          )}
          confirmLabel={t("Xoá bài tập", "Delete Assignment")}
          cancelLabel={t("Huỷ", "Cancel")}
          variant="danger"
          requireText={deleteTargetAsgn.title}
          onConfirm={handleConfirmDeleteAssignment}
          onClose={() => setDeleteTargetAsgn(null)}
        />
      )}

      {/* ===================================================================
          FIREBASE CONFIG MODAL
         =================================================================== */}
      <FirebaseConfigModal
        isOpen={firebaseModalOpen}
        onClose={() => setFirebaseModalOpen(false)}
      />
    </div>
  );
};
