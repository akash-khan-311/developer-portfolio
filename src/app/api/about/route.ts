import { connectDB } from "@/lib/db";
import About from "@/models/About.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await About.findOne({}).lean();
  return NextResponse.json({
    success: true,
    message: "About Data Fetched",
    data,
  });
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { description, profileImage } = body;
    if (!description || !profileImage) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }
    const updatedAbout = await About.findOneAndUpdate(
      {},
      {
        description,
        profileImage,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(updatedAbout, { status: 200 });
  } catch (error) {
    console.error("About update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
