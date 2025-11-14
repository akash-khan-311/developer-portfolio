import { TEducation } from "@/Interface/education.interface";
import { connectDB } from "@/lib/db";
import Education from "@/models/education.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const payload: TEducation = await req.json();
    const { school, degree, passYear, admitYear } = payload;
    if (!school || !degree || !passYear || !admitYear) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }

    const existingEducation = await Education.findOne({ degree });
    if (existingEducation) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "This Degree already exists. Please Add Another",
      });
    }
    const updatedEducation = await Education.create(payload);

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Education Created Successfully",
      data: updatedEducation,
    });
  } catch (error) {
    console.error("Education Create failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const data = await Education.find({}).lean();
    return NextResponse.json({
      success: true,
      message: "Education Data Fetched",
      data,
    });
  } catch (error) {
    console.error("Education Create failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
