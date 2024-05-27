import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<Response> {
    try {
        // Parse query parameters from the request URL
        const url = new URL(req.url);
        const q = url.searchParams.get('q');

        if (!q) {
            throw new Error("Query parameter 'q' is required");
        }

        const base_url = `${process.env.DUCKDUCKGO_SEARCH_BACKEND_PORT}/api/search/chat`;

        const params = new URLSearchParams({ q: q });

        const fullUrl = `${base_url}?${params.toString()}`;

        const suggestionResponse = await fetch(fullUrl);

        if (!suggestionResponse.ok) {
            throw new Error(`Error: ${suggestionResponse.status}\n${suggestionResponse.statusText}`);
        }

        const responseText = await suggestionResponse.text();
        if (!responseText) {
            throw new Error('Received empty response from the server');
        }

        let results;
        try {
            results = JSON.parse(responseText);
        } catch (error) {
            throw new Error('Failed to parse JSON response: ' + error);
        }

        return NextResponse.json(
            { data: results },
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching Venice ai chat :', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
