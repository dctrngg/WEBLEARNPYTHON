import rawQuizData from "./quizData.json";

export interface QuizQuestion {
  id: string;
  lessonId: string;
  lessonNum: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const ALL_QUIZZES: QuizQuestion[] = rawQuizData as QuizQuestion[];

/**
 * Get quizzes for a specific lesson topic
 */
export function getQuizzesByLessonId(lessonId: string): QuizQuestion[] {
  return ALL_QUIZZES.filter((q) => q.lessonId === lessonId);
}

/**
 * Get quizzes by lesson number (16 to 31)
 */
export function getQuizzesByLessonNum(lessonNum: number): QuizQuestion[] {
  return ALL_QUIZZES.filter((q) => q.lessonNum === lessonNum);
}
