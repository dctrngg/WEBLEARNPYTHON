export type UserRole = "student" | "instructor";

export interface UserProfile {
  uid: string;
  username?: string; // e.g. "an10a7"
  email: string;
  displayName: string;
  className?: string; // e.g. "10A7", "10A12"
  password?: string;
  role: UserRole;
  createdAt: string;
}

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Assignment {
  id: string;
  lessonId?: string; // e.g. "bai_16", "bai_17", ..., "bai_29_31"
  glyph?: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  starterCode: string;
  testCases: TestCase[];
  createdBy: string;
  createdAt: string;
}

export type SubmissionStatus = "in_progress" | "passed" | "failed";

export interface Submission {
  id: string; // ${uid}_${assignmentId}
  userId: string;
  userDisplayName?: string;
  userClassName?: string;
  userEmail?: string;
  assignmentId: string;
  code: string;
  status: SubmissionStatus;
  lastExecutedOutput: string;
  passedCount?: number;
  totalCount?: number;
  updatedAt: string;
}

export interface TestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  passed: boolean;
  isHidden: boolean;
  durationMs: number;
}

export type ConsoleLogType =
  | "stdout"
  | "stderr"
  | "system"
  | "stdin-prompt"
  | "stdin-echo"
  | "success";

export interface ConsoleEntry {
  id: string;
  type: ConsoleLogType;
  text: string;
  timestamp: string;
}

export type PyodideEngineState =
  | "initializing"
  | "ready"
  | "running"
  | "awaiting_input"
  | "error";
