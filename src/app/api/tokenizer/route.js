import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SECRET_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(request) {
  try {
    console.log("tes")
    const { id, productName, price } = await request.json();

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: price * 1000, // assuming price is in thousands
      },
      item_details: [
        {
          id,
          name: productName,
          price: price * 1000,
          quantity: 1,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    console.log("✅ Midtrans Token:", transaction.token);
    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("🔥 Midtrans Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
