import { NextResponse } from 'next/server';
import axios from 'axios';
import Groq from "groq-sdk";

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

        const result_venice = await ChatByVenice(query);
        const result_groq = await ChatByGroq(query);
        // result_venice ? return result_venice : return result_groq
        if (result_venice.status === 200) {
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

async function ChatByVenice(q: string) {
    try {
        // Call Venice API directly within the POST handler
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
        const veniceResponse = await axios.post(
            "https://venice.ai/api/inference/chat",
            {
                prompt: [
                    {
                        content: "you are the best search enginge answer accrodingly to my queires,Create a personalized search experience by using machine learning to tailor results based on individual user preferences and interests",
                        role: "user"
                    },
                    {
                        content: "ok sure!",
                        role: "assistant"
                    },
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

        if (veniceResponse.status !== 200) {
            return NextResponse.json(
                { status: veniceResponse.status, headers: { 'Content-Type': 'application/json' }, error: `Venice API request failed with status ${veniceResponse.status}` }
            );
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
async function ChatByGroq(q: string) {
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
