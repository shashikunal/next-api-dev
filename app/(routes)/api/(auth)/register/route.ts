import prisma from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/*----------------------REGISTER --------------------------*/
export async function POST(request: NextRequest) {
  try {
    let { name, email } = await request.json();
    const data = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(
      { data, message: "successfully registered" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
