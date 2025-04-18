import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = req.body
  console.log(body)

  return NextResponse.json({ message: "Hello World" });
}
