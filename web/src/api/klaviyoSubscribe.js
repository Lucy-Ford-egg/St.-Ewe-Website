// // src/api/klaviyoSubscribe.js
// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*")

//   res.setHeader("Access-Control-Allow-Origin", "*") // Allow all origins or specify 'http://localhost:8000'
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")

//   if (req.method === "OPTIONS") {
//     res.status(200).end()
//     return
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" }) // 405 instead of 403
//   }

// }

export default async function handler(req, res) {
  // Allow CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    const { email, marketingConsent } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    // (Optional) Log request for debugging
    console.log("Received request:", { email, marketingConsent })

    // Simulate success response (replace with actual Klaviyo API call)

    console.log(`List ID = ${process.env.GATSBY_KLAVIYO_LIST_ID}`)

    const response = await fetch(
      `https://a.klaviyo.com/api/v2/lists/${process.env.GATSBY_KLAVIYO_LIST_ID}/subscribe/`
      //`https://a.klaviyo.com/api/lists/${process.env.GATSBY_KLAVIYO_LIST_ID}/subscribe/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${process.env.GATSBY_KLAVIYO_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
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
    return res.status(response.status).json(data)

    // return res
    //   .status(200)
    //   .json({ success: true, message: "Subscription successful" })
  } catch (error) {
    console.error("Error in Klaviyo function:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
