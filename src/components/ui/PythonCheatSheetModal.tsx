import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  PYTHON_KNOWLEDGE_BASE,
  PythonDocItem,
} from "../../services/pythonIntellisense";
import { SectionBadge } from "./BentoPrimitives";

interface PythonCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertSnippet?: (codeToInsert: string) => void;
}

export const PythonCheatSheetModal: React.FC<PythonCheatSheetModalProps> = ({
  isOpen,
  onClose,
  onInsertSnippet,
}) => {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: t("Tất cả hàm", "All Functions") },
    { id: "builtin", label: t("Hàm cơ bản (print, input...)", "Built-ins") },
    { id: "snippet", label: t("Mẫu lệnh nhanh (for, if...)", "Snippets") },
    { id: "method", label: t("Xử lý Chuỗi & Danh sách", "Methods") },
    { id: "module", label: t("Thư viện (math, Counter)", "Modules") },
  ];

  const filtered = PYTHON_KNOWLEDGE_BASE.filter((item) => {
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    const q = search.trim().toLowerCase();
    if (!q) return matchCategory;
    return (
      matchCategory &&
      (item.label.toLowerCase().includes(q) ||
        item.signature.toLowerCase().includes(q) ||
        item.detailVi.toLowerCase().includes(q) ||
        item.detailEn.toLowerCase().includes(q))
    );
  });

  const cleanSnippetPlaceholders = (raw: string): string => {
    return raw.replace(/\$\{\d+:?([^}]*)\}/g, "$1").replace(/\$\d+/g, "");
  };

  const handleInsert = (item: PythonDocItem) => {
    const cleaned = cleanSnippetPlaceholders(item.insertText);
    if (onInsertSnippet) {
      onInsertSnippet(cleaned);
      onClose();
    } else {
      navigator.clipboard.writeText(cleaned);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-surface border border-grid max-w-4xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-grid flex items-start justify-between gap-4 shrink-0">
          <div>
            <SectionBadge
              glyph="[📖]"
              label={t(
                "SỔ TAY TRA CỨU HÀM & CÚ PHÁP PYTHON CHO HỌC SINH",
                "STUDENT PYTHON FUNCTION & SYNTAX CHEAT SHEET"
              )}
              className="mb-1"
            />
            <h3 className="text-lg font-semibold text-primary">
              {t(
                "Gợi ý Hàm Python Thông dụng (Nhấn để chèn vào trình soạn thảo)",
                "Common Python Functions & Snippets (Click to insert into editor)"
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs px-3 py-1.5 border border-grid text-secondary hover:text-primary bg-subtle"
          >
            [✕] {t("ĐÓNG", "CLOSE")}
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-subtle border-b border-grid flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1.5 border transition-colors ${
                  activeCategory === cat.id
                    ? "bg-brand text-white border-brand font-semibold"
                    : "bg-surface text-secondary border-grid hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(
              "Tìm kiếm hàm (VD: input, print, for, split, max)...",
              "Search function (e.g. input, print, for, split)..."
            )}
            className="bg-background border border-grid px-3 py-1.5 text-primary focus:outline-none focus:border-brand sm:w-64"
          />
        </div>

        {/* Functions Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-background">
          {filtered.map((item) => (
            <div
              key={item.label}
              className="border border-grid bg-surface p-4 flex flex-col justify-between gap-3 hover:border-brand transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <code className="font-mono text-xs font-bold text-brand bg-subtle px-2 py-0.5 border border-grid">
                    {item.signature}
                  </code>
                  <button
                    onClick={() => handleInsert(item)}
                    className="font-mono text-[11px] px-2.5 py-1 bg-brand text-white font-semibold hover:opacity-90 shrink-0"
                  >
                    {t("[+ CHÈN CODE]", "[+ INSERT]")}
                  </button>
                </div>
                <p className="text-xs font-medium text-primary mb-1">
                  {lang === "vi" ? item.detailVi : item.detailEn}
                </p>
                <p className="text-xs text-secondary leading-relaxed">
                  {lang === "vi" ? item.docVi : item.docEn}
                </p>
              </div>

              <pre className="bg-terminal text-emerald-400 p-2.5 border border-grid font-mono text-[11px] overflow-x-auto">
                {item.example}
              </pre>
            </div>
          ))}
        </div>

        {/* Footer Tip */}
        <div className="px-5 py-3 bg-subtle border-t border-grid font-mono text-xs text-secondary flex items-center justify-between shrink-0">
          <span>
            💡{" "}
            {t(
              "Mẹo: Khi đang gõ code trong khung soạn thảo, nhấn tổ hợp phím Ctrl + Space để bật bảng gợi ý hàm bất kỳ lúc nào!",
              "Tip: Press Ctrl + Space inside the code editor anytime to trigger autocomplete suggestions!"
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

