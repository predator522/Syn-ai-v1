export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const HF_API_KEY = process.env.HF_API_KEY;
    const HF_MODEL = "microsoft/DialoGPT-medium";

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: message }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `Hugging Face API error: ${text}` });
    }

    const data = await response.json();
    const aiResponse = data[0]?.generated_text || JSON.stringify(data, null, 2);

    return res.status(200).json({ reply: aiResponse });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
