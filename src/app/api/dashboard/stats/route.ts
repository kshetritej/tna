import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const [userCount, doctorCount, postCount] = await Promise.all([
      prisma.user.count({
        where: {
          isDoctor: false,
        },
      }),
      prisma.user.count({
        where: {
          isDoctor: true,
        },
      }),
      prisma.post.count(),
    ])

    return NextResponse.json({
      userCount,
      doctorCount,
      postCount,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    )
  }
} 