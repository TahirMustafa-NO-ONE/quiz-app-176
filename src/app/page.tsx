"use client";

import { useState } from "react";
import Start from "./components/start";
import QuizCard from "./components/quizCard";
import Result from "./components/result";
import { getFallbackQuestions } from "./lib/quiz";
import type { QuizQuestion } from "./types/quiz";

const QUESTION_COUNT = 5;

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>(getFallbackQuestions());
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const fetchQuestions = async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/questions", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load questions");
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch {
      setQuestions(getFallbackQuestions());
      setLoadError("Could not load fresh questions, so the local quiz set was used.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    await fetchQuestions();
    setQuizStarted(true);
    setShowResult(false);
  };

  const handleShowResult = (score: number) => {
    setFinalScore(score);
    setShowResult(true);
  };

  const handleRestartQuiz = async () => {
    await fetchQuestions();
    setQuizStarted(true);
    setShowResult(false);
    setFinalScore(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {!quizStarted ? (
        <Start
          quizName="General Knowledge Quiz"
          questionCount={QUESTION_COUNT}
          onStartQuiz={handleStartQuiz}
        />
      ) : showResult ? (
        <Result
          score={finalScore}
          totalQuestions={questions.length}
          onRestartQuiz={handleRestartQuiz}
        />
      ) : (
        <div className="w-full">
          {loadError ? (
            <p className="mb-4 text-center text-sm text-amber-700">{loadError}</p>
          ) : null}
          {isLoading ? (
            <div className="text-center text-gray-700">Loading fresh questions...</div>
          ) : (
            <QuizCard onShowResult={handleShowResult} questions={questions} />
          )}
        </div>
      )}
    </div>
  );
}
