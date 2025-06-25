import { connectDB } from '@/app/lib/db';
import Experience from '@/app/models/Experience.model';
import Project from '@/app/models/project.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Get single project failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}

// ✅ PATCH update project by ID
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();
    const { payload } = body;
    console.log('Received Payload:', payload);
    if (
      !payload ||
      !payload.title ||
      !payload.description ||
      !payload.image ||
      !payload.codeLink ||
      !payload.liveLink ||
      !payload.technologies
    ) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated',
      data: updatedProject,
    });
  } catch (error) {
    console.error('Update Project failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
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
        message: 'All fields are required',
      });
    }
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project Deleted Successfully',
      data: result,
    });
  } catch (error) {
    console.error('Delete Project failed:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
