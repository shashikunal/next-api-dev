import prisma from "@/_lib/prisma";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

//fetch single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Post id is required" },
        { status: 400 }
      );
    }
    const singlePost = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(
      { success: true, data: singlePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

//update POST
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Post id is required" },
        { status: 400 }
      );
    }
    const { title, content, published } = await request.json();
    const updatedData = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "posts updated successfully",
        data: updatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

//delete POST
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Post id is required" },
        { status: 400 }
      );
    }
    const deletePost = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
