import { connectDB } from '@/app/lib/db';
import Hero from '@/app/models/Hero';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Hero.findOne({}).lean();
  return NextResponse.json({ success: true, message: "Hero Data Fetched", data });
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {name,slug, socialLinks,resume } = body;
    if (!name || !slug  || socialLinks.length <= 0 || !resume) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }
    const updatedHero = await Hero.findOneAndUpdate(
      {},
      {
        name,
        slug,
        socialLinks: {
          facebook: socialLinks.facebook,
          twitter: socialLinks.twitter,
          linkedin: socialLinks.linkedin,
          github: socialLinks.github,
        },
        resume,
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