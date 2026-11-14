import React, { useState, useEffect, useRef } from "react";
import {
  consultAITutor,
  AITutorResponse,
  getStoredGeminiApiKey,
  saveStoredGeminiApiKey,
} from "../../services/aiTutorService";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useLanguage } from "../../contexts/LanguageContext";

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  errorLog?: string;
  assignmentTitle?: string;
  assignmentDescription?: string;
  testCaseDetails?: string;
  initialQuestion?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  data?: AITutorResponse;
  timestamp: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({
  isOpen,
  onClose,
  code,
  errorLog,
  assignmentTitle,
  assignmentDescription,
  testCaseDetails,
  initialQuestion,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>("");
  const [currentKey, setCurrentKey] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const k = getStoredGeminiApiKey();
    setCurrentKey(k);
    setApiKeyInput(k);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle initial auto-trigger if initialQuestion is provided
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (initialQuestion || errorLog) {
        handleSendQuestion(initialQuestion || "Thầy/cô giải thích lỗi em đang gặp với ạ!");
      }
    }
  }, [isOpen]);

  const handleSaveKey = () => {
    saveStoredGeminiApiKey(apiKeyInput);
    setCurrentKey(apiKeyInput.trim());
    setShowKeyConfig(false);
  };

  const handleSendQuestion = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputText.trim();
    if (!promptToSend && !errorLog) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: promptToSend || "Phân tích và giải thích lỗi trong bài làm của em.",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setLoading(true);

    try {
      const response = await consultAITutor({
        code,
        errorLog,
        assignmentTitle,
        assignmentDescription,
        testCaseDetails,
        userPrompt: promptToSend,
      });

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.explanationVi,
        data: response,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Trợ giảng gặp sự cố khi phân tích. Em hãy kiểm tra lại câu hỏi hoặc thông báo lỗi nhé!",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] md:w-[560px] bg-surface border-l border-grid shadow-2xl flex flex-col font-mono text-xs">
      {/* Header */}
      <div className="h-12 px-4 border-b border-grid bg-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-brand/10 border border-brand/40 text-brand font-bold text-sm">
            🤖
          </span>
          <div>
            <h3 className="font-bold text-primary text-xs flex items-center gap-1.5">
              <span>TRỢ GIẢNG AI // TIN HỌC 10</span>
              {currentKey ? (
                <span className="px-1.5 py-0.2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 text-[10px] font-semibold">
                  ⚡ GEMINI FLASH
                </span>
              ) : (
                <span className="px-1.5 py-0.2 bg-subtle border border-grid text-secondary text-[10px] font-semibold">
                  ✨ NỘI BỘ
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            title="Cấu hình Google Gemini API Key"
            className={`px-2 py-1 border transition-colors ${
              showKeyConfig
                ? "bg-brand text-white border-brand font-semibold"
                : "bg-surface border-grid text-secondary hover:text-primary"
            }`}
          >
            ⚙ API KEY
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 bg-surface border border-grid text-secondary hover:text-brand hover:border-brand transition-colors font-bold"
          >
            ✕
          </button>
        </div>
      </div>

      {/* API Key Modal / Popover */}
      {showKeyConfig && (
        <div className="p-3 bg-brand/5 border-b border-brand/30 shrink-0 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary text-[11px]">
              🔑 CẤU HÌNH GOOGLE GEMINI API KEY (TÙY CHỌN)
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline text-[10px]"
            >
              Lấy khóa miễn phí từ Google ↗
            </a>
          </div>
          <p className="text-[11px] text-secondary leading-relaxed">
            Hệ thống đã có sẵn **Bộ chẩn đoán nội bộ** phân tích 100% lỗi cú pháp SGK. Nếu muốn trò chuyện tự nhiên với mô hình AI Gemini Flash của Google, em có thể dán khóa API vào đây.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Dán API Key (AIzaSy...)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="flex-1 bg-surface border border-grid px-2.5 py-1.5 text-primary text-xs focus:outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={handleSaveKey}
              className="px-3 py-1.5 bg-brand text-white font-semibold hover:opacity-90 transition-opacity"
            >
              LƯU
            </button>
            {currentKey && (
              <button
                type="button"
                onClick={() => {
                  saveStoredGeminiApiKey("");
                  setCurrentKey("");
                  setApiKeyInput("");
                }}
                className="px-2 py-1.5 bg-surface border border-grid text-rose-500 hover:bg-rose-50 font-medium"
              >
                XÓA
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="p-2 border-b border-grid bg-subtle/50 flex items-center gap-1.5 overflow-x-auto shrink-0 text-[11px]">
        <button
          type="button"
          onClick={() => handleSendQuestion("Giải thích chi tiết lỗi em vừa gặp và cách khắc phục ạ.")}
          className="px-2 py-1 bg-surface border border-grid hover:border-brand text-primary hover:text-brand transition-colors shrink-0"
        >
          🔍 Giải thích lỗi
        </button>
        <button
          type="button"
          onClick={() => handleSendQuestion("Gợi ý cho em các bước làm bài này theo SGK với ạ.")}
          className="px-2 py-1 bg-surface border border-grid hover:border-brand text-primary hover:text-brand transition-colors shrink-0"
        >
          💡 Gợi ý thuật toán
        </button>
        <button
          type="button"
          onClick={() => handleSendQuestion("Code của em có bị lỗi thụt dòng (Indentation) ở đâu không?")}
          className="px-2 py-1 bg-surface border border-grid hover:border-brand text-primary hover:text-brand transition-colors shrink-0"
        >
          📏 Kiểm tra thụt dòng
        </button>
        <button
          type="button"
          onClick={() => handleSendQuestion("Tại sao bài của em chưa qua hết tất cả Test Cases ạ?")}
          className="px-2 py-1 bg-surface border border-grid hover:border-brand text-primary hover:text-brand transition-colors shrink-0"
        >
          📐 So khớp Test Cases
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-secondary space-y-3">
            <span className="text-3xl">🧑‍🏫</span>
            <div className="font-bold text-primary text-sm">
              Xin chào! Thầy/cô là Trợ giảng Tin học 10
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Khi gặp lỗi code màu đỏ hoặc chưa hiểu cách giải, em hãy bấm vào các nút gợi ý nhanh ở trên hoặc gõ câu hỏi xuống bên dưới nhé!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-muted mb-1">
                <span>{msg.role === "user" ? "👤 Học sinh" : "🤖 Trợ giảng AI"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] p-3 border ${
                  msg.role === "user"
                    ? "bg-brand/10 border-brand/40 text-primary"
                    : "bg-surface border-grid text-primary shadow-sm"
                }`}
              >
                {msg.data?.errorType && (
                  <div className="mb-2 pb-2 border-b border-grid">
                    <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold text-[10px]">
                      {msg.data.errorType}
                    </span>
                    <div className="font-semibold text-primary mt-1.5">
                      {msg.data.summaryVi}
                    </div>
                  </div>
                )}

                <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed space-y-2">
                  <MarkdownRenderer content={msg.content} />
                </div>

                {msg.data?.fixExample && (
                  <div className="mt-3 p-2 bg-subtle border border-grid space-y-1.5 text-[11px]">
                    <div className="text-secondary font-semibold">
                      💡 Ví dụ minh họa cách sửa:
                    </div>
                    <div className="bg-rose-500/10 text-rose-600 border border-rose-500/20 p-1.5 font-mono">
                      {msg.data.fixExample.wrong}
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 p-1.5 font-mono">
                      {msg.data.fixExample.correct}
                    </div>
                    <div className="text-[10px] text-muted italic">
                      * {msg.data.fixExample.explanation}
                    </div>
                  </div>
                )}

                {msg.data?.suggestionVi && !msg.data?.fixExample && (
                  <div className="mt-2 pt-2 border-t border-grid text-secondary text-[11px]">
                    {msg.data.suggestionVi}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2 text-brand font-semibold p-3 bg-brand/5 border border-brand/20">
            <span className="animate-spin text-sm">◐</span>
            <span>Trợ giảng đang đọc code và phân tích nguyên nhân...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <div className="p-3 border-t border-grid bg-surface shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t(
              "Hỏi trợ giảng (Ví dụ: tại sao dòng 3 bị lỗi?)...",
              "Ask AI Tutor..."
            )}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 bg-subtle border border-grid px-3 py-2 text-primary text-xs focus:outline-none focus:border-brand disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="px-4 py-2 bg-brand text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            GỬI
          </button>
        </form>
      </div>
    </div>
  );
};
