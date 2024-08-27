import prisma from "@/_lib/prisma";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

//fetch All Posts
export async function GET() {
  try {
    const data = await prisma.post.findMany({
      //where
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Inter server error", { status: 500 });
  }
}
