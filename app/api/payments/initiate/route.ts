import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { initiatePayment } from "@/lib/flutterwave"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { taskId } = body

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { client: true },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    if (task.clientId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Create Transaction Record
    const transaction = await prisma.transaction.create({
      data: {
        taskId: task.id,
        amount: task.agreedPrice,
        platformFee: task.agreedPrice * 0.1, // 10% platform fee
        currency: task.currency,
        type: "CHARGE",
        status: "PENDING",
      },
    })

    const tx_ref = transaction.id

    const flwResponse = await initiatePayment({
      tx_ref,
      amount: task.agreedPrice.toString(),
      currency: task.currency,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/verify`,
      customer: {
        email: task.client.email,
        name: task.client.name || "Client",
      },
      customizations: {
        title: "Chazon Service Payment",
        description: `Payment for task: ${task.category}`,
        logo: "https://chazon.com/logo.png",
      },
    })

    if (flwResponse.status === "success") {
      return NextResponse.json({ link: flwResponse.data.link })
    } else {
      return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
    }
  } catch (error) {
    console.error("Payment initiation error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
