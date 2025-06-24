import { connectDB } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import Project from '../../models/project.model';
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, image, codeLink, liveLink, technologies } =
      body;
    if (
      !title ||
      !description ||
      !image ||
      !codeLink ||
      !liveLink ||
      technologies.length < 0
    ) {
      return NextResponse.json(
        { error: 'Invalid data. Required fields missing.' },
        { status: 400 }
      );
    }

    const existingExperience = await Project.findOne({ title });
    if (existingExperience) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'Project with this company already exists.',
      });
    }
    const updatedExperience = await Project.create({
      title,
      description,
      image,
      codeLink,
      liveLink,
      technologies,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Project Created Successfully',
      data: updatedExperience,
    });
  } catch (error) {
    console.error('Project Create failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const data = await Project.find({}).lean();
    return NextResponse.json({status: 200 , success: true, message: 'Projects Fetched', data });
  } catch (error) {
    console.error('Project Create failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
