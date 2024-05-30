import { NextResponse } from "next/server";

interface SearchRequestBody {
  keywords: string;
  result?: number;
}

interface TextResponse {
  data: any;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SearchRequestBody = await req.json();
    const { keywords, result = 20 } = json;

    if (!keywords) {
      return NextResponse.json(
        { error: "Keywords are required" },
        { status: 400 }
      );
    }

    const base_url = `${process.env.ZKSEARCH_BACKEND}/api/search/query`;

    const textResponse = await fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: keywords,
        max_results: result,
      }),
    });

    if (!textResponse.ok) {
      throw new Error(
        `Error: ${textResponse.status}\n${textResponse.statusText}`
      );
    }

    const results: TextResponse = await textResponse.json();

    return NextResponse.json(
      { data: results },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching Duckduckgo Query Search :", error);

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
