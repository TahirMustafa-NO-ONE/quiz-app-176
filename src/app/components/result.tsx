"use client";

import React, { useEffect, useState } from "react";

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
}

export default function Result({ score, totalQuestions, onRestartQuiz }: ResultProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = (score / (totalQuestions * 10)) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative w-full max-w-2xl bg-blue-100 rounded-lg shadow-2xl mx-4 sm:mx-0">
      <div className="flex justify-center bg-white py-2 rounded-t-lg border-b-2 border-blue-500">
        <span className="text-2xl font-bold">Score</span>
      </div>
      <h2 className="text-2xl font-semibold text-center my-4">General Knowledge Quiz</h2>
      <div className="flex justify-center items-center flex-col">
        <div className="relative w-60 h-60">
          <svg className="w-full h-full" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="blue"
              strokeWidth="3"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={(2 * Math.PI * 22) * (1 - animatedPercentage / 100)}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{
                transition: "stroke-dashoffset 2s ease-in-out",
              }}
            />
          </svg>
          {percentage > 50 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
              <span className="text-lg font-bold bg-blue-800 px-2 py-1 rounded-lg text-white">Congrats!</span>
            </div>
          )}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-6xl font-extrabold text-blue-800">{score / 10}/{totalQuestions}</span>
            <span className="text-sm">{score} points</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={onRestartQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-white text-blue-800 rounded-lg shadow-md ring-2 ring-blue-800 hover:bg-blue-800 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rotate-ccw"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Play Again
        </button>
      </div>
    </div>
  );
}
