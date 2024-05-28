import { NextResponse } from 'next/server';
import axios from 'axios';
import Groq from "groq-sdk";

export async function GET(req: Request): Promise<Response> {
    try {
        const json = await req.json();
        const { query } = json;
        const result_venice = await ChatByVenice(query);
        const result_groq = await ChatByGroq(query);
        // result_venice ? return result_venice : return result_groq
        if(result_venice.status===200) {
            return result_venice
        } else {
            return result_groq
        }
    } catch (error) {
        console.error('Error proxying request to Venice API:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}

async function ChatByVenice(q:string) {
    try {
        // Call Venice API directly within the POST handler
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
        const veniceResponse = await axios.post(
            "https://venice.ai/api/inference/chat",
            {
                prompt: [
                    {
                        content: q,
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

async function ChatByGroq(q:string) {
    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
        // Call Groq API directly within the POST handler
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: q
                }
            ],
            model: "llama3-8b-8192"
        });

        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data: chatCompletion.choices[0].message.content }
        );
    } catch (error) {
        console.error('Error proxying request to Corcel API:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
