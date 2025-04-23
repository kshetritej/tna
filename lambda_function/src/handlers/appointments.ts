import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAppointment(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body || '{}');

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

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Appointment created", appointment: newAppointment })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create appointment" })
    };
  }
}

export async function getAppointments(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const doctorId = event.pathParameters?.doctorId;

    if (!doctorId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Doctor ID is required" })
      };
    }

    const appointments = await prisma.appointment.findMany({
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
      orderBy: {
        start: 'desc'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(appointments)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch appointments" })
    };
  }
}
