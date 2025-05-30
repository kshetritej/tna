import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ doctorId: string }>
export async function GET(request: NextRequest, {params}: { params: Params }) {
  const { doctorId } = (await params)
  const appointment = await prisma.appointment.findMany({
    where: {
      OR: [
        { doctorId: parseInt(doctorId) },
        { patientId: parseInt(doctorId) }
      ]
    },
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
    orderBy:{
      start: 'desc'
    }
  })
  return NextResponse.json(appointment)
}