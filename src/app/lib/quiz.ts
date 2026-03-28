import fallbackQuestions from "../data/quizData.json";
import type { QuizQuestion } from "../types/quiz";

interface OpenTriviaResponse {
  response_code: number;
  results: Array<{
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
}

const decodeHtml = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
};

export const getFallbackQuestions = () => shuffle(fallbackQuestions as QuizQuestion[]);

export const normalizeTriviaQuestions = (
  results: OpenTriviaResponse["results"]
): QuizQuestion[] =>
  results.map((item) => {
    const correctAnswer = decodeHtml(item.correct_answer);
    const options = shuffle([
      correctAnswer,
      ...item.incorrect_answers.map(decodeHtml),
    ]);

    return {
      question: decodeHtml(item.question),
      options,
      correct: options.indexOf(correctAnswer),
    };
  });
