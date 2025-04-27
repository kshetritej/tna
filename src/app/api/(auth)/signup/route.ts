import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name } = body;

  const emailExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (emailExist) throw new Error("Email already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  if (!newUser) return NextResponse.json({ message: "Error creating user" })

  return NextResponse.json({ message: "Account created successfully. Please login." })
}
