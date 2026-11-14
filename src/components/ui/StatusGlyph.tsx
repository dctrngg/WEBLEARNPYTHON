import React from "react";

export type AssignmentStatus =
  | "not_started"
  | "in_progress"
  | "passed"
  | "failed";

interface StatusGlyphProps {
  status: AssignmentStatus;
  showLabel?: boolean;
  className?: string;
}

const STATUS_META: Record<
  AssignmentStatus,
  { glyph: string; label: string; colorClass: string }
> = {
  not_started: {
    glyph: "◇",
    label: "NOT STARTED",
    colorClass: "text-muted",
  },
  in_progress: {
    glyph: "◐",
    label: "IN PROGRESS",
    colorClass: "text-warn",
  },
  passed: {
    glyph: "●",
    label: "PASSED",
    colorClass: "text-success-text",
  },
  failed: {
    glyph: "◆",
    label: "FAILED",
    colorClass: "text-danger",
  },
};

export const StatusGlyph: React.FC<StatusGlyphProps> = ({
  status,
  showLabel = false,
  className = "",
}) => {
  const meta = STATUS_META[status] || STATUS_META.not_started;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-mono-sm leading-none shrink-0 ${meta.colorClass} ${className}`}
      aria-label={`Status: ${meta.label}`}
      title={meta.label}
    >
      <span aria-hidden="true" className="inline-block text-center w-3.5">
        {meta.glyph}
      </span>
      {showLabel ? (
        <span className="text-mono-xs uppercase">{meta.label}</span>
      ) : (
        <span className="sr-only">{meta.label}</span>
      )}
    </span>
  );
};
