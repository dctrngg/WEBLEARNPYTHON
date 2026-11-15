import React, { useEffect, useState } from "react";
import { QuizQuestion, getQuizzesByLessonId } from "../../services/quizService";
import { useLanguage } from "../../contexts/LanguageContext";

interface QuizSectionProps {
  lessonId: string;
  lessonCode: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  lessonId,
  lessonCode,
}) => {
  const { t } = useLanguage();
  const questions: QuizQuestion[] = getQuizzesByLessonId(lessonId);

  // Student answer state: questionId -> selectedIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  // Submitted state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Reset when lessonId changes
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  }, [lessonId]);

  if (questions.length === 0) {
    return (
      <div className="p-6 bg-surface border border-grid font-mono text-xs text-muted text-center">
        {t(
          "Chuyên đề này đang cập nhật ngân hàng câu hỏi trắc nghiệm.",
          "Quizzes are being updated for this lesson module."
        )}
      </div>
    );
  }

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return; // Locked once submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optIdx,
    }));
  };

  const unansweredQuestions = questions.filter(
    (q) => selectedAnswers[q.id] === undefined
  );
  const totalAnswered = questions.length - unansweredQuestions.length;
  const isAllAnswered = unansweredQuestions.length === 0;

  const handleGradeQuiz = () => {
    if (!isAllAnswered) return;
    setIsSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const scrollToQuestion = (idx: number) => {
    const el = document.getElementById(`quiz-question-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Calculate score
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const score10 = questions.length > 0 ? ((correctCount / questions.length) * 10).toFixed(1) : "0";
  const progressPercent = Math.round((totalAnswered / questions.length) * 100);

  return (
    <div className="border border-grid bg-surface">
      {/* Header bar */}
      <div className="p-4 sm:p-5 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-brand text-white font-mono text-xs sm:text-sm font-bold">
            TRẮC NGHIỆM
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-primary font-mono">
              {t(
                `ÔN TẬP LÝ THUYẾT TRẮC NGHIỆM — ${lessonCode.toUpperCase()}`,
                `MULTIPLE CHOICE QUIZ — ${lessonCode.toUpperCase()}`
              )}
            </h3>
            <p className="text-xs text-secondary font-mono mt-0.5">
              {t(
                `Bắt buộc hoàn thành tất cả ${questions.length} câu hỏi theo SGK Tin học 10 trước khi nộp bài.`,
                `Must complete all ${questions.length} questions from Grade 10 CS textbook before submitting.`
              )}
            </p>
          </div>
        </div>

        {/* Action Controls & Progress */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
          {!isSubmitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-canvas border border-grid text-xs">
              <span className="text-secondary font-semibold">
                {t("Tiến độ:", "Progress:")}
              </span>
              <strong className={isAllAnswered ? "text-success" : "text-brand"}>
                {totalAnswered}/{questions.length} {t("câu", "questions")}
              </strong>
              <div className="w-16 h-2 bg-subtle border border-grid overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isAllAnswered ? "bg-success" : "bg-brand"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {isSubmitted ? (
            <button
              onClick={handleResetQuiz}
              className="neo-btn px-4 py-1.5 bg-surface text-primary hover:text-brand font-semibold transition-colors"
            >
              [↻ {t("Làm lại toàn bộ", "Retry All")}]
            </button>
          ) : (
            <button
              onClick={handleGradeQuiz}
              disabled={!isAllAnswered}
              className={`neo-btn px-4 py-1.5 font-bold transition-all ${
                isAllAnswered
                  ? "bg-brand text-white hover:opacity-95 cursor-pointer"
                  : "bg-subtle text-muted cursor-not-allowed opacity-60"
              }`}
              title={
                !isAllAnswered
                  ? t(
                      `Bạn phải làm đủ ${questions.length}/${questions.length} câu mới được nộp bài (Còn thiếu ${unansweredQuestions.length} câu)`,
                      `Must answer all ${questions.length} questions before submitting (${unansweredQuestions.length} remaining)`
                    )
                  : t("Nộp bài và xem điểm số", "Submit and view score")
              }
            >
              {isAllAnswered
                ? `[✓ ${t("Nộp bài & Xem đáp án", "Submit & View Answers")}]`
                : `[🔒 ${t("Cần làm đủ", "Answer all")} ${totalAnswered}/${questions.length}]`}
            </button>
          )}
        </div>
      </div>

      {/* Unanswered reminder banner when still in progress */}
      {!isSubmitted && !isAllAnswered && unansweredQuestions.length > 0 && (
        <div className="px-4 py-2.5 bg-brand/5 border-b border-brand/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-secondary flex items-center gap-1.5">
            <span className="text-brand font-bold">ℹ {t("LƯU Ý:", "NOTE:")}</span>
            <span>
              {t(
                `Bài kiểm tra yêu cầu hoàn thành đủ 100% câu hỏi. Bạn còn thiếu ${unansweredQuestions.length} câu chưa chọn.`,
                `100% completion required. You have ${unansweredQuestions.length} unanswered questions remaining.`
              )}
            </span>
          </span>

          {unansweredQuestions.length <= 8 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted text-[11px]">{t("Nhảy tới:", "Jump to:")}</span>
              {unansweredQuestions.map((uq) => {
                const qNum = questions.findIndex((x) => x.id === uq.id) + 1;
                return (
                  <button
                    key={uq.id}
                    onClick={() => scrollToQuestion(qNum)}
                    className="px-1.5 py-0.5 bg-canvas border border-brand/40 text-brand font-bold hover:bg-brand hover:text-white transition-colors text-[11px]"
                  >
                    C{qNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Result score banner when submitted */}
      {isSubmitted && (
        <div className="p-4 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold ${
                correctCount === questions.length
                  ? "text-emerald-500"
                  : "text-brand"
              }`}
            >
              {correctCount === questions.length
                ? "🎉 XUẤT SẮC! BẠN ĐÃ TRẢ LỜI ĐÚNG TẤT CẢ!"
                : `KẾT QUẢ ĐẠT: ${correctCount}/${questions.length} CÂU ĐÚNG`}
            </span>
            <span className="text-grid-strong">|</span>
            <span className="text-secondary">
              Điểm:{" "}
              <strong className="text-emerald-500 text-sm">
                {score10}/10
              </strong>
            </span>
            <span className="text-grid-strong">|</span>
            <span className="text-secondary">
              Tỷ lệ: <strong>{Math.round((correctCount / questions.length) * 100)}%</strong>
            </span>
          </div>

          <span className="text-muted text-[11px]">
            Xem giải thích chi tiết dưới từng câu hỏi bên dưới.
          </span>
        </div>
      )}

      {/* Questions list */}
      <div className="p-5 space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              id={`quiz-question-${qIndex + 1}`}
              className={`p-4 bg-canvas transition-all space-y-3 font-mono text-xs ${
                isAnswered
                  ? "neo-box-sm"
                  : "neo-box-sm border-brand/50 ring-1 ring-brand/30"
              }`}
            >
              {/* Question title */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-2.5 py-1 border font-bold text-xs sm:text-sm shrink-0 ${
                      isAnswered
                        ? "bg-subtle border-grid text-primary"
                        : "bg-brand/10 border-brand/40 text-brand"
                    }`}
                  >
                    Câu {qIndex + 1}
                  </span>
                  <span className="text-primary font-bold text-base sm:text-[17px] leading-relaxed">
                    {q.question}
                  </span>
                </div>

                {isAnswered && !isSubmitted && (
                  <span className="text-success text-xs font-semibold shrink-0">
                    ✓ Đã chọn
                  </span>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((optText, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isThisSelected = selected === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optClass =
                    "border-grid bg-surface text-secondary hover:border-brand hover:text-primary";

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optClass =
                        "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold";
                    } else if (isThisSelected && !isCorrect) {
                      optClass =
                        "border-brand bg-brand/10 text-brand font-semibold line-through";
                    } else {
                      optClass = "border-grid bg-surface/40 text-muted";
                    }
                  } else if (isThisSelected) {
                    optClass = "border-brand bg-brand/15 text-brand font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3.5 border text-left flex items-start gap-2.5 text-sm sm:text-base transition-colors ${optClass}`}
                    >
                      <span className="font-bold shrink-0">[{letter}]</span>
                      <span className="leading-relaxed">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Solution Feedback */}
              {isSubmitted && (
                <div
                  className={`mt-2.5 p-3.5 border text-xs sm:text-sm leading-relaxed ${
                    isCorrect
                      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400"
                      : "border-brand/40 bg-brand/5 text-secondary"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1.5 text-sm">
                    <span>{isCorrect ? "✓ ĐÚNG:" : "✕ CHƯA ĐÚNG:"}</span>
                    <span>
                      Đáp án chính xác là{" "}
                      <strong className="text-emerald-400 underline">
                        {String.fromCharCode(65 + q.correctIndex)}.{" "}
                        {q.options[q.correctIndex]}
                      </strong>
                    </span>
                  </div>
                  {q.explanation && (
                    <p className="text-zinc-300">💡 {q.explanation}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div className="p-3.5 bg-subtle border-t border-grid font-mono text-xs text-secondary flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>
            {t("Tiến độ:", "Progress:")}{" "}
            <strong className={isAllAnswered ? "text-success" : "text-brand"}>
              {totalAnswered}
            </strong>
            /{questions.length} {t("câu", "questions")}
          </span>
          {!isAllAnswered && (
            <span className="text-muted text-[11px]">
              ({t("Còn thiếu", "Remaining")}: {unansweredQuestions.length} {t("câu", "questions")})
            </span>
          )}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleGradeQuiz}
            disabled={!isAllAnswered}
            className={`px-4 py-2 font-bold transition-all ${
              isAllAnswered
                ? "bg-brand text-white hover:opacity-95 cursor-pointer ring-1 ring-brand"
                : "bg-subtle text-muted border border-grid cursor-not-allowed opacity-60"
            }`}
          >
            {isAllAnswered
              ? `[✓ ${t("Chấm điểm trắc nghiệm", "Grade Quiz")}]`
              : `[🔒 ${t("Cần làm đủ", "Complete all")} ${totalAnswered}/${questions.length} ${t("câu để nộp", "questions to submit")}]`}
          </button>
        ) : (
          <button
            onClick={handleResetQuiz}
            className="px-4 py-1.5 bg-surface border border-grid text-primary hover:border-brand hover:text-brand font-semibold transition-colors"
          >
            [↻ {t("Làm lại toàn bộ", "Retry All")}]
          </button>
        )}
      </div>
    </div>
  );
};
