import { connectDB } from "@/lib/db";
import Skill from "@/models/skills.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Skill.find({}).lean();
  return NextResponse.json({
    success: true,
    message: "Skills Data Fetched",
    data,
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, icon } = body;
    if (!name || !icon) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }

    const existingExperience = await Skill.findOne({ name });
    if (existingExperience) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "This Skill Already Added.",
      });
    }
    const result = await Skill.create({
      name,
      icon,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Skill Created Successfully",
      data: result,
    });
  } catch (error) {
    console.error("Experience Create failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
