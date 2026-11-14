import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { PanelResizeHandle } from "react-resizable-panels";
import { DifficultyLevel } from "../../types/ide";

/* ============================================================================
 * 1. BUTTON
 * ========================================================================== */
export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  shortcut?: string;
  glyph?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "outline",
      size = "md",
      loading = false,
      loadingText = "RUNNING…",
      shortcut,
      glyph,
      disabled,
      className = "",
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        "bg-brand text-on-brand border-brand font-semibold hover:opacity-90",
      outline:
        "bg-surface text-primary border-grid-strong hover:bg-subtle hover:border-brand",
      ghost:
        "bg-transparent text-secondary border-transparent hover:bg-subtle hover:text-primary",
      danger:
        "bg-surface text-danger border-danger hover:bg-subtle font-semibold",
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: "px-2.5 py-1 text-mono-xs gap-1.5",
      md: "px-3.5 py-2 text-mono-sm gap-2",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={`inline-flex items-center justify-center font-mono uppercase rounded-sm border transition-colors select-none shrink-0 focus-visible:outline-2 focus-visible:outline-brand focus-visible:-outline-offset-2 ${
          variantClasses[variant]
        } ${sizeClasses[size]} ${
          isDisabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
        {...rest}
      >
        {loading ? (
          <>
            <span aria-hidden="true">◐</span>
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {glyph && <span aria-hidden="true">{glyph}</span>}
            {children}
            {shortcut && (
              <kbd
                className={`ml-1 px-1 py-0.2 text-mono-xs border rounded-none ${
                  variant === "primary"
                    ? "border-on-brand text-on-brand"
                    : "border-grid text-muted"
                }`}
              >
                {shortcut}
              </kbd>
            )}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

/* ============================================================================
 * 2. INPUT, TEXTAREA, SELECT
 * ========================================================================== */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  hint?: string;
  rightSlot?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      rightSlot,
      required,
      className = "",
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errId = `${inputId}-err`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full space-y-1.5">
        {(label || rightSlot) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <label
                htmlFor={inputId}
                className="block font-mono text-mono-xs uppercase text-secondary font-semibold"
              >
                {label}
                {required && <span className="text-brand-text ml-1">*</span>}
              </label>
            )}
            {rightSlot}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errId : hint ? hintId : undefined}
          className={`w-full bg-background border px-3 py-2 text-primary text-sm rounded-none transition-colors focus:outline-none ${
            error
              ? "border-danger focus:border-danger"
              : "border-grid-strong focus:border-brand"
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...rest}
        />
        {error ? (
          <p
            id={errId}
            role="alert"
            className="font-mono text-mono-xs text-danger"
          >
            ✕ {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="font-mono text-mono-xs text-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  hint?: string;
  monospace?: boolean;
  rightSlot?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      monospace = false,
      rightSlot,
      required,
      className = "",
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const areaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {(label || rightSlot) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <label
                htmlFor={areaId}
                className="block font-mono text-mono-xs uppercase text-secondary font-semibold"
              >
                {label}
                {required && <span className="text-brand-text ml-1">*</span>}
              </label>
            )}
            {rightSlot}
          </div>
        )}
        <textarea
          ref={ref}
          id={areaId}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          className={`w-full bg-background border px-3 py-2 text-primary rounded-none transition-colors focus:outline-none ${
            monospace ? "font-mono text-mono-code" : "text-sm"
          } ${
            error
              ? "border-danger focus:border-danger"
              : "border-grid-strong focus:border-brand"
          } disabled:opacity-50 ${className}`}
          {...rest}
        />
        {error ? (
          <p role="alert" className="font-mono text-mono-xs text-danger">
            ✕ {error}
          </p>
        ) : hint ? (
          <p className="font-mono text-mono-xs text-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, required, className = "", id, children, ...rest }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block font-mono text-mono-xs uppercase text-secondary font-semibold"
          >
            {label}
            {required && <span className="text-brand-text ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={`w-full bg-background border px-3 py-2 text-primary font-mono text-mono-sm rounded-none transition-colors focus:outline-none ${
            error
              ? "border-danger focus:border-danger"
              : "border-grid-strong focus:border-brand"
          } disabled:opacity-50 ${className}`}
          {...rest}
        >
          {children}
        </select>
        {error ? (
          <p role="alert" className="font-mono text-mono-xs text-danger">
            ✕ {error}
          </p>
        ) : hint ? (
          <p className="font-mono text-mono-xs text-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

/* ============================================================================
 * 3. CHECKBOX & TOGGLE
 * ========================================================================== */
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-primary select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-4 h-4 border flex items-center justify-center rounded-none transition-colors ${
          checked
            ? "bg-brand border-brand text-on-brand font-bold"
            : "bg-background border-grid-strong text-transparent"
        }`}
      >
        ✓
      </span>
      <span>{label}</span>
    </button>
  );
};

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-primary select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-8 h-4 border flex items-center p-0.5 rounded-none transition-colors ${
          checked
            ? "bg-brand border-brand justify-end"
            : "bg-subtle border-grid-strong justify-start"
        }`}
      >
        <span
          className={`w-2.5 h-2.5 ${
            checked ? "bg-on-brand" : "bg-secondary"
          }`}
        />
      </span>
      <span>{label}</span>
    </button>
  );
};

/* ============================================================================
 * 4. TABS (Accessible Headless-style with Arrow Key Navigation)
 * ========================================================================== */
export interface TabItem {
  id: string;
  label: React.ReactNode;
  glyph?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "surface" | "terminal";
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  orientation = "horizontal",
  variant = "surface",
  fullWidth = false,
  className = "",
  ariaLabel = "Navigation Tabs",
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabledIndices = items
      .map((item, i) => (item.disabled ? -1 : i))
      .filter((i) => i !== -1);
    const currentPos = enabledIndices.indexOf(idx);
    if (currentPos === -1) return;

    let nextPos = -1;
    if (
      (orientation === "horizontal" && e.key === "ArrowRight") ||
      (orientation === "vertical" && e.key === "ArrowDown")
    ) {
      e.preventDefault();
      nextPos = (currentPos + 1) % enabledIndices.length;
    } else if (
      (orientation === "horizontal" && e.key === "ArrowLeft") ||
      (orientation === "vertical" && e.key === "ArrowUp")
    ) {
      e.preventDefault();
      nextPos =
        (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextPos = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextPos = enabledIndices.length - 1;
    }

    if (nextPos !== -1) {
      const targetIndex = enabledIndices[nextPos];
      const targetItem = items[targetIndex];
      tabRefs.current[targetIndex]?.focus();
      onChange(targetItem.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      className={`flex ${
        orientation === "vertical" ? "flex-col" : "flex-row items-center"
      } font-mono text-mono-sm uppercase select-none ${className}`}
    >
      {items.map((item, idx) => {
        const isActive = item.id === activeId;
        const activeBorder =
          orientation === "vertical"
            ? "border-l-2 border-l-brand"
            : "border-b-2 border-b-brand";

        const colorStyles =
          variant === "terminal"
            ? isActive
              ? `bg-terminal text-term-fg font-semibold ${activeBorder}`
              : "bg-term-subtle text-term-muted hover:text-term-fg"
            : isActive
            ? `bg-surface text-brand-text font-semibold ${activeBorder}`
            : "bg-subtle text-secondary hover:text-primary hover:bg-surface";

        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-3.5 py-2.5 transition-colors inline-flex items-center justify-center gap-2 ${
              fullWidth ? "flex-1" : "shrink-0"
            } ${colorStyles} ${
              item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {item.glyph && <span aria-hidden="true">{item.glyph}</span>}
            <span>{item.label}</span>
            {item.badge}
          </button>
        );
      })}
    </div>
  );
};

/* ============================================================================
 * 5. MODAL & CONFIRM DIALOG (Focus Trap + Escape to close)
 * ========================================================================== */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badgeLabel?: string;
  glyph?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  badgeLabel,
  glyph = "[◆]",
  children,
  footer,
  maxWidthClass = "max-w-lg",
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusTimer = setTimeout(() => {
      const container = dialogRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(
        'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`border border-grid-strong bg-surface text-primary w-full ${maxWidthClass} rounded-none flex flex-col max-h-[90vh]`}
      >
        <div className="px-5 py-4 border-b border-grid flex items-start justify-between gap-4 shrink-0">
          <div>
            {badgeLabel && (
              <div className="inline-flex items-center gap-1.5 font-mono text-mono-xs uppercase text-secondary mb-1">
                <span className="text-brand" aria-hidden="true">
                  {glyph}
                </span>
                <span>{badgeLabel}</span>
              </div>
            )}
            <h3 id={titleId} className="text-h3 text-primary">
              {title}
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            [✕] ESC
          </Button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div className="px-5 py-3.5 bg-subtle border-t border-grid flex items-center justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  requireText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "CONFIRM",
  cancelLabel = "CANCEL",
  variant = "danger",
  requireText,
}) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (isOpen) setTypedText("");
  }, [isOpen]);

  const canConfirm = requireText ? typedText.trim() === requireText.trim() : true;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      badgeLabel="CONFIRM ACTION"
      glyph="[▲]"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            disabled={!canConfirm}
            onClick={() => {
              if (!canConfirm) return;
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-body text-secondary">{description}</p>
        {requireText && (
          <Input
            label={`TYPE "${requireText}" TO CONFIRM`}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder={requireText}
          />
        )}
      </div>
    </Modal>
  );
};

/* ============================================================================
 * 6. TOAST SYSTEM
 * ========================================================================== */
export type ToastKind = "success" | "danger" | "warn" | "info";

export interface ToastItem {
  id: string;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  pushToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue>({
  pushToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback(
    (message: string, kind: ToastKind = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, kind, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 4000);
    },
    []
  );

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const borderLeftMap: Record<ToastKind, string> = {
    success: "border-l-2 border-l-success text-success-text",
    danger: "border-l-2 border-l-danger text-danger",
    warn: "border-l-2 border-l-warn text-warn",
    info: "border-l-2 border-l-brand text-primary",
  };

  const glyphMap: Record<ToastKind, string> = {
    success: "✓",
    danger: "✕",
    warn: "▲",
    info: "◆",
  };

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto bg-surface border border-grid-strong px-4 py-3 font-mono text-mono-xs flex items-start justify-between gap-3 ${
              borderLeftMap[toast.kind]
            }`}
          >
            <div className="flex items-start gap-2">
              <span aria-hidden="true" className="font-bold">
                {glyphMap[toast.kind]}
              </span>
              <span className="text-primary">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-muted hover:text-primary shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/* ============================================================================
 * 7. TOOLTIP
 * ========================================================================== */
export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: "top" | "bottom";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "bottom",
}) => {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  if (!content) return children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {React.cloneElement(children, {
        "aria-describedby": open ? tipId : undefined,
      })}
      {open && (
        <span
          id={tipId}
          role="tooltip"
          className={`absolute z-50 px-2 py-1 bg-terminal text-term-fg border border-term-border font-mono text-mono-xs whitespace-nowrap pointer-events-none ${
            position === "top"
              ? "bottom-full mb-1.5 left-1/2 -translate-x-1/2"
              : "top-full mt-1.5 left-1/2 -translate-x-1/2"
          }`}
        >
          {content}
        </span>
      )}
    </span>
  );
};

/* ============================================================================
 * 8. BADGE & DIFFICULTY BADGE (Neutral 3-Dot ASCII per D8/5)
 * ========================================================================== */
export type BadgeVariant =
  | "neutral"
  | "brand"
  | "success"
  | "warn"
  | "danger";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const variants: Record<BadgeVariant, string> = {
    neutral: "bg-subtle border-grid text-secondary",
    brand: "bg-subtle border-brand text-brand-text",
    success: "bg-subtle border-success text-success-text",
    warn: "bg-subtle border-warn text-warn",
    danger: "bg-subtle border-danger text-danger",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm border font-mono text-mono-xs uppercase shrink-0 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

const DIFFICULTY_DOTS: Record<
  DifficultyLevel,
  { dots: string; label: string }
> = {
  Beginner: { dots: "●○○", label: "BEGINNER" },
  Intermediate: { dots: "●●○", label: "INTERMEDIATE" },
  Advanced: { dots: "●●●", label: "ADVANCED" },
};

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className = "",
}) => {
  const meta = DIFFICULTY_DOTS[difficulty] || DIFFICULTY_DOTS.Beginner;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm border border-grid bg-subtle text-secondary font-mono text-mono-xs uppercase shrink-0 ${className}`}
      aria-label={`Difficulty: ${meta.label}`}
    >
      <span aria-hidden="true" className="tracking-tight text-primary">
        {meta.dots}
      </span>
      <span>{meta.label}</span>
    </span>
  );
};

/* ============================================================================
 * 9. TABLE PRIMITIVE
 * ========================================================================== */
export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = "" }) => (
  <div className={`w-full overflow-auto border border-grid ${className}`}>
    <table className="w-full border-collapse text-left font-mono text-mono-xs">
      {children}
    </table>
  </div>
);

export const TableHead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <thead className="bg-subtle border-b border-grid text-secondary uppercase sticky top-0 z-10">
    {children}
  </thead>
);

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  sortable = false,
  sortDirection = null,
  onSort,
  className = "",
  ...rest
}) => (
  <th
    aria-sort={
      sortDirection === "asc"
        ? "ascending"
        : sortDirection === "desc"
        ? "descending"
        : sortable
        ? "none"
        : undefined
    }
    className={`px-3 py-2.5 font-semibold border-r last:border-r-0 border-grid select-none ${className}`}
    {...rest}
  >
    {sortable ? (
      <button
        type="button"
        onClick={onSort}
        className="inline-flex items-center gap-1.5 uppercase text-secondary hover:text-primary w-full"
      >
        <span>{children}</span>
        <span aria-hidden="true" className="text-brand-text">
          {sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "↕"}
        </span>
      </button>
    ) : (
      children
    )}
  </th>
);

export const TableRow: React.FC<
  React.HTMLAttributes<HTMLTableRowElement> & {
    interactive?: boolean;
    selected?: boolean;
  }
> = ({
  children,
  interactive = false,
  selected = false,
  className = "",
  ...rest
}) => (
  <tr
    className={`border-b last:border-b-0 border-grid transition-colors ${
      selected
        ? "bg-subtle border-l-2 border-l-brand"
        : "bg-surface hover:bg-subtle"
    } ${interactive ? "cursor-pointer" : ""} ${className}`}
    {...rest}
  >
    {children}
  </tr>
);

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ children, className = "", ...rest }) => (
  <td
    className={`px-3 py-2.5 border-r last:border-r-0 border-grid text-primary ${className}`}
    {...rest}
  >
    {children}
  </td>
);

/* ============================================================================
 * 10. EMPTY STATE, LOADING STATE, ERROR STATE
 * ========================================================================== */
export interface EmptyStateProps {
  glyph?: string;
  title: string;
  hint?: string;
  pattern?: "dots" | "stripes";
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  glyph = "[◇]",
  title,
  hint,
  pattern = "dots",
  action,
  className = "",
}) => (
  <div
    className={`p-8 border border-grid flex flex-col items-center justify-center text-center ${
      pattern === "dots" ? "bg-dot-matrix" : "bg-diagonal-stripes"
    } ${className}`}
  >
    <div
      aria-hidden="true"
      className="font-mono text-xl text-brand mb-2 select-none"
    >
      {glyph}
    </div>
    <div className="font-mono text-mono-sm uppercase font-semibold text-primary mb-1">
      {title}
    </div>
    {hint && (
      <p className="font-mono text-mono-xs text-secondary max-w-md mb-4">
        {hint}
      </p>
    )}
    {action && <div className="mt-1">{action}</div>}
  </div>
);

export function buildAsciiBar(percent: number, totalSlots = 10): string {
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = Math.round((clamped / 100) * totalSlots);
  return `[${"▓".repeat(filled)}${"░".repeat(totalSlots - filled)}]`;
}

export interface LoadingStateProps {
  label?: string;
  percent?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = "INITIALIZING…",
  percent,
  className = "",
}) => {
  const bar =
    typeof percent === "number" ? buildAsciiBar(percent, 10) : "[▓▓▓░░░░░░░]";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`p-6 border border-grid bg-surface font-mono text-mono-sm text-primary flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-warn">
          ◐
        </span>
        <span className="uppercase">{label}</span>
      </div>
      <div className="text-mono-xs text-muted flex items-center gap-2">
        <span aria-hidden="true">{bar}</span>
        {typeof percent === "number" && <span>{Math.round(percent)}%</span>}
      </div>
    </div>
  );
};

export interface ErrorStateProps {
  code?: string;
  description?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  code = "ERR_RUNTIME_FAILURE",
  description,
  message,
  onRetry,
  className = "",
}) => (
  <div
    role="alert"
    className={`p-6 border border-danger bg-surface font-mono text-mono-xs space-y-3 ${className}`}
  >
    <div className="text-danger font-bold uppercase flex items-center gap-2">
      <span aria-hidden="true">✕</span>
      <span>{code}</span>
    </div>
    <p className="text-secondary leading-relaxed">{description || message}</p>
    {onRetry && (
      <div>
        <Button variant="danger" size="sm" onClick={onRetry}>
          [↻] RETRY
        </Button>
      </div>
    )}
  </div>
);

/* ============================================================================
 * 11. RESIZE HANDLE (1px visible hairline + 8px hit target + double-click reset)
 * ========================================================================== */
export interface ResizeHandleProps {
  direction?: "horizontal" | "vertical";
  onResetLayout?: () => void;
  ariaLabel?: string;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction = "horizontal",
  onResetLayout,
  ariaLabel = "Resize panel divider",
}) => {
  const isHorizontal = direction === "horizontal";

  return (
    <PanelResizeHandle
      aria-label={ariaLabel}
      onDoubleClick={onResetLayout}
      className={`group relative flex items-center justify-center bg-transparent select-none focus-visible:outline-none ${
        isHorizontal
          ? "w-2 -mx-[3.5px] z-20 cursor-col-resize"
          : "h-2 -my-[3.5px] z-20 cursor-row-resize"
      }`}
    >
      <div
        className={`transition-colors bg-grid group-hover:bg-brand group-focus-visible:bg-brand group-data-[resize-handle-active]:bg-brand ${
          isHorizontal ? "w-[1px] h-full" : "h-[1px] w-full"
        }`}
      />
    </PanelResizeHandle>
  );
};
