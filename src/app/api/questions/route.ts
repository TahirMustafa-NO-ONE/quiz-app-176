import { NextResponse } from "next/server";
import { getFallbackQuestions, normalizeTriviaQuestions } from "../../lib/quiz";

const QUESTION_COUNT = 5;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const categoryParam = category ? `&category=${category}` : "";

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${QUESTION_COUNT}&type=multiple${categoryParam}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Trivia API failed with ${response.status}`);
    }

    const data = await response.json();
    const questions = normalizeTriviaQuestions(data.results ?? []);

    if (questions.length === 0) {
      throw new Error("Trivia API returned no questions");
    }

    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ questions: getFallbackQuestions() });
  }
}
