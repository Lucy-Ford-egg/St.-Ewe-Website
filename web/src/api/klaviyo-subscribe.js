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

    // Log incoming request for debugging
    console.log("Received request:", { email, marketingConsent })

    // Ensure environment variables exist
    const LIST_ID = process.env.KLAVIYO_LIST_ID
    const SITE_ID = process.env.KLAVIYO_SITE_ID
    const API_KEY = process.env.KLAVIYO_KEY

    if (!LIST_ID || !SITE_ID || !API_KEY) {
      console.error("Missing required environment variables")
      return res.status(500).json({ error: "Server configuration error" })
    }

    // Construct the request body dynamically
    const requestBody = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email, // Ensure this field is present
              },
            },
          },
          subscriptions: {
            email: {
              marketing: {
                consent: marketingConsent ? "SUBSCRIBED" : "UNSUBSCRIBED",
              },
            },
            sms: {
              marketing: {
                consent: "UNSUBSCRIBED",
              },
              transactional: {
                consent: "UNSUBSCRIBED",
              },
            },
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: process.env.KLAVIYO_LIST_ID, // Ensure this is set
            },
          },
        },
      },
    }

    // Send request to Klaviyo API
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions?company_id=${SITE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${API_KEY}`,
          "Content-Type": "application/vnd.api+json",
          Accept: "application/json",
          Revision: "2023-10-15",
        },
        body: JSON.stringify(requestBody),
      },
    )

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Klaviyo API error:", responseData)
      return res.status(response.status).json({
        error: "Failed to subscribe user",
        details: responseData,
      })
    }

    console.log("Klaviyo API success:", responseData)
    return res.status(200).json({ success: true, data: responseData })
  } catch (error) {
    console.error("Error in Klaviyo function:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
