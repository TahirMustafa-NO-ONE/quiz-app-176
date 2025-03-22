"use client";

import React from "react";

interface CardProps {
  quizName: string;
  questionCount: number;
  onStartQuiz: () => void;
}

export default function Start({
  quizName,
  questionCount,
  onStartQuiz,
}: CardProps) {
  return (
    <div
      className="relative w-full h-screen sm:max-w-4xl sm:h-[600px] lg:rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
      style={{
      backgroundImage: `url("https://images.stockcake.com/public/3/c/9/3c950319-8462-4930-81a8-254eb2e07e5b_large/collective-brainstorm-session-stockcake.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey", // Fallback background color
      }}
    >
      <div
      className="absolute inset-0"
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-60 w-11/12 sm:w-96 bg-white bg-opacity-90 rounded-lg p-6 mx-auto ring-3 ring-black shadow-lg">
      <h2 className="font-bold text-center text-2xl sm:text-3xl mb-4">{quizName}</h2>
      <button
        onClick={onStartQuiz}
        className="font-semibold text-lg sm:text-2xl px-4 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white rounded hover:bg-blue-600 w-full ring-2 ring-black"
      >
        Start
      </button>
      <div className="flex justify-between w-full mt-4 text-xs sm:text-sm text-gray-600">
        <span>{questionCount} Questions</span>
      </div>
      </div>
    </div>
  );
}