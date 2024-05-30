import { NextResponse } from "next/server";
import { client } from "@/src/lib/anon";

interface SearchRequestBody {
  keywords: string;
  result?: number;
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

    const response = await client.post(base_url, {
      keywords: keywords,
      max_results: result,
    })

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}\n${response.statusText}`);
    }

    return NextResponse.json(
      { data: response.data },
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
