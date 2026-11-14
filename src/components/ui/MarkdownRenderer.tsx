import React from "react";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Technical Blueprint Markdown Renderer
 * Formats headings, code blocks, inline code, bullet lists, and paragraphs
 * adhering to the Chroma UI typography specification.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const renderInline = (text: string): React.ReactNode[] => {
    // Handle `code` and **bold**
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={idx}
            className="font-mono text-xs bg-subtle text-brand px-1.5 py-0.5 border border-grid"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  lines.forEach((line, idx) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${idx}`}
            className="font-mono text-xs bg-terminal text-zinc-200 p-3.5 border border-grid overflow-x-auto my-3"
          >
            {codeBuffer.join("\n")}
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`sp-${idx}`} className="h-2" />);
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4
          key={`h3-${idx}`}
          className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mt-4 mb-2 flex items-center gap-2"
        >
          <span className="text-brand">◆</span>
          <span>{trimmed.slice(4)}</span>
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h3
          key={`h2-${idx}`}
          className="text-base font-semibold text-primary mt-4 mb-2"
        >
          {trimmed.slice(3)}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <div
          key={`li-${idx}`}
          className="flex items-start gap-2.5 text-sm text-secondary leading-relaxed pl-1 my-1"
        >
          <span className="font-mono text-xs text-brand mt-1">•</span>
          <div>{renderInline(trimmed.slice(2))}</div>
        </div>
      );
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s+(.*)$/);
      if (match) {
        elements.push(
          <div
            key={`oli-${idx}`}
            className="flex items-start gap-2.5 text-sm text-secondary leading-relaxed pl-1 my-1"
          >
            <span className="font-mono text-xs text-brand mt-0.5">
              {match[1]}
            </span>
            <div>{renderInline(match[2])}</div>
          </div>
        );
        return;
      }
    }

    elements.push(
      <p key={`p-${idx}`} className="text-sm text-secondary leading-relaxed my-1.5">
        {renderInline(trimmed)}
      </p>
    );
  });

  return <div className="space-y-0.5">{elements}</div>;
};

