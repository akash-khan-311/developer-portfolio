import { connectDB } from '@/app/lib/db';
import Experience from '@/app/models/Experience.model';
import { NextRequest, NextResponse } from 'next/server';

// GET single experience by ID
export async function GET(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
  try {
    await connectDB();
    const experience = await Experience.findById(params?.id).lean();

    if (!experience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Get single experience failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

// UPDATE experience by ID
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await connectDB();

    const body = await req.json();
    console.log('Update Experience Body:', body);
    const { company, role, startDate, endDate } = body;

    if (!company || !role || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      params.id,
      { company, role, startDate, endDate },
      { new: true }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Experience updated',
      data: updatedExperience,
    });
  } catch (error) {
    console.error('Update experience failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
