import { NextResponse } from 'next/server';
import { client } from '@/src/lib/anon';

export async function POST(req: Request) {
    try {
        const json = await req.json();

        const { query } = json;

        if (!query) {
            return NextResponse.json(
                { error: 'Queries are required' },
                { status: 400 }
            );
        }

        // const base_url = 'https://api.bing.com/osjson.aspx'
        const base_url = `${process.env.ZKSEARCH_BACKEND}/api/search/suggestion`;

        const params = new URLSearchParams({
            q: query,
        });

        const url = `${base_url}?${params.toString()}`;
        const response = await client.get(url);

        if (response.status !== 200 || response.data === null) {
            throw new Error(`Error: ${response.status}\n${response.statusText}`);
        }

        const results = response.data.map((data: any)=> data["phrase"]);

        return NextResponse.json(
            { data: results },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Error fetching Suggestion data:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}