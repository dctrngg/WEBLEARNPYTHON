/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        subtle: "var(--bg-subtle)",
        terminal: "var(--bg-terminal)",
        grid: "var(--border-grid)",
        "grid-strong": "var(--border-strong)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        brand: "var(--accent-brand)",
        "brand-hover": "var(--accent-brand-hover)",
        "brand-soft": "var(--accent-brand-soft)",
        "brand-text": "var(--accent-brand-text)",
        "on-brand": "var(--accent-on-brand)",
        success: "var(--accent-success)",
        "success-soft": "var(--accent-success-soft)",
        warn: "var(--accent-warn)",
        "warn-soft": "var(--accent-warn-soft)",
        danger: "var(--accent-danger)",
        "danger-soft": "var(--accent-danger-soft)",
        "term-fg": "var(--term-fg)",
        "term-border": "var(--term-border)",
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
        code: ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"],
      },
      borderRadius: {
        control: "8px",
        card: "14px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        pop: "var(--shadow-pop)",
      },
    },
  },
  plugins: [],
};
