import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth, normalizeUsername } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  deleteAssignmentById,
  deleteUserById,
  getAllSubmissions,
  getAllUsers,
  getAssignments,
  saveAssignment,
  seedCloudFirestoreData,
  upsertUserProfile,
} from "../services/firestoreService";
import {
  GRADE_10_CLASSES,
  localizeAssignment,
  localizeDifficulty,
} from "../services/seedData";
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
import {
  BentoCell,
  BentoGrid,
  BentoSection,
  SectionBadge,
  SectionHeader,
} from "../components/ui/BentoPrimitives";

const GLYPH_OPTIONS = ["◇", "◆", "●", "◐", "▣", "◊"];

type AdminTab = "OVERVIEW" | "STUDENTS" | "CURRICULUM" | "SUBMISSIONS";

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<AdminTab>("OVERVIEW");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // --- TAB 2: STUDENT MANAGEMENT STATE ---
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

  // --- TAB 3: CURRICULUM & ASSIGNMENT STUDIO STATE ---
  const [selectedLessonViewId, setSelectedLessonViewId] = useState<string>(
    PYTHON_CURRICULUM_LESSONS[0].id
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string>("bai_16");
  const [glyph, setGlyph] = useState<string>("◆");
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Beginner");
  const [description, setDescription] = useState<string>("");
  const [starterCode, setStarterCode] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "10", expectedOutput: "20", isHidden: false },
  ]);

  // --- TAB 4: SUBMISSIONS FILTER & MODAL STATE ---
  const [subClassFilter, setSubClassFilter] = useState<string>("ALL");
  const [subLessonFilter, setSubLessonFilter] = useState<string>("ALL");
  const [subStatusFilter, setSubStatusFilter] = useState<string>("ALL");
  const [subSearch, setSubSearch] = useState<string>("");
  const [inspectedSubmission, setInspectedSubmission] =
    useState<Submission | null>(null);

  const showToast = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 4000);
  };

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
      populateFormWithAssignment(localizeAssignment(asgnData[0], lang));
    }
  };

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      showToast(
        "⚠ Vui lòng nhập Username (>=3 ký tự), Họ tên và Mật khẩu (>=4 ký tự)!"
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
    showToast(
      `✓ Đã lưu hồ sơ học sinh "${cleanName}" (Lớp ${stuClassName}) lên hệ thống!`
    );
  };

  const handleDeleteStudent = async (stu: UserProfile) => {
    await deleteUserById(stu.uid);
    await loadDashboardData();
    if (editingStudentUid === stu.uid) {
      handleResetStudentForm();
    }
    showToast(`✕ Đã xóa tài khoản học sinh "${stu.displayName}".`);
  };

  // --- ASSIGNMENT CRUD HANDLERS ---
  const populateFormWithAssignment = (asgn: Assignment) => {
    setEditingId(asgn.id);
    setLessonId(asgn.lessonId || "bai_16");
    setGlyph(asgn.glyph || "◆");
    setTitle(asgn.title);
    setDifficulty(asgn.difficulty);
    setDescription(asgn.description);
    setStarterCode(asgn.starterCode);
    setTestCases(
      asgn.testCases.length > 0
        ? asgn.testCases
        : [{ input: "", expectedOutput: "", isHidden: false }]
    );
  };

  const handleInitNewAssignment = () => {
    setEditingId(null);
    setLessonId(selectedLessonViewId || "bai_16");
    setGlyph("◇");
    setTitle(`Bài tập mới (${selectedLessonViewId.toUpperCase()})`);
    setDifficulty("Beginner");
    setDescription(
      `### Yêu cầu bài toán
Mô tả chi tiết đề bài tại đây.

### Dữ liệu vào (Input)
- Dòng 1: ...

### Kết quả ra (Output)
- In ra kết quả bằng lệnh \`print()\`.`
    );
    setStarterCode(`# Nhập dữ liệu và xử lý tại đây\nn = int(input())\nprint(n)\n`);
    setTestCases([
      { input: "10", expectedOutput: "10", isHidden: false },
      { input: "25", expectedOutput: "25", isHidden: true },
    ]);
    showToast("Đã khởi tạo mẫu bài tập mới.");
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
    showToast(`✓ Đã lưu & xuất bản bài tập "${saved.title}" lên Firestore!`);
  };

  const handleDeleteAssignment = async (id: string) => {
    await deleteAssignmentById(id);
    const updated = await getAssignments();
    setAssignments(updated);
    if (updated.length > 0) {
      populateFormWithAssignment(localizeAssignment(updated[0], lang));
    } else {
      handleInitNewAssignment();
    }
    showToast("✕ Đã xóa bài tập khỏi hệ thống.");
  };

  const handleAddTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      { input: "", expectedOutput: "", isHidden: false },
    ]);
  };

  const handleUpdateTestCase = (
    idx: number,
    field: keyof TestCase,
    value: string | boolean
  ) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === idx ? { ...tc, [field]: value } : tc))
    );
  };

  const handleRemoveTestCase = (idx: number) => {
    if (testCases.length <= 1) return;
    setTestCases((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleForceSyncFirestore = async () => {
    showToast("◐ Đang đồng bộ dữ liệu gốc lên Cloud Firestore...");
    const res = await seedCloudFirestoreData();
    if (res.success) {
      await loadDashboardData();
      showToast(
        `✓ Đã đồng bộ thành công ${res.count} bài tập lên Cloud Firestore!`
      );
    } else {
      showToast(`✕ Lỗi đồng bộ Firestore: ${res.error}`);
    }
  };

  // --- ANALYTICS & METRICS COMPUTATION ---
  const studentList = users.filter((u) => u.role === "student");
  const totalAssignments = assignments.length;
  const passedSubmissions = submissions.filter((s) => s.status === "passed");
  const passRate =
    submissions.length > 0
      ? Math.round((passedSubmissions.length / submissions.length) * 100)
      : 0;

  // Per-student progress helper
  const getStudentStats = (stuUid: string) => {
    const stuSubs = submissions.filter((s) => s.userId === stuUid);
    const passedSet = new Set(
      stuSubs.filter((s) => s.status === "passed").map((s) => s.assignmentId)
    );
    const failedSet = new Set(
      stuSubs
        .filter((s) => s.status === "failed" && !passedSet.has(s.assignmentId))
        .map((s) => s.assignmentId)
    );
    const latestUpdate =
      stuSubs.length > 0
        ? stuSubs
            .map((s) => s.updatedAt)
            .sort()
            .reverse()[0]
        : null;

    const pct =
      totalAssignments > 0
        ? Math.round((passedSet.size / totalAssignments) * 100)
        : 0;

    return {
      passedCount: passedSet.size,
      failedCount: failedSet.size,
      totalSubmissions: stuSubs.length,
      progressPct: pct,
      latestUpdate,
      subs: stuSubs,
    };
  };

  // Per-class analytics (10A7, 10A12, 10A13, 10A14, 10A15, 10A16)
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

  // Per-lesson analytics (Bài 16 -> Bài 31)
  const lessonAnalytics = PYTHON_CURRICULUM_LESSONS.map((lesson) => {
    const lessonAsgns = assignments.filter((a) => a.lessonId === lesson.id);
    const lessonAsgnIds = new Set(lessonAsgns.map((a) => a.id));
    const lessonSubs = submissions.filter((s) =>
      lessonAsgnIds.has(s.assignmentId)
    );
    const passedLessonSubs = lessonSubs.filter((s) => s.status === "passed");
    const uniqueStudentsPassed = new Set(passedLessonSubs.map((s) => s.userId))
      .size;
    const passRateLesson =
      lessonSubs.length > 0
        ? Math.round((passedLessonSubs.length / lessonSubs.length) * 100)
        : 0;

    return {
      lesson,
      exerciseCount: lessonAsgns.length,
      attemptsCount: lessonSubs.length,
      passedCount: passedLessonSubs.length,
      uniqueStudentsPassed,
      passRateLesson,
    };
  });

  // Filtered students for Tab 2
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

  // Filtered submissions for Tab 4
  const filteredSubmissions = submissions.filter((sub) => {
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

  const activeLessonTopic: LessonTopic =
    PYTHON_CURRICULUM_LESSONS.find((l) => l.id === selectedLessonViewId) ||
    PYTHON_CURRICULUM_LESSONS[0];

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      <TopNavigationBar
        breadcrumb={t(
          "TRUNG TÂM QUẢN TRỊ GIÁO VIÊN // ADMIN DASHBOARD",
          "ADMIN COMMAND CENTER // TEACHER DASHBOARD"
        )}
        engineStatusText="ADMIN CONTROL"
        syncStatus={
          statusNotice ||
          t("✓ ĐỒNG BỘ DỮ LIỆU THỜI GIAN THỰC", "✓ REAL-TIME SYNC ACTIVE")
        }
      />

      <BentoSection className="flex-1 w-full">
        {/* 1. TOP GLOBAL KPI METRICS STRIP (6 CELLS) */}
        <div className="grid grid-cols-2 md:grid-cols-6 bg-grid gap-[1px] border-b border-grid font-mono text-xs">
          <div className="bg-surface p-4">
            <div className="text-[11px] text-secondary uppercase">
              {t("TỔNG SỐ HỌC SINH", "TOTAL STUDENTS")}
            </div>
            <div className="text-2xl font-bold text-primary mt-1">
              {studentList.length}
            </div>
            <div className="text-[10px] text-brand mt-0.5">
              6 lớp (10A7 → 10A16)
            </div>
          </div>

          <div className="bg-surface p-4">
            <div className="text-[11px] text-secondary uppercase">
              {t("CHUYÊN ĐỀ BÀI GIẢNG", "CURRICULUM LESSONS")}
            </div>
            <div className="text-2xl font-bold text-primary mt-1">
              {PYTHON_CURRICULUM_LESSONS.length}
            </div>
            <div className="text-[10px] text-muted mt-0.5">
              Bài 16 → Bài 31 (SGK)
            </div>
          </div>

          <div className="bg-surface p-4">
            <div className="text-[11px] text-secondary uppercase">
              {t("NGÂN HÀNG BÀI TẬP", "TOTAL EXERCISES")}
            </div>
            <div className="text-2xl font-bold text-brand mt-1">
              {assignments.length}
            </div>
            <div className="text-[10px] text-muted mt-0.5">
              Có chấm test tự động
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
            <div className="text-[11px] text-secondary uppercase">
              {t("ĐỒNG BỘ CLOUD", "CLOUD SYNC")}
            </div>
            <button
              type="button"
              onClick={handleForceSyncFirestore}
              className="mt-1 px-2.5 py-1.5 bg-brand text-white font-semibold text-[11px] hover:opacity-90 transition-opacity text-center"
            >
              [🚀 ĐỒNG BỘ FIRESTORE]
            </button>
          </div>
        </div>

        {/* 2. PRIMARY ADMIN NAVIGATION TABS (4 MODULES) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 bg-grid gap-[1px] border-b border-grid font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("OVERVIEW")}
            className={`py-3.5 px-4 text-left font-bold transition-colors flex items-center justify-between ${
              activeTab === "OVERVIEW"
                ? "bg-brand text-white"
                : "bg-subtle text-secondary hover:text-primary hover:bg-surface"
            }`}
          >
            <span>📊 01. TỔNG QUAN LỚP & BÀI GIẢNG</span>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("STUDENTS")}
            className={`py-3.5 px-4 text-left font-bold transition-colors flex items-center justify-between ${
              activeTab === "STUDENTS"
                ? "bg-brand text-white"
                : "bg-subtle text-secondary hover:text-primary hover:bg-surface"
            }`}
          >
            <span>👥 02. QUẢN LÝ HỌC SINH ({studentList.length})</span>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CURRICULUM")}
            className={`py-3.5 px-4 text-left font-bold transition-colors flex items-center justify-between ${
              activeTab === "CURRICULUM"
                ? "bg-brand text-white"
                : "bg-subtle text-secondary hover:text-primary hover:bg-surface"
            }`}
          >
            <span>📚 03. BÀI GIẢNG & ĐỀ BÀI ({assignments.length})</span>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("SUBMISSIONS")}
            className={`py-3.5 px-4 text-left font-bold transition-colors flex items-center justify-between ${
              activeTab === "SUBMISSIONS"
                ? "bg-brand text-white"
                : "bg-subtle text-secondary hover:text-primary hover:bg-surface"
            }`}
          >
            <span>💻 04. KIỂM TRA BÀI NỘP ({submissions.length})</span>
            <span>→</span>
          </button>
        </div>

        {statusNotice && (
          <div className="px-6 py-2.5 bg-brand/10 border-b border-brand text-brand font-mono text-xs font-semibold flex items-center justify-between">
            <span>{statusNotice}</span>
            <button onClick={() => setStatusNotice(null)}>[✕]</button>
          </div>
        )}

        {/* ===================================================================
            TAB 1: OVERVIEW DASHBOARD (CLASS PROGRESS & CURRICULUM ANALYTICS)
           =================================================================== */}
        {activeTab === "OVERVIEW" && (
          <div>
            <SectionHeader
              glyph="[📊]"
              badge="BẢNG ĐIỀU KHIỂN LỚP HỌC (6 LỚP)"
              title="Tình hình Học tập & Làm bài của 6 Lớp (10A7, 10A12 → 10A16)"
              subtitle="Theo dõi sĩ số tài khoản, số học sinh tích cực làm bài, tổng số bài tập hoàn thành và tiến độ trung bình của từng lớp."
            />

            {/* 6 Classes Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-grid gap-[1px] border-b border-grid">
              {classAnalytics.map((cls) => (
                <div
                  key={cls.className}
                  className="bg-surface p-6 flex flex-col justify-between hover:bg-subtle/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-3">
                      <span className="px-3 py-1 bg-brand text-white font-bold text-sm">
                        LỚP {cls.className}
                      </span>
                      <span className="text-secondary">
                        Sĩ số:{" "}
                        <strong className="text-primary">
                          {cls.studentCount} học sinh
                        </strong>
                      </span>
                    </div>

                    {/* Class Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span className="text-secondary">
                          Tiến độ hoàn thành TB của lớp:
                        </span>
                        <span className="text-success font-bold">
                          {cls.avgProgressPct}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-canvas border border-grid overflow-hidden">
                        <div
                          className="h-full bg-success transition-all duration-300"
                          style={{ width: `${cls.avgProgressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 bg-grid gap-[1px] border border-grid font-mono text-center text-xs mb-4">
                      <div className="bg-subtle p-2.5">
                        <div className="text-[10px] text-secondary">
                          ĐÃ ĐĂNG KÝ
                        </div>
                        <div className="text-base font-bold text-primary mt-0.5">
                          {cls.studentCount}
                        </div>
                      </div>
                      <div className="bg-subtle p-2.5">
                        <div className="text-[10px] text-secondary">
                          ĐÃ LÀM BÀI
                        </div>
                        <div className="text-base font-bold text-brand mt-0.5">
                          {cls.activeStudentsCount}
                        </div>
                      </div>
                      <div className="bg-subtle p-2.5">
                        <div className="text-[10px] text-secondary">
                          BÀI ĐÃ ĐẠT
                        </div>
                        <div className="text-base font-bold text-success mt-0.5">
                          {cls.totalPassedInClass}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-secondary mb-4">
                      ★ Học sinh dẫn đầu lớp:{" "}
                      {cls.topStudent ? (
                        <strong className="text-primary">
                          {cls.topStudent.displayName} (@
                          {cls.topStudent.username ||
                            cls.topStudent.uid.replace(/^usr_/, "")}
                          )
                        </strong>
                      ) : (
                        <span className="text-muted">Chưa có học sinh</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-grid flex items-center justify-between gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setStudentClassFilter(cls.className);
                        setActiveTab("STUDENTS");
                      }}
                      className="px-3 py-1.5 bg-subtle border border-grid text-primary hover:border-brand hover:text-brand font-semibold transition-colors"
                    >
                      [👥 Danh sách HS lớp {cls.className}]
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubClassFilter(cls.className);
                        setActiveTab("SUBMISSIONS");
                      }}
                      className="px-3 py-1.5 bg-surface border border-grid text-secondary hover:text-primary transition-colors"
                    >
                      [💻 Bài nộp ({cls.totalPassedInClass})]
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Curriculum Lessons Progress Breakdown (Bài 16 -> Bài 31) */}
            <SectionHeader
              glyph="[📚]"
              badge="THỐNG KÊ THEO BÀI GIẢNG (BÀI 16 → BÀI 31)"
              title="Tình hình Nắm bắt Kiến thức & Hoàn thành Bài tập theo từng Bài học"
              subtitle="Giúp giáo viên nắm bắt bài học nào học sinh đã hoàn thành tốt và bài học nào cần hướng dẫn thêm."
            />

            <div className="bg-surface border-b border-grid overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-subtle border-b border-grid text-secondary uppercase">
                    <th className="py-3 px-4">MÃ BÀI</th>
                    <th className="py-3 px-4">TÊN CHUYÊN ĐỀ BÀI GIẢNG</th>
                    <th className="py-3 px-4 text-center">SỐ BÀI TẬP</th>
                    <th className="py-3 px-4 text-center">TỔNG LƯỢT NỘP</th>
                    <th className="py-3 px-4 text-center">SỐ LƯỢT ĐẠT 100%</th>
                    <th className="py-3 px-4">TỶ LỆ VƯỢT QUA TEST</th>
                    <th className="py-3 px-4 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grid">
                  {lessonAnalytics.map((item) => (
                    <tr
                      key={item.lesson.id}
                      className="hover:bg-subtle/60 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-brand text-white font-bold">
                          {item.lesson.code}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-primary font-semibold">
                        <div>{item.lesson.titleVi}</div>
                        <div className="text-[11px] text-secondary font-normal truncate max-w-md">
                          {item.lesson.summaryVi}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-primary">
                        {item.exerciseCount} bài
                      </td>
                      <td className="py-3 px-4 text-center text-secondary">
                        {item.attemptsCount} lượt
                      </td>
                      <td className="py-3 px-4 text-center text-success font-bold">
                        {item.passedCount} lượt ({item.uniqueStudentsPassed} HS)
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-canvas border border-grid overflow-hidden">
                            <div
                              className="h-full bg-success"
                              style={{ width: `${item.passRateLesson}%` }}
                            />
                          </div>
                          <span className="text-success font-bold">
                            {item.passRateLesson}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLessonViewId(item.lesson.id);
                            setActiveTab("CURRICULUM");
                          }}
                          className="px-2.5 py-1 border border-grid bg-surface text-primary hover:border-brand hover:text-brand"
                        >
                          [📖 Xem bài giảng & đề bài]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: STUDENT MANAGEMENT BY CLASS (10A7, 10A12..10A16)
           =================================================================== */}
        {activeTab === "STUDENTS" && (
          <div>
            <SectionHeader
              glyph="[👥]"
              badge="QUẢN LÝ HỌC SINH THEO LỚP"
              title="Danh sách Học sinh, Quản lý Tài khoản & Bảng điểm Chi tiết"
              subtitle="Thêm/sửa tài khoản học sinh, cấp lại mật khẩu, chuyển lớp và kiểm tra toàn bộ bài làm của từng học sinh."
              rightElement={
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setShowPasswordsInTable((p) => !p)}
                    className="px-3 py-1.5 border border-grid bg-surface text-secondary hover:text-primary"
                  >
                    {showPasswordsInTable
                      ? "[🙈 Ẩn mật khẩu HS]"
                      : "[👁 Hiện mật khẩu HS]"}
                  </button>
                </div>
              }
            />

            {/* Class Filter Bar (Tất cả + 6 Lớp) */}
            <div className="p-4 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setStudentClassFilter("ALL")}
                  className={`px-3 py-1.5 border font-semibold transition-colors ${
                    studentClassFilter === "ALL"
                      ? "bg-brand text-white border-brand"
                      : "bg-surface text-secondary border-grid hover:text-primary"
                  }`}
                >
                  TẤT CẢ LỚP ({studentList.length})
                </button>
                {GRADE_10_CLASSES.map((cls) => {
                  const count = studentList.filter(
                    (s) => (s.className || "10A7") === cls
                  ).length;
                  const active = studentClassFilter === cls;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setStudentClassFilter(cls)}
                      className={`px-3 py-1.5 border font-semibold transition-colors ${
                        active
                          ? "bg-brand text-white border-brand"
                          : "bg-surface text-secondary border-grid hover:text-primary"
                      }`}
                    >
                      LỚP {cls} ({count})
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="🔍 Tìm học sinh theo Họ tên hoặc @username..."
                className="bg-surface border border-grid px-3 py-1.5 text-primary focus:outline-none focus:border-brand w-full sm:w-72"
              />
            </div>

            <BentoGrid cols={12}>
              {/* Left 4 Cols: Add / Edit Student Account Form */}
              <BentoCell colSpan="md:col-span-4">
                <form
                  onSubmit={handleSaveStudent}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between border-b border-grid pb-3">
                    <SectionBadge
                      glyph="◆"
                      label={
                        editingStudentUid
                          ? "CHỈNH SỬA HỒ SƠ HỌC SINH"
                          : "THÊM HỌC SINH MỚI"
                      }
                      className="mb-0"
                    />
                    {editingStudentUid && (
                      <button
                        type="button"
                        onClick={handleResetStudentForm}
                        className="text-brand hover:underline"
                      >
                        [+ Tạo mới]
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-secondary uppercase mb-1 font-semibold">
                      1. Tên đăng nhập (Username) *
                    </label>
                    <input
                      type="text"
                      required
                      value={stuUsername}
                      onChange={(e) => setStuUsername(e.target.value)}
                      placeholder="VD: an10a7"
                      className="w-full bg-background border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-secondary uppercase mb-1 font-semibold">
                      2. Họ và tên học sinh *
                    </label>
                    <input
                      type="text"
                      required
                      value={stuFullName}
                      onChange={(e) => setStuFullName(e.target.value)}
                      placeholder="VD: Nguyễn Minh An"
                      className="w-full bg-background border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-secondary uppercase mb-1 font-semibold">
                      3. Lớp học *
                    </label>
                    <div className="grid grid-cols-3 bg-grid gap-[1px] border border-grid">
                      {GRADE_10_CLASSES.map((cls) => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setStuClassName(cls)}
                          className={`py-2 text-center font-bold ${
                            stuClassName === cls
                              ? "bg-brand text-white"
                              : "bg-surface text-secondary hover:text-primary"
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-secondary uppercase mb-1 font-semibold">
                      4. Mật khẩu (Password) *
                    </label>
                    <input
                      type="text"
                      required
                      value={stuPassword}
                      onChange={(e) => setStuPassword(e.target.value)}
                      placeholder="VD: 123456"
                      className="w-full bg-background border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand text-white font-bold uppercase hover:opacity-90 transition-opacity"
                  >
                    {editingStudentUid
                      ? "[✓] CẬP NHẬT HỒ SƠ HỌC SINH"
                      : "[+ THÊM HỌC SINH VÀO LỚP]"}
                  </button>
                </form>
              </BentoCell>

              {/* Right 8 Cols: Student Roster Table */}
              <BentoCell colSpan="md:col-span-8" noPadding>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-subtle border-b border-grid text-secondary uppercase">
                        <th className="py-3 px-4">STT</th>
                        <th className="py-3 px-4">HỌ VÀ TÊN</th>
                        <th className="py-3 px-4">USERNAME / MK</th>
                        <th className="py-3 px-4">LỚP</th>
                        <th className="py-3 px-4">
                          TIẾN ĐỘ ({totalAssignments} BÀI)
                        </th>
                        <th className="py-3 px-4 text-right">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-grid">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-8 text-center text-muted"
                          >
                            Chưa có học sinh nào trong bộ lọc này.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((stu, idx) => {
                          const st = getStudentStats(stu.uid);
                          const uname =
                            stu.username || stu.uid.replace(/^usr_/, "");
                          return (
                            <tr
                              key={stu.uid}
                              className="hover:bg-subtle/60 transition-colors"
                            >
                              <td className="py-3 px-4 text-muted">
                                #{idx + 1}
                              </td>
                              <td className="py-3 px-4 font-bold text-primary">
                                {stu.displayName}
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-brand font-semibold">
                                  @{uname}
                                </div>
                                <div className="text-[11px] text-secondary">
                                  MK:{" "}
                                  {showPasswordsInTable
                                    ? stu.password || "123456"
                                    : "••••••"}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 bg-brand/15 border border-brand/40 text-brand font-bold">
                                  {stu.className || "10A7"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-success font-bold">
                                    {st.passedCount}/{totalAssignments} bài đạt
                                  </span>
                                  <span className="text-muted">
                                    ({st.progressPct}%)
                                  </span>
                                </div>
                                <div className="w-32 h-2 bg-canvas border border-grid overflow-hidden">
                                  <div
                                    className="h-full bg-success"
                                    style={{ width: `${st.progressPct}%` }}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setInspectedStudentProfile(stu)
                                  }
                                  className="px-2.5 py-1 bg-brand text-white font-semibold hover:opacity-90"
                                >
                                  [📋 Bảng điểm & Code]
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEditStudentClick(stu)}
                                  className="px-2 py-1 border border-grid bg-surface text-secondary hover:text-primary"
                                >
                                  [✎ Sửa]
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStudent(stu)}
                                  className="px-2 py-1 border border-grid bg-surface text-secondary hover:text-brand"
                                >
                                  [✕]
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </BentoCell>
            </BentoGrid>
          </div>
        )}

        {/* ===================================================================
            TAB 3: CURRICULUM & ASSIGNMENT AUTHORING STUDIO
           =================================================================== */}
        {activeTab === "CURRICULUM" && (
          <div>
            {/* Section A: Inspect Lesson Theory & Exercises per Lesson */}
            <SectionHeader
              glyph="[📚]"
              badge="QUẢN LÝ NỘI DUNG BÀI GIẢNG (BÀI 16 → BÀI 31)"
              title="Kiểm tra Nội dung Lý thuyết & Phân bổ Bài tập theo từng Bài học"
              subtitle="Chọn chuyên đề bài học để xem nội dung lý thuyết hiển thị cho học sinh và các bài tập thuộc chuyên đề đó."
            />

            <div className="p-4 bg-subtle border-b border-grid flex flex-wrap gap-1.5 font-mono text-xs">
              {PYTHON_CURRICULUM_LESSONS.map((l) => {
                const count = assignments.filter(
                  (a) => a.lessonId === l.id
                ).length;
                const active = selectedLessonViewId === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setSelectedLessonViewId(l.id)}
                    className={`px-3 py-1.5 border font-semibold transition-colors ${
                      active
                        ? "bg-brand text-white border-brand"
                        : "bg-surface text-secondary border-grid hover:text-primary"
                    }`}
                  >
                    {l.code} ({count} bài tập)
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 bg-grid gap-[1px] border-b border-grid">
              <div className="lg:col-span-7 bg-surface p-6 max-h-96 overflow-y-auto">
                <div className="font-mono text-xs text-brand font-bold uppercase mb-2">
                  📖 NỘI DUNG BÀI GIẢNG: {activeLessonTopic.titleVi}
                </div>
                <MarkdownRenderer
                  content={activeLessonTopic.theoryMarkdownVi}
                />
              </div>

              <div className="lg:col-span-5 bg-subtle p-6 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary font-bold uppercase mb-3">
                    🎯 CÁC BÀI TẬP THUỘC {activeLessonTopic.code}:
                  </div>
                  <div className="space-y-2">
                    {assignments
                      .filter((a) => a.lessonId === activeLessonTopic.id)
                      .map((asgn) => (
                        <div
                          key={asgn.id}
                          onClick={() => populateFormWithAssignment(asgn)}
                          className="p-3 bg-surface border border-grid hover:border-brand cursor-pointer flex items-center justify-between font-mono text-xs"
                        >
                          <div>
                            <div className="font-bold text-primary">
                              {asgn.title}
                            </div>
                            <div className="text-[11px] text-secondary">
                              {asgn.testCases.length} bộ test chấm tự động
                            </div>
                          </div>
                          <span className="text-brand font-semibold">
                            [✎ Chỉnh sửa ↓]
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleInitNewAssignment}
                  className="mt-4 w-full py-2.5 bg-brand text-white font-mono text-xs font-bold uppercase"
                >
                  [+ THÊM BÀI TẬP MỚI VÀO {activeLessonTopic.code}]
                </button>
              </div>
            </div>

            {/* Section B: Full Assignment & Test Suite Editor */}
            <SectionHeader
              glyph="[◆]"
              badge="STUDIO SOẠN THẢO ĐỀ BÀI & TEST CASES"
              title="Chỉnh sửa Đề bài tập, Code Mẫu & Bộ Test Chấm điểm Tự động"
              rightElement={
                <button
                  type="button"
                  onClick={handleInitNewAssignment}
                  className="px-3.5 py-2 bg-brand text-white font-mono text-xs font-semibold hover:opacity-90"
                >
                  [+ TẠO BÀI TẬP MỚI]
                </button>
              }
            />

            <BentoGrid cols={12}>
              {/* Left 4 Cols: All 22 Exercises List */}
              <BentoCell colSpan="md:col-span-4" noPadding>
                <div className="max-h-[680px] overflow-y-auto divide-y divide-grid">
                  {assignments.map((rawItem) => {
                    const item = localizeAssignment(rawItem, lang);
                    const isEditing = editingId === item.id;
                    const lessonMeta = PYTHON_CURRICULUM_LESSONS.find(
                      (l) => l.id === rawItem.lessonId
                    );
                    return (
                      <div
                        key={item.id}
                        onClick={() => populateFormWithAssignment(item)}
                        className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                          isEditing
                            ? "bg-subtle border-l-4 border-l-brand"
                            : "bg-surface hover:bg-subtle/60"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 font-mono text-[10px] mb-1">
                            {lessonMeta && (
                              <span className="px-1.5 py-0.2 bg-brand/15 border border-brand/40 text-brand font-bold">
                                {lessonMeta.code}
                              </span>
                            )}
                            <span className="text-secondary">
                              {localizeDifficulty(item.difficulty, lang)}
                            </span>
                            <span className="text-muted">
                              • {item.testCases.length} test
                            </span>
                          </div>
                          <div className="text-xs font-bold text-primary truncate">
                            {item.title}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-[11px] shrink-0">
                          <Link
                            to={`/workspace/${item.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 border border-grid bg-surface text-secondary hover:text-primary"
                          >
                            IDE ↗
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAssignment(item.id);
                            }}
                            className="px-2 py-1 border border-grid bg-surface text-secondary hover:text-brand"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BentoCell>

              {/* Right 8 Cols: Assignment Form */}
              <BentoCell colSpan="md:col-span-8" noPadding>
                <form
                  onSubmit={handleSaveAssignment}
                  className="divide-y divide-grid"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <SectionBadge
                        glyph={glyph}
                        label={
                          editingId
                            ? `ĐANG CHỈNH SỬA BÀI TẬP // ${editingId}`
                            : "TẠO BÀI TẬP MỚI"
                        }
                        className="mb-0"
                      />
                      <div className="flex items-center gap-1 font-mono text-xs">
                        {GLYPH_OPTIONS.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGlyph(g)}
                            className={`w-7 h-7 border flex items-center justify-center ${
                              glyph === g
                                ? "border-brand bg-subtle text-brand"
                                : "border-grid bg-surface text-secondary"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono text-xs">
                      <div className="md:col-span-5">
                        <label className="block text-secondary uppercase mb-1.5">
                          TIÊU ĐỀ BÀI TẬP
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-background border border-grid px-3.5 py-2.5 text-primary focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div className="md:col-span-4">
                        <label className="block text-secondary uppercase mb-1.5">
                          THUỘC BÀI HỌC (TIN HỌC 10)
                        </label>
                        <select
                          value={lessonId}
                          onChange={(e) => setLessonId(e.target.value)}
                          className="w-full bg-background border border-grid px-3 py-2.5 text-primary focus:outline-none focus:border-brand"
                        >
                          {PYTHON_CURRICULUM_LESSONS.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.code}: {l.titleVi}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-secondary uppercase mb-1.5">
                          MỨC ĐỘ
                        </label>
                        <select
                          value={difficulty}
                          onChange={(e) =>
                            setDifficulty(e.target.value as DifficultyLevel)
                          }
                          className="w-full bg-background border border-grid px-3 py-2.5 text-primary focus:outline-none focus:border-brand"
                        >
                          <option value="Beginner">Cơ bản</option>
                          <option value="Intermediate">Trung bình</option>
                          <option value="Advanced">Nâng cao</option>
                        </select>
                      </div>
                    </div>

                    <div className="font-mono text-xs">
                      <label className="block text-secondary uppercase mb-1.5">
                        NỘI DUNG ĐỀ BÀI (MARKDOWN)
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-background border border-grid p-3.5 text-primary focus:outline-none focus:border-brand leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="font-mono text-xs uppercase text-secondary">
                      CODE PYTHON GỢI Ý BAN ĐẦU CHO HỌC SINH
                    </div>
                    <div className="h-40 border border-grid bg-terminal">
                      <Editor
                        height="100%"
                        language="python"
                        theme="vs-dark"
                        value={starterCode}
                        onChange={(val) => setStarterCode(val ?? "")}
                        options={{
                          fontSize: 12,
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="uppercase text-secondary font-semibold">
                        BỘ TEST CASES CHẤM ĐIỂM TỰ ĐỘNG ({testCases.length})
                      </span>
                      <button
                        type="button"
                        onClick={handleAddTestCase}
                        className="px-3 py-1.5 bg-subtle border border-grid text-primary hover:border-brand"
                      >
                        [+ THÊM BỘ TEST]
                      </button>
                    </div>

                    <div className="space-y-3">
                      {testCases.map((tc, index) => (
                        <div
                          key={index}
                          className="border border-grid bg-subtle p-4 space-y-3 font-mono text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">
                              TEST #{index + 1}
                            </span>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer text-secondary">
                                <input
                                  type="checkbox"
                                  checked={tc.isHidden}
                                  onChange={(e) =>
                                    handleUpdateTestCase(
                                      index,
                                      "isHidden",
                                      e.target.checked
                                    )
                                  }
                                  className="accent-brand"
                                />
                                <span>Test ẩn</span>
                              </label>
                              {testCases.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTestCase(index)}
                                  className="text-muted hover:text-brand"
                                >
                                  [✕ Xóa]
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-secondary uppercase mb-1">
                                DỮ LIỆU VÀO (INPUT)
                              </label>
                              <textarea
                                rows={2}
                                value={tc.input}
                                onChange={(e) =>
                                  handleUpdateTestCase(
                                    index,
                                    "input",
                                    e.target.value
                                  )
                                }
                                className="w-full bg-background border border-grid p-2 text-primary focus:outline-none focus:border-brand"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-secondary uppercase mb-1">
                                ĐÁP ÁN ĐÚNG (EXPECTED OUTPUT)
                              </label>
                              <textarea
                                rows={2}
                                value={tc.expectedOutput}
                                onChange={(e) =>
                                  handleUpdateTestCase(
                                    index,
                                    "expectedOutput",
                                    e.target.value
                                  )
                                }
                                className="w-full bg-background border border-grid p-2 text-success focus:outline-none focus:border-brand"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-brand text-white font-mono text-xs font-bold uppercase hover:opacity-90"
                      >
                        [✓] LƯU & XUẤT BẢN BÀI TẬP LÊN FIRESTORE
                      </button>
                    </div>
                  </div>
                </form>
              </BentoCell>
            </BentoGrid>
          </div>
        )}

        {/* ===================================================================
            TAB 4: ALL STUDENT SUBMISSIONS & CODE INSPECTOR
           =================================================================== */}
        {activeTab === "SUBMISSIONS" && (
          <div>
            <SectionHeader
              glyph="[💻]"
              badge="NHẬT KÝ BÀI NỘP & KIỂM TRA CODE"
              title="Toàn bộ Bài nộp của Học sinh trên Hệ thống"
              subtitle="Lọc theo Lớp (10A7..10A16), theo Bài học (Bài 16..31) hoặc theo Trạng thái chấm điểm để xem trực tiếp code Python của học sinh."
            />

            {/* Multi-dimensional filter bar */}
            <div className="p-4 bg-subtle border-b border-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              <div>
                <label className="block text-[10px] text-secondary uppercase mb-1">
                  1. LỌC THEO LỚP HỌC:
                </label>
                <select
                  value={subClassFilter}
                  onChange={(e) => setSubClassFilter(e.target.value)}
                  className="w-full bg-surface border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                >
                  <option value="ALL">Tất cả 6 lớp (10A7 → 10A16)</option>
                  {GRADE_10_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      Lớp {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-secondary uppercase mb-1">
                  2. LỌC THEO BÀI HỌC:
                </label>
                <select
                  value={subLessonFilter}
                  onChange={(e) => setSubLessonFilter(e.target.value)}
                  className="w-full bg-surface border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                >
                  <option value="ALL">Tất cả bài giảng (Bài 16 → 31)</option>
                  {PYTHON_CURRICULUM_LESSONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.code}: {l.titleVi}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-secondary uppercase mb-1">
                  3. LỌC THEO KẾT QUẢ CHẤM:
                </label>
                <select
                  value={subStatusFilter}
                  onChange={(e) => setSubStatusFilter(e.target.value)}
                  className="w-full bg-surface border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="passed">✓ Đã đạt 100% (Passed)</option>
                  <option value="failed">✕ Chưa đạt (Failed)</option>
                  <option value="in_progress">◐ Đang làm (In Progress)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-secondary uppercase mb-1">
                  4. TÌM THEO TÊN HỌC SINH:
                </label>
                <input
                  type="text"
                  value={subSearch}
                  onChange={(e) => setSubSearch(e.target.value)}
                  placeholder="Nhập tên học sinh..."
                  className="w-full bg-surface border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="bg-surface border-b border-grid overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-subtle border-b border-grid text-secondary uppercase">
                    <th className="py-3 px-4">HỌ VÀ TÊN HỌC SINH</th>
                    <th className="py-3 px-4">LỚP</th>
                    <th className="py-3 px-4">BÀI HỌC & BÀI TẬP</th>
                    <th className="py-3 px-4">KẾT QUẢ CHẤM</th>
                    <th className="py-3 px-4">KẾT QUẢ IN RA (STDOUT)</th>
                    <th className="py-3 px-4">THỜI GIAN NỘP</th>
                    <th className="py-3 px-4 text-right">KIỂM TRA CODE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grid">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted">
                        Không có bài nộp nào khớp với bộ lọc hiện tại.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => {
                      const rawAsgn = assignments.find(
                        (a) => a.id === sub.assignmentId
                      );
                      const student = users.find((u) => u.uid === sub.userId);
                      const stuClass =
                        sub.userClassName || student?.className || "10A7";
                      const lessonMeta = PYTHON_CURRICULUM_LESSONS.find(
                        (l) => l.id === rawAsgn?.lessonId
                      );

                      return (
                        <tr
                          key={sub.id}
                          className="hover:bg-subtle/60 transition-colors"
                        >
                          <td className="py-3 px-4 font-bold text-primary">
                            {sub.userDisplayName ||
                              student?.displayName ||
                              sub.userId}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-brand/15 border border-brand/40 text-brand font-bold">
                              {stuClass}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {lessonMeta && (
                              <span className="mr-1.5 px-1.5 py-0.2 bg-subtle border border-grid text-brand font-semibold text-[10px]">
                                {lessonMeta.code}
                              </span>
                            )}
                            <span className="text-primary">
                              {rawAsgn ? rawAsgn.title : sub.assignmentId}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {sub.status === "passed" ? (
                              <span className="px-2 py-0.5 bg-success/10 text-success border border-success/30 font-semibold">
                                ✓ ĐẠT{" "}
                                {sub.passedCount !== undefined
                                  ? `(${sub.passedCount}/${sub.totalCount})`
                                  : ""}
                              </span>
                            ) : sub.status === "failed" ? (
                              <span className="px-2 py-0.5 bg-brand/10 text-brand border border-brand/30 font-semibold">
                                ✕ CHƯA ĐẠT{" "}
                                {sub.passedCount !== undefined
                                  ? `(${sub.passedCount}/${sub.totalCount})`
                                  : ""}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-subtle text-warn border border-grid">
                                ◐ ĐANG LÀM
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-muted max-w-[200px] truncate">
                            {sub.lastExecutedOutput || "—"}
                          </td>
                          <td className="py-3 px-4 text-muted">
                            {new Date(sub.updatedAt).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectedSubmission(sub)}
                              className="px-3 py-1 bg-brand text-white font-semibold hover:opacity-90"
                            >
                              [🔍 XEM CODE]
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
      </BentoSection>

      {/* =====================================================================
          MODAL 1: FULL STUDENT REPORT CARD (ALL 22 EXERCISES & CODE VIEWER)
         ===================================================================== */}
      {inspectedStudentProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-grid max-w-4xl w-full p-6 space-y-4 my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-grid pb-3 font-mono text-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-brand text-white font-bold">
                  LỚP {inspectedStudentProfile.className || "10A7"}
                </span>
                <span className="text-base font-bold text-primary">
                  HỒ SƠ BÀI LÀM: {inspectedStudentProfile.displayName} (@
                  {inspectedStudentProfile.username ||
                    inspectedStudentProfile.uid.replace(/^usr_/, "")}
                  )
                </span>
              </div>
              <button
                onClick={() => setInspectedStudentProfile(null)}
                className="px-3 py-1 border border-grid text-secondary hover:text-primary"
              >
                [✕] ĐÓNG
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-grid border border-grid font-mono text-xs">
              {assignments.map((asgn) => {
                const sub = submissions.find(
                  (s) =>
                    s.userId === inspectedStudentProfile.uid &&
                    s.assignmentId === asgn.id
                );
                const lessonMeta = PYTHON_CURRICULUM_LESSONS.find(
                  (l) => l.id === asgn.lessonId
                );

                return (
                  <div
                    key={asgn.id}
                    className="p-3.5 bg-canvas flex flex-wrap items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {lessonMeta && (
                          <span className="px-1.5 py-0.2 bg-subtle border border-grid text-brand font-bold text-[10px]">
                            {lessonMeta.code}
                          </span>
                        )}
                        <span className="font-semibold text-primary">
                          {asgn.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {sub ? (
                        <>
                          <span
                            className={`px-2 py-0.5 border font-semibold text-[11px] ${
                              sub.status === "passed"
                                ? "border-success bg-success/10 text-success"
                                : sub.status === "failed"
                                ? "border-brand bg-brand/10 text-brand"
                                : "border-warn bg-warn/10 text-warn"
                            }`}
                          >
                            {sub.status === "passed"
                              ? "✓ ĐÃ ĐẠT 100%"
                              : sub.status === "failed"
                              ? "✕ CHƯA ĐẠT"
                              : "◐ ĐANG LÀM"}
                          </span>
                          <button
                            type="button"
                            onClick={() => setInspectedSubmission(sub)}
                            className="px-2.5 py-1 bg-brand text-white font-semibold"
                          >
                            [🔍 Xem Code bài này]
                          </button>
                        </>
                      ) : (
                        <span className="px-2 py-0.5 border border-grid bg-subtle text-muted text-[11px]">
                          ○ Chưa làm
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: INSPECT STUDENT PYTHON CODE SNAPSHOT
         ===================================================================== */}
      {inspectedSubmission && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-surface border border-grid max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-grid pb-3 font-mono text-xs">
              <div>
                <span className="text-brand mr-2">◆</span>
                <span className="text-primary font-bold uppercase">
                  CHI TIẾT CODE BÀI NỘP //{" "}
                  {inspectedSubmission.userDisplayName ||
                    inspectedSubmission.userId}{" "}
                  (Lớp {inspectedSubmission.userClassName || "10A7"})
                </span>
              </div>
              <button
                onClick={() => setInspectedSubmission(null)}
                className="px-2.5 py-1 border border-grid text-secondary hover:text-primary"
              >
                [✕] ĐÓNG
              </button>
            </div>
            <pre className="p-4 bg-terminal text-zinc-100 border border-grid font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
              {inspectedSubmission.code}
            </pre>
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-secondary border-t border-grid pt-3">
              <span>
                KẾT QUẢ IN RA (STDOUT):{" "}
                <strong className="text-emerald-400">
                  {inspectedSubmission.lastExecutedOutput || "Không có"}
                </strong>
              </span>
              <span className="uppercase font-bold text-primary">
                TRẠNG THÁI: {inspectedSubmission.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
