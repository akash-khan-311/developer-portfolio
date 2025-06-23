
import { TSkills } from '@/app/Interface/skills.interface';
import { connectDB } from '@/app/lib/db';
import Skill from '@/app/models/skills.model';
import { NextRequest, NextResponse } from 'next/server';
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = (await context.params);

  try {
    await connectDB();

    if(!id) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
      );
    }
    const result = await Skill.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Skill Deleted Successfully',
    });
  } catch (error) {
    console.error('Skill Deleted failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = (await context.params);

  try {
    await connectDB();
    const body = await req.json();
    const { name,icon } : TSkills = body;

    if (!name || !icon) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedExperience = await Skill.findByIdAndUpdate(
      id,
      { name,icon },
      { new: true }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Skill updated',
      data: updatedExperience,
    });
  } catch (error) {
    console.error('Update Skill failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
