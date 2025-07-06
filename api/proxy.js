export default async function handler(req, res) {
  console.log("we are hereeee");

  console.log("in proxy,js ", process.env.OPENROUTER_KEY);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
          "HTTP-Referer":
            req.headers.referer || "https://ai-chatbot-hnou.vercel.app",
          "X-Title": "ai-chatbot-hnou",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
