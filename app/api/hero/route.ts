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
  await connectDB();
  const body = await req.json();

  // ✅ Correct typing here
  const updated = await Hero.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  }).lean(); // 👈 optional, removes mongoose instance overhead

  return NextResponse.json(updated);
}
