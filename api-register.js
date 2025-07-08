export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, password, referralId } = req.body;

  try {
    const result = await fetch(process.env.SUPABASE_REST_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
      },
      body: JSON.stringify({ name, email, phone, password, referral_id: referralId }),
    });

    const data = await result.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}