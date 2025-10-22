import fetch from "node-fetch";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "POST required" });
  }

  try {
    const { body } = req;
    const response = await fetch(process.env.MAKE_INTAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await response.text();
    return res.status(200).json({ ok: true, forwarded: response.status, result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
