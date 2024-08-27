import prisma from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//Create Post
export async function POST(request: NextRequest) {
  try {
    let { title, content, authorId, published } = await request.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json({
      success: true,
      newPost,
      message: "successfully post added",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
