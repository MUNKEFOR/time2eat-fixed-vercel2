export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, vendorId, deliveryId, total } = req.body;

  try {
    const orderResult = await fetch(process.env.SUPABASE_REST_URL + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
      },
      body: JSON.stringify({
        user_id: userId,
        vendor_id: vendorId,
        delivery_id: deliveryId,
        total,
        status: "placed"
      })
    });

    const data = await orderResult.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
}