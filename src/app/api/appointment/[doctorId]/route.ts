import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { doctorId: string } }) {
  const { doctorId } = await params
  const appointment = await prisma.appointment.findMany({
    where: { doctorId: parseInt(doctorId) },
    include: {
      patient: {
        select: {
          name: true,
          email: true,
        },
      },
      doctor: {
        select: {
          name: true,
          email: true,
          qualification: true,
          experience: true,
          isVerified: true,
          isDoctor: true,
        },
      },
    },
  })
  return NextResponse.json(appointment)
}