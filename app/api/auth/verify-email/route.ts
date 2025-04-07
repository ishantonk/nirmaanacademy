import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const tokenSchema = z.object({
  token: z.string(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = tokenSchema.parse(json)

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: body.token,
      },
    })

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      return NextResponse.json({ error: "Verification token has expired" }, { status: 400 })
    }

    // Update user's email verification status
    await prisma.user.update({
      where: {
        email: verificationToken.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        token: body.token,
      },
    })

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

