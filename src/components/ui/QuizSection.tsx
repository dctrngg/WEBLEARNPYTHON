import React, { useState } from "react";
import { QuizQuestion } from "../../types/ide";
import { useLanguage } from "../../contexts/LanguageContext";

interface QuizSectionProps {
  lessonCode: string;
  quizzes: QuizQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  lessonCode,
  quizzes,
}) => {
  const { t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (!quizzes || quizzes.length === 0) {
    return null;
  }

  const handleSelect = (qId: string, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  const resetAll = () => {
    setSelectedAnswers({});
    setRevealed({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="p-6 border-b border-grid bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-brand font-bold flex items-center gap-1.5">
            <span>🎯</span>
            <span>
              {t(
                `CÂU HỎI TRẮC NGHIỆM ÔN TẬP (${quizzes.length} CÂU HỎI TRÍCH XUẤT TỪ TÀI LIỆU PDF)`,
                `REVIEW QUIZZES (${quizzes.length} QUESTIONS EXTRACTED FROM PDF)`
              )}
            </span>
          </div>
          <p className="text-xs text-secondary mt-1">
            {t(
              "Chọn đáp án A, B, C hoặc D để tự kiểm tra mức độ nắm bắt kiến thức sau khi đọc lý thuyết.",
              "Select option A, B, C, or D to test your understanding after reading the theory."
            )}
          </p>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-1 bg-subtle border border-grid font-mono text-xs text-secondary hover:text-brand hover:border-brand"
          >
            {t("[↺ Làm lại từ đầu]", "[↺ Reset all]")}
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {quizzes.map((quiz, qIdx) => {
          const userChoice = selectedAnswers[quiz.id];
          const isAnswered = revealed[quiz.id];
          const choiceLetters = ["A", "B", "C", "D"];

          return (
            <div
              key={quiz.id}
              className="p-4 bg-canvas border border-grid space-y-3 font-mono text-xs"
            >
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 bg-subtle border border-grid text-brand font-bold shrink-0">
                  Câu {qIdx + 1}
                </span>
                <span className="text-primary font-medium leading-relaxed">
                  {quiz.question}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {quiz.options.map((optText, optIdx) => {
                  const letter = choiceLetters[optIdx];
                  const isSelected = userChoice === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(quiz.id, optIdx)}
                      className={`text-left p-3 border transition-colors flex items-start gap-2.5 ${
                        isSelected
                          ? "bg-brand/15 border-brand text-brand font-bold"
                          : "bg-surface border-grid text-secondary hover:border-brand hover:text-primary"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 flex items-center justify-center shrink-0 border text-[10px] font-bold ${
                          isSelected
                            ? "bg-brand text-white border-brand"
                            : "bg-subtle text-secondary border-grid"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="leading-relaxed flex-1">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="pt-2 border-t border-grid flex items-center justify-between text-[11px]">
                  <span className="text-success font-semibold">
                    ✓ Đã chọn đáp án:{" "}
                    <strong>{choiceLetters[userChoice]}</strong>
                  </span>
                  <span className="text-muted">
                    {lessonCode} • Trắc nghiệm Tin học 10
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
