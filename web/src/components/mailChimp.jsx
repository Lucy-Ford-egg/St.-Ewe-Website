import React, { useState } from "react"
import {
  Typography,
  Button,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Link,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckIcon from "@mui/icons-material/Check"

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 8,
})

export const MailChimp = () => {
  const [MCResult, setMCResult] = useState(null)
  const [email, setEmail] = useState("")
  const [marketingConsent, setMarketingConsent] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    const companyId = process.env.GATSBY_KLAVIYO_COMPANY_ID
    const listId = process.env.GATSBY_KLAVIYO_LIST_ID

    if (!companyId || !listId) {
      setMCResult({ result: "error", msg: "Missing Klaviyo configuration." })
      return
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        revision: "2025-01-15",
        "content-type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                  properties: {
                    source: "Newsletter Signup",
                  },
                  meta: {
                    patch_properties: {
                      append: {
                        source: "Newsletter Signup",
                      },
                    },
                  },
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: marketingConsent
                          ? "SUBSCRIBED"
                          : "UNSUBSCRIBED",
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
              },
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID, // Ensure this is set
              },
            },
          },
        },
      }),
    }

    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions?company_id=${companyId}`,
        options,
      )
      const result = await response.json()

      if (response.ok) {
        setMCResult({ result: "success", msg: "Subscription successful!" })
      } else {
        setMCResult({
          result: "error",
          msg: result?.errors?.[0]?.detail || "Failed to subscribe.",
        })
      }
    } catch (err) {
      setMCResult({
        result: "error",
        msg: "An error occurred. Please try again later.",
      })
    }
  }

  return (
    <Box>
      {!MCResult && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
        >
          <TextField
            id="klv-EMAIL"
            name="EMAIL"
            label="Email Address"
            type="email"
            required
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            placeholder="Enter your email address"
          />

          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ flex: 1 }}>
              Please check the box to confirm how you'd like to hear from us:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={marketingConsent}
                    onChange={e => setMarketingConsent(e.target.checked)}
                  />
                }
                label="Email"
              />
            </FormGroup>
          </Box>

          <Typography variant="caption">
            By subscribing, you acknowledge your information will be transferred
            to Klaviyo for processing.{" "}
            <Link
              href="https://www.klaviyo.com/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </Link>
          </Typography>

          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </form>
      )}

      {MCResult?.result === "success" && (
        <Box display="flex" alignItems="center" mt={2} color="success.main">
          <Typography variant="body1">{MCResult.msg}</Typography>
          <CheckIcon color="primary" />
        </Box>
      )}

      {MCResult?.result === "error" && (
        <Typography variant="body2" color="error" mt={2}>
          {MCResult.msg || "There has been a problem. Please try again later."}
        </Typography>
      )}
    </Box>
  )
}

export default MailChimp
