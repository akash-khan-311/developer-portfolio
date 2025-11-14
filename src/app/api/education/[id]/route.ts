import { connectDB } from "@/lib/db";
import Education from "@/models/education.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Education.find({}).lean();
  return NextResponse.json({
    success: true,
    message: "Education Data Fetched",
    data,
  });
}
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const payload = await req.json();
    const { school, degree, passYear, admitYear } = payload;
    if (!school || !degree || !passYear || !admitYear) {
      return NextResponse.json(
        { error: "Invalid data. Required fields missing." },
        { status: 400 }
      );
    }
    const updatedEducation = await Education.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
    });

    return NextResponse.json(updatedEducation, { status: 200 });
  } catch (error) {
    console.error("Education update failed:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }
    const result = await Education.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Education Deleted Successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete Education failed:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
