"use client";

import { useState } from "react";
import Start from "./components/start";
import QuizCard from "./components/quizCard";
import Result from "./components/result";
import quizdata from "./data/quizData.json";

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setShowResult(false);
  };

  const handleShowResult = (score: number) => {
    setFinalScore(score);
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(true);
    setShowResult(false);
    setFinalScore(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {!quizStarted ? (
        <Start
          quizName="General Knowledge Quiz"
          questionCount={quizdata.length}
          onStartQuiz={handleStartQuiz}
        />
      ) : showResult ? (
        <Result
          score={finalScore}
          totalQuestions={3}
          onRestartQuiz={handleRestartQuiz}
        />
      ) : (
        <QuizCard onShowResult={handleShowResult} />
      )}
    </div>
  );
}