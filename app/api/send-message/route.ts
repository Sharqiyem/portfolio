import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(request: NextRequest) {
    console.log({ url: process.env.FORM_FLOW_API_URL, key: process.env.FORM_FLOW_API_KEY });


    try {
        const formData = await request.json();
        console.log('Form Data:', formData);

        const response = await fetch(process.env.FORM_FLOW_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FORM_FLOW_API_KEY}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return NextResponse.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}