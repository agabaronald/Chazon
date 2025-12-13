import { prisma } from "@/lib/prisma"
import { verifyTransaction } from "@/lib/flutterwave"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const tx_ref = searchParams.get('tx_ref')
  const transaction_id = searchParams.get('transaction_id')

  if (status !== 'successful' && status !== 'completed') {
    return NextResponse.redirect(new URL('/bookings?payment=failed', req.url))
  }

  if (!tx_ref || !transaction_id) {
    return NextResponse.json({ error: "Invalid callback params" }, { status: 400 })
  }

  try {
    const flwData = await verifyTransaction(transaction_id)
    
    if (flwData.status === 'success') {
       // Update DB
       const updatedTransaction = await prisma.transaction.update({
         where: { id: tx_ref },
         data: {
           status: 'COMPLETED',
           providerTransactionId: transaction_id,
           paymentMethod: flwData.data.payment_type,
           metadata: flwData.data,
         }
       })
       
       // Update Task status to ASSIGNED or IN_PROGRESS if needed
       // For now, we just mark transaction as completed.
       
       return NextResponse.redirect(new URL(`/bookings?payment=success&tid=${updatedTransaction.id}`, req.url))
    }
  } catch (error) {
     console.error("Payment verification error:", error)
  }
  
  return NextResponse.redirect(new URL('/bookings?payment=error', req.url))
}
