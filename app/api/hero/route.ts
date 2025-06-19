import { connectDB } from '@/app/lib/db';
import Hero from '@/app/models/Hero';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  await connectDB();

  // Type-safe with lean()
  const data = await Hero.findOne({}).lean();
  return NextResponse.json({ message: "Hello from Next.js!", data });
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { greet, name, introText, backgroundImage } = body;

    if (!greet || !name || !introText || introText.length < 2) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }

    const updatedHero = await Hero.findOneAndUpdate(
      {},
      {
        greet,
        name,
        introText,
        backgroundImage,
      },
      {
        new: true,
        upsert: true, 
      }
    );

    return NextResponse.json(updatedHero, { status: 200 });
  } catch (error) {
    console.error("Hero update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}