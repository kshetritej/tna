import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{ id: string }>
export async function PATCH(_request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  const doctor = await prisma.user.findUnique({
    where: { id: parseInt(id), isDoctor: true },
  });

  if (!doctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }

  const updatedDoctor = await prisma.user.update({
    where: { id: parseInt(id), isDoctor: true },
    data: { isVerified: true },
  });

  if (!updatedDoctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Doctor verified successfully" }, { status: 200 });
}