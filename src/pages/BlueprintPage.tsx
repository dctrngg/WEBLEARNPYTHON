import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopNavigationBar } from "../components/layout/TopNavigationBar";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { PythonCheatSheetModal } from "../components/ui/PythonCheatSheetModal";
import { QuizSection } from "../components/ui/QuizSection";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  PYTHON_CURRICULUM_LESSONS,
  LessonTopic,
} from "../services/curriculumData";
import {
  getAssignments,
  getUserSubmissions,
} from "../services/firestoreService";
import { Assignment, Submission } from "../types/ide";

export const BlueprintPage: React.FC = () => {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    PYTHON_CURRICULUM_LESSONS[0].id
  );
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<
    Record<string, Submission>
  >({});
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<
    "curriculum" | "all_exercises"
  >("curriculum");
  const [copiedSample, setCopiedSample] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("chroma_py_curriculum_sidebar");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("chroma_py_curriculum_sidebar", String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    async function loadData() {
      const list = await getAssignments();
      setAssignments(list);
      if (user) {
        const subs = await getUserSubmissions(user.uid);
        const map: Record<string, Submission> = {};
        subs.forEach((s) => {
          map[s.assignmentId] = s;
        });
        setUserSubmissions(map);
      }
    }
    loadData();
  }, [user]);

  const activeLesson: LessonTopic =
    PYTHON_CURRICULUM_LESSONS.find((l) => l.id === selectedLessonId) ||
    PYTHON_CURRICULUM_LESSONS[0];

  const activeLessonIndex = PYTHON_CURRICULUM_LESSONS.findIndex(
    (l) => l.id === activeLesson.id
  );

  const getExercisesForLesson = (lessonId: string) =>
    assignments.filter((a) => a.lessonId === lessonId);

  const activeLessonExercises = getExercisesForLesson(activeLesson.id);

  const passedTotalCount = assignments.filter(
    (a) => userSubmissions[a.id]?.status === "passed"
  ).length;

  const getDifficultyLabel = (diff: Assignment["difficulty"]) => {
    if (diff === "Beginner") return t("Cơ bản", "Beginner");
    if (diff === "Intermediate") return t("Trung bình", "Intermediate");
    return t("Nâng cao", "Advanced");
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(activeLesson.sampleCode);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 1800);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary flex flex-col">
      <TopNavigationBar
        breadcrumb={t(
          "Tin học 10 // sổ tay kiến thức & bài tập Python",
          "Cs grade 10 // Python curriculum & exercises"
        )}
        engineState="ready"
        engineStatusText="CURRICULUM READY"
        studentProgressText={`${t("Đã hoàn thành", "Completed")}: ${passedTotalCount}/${assignments.length} ${t("bài tập", "exercises")}`}
        onOpenCheatSheet={() => setCheatSheetOpen(true)}
      />

      <main className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-5">
        {/* MINIMALIST HEADER BAR (CHROMA RETRO-MINIMALIST) */}
        <section className="neo-box bg-surface p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-brand text-white font-mono text-xs font-bold">
              TIN HỌC 10
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary">
              {t("Lý Thuyết & Thực Hành Python", "Python Theory & Practice")}
            </h1>
            <span className="text-secondary font-mono text-xs hidden md:inline">
              (Bài 16 → 31)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs sm:text-sm">
            {/* Tab switch */}
            <div className="flex items-center border border-grid bg-subtle">
              <button
                onClick={() => setActiveSectionTab("curriculum")}
                className={`px-3 py-1.5 font-bold transition-colors ${
                  activeSectionTab === "curriculum"
                    ? "bg-brand text-white"
                    : "text-secondary hover:text-primary hover:bg-surface"
                }`}
              >
                📚 {t("Lý thuyết", "Theory")}
              </button>
              <button
                onClick={() => setActiveSectionTab("all_exercises")}
                className={`px-3 py-1.5 font-bold transition-colors ${
                  activeSectionTab === "all_exercises"
                    ? "bg-brand text-white"
                    : "text-secondary hover:text-primary hover:bg-surface"
                }`}
              >
                🗂 {t(`${assignments.length} Bài tập`, `${assignments.length} Tasks`)}
              </button>
            </div>

            {/* Progress pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-canvas border border-grid text-xs">
              <span className="text-secondary font-semibold">
                {t("Đã đạt:", "Done:")}
              </span>
              <strong className="text-success">
                {passedTotalCount}/{assignments.length}
              </strong>
              <div className="w-16 h-2 bg-subtle border border-grid overflow-hidden">
                <div
                  className="h-full bg-success transition-all duration-300"
                  style={{
                    width: `${
                      assignments.length > 0
                        ? (passedTotalCount / assignments.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Quick Open IDE */}
            <Link
              to={
                activeLessonExercises[0]
                  ? `/workspace/${activeLessonExercises[0].id}`
                  : "/workspace"
              }
              className="neo-btn px-3.5 py-1.5 bg-surface text-brand hover:bg-brand hover:text-white font-bold transition-colors flex items-center gap-1"
            >
              <span>[▶</span>
              <span>{t("Phòng IDE", "IDE")}</span>
              <span>]</span>
            </Link>
          </div>
        </section>

        {/* VIEW MODE 1: INTERACTIVE LESSON EXPLORER + EXERCISES OF SELECTED LESSON */}
        {activeSectionTab === "curriculum" && (
          <section
            className={`grid grid-cols-1 ${
              sidebarOpen ? "lg:grid-cols-12" : ""
            } bg-grid gap-[1px] border border-grid transition-all duration-200 neo-box`}
          >
            {/* LEFT 3-4 COLS: LESSON ROADMAP (BÀI 16 -> BÀI 31) */}
            {sidebarOpen && (
              <aside className="lg:col-span-4 xl:col-span-3 bg-surface flex flex-col lg:sticky lg:top-14 lg:self-start lg:max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="min-h-[60px] py-4 px-4 gap-3 bg-subtle border-b border-grid flex items-center justify-between font-mono text-xs sm:text-sm">
                  <span className=" text-secondary font-bold truncate">
                    {t(
                      "Mục lục bài học (Tin học 10)",
                      "Curriculum lessons (16 - 31)"
                    )}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-muted font-semibold text-xs hidden sm:inline">
                      {PYTHON_CURRICULUM_LESSONS.length}{" "}
                      {t("chuyên đề", "modules")}
                    </span>
                    <button
                      onClick={toggleSidebar}
                      className="px-2.5 py-1 bg-surface hover:bg-canvas border border-grid text-secondary hover:text-brand hover:border-brand text-xs font-semibold transition-colors flex items-center gap-1"
                      title={t(
                        "Thu gọn danh sách để mở rộng tối đa trang lý thuyết",
                        "Collapse lessons to expand theory view"
                      )}
                    >
                      <span>◀</span>
                      <span>{t("Thu gọn", "Collapse")}</span>
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-grid">
                  {PYTHON_CURRICULUM_LESSONS.map((lesson, idx) => {
                    const isSelected = lesson.id === activeLesson.id;
                    const lessonAsgns = getExercisesForLesson(lesson.id);
                    const passedInLesson = lessonAsgns.filter(
                      (a) => userSubmissions[a.id]?.status === "passed"
                    ).length;
                    const allDone =
                      lessonAsgns.length > 0 &&
                      passedInLesson === lessonAsgns.length;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                          isSelected
                            ? "bg-subtle border-l-4 border-l-brand"
                            : "bg-surface hover:bg-subtle/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-xs">
                          <span
                            className={`px-2 py-0.5 border font-semibold ${
                              isSelected
                                ? "bg-brand text-white border-brand"
                                : "bg-canvas text-brand border-grid"
                            }`}
                          >
                            {lesson.code}
                          </span>

                          <span
                            className={`px-2 py-0.5 border text-[11px] ${
                              allDone
                                ? "border-success/40 bg-success/10 text-success font-semibold"
                                : passedInLesson > 0
                                ? "border-warn/40 bg-warn/10 text-warn"
                                : "border-grid bg-canvas text-secondary"
                            }`}
                          >
                            {allDone ? "✓ " : ""}
                            {passedInLesson}/{lessonAsgns.length}{" "}
                            {t("bài tập", "tasks")}
                          </span>
                        </div>

                        <div className="text-base font-bold text-primary leading-snug mt-1">
                          {idx + 1}.{" "}
                          {lang === "vi" ? lesson.titleVi : lesson.titleEn}
                        </div>

                        <p className="text-sm text-secondary line-clamp-2 leading-relaxed mt-0.5">
                          {lang === "vi" ? lesson.summaryVi : lesson.summaryEn}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </aside>
            )}

            {/* RIGHT COLS: ACTIVE LESSON THEORY + CODE SAMPLE + EXERCISES FOR THIS LESSON */}
            <div
              className={`${
                sidebarOpen ? "lg:col-span-8 xl:col-span-9" : "w-full"
              } bg-surface flex flex-col`}
            >
              {/* Lesson Header Bar */}
              <div className="p-5 sm:p-6 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  {!sidebarOpen && (
                    <button
                      onClick={toggleSidebar}
                      className="px-3.5 py-2 bg-brand/10 hover:bg-brand text-brand hover:text-white border border-brand/50 font-mono text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors shrink-0"
                      title={t("Mở lại danh sách mục lục bài học", "Expand lesson list")}
                    >
                      <span>📑</span>
                      <span>{t("Hiện mục lục", "Show Index")}</span>
                    </button>
                  )}
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm mb-1.5">
                      <span className="px-2.5 py-1 bg-brand text-white font-bold">
                        {activeLesson.code}
                      </span>
                      <span className="text-secondary font-semibold">
                        {t("Chuyên đề", "Module")} {activeLessonIndex + 1}/
                        {PYTHON_CURRICULUM_LESSONS.length}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                      {lang === "vi"
                        ? activeLesson.titleVi
                        : activeLesson.titleEn}
                    </h2>
                  </div>
                </div>

                {/* Prev / Next Lesson Buttons & Actions */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                  {/* Quick Lesson Jump Selector when sidebar is collapsed */}
                  {!sidebarOpen && (
                    <div className="flex items-center gap-1.5 bg-surface border border-grid px-2.5 py-1.5">
                      <span className="text-secondary text-xs font-mono">
                        {t("Chuyển bài:", "Jump:")}
                      </span>
                      <select
                        value={activeLesson.id}
                        onChange={(e) => setSelectedLessonId(e.target.value)}
                        className="bg-transparent text-primary text-xs sm:text-sm font-sans font-semibold focus:outline-none cursor-pointer"
                      >
                        {PYTHON_CURRICULUM_LESSONS.map((l, idx) => (
                          <option
                            key={l.id}
                            value={l.id}
                            className="bg-surface text-primary"
                          >
                            {l.code}: {idx + 1}.{" "}
                            {lang === "vi" ? l.titleVi : l.titleEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {sidebarOpen && (
                    <button
                      onClick={toggleSidebar}
                      className="px-3.5 py-2 bg-surface hover:bg-canvas border border-grid text-secondary hover:text-brand hover:border-brand font-semibold transition-colors flex items-center gap-1.5"
                      title={t(
                        "Thu gọn mục lục để xem lý thuyết toàn màn hình rộng rãi",
                        "Collapse sidebar for maximum theory reading space"
                      )}
                    >
                      <span>◀</span>
                      <span className="hidden sm:inline">
                        {t("Thu gọn mục lục", "Collapse Sidebar")}
                      </span>
                    </button>
                  )}

                  <button
                    disabled={activeLessonIndex <= 0}
                    onClick={() =>
                      activeLessonIndex > 0 &&
                      setSelectedLessonId(
                        PYTHON_CURRICULUM_LESSONS[activeLessonIndex - 1].id
                      )
                    }
                    className="px-4 py-2 bg-surface border border-grid text-secondary hover:text-primary font-semibold disabled:opacity-40 transition-colors"
                  >
                    ◀ {t("Bài trước", "Previous")}
                  </button>
                  <button
                    disabled={
                      activeLessonIndex >= PYTHON_CURRICULUM_LESSONS.length - 1
                    }
                    onClick={() =>
                      activeLessonIndex <
                        PYTHON_CURRICULUM_LESSONS.length - 1 &&
                      setSelectedLessonId(
                        PYTHON_CURRICULUM_LESSONS[activeLessonIndex + 1].id
                      )
                    }
                    className="px-4 py-2 bg-surface border border-grid text-secondary hover:text-primary font-semibold disabled:opacity-40 transition-colors"
                  >
                    {t("Bài tiếp", "Next")} ▶
                  </button>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 sm:p-6 border-b border-grid bg-canvas/30">
                <div className="font-mono text-xs sm:text-sm text-brand font-bold mb-3 flex items-center gap-1.5">
                  <span>★</span>
                  <span>{t("Tóm tắt trọng tâm cần nhớ", "Key takeaways")}</span>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    sidebarOpen
                      ? "md:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-4"
                  } gap-3`}
                >
                  {activeLesson.keyPointsVi.map((pt: string, i: number) => (
                    <div
                      key={i}
                      className="neo-box-sm p-3.5 bg-surface text-sm sm:text-base text-primary leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="font-mono text-brand font-bold shrink-0 text-sm sm:text-base">
                        0{i + 1}.
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Markdown Theory Content from know.md */}
              <div className="p-6 sm:p-8 border-b border-grid">
                <div className="font-mono text-xs sm:text-sm text-secondary font-bold mb-3.5 flex items-center gap-2">
                  <span>📖</span>
                  <span>
                    {t(
                      "Nội dung lý thuyết chi tiết (theo sách giáo khoa Tin học 10)",
                      "Detailed lesson theory"
                    )}
                  </span>
                </div>
                <div className="bg-canvas border border-grid p-6 sm:p-8 md:p-10">
                  <MarkdownRenderer
                    content={
                      lang === "vi"
                        ? activeLesson.theoryMarkdownVi
                        : activeLesson.theoryMarkdownEn
                    }
                  />
                </div>
              </div>

              {/* Code Example & Output Preview */}
              <div className="p-5 sm:p-6 border-b border-grid bg-subtle/30">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-xs sm:text-sm text-secondary font-bold flex items-center gap-1.5">
                    <span>💻</span>
                    <span>
                      {t(
                        "Ví dụ code Python minh họa trong bài",
                        "Interactive code example"
                      )}
                    </span>
                  </span>
                  <button
                    onClick={handleCopySample}
                    className="neo-btn px-3.5 py-1.5 bg-surface font-mono text-xs sm:text-sm text-secondary hover:text-brand transition-colors font-semibold"
                  >
                    {copiedSample
                      ? t("✓ Đã sao chép code", "✓ Copied")
                      : t("📋 Sao chép code mẫu", "📋 Copy sample code")}
                  </button>
                </div>

                <div className="neo-box grid grid-cols-1 md:grid-cols-12 bg-grid gap-[1px] font-mono text-sm overflow-hidden">
                  <div className="md:col-span-7 bg-canvas p-4 sm:p-5 overflow-x-auto">
                    <div className="text-xs text-muted mb-2 border-b border-grid pb-1.5 font-semibold flex items-center justify-between">
                      <span>vi_du_{activeLesson.id}.py</span>
                      <span className="text-[10px] text-muted">Python 3</span>
                    </div>
                    <pre className="text-primary text-sm sm:text-base leading-relaxed whitespace-pre font-mono">
                      {activeLesson.sampleCode}
                    </pre>
                  </div>
                  <div className="md:col-span-5 bg-surface p-4 sm:p-5 overflow-x-auto">
                    <div className="text-xs text-success mb-2 border-b border-grid pb-1.5 font-semibold">
                      ► {t("Kết quả chạy (output)", "Console output")}
                    </div>
                    <pre className="text-success text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-mono">
                      {activeLesson.sampleOutput.join("\n")}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Multiple-Choice Theory Review (254 Authentic Questions from Textbook PDF) */}
              <QuizSection
                lessonId={activeLesson.id}
                lessonCode={activeLesson.code}
              />

              {/* Exercises Assigned to This Lesson */}
              <div className="p-6 sm:p-8 bg-surface">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="font-mono text-xs sm:text-sm text-brand font-bold">
                      🎯{" "}
                      {t(
                        `BÀI TẬP THỰC HÀNH CỦA ${activeLesson.code.toUpperCase()} (${activeLessonExercises.length} BÀI)`,
                        `EXERCISES FOR ${activeLesson.code.toUpperCase()} (${activeLessonExercises.length})`
                      )}
                    </div>
                    <p className="text-sm text-secondary mt-1">
                      {t(
                        "Bấm vào bài tập bất kỳ để mở Phòng thực hành IDE, chạy thử code và chấm điểm tự động.",
                        "Click any exercise below to launch the Python IDE workspace and run automated grading."
                      )}
                    </p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    sidebarOpen
                      ? "md:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-3"
                  } gap-3.5`}
                >
                  {activeLessonExercises.map((asgn) => {
                    const sub = userSubmissions[asgn.id];
                    const isPassed = sub?.status === "passed";
                    const isAttempted = Boolean(sub);

                    return (
                      <div
                        key={asgn.id}
                        className="neo-card-interactive bg-canvas p-4 sm:p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 font-mono text-xs mb-2.5">
                            <span
                              className={`px-2 py-0.5 border text-xs font-semibold ${
                                asgn.difficulty === "Beginner"
                                  ? "border-success/40 text-success bg-success/10"
                                  : asgn.difficulty === "Intermediate"
                                  ? "border-warn/40 text-warn bg-warn/10"
                                  : "border-brand/40 text-brand bg-brand/10"
                              }`}
                            >
                              {getDifficultyLabel(asgn.difficulty)}
                            </span>

                            <span
                              className={`px-2.5 py-0.5 border text-xs font-bold ${
                                isPassed
                                  ? "border-success bg-success/10 text-success"
                                  : isAttempted
                                  ? "border-warn bg-warn/10 text-warn"
                                  : "border-grid bg-surface text-muted"
                              }`}
                            >
                              {isPassed
                                ? t("✓ Đã đạt 100%", "✓ Passed")
                                : isAttempted
                                ? t("◐ Đang làm", "◐ In progress")
                                : t("○ Chưa làm", "○ Todo")}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-[17px] font-bold text-primary mb-2 leading-snug">
                            {asgn.title}
                          </h3>

                          <p className="text-sm text-secondary line-clamp-3 leading-relaxed mb-4">
                            {asgn.description
                              .replace(/###|\*\*|`/g, "")
                              .slice(0, 150)}
                            ...
                          </p>
                        </div>

                        <div className="pt-3.5 border-t border-grid flex items-center justify-between font-mono text-xs">
                          <span className="text-muted text-xs font-medium">
                            {asgn.testCases.length} test cases
                          </span>
                          <button
                            onClick={() => navigate(`/workspace/${asgn.id}`)}
                            className={`neo-btn px-3.5 py-1.5 font-bold text-xs sm:text-sm transition-colors ${
                              isPassed
                                ? "bg-surface border-success text-success hover:bg-success hover:text-black"
                                : "bg-brand border-brand text-white hover:opacity-95"
                            }`}
                          >
                            {isPassed
                              ? t("↻ Xem code", "↻ Review")
                              : t("▶ Làm bài", "▶ Solve")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW MODE 2: ALL EXERCISES GROUPED BY LESSON (BÀI 16 -> BÀI 31) */}
        {activeSectionTab === "all_exercises" && (
          <section className="space-y-6">
            {PYTHON_CURRICULUM_LESSONS.map((lesson) => {
              const lessonAsgns = getExercisesForLesson(lesson.id);
              const passedCount = lessonAsgns.filter(
                (a) => userSubmissions[a.id]?.status === "passed"
              ).length;

              return (
                <div
                  key={lesson.id}
                  className="neo-box bg-surface overflow-hidden"
                >
                  {/* Lesson Group Header */}
                  <div className="p-4 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2.5 py-1 bg-brand text-white font-mono text-xs font-semibold">
                        {lesson.code}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-primary">
                          {lang === "vi" ? lesson.titleVi : lesson.titleEn}
                        </h3>
                        <p className="text-xs text-secondary">
                          {lang === "vi" ? lesson.summaryVi : lesson.summaryEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-1 bg-canvas border border-grid text-secondary">
                        {t("Hoàn thành:", "Completed:")}{" "}
                        <strong className="text-success">{passedCount}</strong>/
                        {lessonAsgns.length}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedLessonId(lesson.id);
                          setActiveSectionTab("curriculum");
                        }}
                        className="px-3 py-1 bg-canvas border border-grid text-primary hover:border-brand hover:text-brand transition-colors"
                      >
                        📖 {t("Đọc lý thuyết bài này", "Read lesson theory")}
                      </button>
                    </div>
                  </div>

                  {/* Exercises Grid for this Lesson */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-grid gap-[1px]">
                    {lessonAsgns.map((asgn) => {
                      const sub = userSubmissions[asgn.id];
                      const isPassed = sub?.status === "passed";
                      const isAttempted = Boolean(sub);

                      return (
                        <div
                          key={asgn.id}
                          className="bg-surface p-5 flex flex-col justify-between hover:bg-subtle/40 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 font-mono text-xs mb-2">
                              <span
                                className={`px-2 py-0.5 border text-[11px] ${
                                  asgn.difficulty === "Beginner"
                                    ? "border-success/40 text-success bg-success/10"
                                    : asgn.difficulty === "Intermediate"
                                    ? "border-warn/40 text-warn bg-warn/10"
                                    : "border-brand/40 text-brand bg-brand/10"
                                }`}
                              >
                                {getDifficultyLabel(asgn.difficulty)}
                              </span>

                              <span
                                className={`px-2 py-0.5 border text-[11px] font-semibold ${
                                  isPassed
                                    ? "border-success bg-success/10 text-success"
                                    : isAttempted
                                    ? "border-warn bg-warn/10 text-warn"
                                    : "border-grid bg-canvas text-muted"
                                }`}
                              >
                                {isPassed
                                  ? t("✓ ĐẠT 100%", "✓ Passed")
                                  : isAttempted
                                  ? t("◐ Đang làm", "◐ In progress")
                                  : t("○ Chưa làm", "○ Todo")}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-primary mb-2">
                              {asgn.title}
                            </h4>

                            <p className="text-xs text-secondary line-clamp-2 mb-4">
                              {asgn.description
                                .replace(/###|\*\*|`/g, "")
                                .slice(0, 140)}
                              ...
                            </p>
                          </div>

                          <div className="pt-3 border-t border-grid flex items-center justify-between font-mono text-xs">
                            <span className="text-muted text-[11px]">
                              {asgn.testCases.length} bộ test tự động
                            </span>
                            <button
                              onClick={() => navigate(`/workspace/${asgn.id}`)}
                              className="px-3 py-1.5 bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                              ▶ {t("Mở IDE làm bài", "Open in IDE")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      <footer className="h-9 bg-surface border-t border-grid px-4 flex items-center justify-between font-mono text-[11px] text-secondary shrink-0">
        <span>
          {t(
            "Chương trình Tin học 10: bài 16 đến bài 31 (know.md)",
            "Tin hoc 10 curriculum: lessons 16 to 31"
          )}
        </span>
        <span className="hidden sm:inline">
          {PYTHON_CURRICULUM_LESSONS.length} {t("Bài học", "Lessons")} //{" "}
          {assignments.length} {t("Bài tập thực hành", "Practice exercises")}
        </span>
        <span className="text-brand">CHROMA BENTO DESIGN SYSTEM</span>
      </footer>

      <PythonCheatSheetModal
        isOpen={cheatSheetOpen}
        onClose={() => setCheatSheetOpen(false)}
      />
    </div>
  );
};
