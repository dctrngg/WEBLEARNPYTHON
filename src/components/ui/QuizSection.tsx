import React, { useState } from "react";
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
  // Filter or show all
  const [displayCount, setDisplayCount] = useState<number>(5);

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

  const visibleQuestions = questions.slice(0, displayCount);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return; // Locked once submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optIdx,
    }));
  };

  const handleGradeQuiz = () => {
    setIsSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Calculate score
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = visibleQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

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
                `Ngân hàng gồm ${questions.length} câu hỏi trích xuất từ tài liệu SGK Tin học 10.`,
                `Bank of ${questions.length} multiple choice questions from Grade 10 CS textbook.`
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
          <select
            value={displayCount}
            onChange={(e) => {
              setDisplayCount(Number(e.target.value));
              setIsSubmitted(false);
            }}
            className="bg-canvas border border-grid px-2.5 py-1 text-primary focus:outline-none focus:border-brand"
          >
            <option value={5}>5 câu ôn tập</option>
            <option value={10}>10 câu ôn tập</option>
            <option value={15}>15 câu ôn tập</option>
            <option value={questions.length}>
              Toàn bộ ({questions.length} câu)
            </option>
          </select>

          {isSubmitted ? (
            <button
              onClick={handleResetQuiz}
              className="px-3 py-1 bg-subtle border border-grid text-primary hover:border-brand hover:text-brand font-semibold transition-colors"
            >
              [↻ Làm lại]
            </button>
          ) : (
            <button
              onClick={handleGradeQuiz}
              disabled={totalAnswered === 0}
              className="px-4 py-1 bg-brand text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              [✓ Nộp & Xem đáp án]
            </button>
          )}
        </div>
      </div>

      {/* Result score banner when submitted */}
      {isSubmitted && (
        <div className="p-4 bg-subtle border-b border-grid flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold ${
                correctCount === visibleQuestions.length
                  ? "text-emerald-500"
                  : "text-brand"
              }`}
            >
              {correctCount === visibleQuestions.length
                ? "🎉 XUẤT SẮC! BẠN ĐÃ TRẢ LỜI ĐÚNG TẤT CẢ!"
                : `KẾT QUẢ ĐẠT: ${correctCount}/${visibleQuestions.length} CÂU ĐÚNG`}
            </span>
            <span className="text-grid-strong">|</span>
            <span className="text-secondary">
              Điểm:{" "}
              <strong className="text-emerald-500">
                {Math.round((correctCount / visibleQuestions.length) * 10)}
                /10
              </strong>
            </span>
          </div>

          <span className="text-muted text-[11px]">
            Xem giải thích chi tiết dưới từng câu hỏi bên dưới.
          </span>
        </div>
      )}

      {/* Questions list */}
      <div className="p-5 space-y-6">
        {visibleQuestions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-4 bg-canvas border border-grid space-y-3 font-mono text-xs"
            >
              {/* Question title */}
              <div className="flex items-start gap-2.5">
                <span className="px-2.5 py-1 bg-subtle border border-grid text-brand font-bold text-xs sm:text-sm shrink-0">
                  Câu {qIndex + 1}
                </span>
                <span className="text-primary font-bold text-base sm:text-[17px] leading-relaxed">
                  {q.question}
                </span>
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
      <div className="p-3 bg-subtle border-t border-grid font-mono text-xs text-secondary flex items-center justify-between">
        <span>
          Đã chọn:{" "}
          <strong className="text-primary">{totalAnswered}</strong>/
          {visibleQuestions.length} câu
        </span>

        {!isSubmitted && (
          <button
            onClick={handleGradeQuiz}
            disabled={totalAnswered === 0}
            className="px-4 py-1.5 bg-brand text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            [✓ Chấm điểm trắc nghiệm]
          </button>
        )}
      </div>
    </div>
  );
};
