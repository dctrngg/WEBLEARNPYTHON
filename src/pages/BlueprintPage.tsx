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

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        {/* TOP BENTO BANNER: Curriculum Overview + Progress Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-grid gap-[1px] border border-grid">
          <div className="lg:col-span-8 bg-surface p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-brand uppercase tracking-widest mb-2.5">
                <span>▣ CHƯƠNG TRÌNH TIN HỌC 10 — LẬP TRÌNH PYTHON</span>
                <span className="text-grid-strong">|</span>
                <span className="text-secondary font-semibold">
                  {t(
                    "BÀI 16 ĐẾN BÀI 31 (ĐẦY ĐỦ LÝ THUYẾT & BÀI TẬP)",
                    "LESSONS 16 TO 31 (FULL THEORY & EXERCISES)"
                  )}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary mb-2.5">
                {t(
                  "Lộ Trình Học Python & Bài Tập Thực Hành Theo Từng Bài Học",
                  "Python Learning Blueprint & Lesson-by-Lesson Exercises"
                )}
              </h1>
              <p className="text-sm sm:text-base text-secondary max-w-[85ch] leading-relaxed">
                {t(
                  "Chọn từng bài học từ Bài 16 đến Bài 31 bên dưới để đọc lý thuyết chi tiết, xem ví dụ code mẫu và làm ngay các bài tập lập trình được phân chia theo đúng bài học đó.",
                  "Select any lesson from Lesson 16 to Lesson 31 below to study detailed theory, inspect sample code, and practice exercises grouped specifically for that lesson."
                )}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-grid flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                <button
                  onClick={() => setActiveSectionTab("curriculum")}
                  className={`px-4 py-2 border font-semibold transition-colors ${
                    activeSectionTab === "curriculum"
                      ? "bg-brand text-white border-brand"
                      : "bg-subtle text-secondary border-grid hover:text-primary"
                  }`}
                >
                  [📚 {t("XEM CHI TIẾT TỪNG BÀI HỌC (BÀI 16 - 31)", "STUDY LESSON BY LESSON")}]
                </button>
                <button
                  onClick={() => setActiveSectionTab("all_exercises")}
                  className={`px-4 py-2 border font-semibold transition-colors ${
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
                className="px-4 py-2 bg-subtle border border-brand text-brand hover:bg-brand hover:text-white font-mono text-xs sm:text-sm font-semibold transition-colors"
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
            {/* LEFT 3-4 COLS: LESSON ROADMAP (BÀI 16 -> BÀI 31) */}
            <aside className="lg:col-span-4 xl:col-span-3 bg-surface flex flex-col">
              <div className="h-11 px-4 bg-subtle border-b border-grid flex items-center justify-between font-mono text-xs sm:text-sm">
                <span className="uppercase tracking-wider text-secondary font-bold">
                  {t(
                    "MỤC LỤC BÀI HỌC (TIN HỌC 10)",
                    "CURRICULUM LESSONS (16 - 31)"
                  )}
                </span>
                <span className="text-muted font-semibold">
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

            {/* RIGHT 8-9 COLS: ACTIVE LESSON THEORY + CODE SAMPLE + EXERCISES FOR THIS LESSON */}
            <div className="lg:col-span-8 xl:col-span-9 bg-surface flex flex-col">
              {/* Lesson Header Bar */}
              <div className="p-5 sm:p-6 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
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

                {/* Prev / Next Lesson Buttons */}
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
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
                    className="px-4 py-2 bg-surface border border-grid text-secondary hover:text-primary font-semibold disabled:opacity-40 transition-colors"
                  >
                    [{t("BÀI TIẾP", "NEXT")} ▶]
                  </button>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 sm:p-6 border-b border-grid bg-canvas/50">
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-brand font-bold mb-3">
                  ★ {t("TÓM TẮT TRỌNG TÂM CẦN NHỚ", "KEY TAKEAWAYS")}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeLesson.keyPointsVi.map((pt: string, i: number) => (
                    <div
                      key={i}
                      className="p-3.5 bg-surface border border-grid text-sm sm:text-base text-primary leading-relaxed flex items-start gap-2.5 shadow-sm"
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
                <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-secondary font-bold mb-3.5">
                  📖{" "}
                  {t(
                    "NỘI DUNG LÝ THUYẾT CHI TIẾT (THEO SÁCH GIÁO KHOA TIN HỌC 10)",
                    "DETAILED LESSON THEORY"
                  )}
                </div>
                <div className="bg-canvas border border-grid p-6 sm:p-8 md:p-10 shadow-sm">
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
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-secondary font-bold">
                    💻{" "}
                    {t(
                      "VÍ DỤ CODE PYTHON MINH HỌA TRONG BÀI",
                      "INTERACTIVE CODE EXAMPLE"
                    )}
                  </span>
                  <button
                    onClick={handleCopySample}
                    className="px-3.5 py-1.5 bg-surface border border-grid font-mono text-xs sm:text-sm text-secondary hover:text-brand hover:border-brand transition-colors font-semibold"
                  >
                    {copiedSample
                      ? t("[✓ ĐÃ SAO CHÉP CODE]", "[✓ COPIED]")
                      : t("[📋 SAO CHÉP CODE MẪU]", "[📋 COPY SAMPLE CODE]")}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 bg-grid gap-[1px] border border-grid font-mono text-sm">
                  <div className="md:col-span-7 bg-canvas p-4 sm:p-5 overflow-x-auto">
                    <div className="text-xs text-muted mb-2 border-b border-grid pb-1.5 font-semibold">
                      vi_du_{activeLesson.id}.py
                    </div>
                    <pre className="text-primary text-sm sm:text-base leading-relaxed whitespace-pre">
                      {activeLesson.sampleCode}
                    </pre>
                  </div>
                  <div className="md:col-span-5 bg-surface p-4 sm:p-5 overflow-x-auto">
                    <div className="text-xs text-success mb-2 border-b border-grid pb-1.5 font-semibold">
                      ► {t("KẾT QUẢ CHẠY (OUTPUT)", "CONSOLE OUTPUT")}
                    </div>
                    <pre className="text-success text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
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
                    <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-brand font-bold">
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

                <div className="grid grid-cols-1 md:grid-cols-2 bg-grid gap-[1px] border border-grid">
                  {activeLessonExercises.map((asgn) => {
                    const sub = userSubmissions[asgn.id];
                    const isPassed = sub?.status === "passed";
                    const isAttempted = Boolean(sub);

                    return (
                      <div
                        key={asgn.id}
                        className="bg-canvas p-5 flex flex-col justify-between hover:bg-subtle/60 transition-colors"
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
                                ? t("✓ ĐÃ ĐẠT 100%", "✓ PASSED")
                                : isAttempted
                                ? t("◐ ĐANG LÀM", "◐ IN PROGRESS")
                                : t("○ CHƯA LÀM", "○ TODO")}
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
                            className={`px-3.5 py-2 border font-bold text-xs sm:text-sm transition-colors ${
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
