"use client";

import React from "react";
import type { QuizCategory } from "../types/quiz";

interface CardProps {
  appTitle: string;
  questionCount: number;
  categories: QuizCategory[];
  selectedCategoryId: number;
  onCategoryChange: (categoryId: number) => void;
  onStartQuiz: () => void | Promise<void>;
  isLoading?: boolean;
}

export default function Start({
  appTitle,
  questionCount,
  categories,
  selectedCategoryId,
  onCategoryChange,
  onStartQuiz,
  isLoading = false,
}: CardProps) {
  return (
    <div
      className="relative w-full h-screen sm:max-w-4xl sm:h-[600px] lg:rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
      style={{
      backgroundImage: `url("https://images.stockcake.com/public/3/c/9/3c950319-8462-4930-81a8-254eb2e07e5b_large/collective-brainstorm-session-stockcake.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey",
      }}
    >
      <div
      className="absolute inset-0"
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-72 w-11/12 sm:w-[28rem] bg-white bg-opacity-90 rounded-lg p-6 mx-auto ring-3 ring-black shadow-lg">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="px-6 py-1 ring-2 ring-black rounded-lg bg-white">quiz mode</span>
      </div>
      <h2 className="font-bold text-center text-2xl sm:text-3xl mb-4">{appTitle}</h2>
      <div className="w-full mb-5">
        <label
          htmlFor="quiz-category"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Choose a topic
        </label>
        <div className="relative">
          <select
            id="quiz-category"
            value={selectedCategoryId}
            onChange={(event) => onCategoryChange(Number(event.target.value))}
            className="w-full appearance-none rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-base text-gray-800 shadow-sm outline-none transition focus:border-blue-500"
            disabled={isLoading}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-blue-800">
            ▼
          </span>
        </div>
      </div>
      <button
        onClick={onStartQuiz}
        className="font-semibold text-lg sm:text-2xl px-4 sm:px-6 py-2 sm:py-3 bg-blue-800 text-white rounded hover:bg-blue-600 w-full ring-2 ring-black disabled:cursor-not-allowed disabled:bg-blue-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Start"}
      </button>
      <div className="flex justify-between w-full mt-4 text-xs sm:text-sm text-gray-600">
        <span>{questionCount} Questions</span>
        <span>{appTitle}</span>
      </div>
      </div>
    </div>
  );
}
