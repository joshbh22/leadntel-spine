export default async (req, res) => {
  try {
    const lead = {
      id: `smoke_${Date.now()}`,
      business_name: "Test Ridge Services",
      city: "Ware Shoals",
      zip: "29692",
      category: "Land Clearing"
    };

    const payload = { test: true, lead };
    const response = await fetch(process.env.MAKE_INTAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    return res.status(200).json({ ok: true, forwarded: response.status, response: text });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
