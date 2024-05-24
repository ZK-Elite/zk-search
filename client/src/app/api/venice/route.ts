import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;
        // Call Venice API directly within the POST handler
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
        const veniceResponse = await axios.post(
            "https://venice.ai/api/inference/chat",
            {
                prompt: [
                    {
                        content: query,
                        role: "user"
                    }
                ],
                systemPrompt: "",
                conversationType: "text",
                seed: formattedDate,
                modelId: "hermes-2-theta"
            },
            {
                headers: {
                    'accept': "application/json",
                    'content-type': "application/json",
                },
            }
        );

        if (veniceResponse.status !== 200) {
            throw new Error(`Venice API request failed with status ${veniceResponse.status}`);
        }
        const veniceData = veniceResponse.data;
        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data: veniceData }
        );
    } catch (error) {
        console.error('Error proxying request to Venice API:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}