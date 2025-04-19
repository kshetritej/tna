import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newAppointment = await prisma.appointment.create({
    data: {
      subject: body.subject,
      description: body.description,
      durationInMinutes: body.durationInMinutes,
      start: body.start,
      patientId: body.patientId,
      doctorId: body.doctorId,
      contact: body.contact,
    },
  });

  if (!newAppointment) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }

  return NextResponse.json({ message: "Appointment created", appointment: newAppointment }, { status: 201 });
}