# Project Prompt: Cloud-Based Educational Python Web IDE

## 1. Project Overview & Objective
Build a production-ready, interactive, browser-based Python Integrated Development Environment (IDE) designed for educational purposes. The platform allows instructors to create and upload coding assignments, while students can authenticate, browse exercises, write Python code with VS Code-like ergonomics, execute code client-side without backend compute overhead, and persist their progress in the cloud.

The UI/UX must strictly adhere to the **Chroma UI — Technical Bento Grid Design System** (*Exposed Hairline Bento Grid / Technical Blueprint* aesthetic), prioritizing `1px` structural grid lines, sharp corners, high-contrast typography, and monospace technical precision.

---

## 2. Tech Stack & Architecture
* **Frontend Framework:** React 18+ (Vite build tool) with TypeScript (or clean ES6+ JSX).
* **Styling & UI:** Tailwind CSS configured with custom Chroma UI Design Tokens (supporting Light Mode paper/stone and Dark Mode carbon themes, defaulting to Dark Mode for the IDE workspace), `lucide-react` combined with Unicode Geometric Glyphs (`◇`, `◆`, `●`, `◐`, `▣`, `[▶]`, `[■]`), and resizable split-pane layouts (`react-resizable-panels`).
* **Code Editor:** `@monaco-editor/react` configured for Python syntax highlighting, auto-indentation, bracket pair colorization, and intelligent code completion (IntelliSense).
* **Client-Side Execution Engine:** **Pyodide** (CPython compiled to WebAssembly) executed inside a dedicated **Web Worker** to prevent UI thread blocking and allow execution termination (handling infinite loops).
* **Backend-as-a-Service (BaaS):** Firebase v10+ Modular SDK:
  * **Firebase Authentication:** Email/Password and Google OAuth sign-in.
  * **Cloud Firestore:** NoSQL document storage for user profiles, role-based access control (RBAC), assignments, and student code submissions.

---

## 3. UI & Design System Specification (Chroma Technical Bento Grid)
Implement the **Chroma UI Design System** across all views:

### A. Design Tokens & Tailwind Configuration
Configure CSS custom properties in `globals.css` and map them in `tailwind.config.js`:
* **Colors (Dark / Light):**
  * `--bg-primary`: `#0A0A0A` (Dark) / `#FAFAFA` (Light) -> `bg-background`
  * `--bg-surface`: `#111111` (Dark) / `#FFFFFF` (Light) -> `bg-surface`
  * `--bg-subtle`: `#18181B` (Dark) / `#F4F4F5` (Light) -> `bg-subtle`
  * `--bg-terminal`: `#050505` (Dark) / `#0D0D0D` (Light) -> `bg-terminal`
  * `--border-grid`: `#27272A` (Dark) / `#E4E4E7` (Light) -> `border-grid` & `bg-grid`
  * `--border-strong`: `#3F3F46` (Dark) / `#D4D4D8` (Light) -> `border-grid-strong`
  * `--text-primary`: `#FAFAFA` (Dark) / `#09090B` (Light) -> `text-primary`
  * `--text-secondary`: `#A1A1AA` (Dark) / `#52525B` (Light) -> `text-secondary`
  * `--text-muted`: `#71717A` -> `text-muted`
  * `--accent-brand`: `#FF6433` (Dark) / `#FF5722` (Light) -> `text-brand` / `bg-brand` (Chroma Orange for active indicators & glyphs)
  * `--accent-success`: `#34D399` (Dark) / `#10B981` (Light) -> `text-success`
* **Typography:**
  * Sans-serif (`font-sans`): `'Geist Sans', 'Inter', system-ui, sans-serif` with tight tracking (`-0.02em` to `-0.03em`) for headings.
  * Monospace (`font-mono`): `'Geist Mono', 'JetBrains Mono', monospace` for all badges, metrics, tabs, buttons, specs, ASCII diagrams, and terminal outputs.
* **Utility Patterns:** Include `.bg-dot-matrix` (16px radial dot grid) and `.bg-diagonal-stripes` for technical background textures inside empty Bento cells or decorative headers.

### B. Architectural Rules & Bento Primitives
Build reusable primitives (`src/components/ui/BentoPrimitives.tsx`):
1. **Exposed Hairline Borders:** Use `grid bg-grid gap-[1px] border border-grid` on grid containers with `bg-surface` on child `<BentoCell />` components to achieve crisp `1px` non-doubling borders.
2. **Sharp / Micro-Radius Corners:** Use `rounded-none` (`0px`) for all major layout containers, cards, and IDE panes. Use `rounded-sm` (`2px`) at most for small inline badges or buttons.
3. **Zero Drop Shadows & Zero Scale Transforms:** Strictly forbid `shadow-lg`, `rounded-2xl`, or `hover:scale-105`. Interactive cells must only transition background color (`hover:bg-subtle`) and highlight their geometric glyph (`text-brand`).
4. **Structural Guide Lines:** Constrain landing, auth, and dashboard pages within a continuous vertical axis (`max-w-6xl mx-auto border-x border-grid`).

---

## 4. Database Schema (Cloud Firestore)
Implement the following Firestore collections and security structures:

1. **`users` Collection** (`docId = uid`):
   * `uid`: string
   * `email`: string
   * `displayName`: string
   * `role`: `'student' | 'instructor'` (default to `'student'` on registration)
   * `createdAt`: timestamp

2. **`assignments` Collection** (`docId = auto-generated`):
   * `title`: string
   * `description`: string (Markdown supported)
   * `difficulty`: `'Beginner' | 'Intermediate' | 'Advanced'`
   * `starterCode`: string (boilerplate Python code loaded into Monaco)
   * `testCases`: Array of objects `[{ input: string, expectedOutput: string, isHidden: boolean }]`
   * `createdBy`: string (instructor `uid`)
   * `createdAt`: timestamp

3. **`submissions` Collection** (`docId = ${uid}_${assignmentId}`):
   * `userId`: string
   * `assignmentId`: string
   * `code`: string (latest saved/submitted Python code)
   * `status`: `'in_progress' | 'passed' | 'failed'`
   * `lastExecutedOutput`: string
   * `updatedAt`: timestamp

---

## 5. Core Functional Requirements

### A. Authentication & Role-Based Access Control (RBAC)
* Implement a Technical Bento Login/Registration page supporting Email/Password and Google Sign-In, styled with exposed `1px` grid cells, dot-matrix accents, and monospace form labels.
* Protect routes using React Router (`ProtectedRoute` wrapper):
  * `/login`: Public auth screen.
  * `/workspace/:assignmentId?`: Student IDE workspace.
  * `/instructor`: Restricted dashboard accessible only to users with `role === 'instructor'`.

### B. Pyodide Web Worker Execution Engine (`usePyodide` Hook)
* Initialize Pyodide asynchronously inside a Web Worker upon app mount so the runtime is warm and ready.
* **Standard Streams Redirection:** Intercept Python's `sys.stdout` and `sys.stderr` to stream console logs back to the React UI in real time.
* **Standard Input (`input()`) Handling:** Implement an asynchronous mechanism (using `SharedArrayBuffer` with `Atomics` or a clean Promise-based message bridge) to pause Python execution when `input()` is called, prompt the user in the web terminal, and resume execution once submitted.
* **Execution Control:** Provide **"Run Code"** (`[▶] RUN`) and **"Stop Execution"** (`[■] STOP`) buttons that terminate and restart the Web Worker if the student writes an infinite `while True` loop.
* **Automated Grading (Test Runner):** Provide a **"Submit & Grade"** button that runs the student's code against all `testCases` defined in the assignment and displays pass/fail status (`✓` in `text-success` / `✕` in `text-brand`) in a crisp technical table.

### C. Student IDE Workspace Layout (`/workspace`)
Design a full-viewport, sharp-edged 3-pane Technical Bento IDE workspace separated by `1px` `bg-grid` dividers:
1. **Top Status Bar:** Monospace breadcrumb (`CHROMA_IDE // WORKSPACE`), Pyodide WASM engine status indicator (`● RUNTIME READY`), theme toggle (Light/Dark), and user profile badge.
2. **Left Pane (Problem Statement & Exercise Selector):**
   * Features a vertical list of assignments with `1px` dividers (`divide-y divide-grid`), active left border (`border-l-2 border-l-brand`), and geometric glyphs (`◇`, `◆`, `●`).
   * Renders assignment title, monospace difficulty badge, Markdown problem description, and sample input/output blocks.
3. **Center Pane (Monaco Editor):**
   * Language set to `python`, custom theme synchronized with `--bg-terminal` (`#050505`).
   * Monospace toolbar with **`[▶] RUN`**, **`[■] STOP`**, **`RESET`**, **`SAVE`**, and **`SUBMIT`** actions.
   * Auto-save debounce mechanism (saves student code to Firestore `submissions` collection every 10 seconds of inactivity or upon manual save, displaying a subtle monospace sync status).
4. **Right/Bottom Pane (Interactive Terminal & Test Results):**
   * Styled in pure `--bg-terminal` (`#050505`) with `1px` top/bottom hairline borders.
   * Tab 1: **`CONSOLE`** (displays `stdout`, `stderr` tracebacks, and interactive `input()` prompt).
   * Tab 2: **`TEST_CASES`** (displays automated test case execution results in a structured technical key-value/table layout).

### D. Instructor Dashboard (`/instructor`)
* Built using the `BentoGrid` (`cols={12}`) and `PerformanceBento` patterns:
  * **Top Metrics Strip:** 3-column monospace strip displaying total assignments, active students, and overall pass rate.
  * **Assignment Builder Bento:** Split-pane form allowing instructors to create, edit, and delete Python assignments (Title, Markdown Description, Difficulty, Starter Code via mini Monaco instance, and dynamic Test Case builder).
  * **Submission Analytics Table:** Sharp-bordered technical table showing student submission statuses per assignment.

---

## 6. Step-by-Step Implementation Plan
Please generate the application incrementally in clean, modular code:
1. **Project Setup & Design System Foundation:** Directory structure, `package.json` dependencies, `globals.css` with Chroma CSS variables/dot-matrix utilities, `tailwind.config.js`, and `src/components/ui/BentoPrimitives.tsx`.
2. **Firebase Configuration & Auth Context:** Build `src/firebase/config.ts` and `AuthContext.tsx` to manage user sessions and Firestore role fetching.
3. **Pyodide Web Worker & Custom Hook:** Build `pyodideWorker.js` and `usePyodide.ts` with proper `stdout`/`stderr` capture, `input()` bridging, and worker termination logic.
4. **Student Workspace UI:** Build the sharp-edged 3-pane Technical Bento IDE integrating `@monaco-editor/react`, the terminal output panel, and Firestore auto-save/load logic.
5. **Instructor Dashboard:** Build the Bento-styled CRUD interface and metrics table for uploading assignments and test cases to Firestore.

Ensure strict error handling, monospace loading states (e.g., `INITIALIZING PYODIDE WASM...` with ASCII progress/status indicators), and faithful adherence to the Chroma Technical Bento Grid aesthetic throughout the entire application.