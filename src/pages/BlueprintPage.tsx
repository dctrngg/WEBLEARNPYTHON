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
  LESSON_QUIZZES,
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
          "TIN HỌC 10 // SỔ TAY KIẾN THỨC & BÀI TẬP PYTHON",
          "CS GRADE 10 // PYTHON CURRICULUM & EXERCISES"
        )}
        engineState="ready"
        engineStatusText="CURRICULUM READY"
        studentProgressText={`${t("Đã hoàn thành", "Completed")}: ${passedTotalCount}/${assignments.length} ${t("bài tập", "exercises")}`}
        onOpenCheatSheet={() => setCheatSheetOpen(true)}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 space-y-6">
        {/* TOP BENTO BANNER: Curriculum Overview + Progress Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-grid gap-[1px] border border-grid">
          <div className="lg:col-span-8 bg-surface p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-brand uppercase tracking-widest mb-2">
                <span>▣ CHƯƠNG TRÌNH TIN HỌC 10 — LẬP TRÌNH PYTHON</span>
                <span className="text-grid-strong">|</span>
                <span className="text-secondary">
                  {t(
                    "BÀI 16 ĐẾN BÀI 31 (ĐẦY ĐỦ LÝ THUYẾT & BÀI TẬP)",
                    "LESSONS 16 TO 31 (FULL THEORY & EXERCISES)"
                  )}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-2">
                {t(
                  "Lộ Trình Học Python & Bài Tập Thực Hành Theo Từng Bài Học",
                  "Python Learning Blueprint & Lesson-by-Lesson Exercises"
                )}
              </h1>
              <p className="text-sm text-secondary max-w-[72ch] leading-relaxed">
                {t(
                  "Chọn từng bài học từ Bài 16 đến Bài 31 bên dưới để đọc lý thuyết chi tiết, xem ví dụ code mẫu và làm ngay các bài tập lập trình được phân chia theo đúng bài học đó.",
                  "Select any lesson from Lesson 16 to Lesson 31 below to study detailed theory, inspect sample code, and practice exercises grouped specifically for that lesson."
                )}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-grid flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveSectionTab("curriculum")}
                  className={`px-3.5 py-2 border font-semibold transition-colors ${
                    activeSectionTab === "curriculum"
                      ? "bg-brand text-white border-brand"
                      : "bg-subtle text-secondary border-grid hover:text-primary"
                  }`}
                >
                  [📚 {t("XEM CHI TIẾT TỪNG BÀI HỌC (BÀI 16 - 31)", "STUDY LESSON BY LESSON")}]
                </button>
                <button
                  onClick={() => setActiveSectionTab("all_exercises")}
                  className={`px-3.5 py-2 border font-semibold transition-colors ${
                    activeSectionTab === "all_exercises"
                      ? "bg-brand text-white border-brand"
                      : "bg-subtle text-secondary border-grid hover:text-primary"
                  }`}
                >
                  [🗂 {t("DANH SÁCH BÀI TẬP THEO BÀI HỌC", "EXERCISES BY LESSON")} ({assignments.length})]
                </button>
              </div>

              <Link
                to={
                  activeLessonExercises[0]
                    ? `/workspace/${activeLessonExercises[0].id}`
                    : "/workspace"
                }
                className="px-4 py-2 bg-subtle border border-brand text-brand hover:bg-brand hover:text-white font-mono text-xs font-semibold transition-colors"
              >
                [▶ {t("MỞ PHÒNG THỰC HÀNH IDE NGAY", "OPEN PYTHON IDE WORKSPACE")}]
              </Link>
            </div>
          </div>

          {/* Right 4 Cols: Student Progress Summary */}
          <div className="lg:col-span-4 bg-subtle p-6 flex flex-col justify-between font-mono">
            <div>
              <div className="text-xs uppercase tracking-wider text-secondary mb-3 flex items-center justify-between">
                <span>
                  {t("TIẾN ĐỘ HỌC TẬP CỦA BẠN", "YOUR LEARNING PROGRESS")}
                </span>
                <span className="text-success font-semibold">
                  {assignments.length > 0
                    ? Math.round((passedTotalCount / assignments.length) * 100)
                    : 0}
                  %
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-canvas border border-grid mb-4 overflow-hidden">
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

              <div className="grid grid-cols-3 bg-grid gap-[1px] border border-grid text-center">
                <div className="bg-surface p-3">
                  <div className="text-[11px] text-secondary">
                    {t("CHUYÊN ĐỀ", "LESSONS")}
                  </div>
                  <div className="text-xl font-bold text-primary mt-0.5">
                    {PYTHON_CURRICULUM_LESSONS.length}
                  </div>
                  <div className="text-[10px] text-muted">Bài 16 → 31</div>
                </div>
                <div className="bg-surface p-3">
                  <div className="text-[11px] text-secondary">
                    {t("TỔNG BÀI TẬP", "EXERCISES")}
                  </div>
                  <div className="text-xl font-bold text-brand mt-0.5">
                    {assignments.length}
                  </div>
                  <div className="text-[10px] text-muted">
                    {t("Có chấm tự động", "Auto-graded")}
                  </div>
                </div>
                <div className="bg-surface p-3">
                  <div className="text-[11px] text-secondary">
                    {t("ĐÃ HOÀN THÀNH", "COMPLETED")}
                  </div>
                  <div className="text-xl font-bold text-success mt-0.5">
                    {passedTotalCount}
                  </div>
                  <div className="text-[10px] text-muted">
                    /{assignments.length} {t("bài", "passed")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-grid text-[11px] text-secondary flex items-center justify-between">
              <span>
                {t("Học sinh:", "Student:")}{" "}
                <strong className="text-primary">
                  {user?.displayName || "Học sinh"}
                </strong>
                {user?.className && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-brand/15 border border-brand/40 text-brand font-bold">
                    {t("Lớp", "Class")} {user.className}
                  </span>
                )}
              </span>
              <button
                onClick={() => setCheatSheetOpen(true)}
                className="text-brand hover:underline"
              >
                [📖 {t("Tra cứu hàm Python", "Python Cheat Sheet")}]
              </button>
            </div>
          </div>
        </section>

        {/* VIEW MODE 1: INTERACTIVE LESSON EXPLORER + EXERCISES OF SELECTED LESSON */}
        {activeSectionTab === "curriculum" && (
          <section className="grid grid-cols-1 lg:grid-cols-12 bg-grid gap-[1px] border border-grid">
            {/* LEFT 4 COLS: LESSON ROADMAP (BÀI 16 -> BÀI 31) */}
            <aside className="lg:col-span-4 bg-surface flex flex-col">
              <div className="h-10 px-4 bg-subtle border-b border-grid flex items-center justify-between font-mono text-xs">
                <span className="uppercase tracking-wider text-secondary font-semibold">
                  {t(
                    "MỤC LỤC BÀI HỌC (TIN HỌC 10)",
                    "CURRICULUM LESSONS (16 - 31)"
                  )}
                </span>
                <span className="text-muted">
                  {PYTHON_CURRICULUM_LESSONS.length} {t("chuyên đề", "modules")}
                </span>
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

                      <div className="text-sm font-semibold text-primary leading-snug mt-0.5">
                        {idx + 1}.{" "}
                        {lang === "vi" ? lesson.titleVi : lesson.titleEn}
                      </div>

                      <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                        {lang === "vi" ? lesson.summaryVi : lesson.summaryEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT 8 COLS: ACTIVE LESSON THEORY + CODE SAMPLE + EXERCISES FOR THIS LESSON */}
            <div className="lg:col-span-8 bg-surface flex flex-col">
              {/* Lesson Header Bar */}
              <div className="p-5 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs mb-1">
                    <span className="px-2 py-0.5 bg-brand text-white font-semibold">
                      {activeLesson.code}
                    </span>
                    <span className="text-secondary">
                      {t("Chuyên đề", "Module")} {activeLessonIndex + 1}/
                      {PYTHON_CURRICULUM_LESSONS.length}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {lang === "vi"
                      ? activeLesson.titleVi
                      : activeLesson.titleEn}
                  </h2>
                </div>

                {/* Prev / Next Lesson Buttons */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button
                    disabled={activeLessonIndex <= 0}
                    onClick={() =>
                      activeLessonIndex > 0 &&
                      setSelectedLessonId(
                        PYTHON_CURRICULUM_LESSONS[activeLessonIndex - 1].id
                      )
                    }
                    className="px-3 py-1.5 bg-surface border border-grid text-secondary hover:text-primary disabled:opacity-40"
                  >
                    [◀ {t("BÀI TRƯỚC", "PREV")}]
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
                    className="px-3 py-1.5 bg-surface border border-grid text-secondary hover:text-primary disabled:opacity-40"
                  >
                    [{t("BÀI TIẾP", "NEXT")} ▶]
                  </button>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 border-b border-grid bg-canvas/50">
                <div className="font-mono text-xs uppercase tracking-wider text-brand font-semibold mb-2.5">
                  ★ {t("TÓM TẮT TRỌNG TÂM CẦN NHỚ", "KEY TAKEAWAYS")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeLesson.keyPointsVi.map((pt: string, i: number) => (
                    <div
                      key={i}
                      className="p-2.5 bg-surface border border-grid text-xs text-primary flex items-start gap-2"
                    >
                      <span className="font-mono text-brand font-bold shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Markdown Theory Content from know.md */}
              <div className="p-6 border-b border-grid">
                <div className="font-mono text-xs uppercase tracking-wider text-secondary mb-3">
                  📖{" "}
                  {t(
                    "NỘI DUNG LÝ THUYẾT CHI TIẾT (THEO SÁCH GIÁO KHOA TIN HỌC 10)",
                    "DETAILED LESSON THEORY"
                  )}
                </div>
                <div className="bg-canvas border border-grid p-5">
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
              <div className="p-6 border-b border-grid bg-subtle/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-secondary font-semibold">
                    💻{" "}
                    {t(
                      "VÍ DỤ CODE PYTHON MINH HỌA TRONG BÀI",
                      "INTERACTIVE CODE EXAMPLE"
                    )}
                  </span>
                  <button
                    onClick={handleCopySample}
                    className="px-2.5 py-1 bg-surface border border-grid font-mono text-xs text-secondary hover:text-brand hover:border-brand transition-colors"
                  >
                    {copiedSample
                      ? t("[✓ ĐÃ SAO CHÉP CODE]", "[✓ COPIED]")
                      : t("[📋 SAO CHÉP CODE MẪU]", "[📋 COPY SAMPLE CODE]")}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 bg-grid gap-[1px] border border-grid font-mono text-xs">
                  <div className="md:col-span-7 bg-canvas p-4 overflow-x-auto">
                    <div className="text-[11px] text-muted mb-2 border-b border-grid pb-1">
                      vi_du_{activeLesson.id}.py
                    </div>
                    <pre className="text-primary leading-relaxed whitespace-pre">
                      {activeLesson.sampleCode}
                    </pre>
                  </div>
                  <div className="md:col-span-5 bg-surface p-4 overflow-x-auto">
                    <div className="text-[11px] text-success mb-2 border-b border-grid pb-1">
                      ► {t("KẾT QUẢ CHẠY (OUTPUT)", "CONSOLE OUTPUT")}
                    </div>
                    <pre className="text-success leading-relaxed whitespace-pre-wrap">
                      {activeLesson.sampleOutput.join("\n")}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Interactive Quizzes from PDF (Trắc nghiệm ôn tập từ tài liệu) */}
              <QuizSection
                lessonCode={activeLesson.code}
                quizzes={LESSON_QUIZZES[activeLesson.id] || []}
              />

              {/* Exercises Assigned to This Lesson */}
              <div className="p-6 bg-surface">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-brand font-semibold">
                      🎯{" "}
                      {t(
                        `BÀI TẬP THỰC HÀNH CỦA ${activeLesson.code.toUpperCase()} (${activeLessonExercises.length} BÀI)`,
                        `EXERCISES FOR ${activeLesson.code.toUpperCase()} (${activeLessonExercises.length})`
                      )}
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      {t(
                        "Bấm vào bài tập bất kỳ để mở Phòng thực hành IDE, chạy thử code và chấm điểm tự động.",
                        "Click any exercise below to launch the Python IDE workspace and run automated grading."
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-grid gap-[1px] border border-grid">
                  {activeLessonExercises.map((asgn) => {
                    const sub = userSubmissions[asgn.id];
                    const isPassed = sub?.status === "passed";
                    const isAttempted = Boolean(sub);

                    return (
                      <div
                        key={asgn.id}
                        className="bg-canvas p-4 flex flex-col justify-between hover:bg-subtle/60 transition-colors"
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
                                  : "border-grid bg-surface text-muted"
                              }`}
                            >
                              {isPassed
                                ? t("✓ ĐÃ ĐẠT 100%", "✓ PASSED")
                                : isAttempted
                                ? t("◐ ĐANG LÀM", "◐ IN PROGRESS")
                                : t("○ CHƯA LÀM", "○ TODO")}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-primary mb-1.5">
                            {asgn.title}
                          </h3>

                          <p className="text-xs text-secondary line-clamp-2 mb-3">
                            {asgn.description
                              .replace(/###|\*\*|`/g, "")
                              .slice(0, 130)}
                            ...
                          </p>
                        </div>

                        <div className="pt-3 border-t border-grid flex items-center justify-between font-mono text-xs">
                          <span className="text-muted text-[11px]">
                            {asgn.testCases.length} test cases
                          </span>
                          <button
                            onClick={() => navigate(`/workspace/${asgn.id}`)}
                            className={`px-3 py-1.5 border font-semibold transition-colors ${
                              isPassed
                                ? "bg-surface border-success text-success hover:bg-success hover:text-black"
                                : "bg-brand border-brand text-white hover:opacity-90"
                            }`}
                          >
                            {isPassed
                              ? t("[↻ XEM LẠI CODE]", "[↻ REVIEW CODE]")
                              : t("[▶ LÀM BÀI NÀY]", "[▶ SOLVE NOW]")}
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
                  className="border border-grid bg-surface overflow-hidden"
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
                        [📖 {t("ĐỌC LÝ THUYẾT BÀI NÀY", "READ LESSON THEORY")}]
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
                                  ? t("✓ ĐẠT 100%", "✓ PASSED")
                                  : isAttempted
                                  ? t("◐ ĐANG LÀM", "◐ IN PROGRESS")
                                  : t("○ CHƯA LÀM", "○ TODO")}
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
                              [▶ {t("MỞ IDE LÀM BÀI", "OPEN IN IDE")}]
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
            "CHƯƠNG TRÌNH TIN HỌC 10: BÀI 16 ĐẾN BÀI 31 (KNOW.MD)",
            "TIN HOC 10 CURRICULUM: LESSONS 16 TO 31"
          )}
        </span>
        <span className="hidden sm:inline">
          {PYTHON_CURRICULUM_LESSONS.length} {t("BÀI HỌC", "LESSONS")} //{" "}
          {assignments.length} {t("BÀI TẬP THỰC HÀNH", "PRACTICE EXERCISES")}
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
