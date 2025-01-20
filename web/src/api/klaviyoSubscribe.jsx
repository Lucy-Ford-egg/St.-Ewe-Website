// src/api/klaviyoSubscribe.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, marketingConsent } = req.body

    try {
      const response = await fetch(
        `https://a.klaviyo.com/api/v2/list/${process.env.GATSBY_KLAVIYO_LIST_ID}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: process.env.GATSBY_KLAVIYO_PRIVATE_KEY, // Use a secure private key
            profiles: [
              {
                email,
                consent: marketingConsent ? ["email"] : [],
              },
            ],
          }),
        },
      )

      const data = await response.json()
      res.status(response.status).json(data)
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe user" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
