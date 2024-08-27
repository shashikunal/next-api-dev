import prisma from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let data = await prisma.user.findMany({
      include: {
        Post: true,
      },
    });
    return NextResponse.json(
      { data, message: "successfully fetched" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
