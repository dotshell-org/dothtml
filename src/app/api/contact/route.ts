import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        // Here you would normally handle the data (e.g., save to DB, send email, etc.)
        // For now, just return success
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Message id is required." }, { status: 400 });
        }
        // Here you would normally delete the message from your DB
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
}
