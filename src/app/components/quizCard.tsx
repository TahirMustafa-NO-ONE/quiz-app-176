"use client";

import React, { useState, useEffect } from "react";
import quizData from "../data/quizData.json";

interface QuizCardProps {
  onShowResult: (score: number) => void;
}

export default function QuizCard({ onShowResult }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 10 seconds
  const [answered, setAnswered] = useState(false); // Tracks if the user has answered the question
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Tracks the selected option

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      setAnswered(true); // Mark the question as answered
    }
  }, [timeLeft, answered]);

  const handleAnswer = (index: number) => {
    if (!answered) {
      setSelectedOption(index); // Set the selected option
      if (index === quizData[currentQuestion].correct) {
        setScore(score + 10);
      }
      setAnswered(true); // Mark the question as answered
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10); 
      setAnswered(false); 
      setSelectedOption(null); 
    }
  };

  const handleSeeResult = () => {
    onShowResult(score);
  };

  return (
    <div className="relative w-full max-w-3xl bg-blue-50 rounded-lg shadow-2xl sm:w-4/5 mx-4 sm:mx-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-white p-4 rounded-t-lg">
        <h2 className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
          General Knowledge Quiz
        </h2>

        <div className="flex space-x-4 text-gray-700 mt-2 sm:mt-0">
          <div className="relative flex items-center">
            {timeLeft === 0 && (
              <span className="text-xs text-white bg-red-400 px-2 py-1 rounded-xl">
                Times out!
              </span>
            )}
            <div className="relative w-8 h-8">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="blue"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="grey"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 14}
                  strokeDashoffset={(2 * Math.PI * 14 * timeLeft) / 10}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                  style={{
                    transition: "stroke-dashoffset 1s linear",
                  }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {timeLeft}s
              </span>
            </div>
          </div>
          <span className="px-2 py-1 text-sm sm:text-base">
            {currentQuestion + 1} of {quizData.length}
          </span>
          <span className="bg-green-100 text-gray-800 px-2 py-1 rounded-lg text-xs sm:text-sm">
            Score: {score}
          </span>
        </div>
      </div>

      <div className="my-8 flex justify-center">
        <h2 className="text-base sm:text-xl font-semibold text-center">
          {quizData[currentQuestion].question}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 px-6">
        {quizData[currentQuestion].options.map((option, index) => {
          let optionClass =
            "py-2 px-4 rounded-lg shadow bg-white ring-2 ring-blue-300 hover:bg-blue-100 hover:ring-2 hover:ring-blue-500";
          if (answered) {
            if (index === quizData[currentQuestion].correct) {
              optionClass =
                "py-2 px-4 rounded-lg shadow bg-green-100 ring-2 ring-green-500";
            } else if (
              index === selectedOption &&
              index !== quizData[currentQuestion].correct
            ) {
              optionClass =
                "py-2 px-4 rounded-lg shadow bg-red-100 ring-2 ring-red-500";
            } else {
              optionClass =
                "py-2 px-4 rounded-lg shadow bg-gray-100 text-gray-400 ring-2 ring-gray-300 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={optionClass}
              disabled={answered} 
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="flex justify-center">
          {currentQuestion < quizData.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-blue-800 ring-2 ring-black text-white rounded hover:bg-blue-600"
            >
              Next ➤
            </button>
          ) : (
            <button
              onClick={handleSeeResult}
              className="mt-4 px-4 py-2 bg-blue-800 ring-2 ring-black text-white rounded hover:bg-blue-600"
            >
              See Result
            </button>
          )}
        </div>
      )}

      {answered && (
        <div className="bg-blue-50 border-t-2 border-blue-200 rounded-b-lg p-4 flex justify-center mt-7 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lightbulb mr-2"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
          <div className="text-gray-500 text-sm sm:text-base">
            The Correct Answer is:{" "}
            {quizData[currentQuestion].options[
              quizData[currentQuestion].correct
            ]}
          </div>
        </div>
      )}
    </div>
  );
}