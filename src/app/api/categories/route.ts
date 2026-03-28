import { NextResponse } from "next/server";
import { fallbackCategories, normalizeTriviaCategories } from "../../lib/quiz";

export async function GET() {
  try {
    const response = await fetch("https://opentdb.com/api_category.php", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Category API failed with ${response.status}`);
    }

    const data = await response.json();
    const categories = normalizeTriviaCategories(data);

    if (categories.length === 0) {
      throw new Error("Category API returned no categories");
    }

    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ categories: fallbackCategories });
  }
}
