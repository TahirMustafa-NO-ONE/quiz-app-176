"use client";

import { useEffect, useState } from "react";
import Start from "./components/start";
import QuizCard from "./components/quizCard";
import Result from "./components/result";
import { fallbackCategories, getFallbackQuestions } from "./lib/quiz";
import type { QuizCategory, QuizQuestion } from "./types/quiz";

const QUESTION_COUNT = 5;
const DEFAULT_CATEGORY = fallbackCategories[0];

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>(getFallbackQuestions());
  const [categories, setCategories] = useState<QuizCategory[]>(fallbackCategories);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(DEFAULT_CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await response.json();
        const nextCategories = data.categories as QuizCategory[];

        if (nextCategories.length === 0) {
          throw new Error("No categories available");
        }

        setCategories(nextCategories);
        setSelectedCategory((currentCategory) =>
          nextCategories.find((category) => category.id === currentCategory.id) ??
          nextCategories[0]
        );
      } catch {
        setCategories(fallbackCategories);
      }
    };

    void fetchCategories();
  }, []);

  const fetchQuestions = async (categoryId: number) => {
    setIsLoading(true);
    setLoadError("");

    try {
      const response = await fetch(`/api/questions?category=${categoryId}`, {
        cache: "no-store",
      });

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
    await fetchQuestions(selectedCategory.id);
    setQuizStarted(true);
    setShowResult(false);
  };

  const handleShowResult = (score: number) => {
    setFinalScore(score);
    setShowResult(true);
  };

  const handleRestartQuiz = async () => {
    await fetchQuestions(selectedCategory.id);
    setQuizStarted(true);
    setShowResult(false);
    setFinalScore(0);
  };

  const handleGoToStart = () => {
    setQuizStarted(false);
    setShowResult(false);
    setFinalScore(0);
  };

  const handleCategoryChange = (categoryId: number) => {
    const nextCategory = categories.find((category) => category.id === categoryId);

    if (nextCategory) {
      setSelectedCategory(nextCategory);
    }
  };

  const quizName = `${selectedCategory.name} Quiz`;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {!quizStarted ? (
        <Start
          appTitle="MindCheck"
          questionCount={QUESTION_COUNT}
          categories={categories}
          selectedCategoryId={selectedCategory.id}
          onCategoryChange={handleCategoryChange}
          onStartQuiz={handleStartQuiz}
          isLoading={isLoading}
        />
      ) : showResult ? (
        <Result
          score={finalScore}
          totalQuestions={questions.length}
          quizName={quizName}
          onRestartQuiz={handleRestartQuiz}
          onGoToStart={handleGoToStart}
        />
      ) : (
        <div className="w-full">
          {loadError ? (
            <p className="mb-4 text-center text-sm text-amber-700">{loadError}</p>
          ) : null}
          {isLoading ? (
            <div className="text-center text-gray-700">Loading fresh questions...</div>
          ) : (
            <QuizCard
              onShowResult={handleShowResult}
              questions={questions}
              quizName={quizName}
            />
          )}
        </div>
      )}
    </div>
  );
}
