import pdfCurriculumData from "./pdfCurriculum.json";
import rawQuizzesData from "./quizzesData.json";
import { QuizQuestion } from "../types/ide";

export interface LessonTopic {
  id: string;
  code: string; // e.g. "BÀI 16"
  glyph: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  keyPointsVi: string[];
  theoryMarkdownVi: string;
  theoryMarkdownEn: string;
  sampleCode: string;
  sampleOutput: string[];
}

export const PYTHON_CURRICULUM_LESSONS: LessonTopic[] =
  pdfCurriculumData as LessonTopic[];

export const LESSON_QUIZZES: Record<string, QuizQuestion[]> =
  rawQuizzesData as Record<string, QuizQuestion[]>;
