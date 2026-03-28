export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizCategory {
  id: number;
  name: string;
}
