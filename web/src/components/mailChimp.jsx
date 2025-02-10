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
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: marketingConsent
                          ? "SUBSCRIBED"
                          : "UNSUBSCRIBED",
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
                id: listId, // Ensure this is set
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

      // If response is OK but no body, handle accordingly
      if (response.ok) {
        const result =
          response.status === 202
            ? { result: "success", msg: "Subscription successful!" }
            : await response.json()
        setMCResult(result)
      } else {
        // Handle errors if the response is not OK
        const result = await response.json()
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
    <Wrapper>
      {!MCResult && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "var(--ms-4)",
          }}
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

          <Box
            display="flex"
            alignItems="center"
            sx={{
              display: "flex",
              columnGap: "var(--ms0)",
              alignItems: "center",
            }}
          >
            <Typography
              variant="small"
              gutterBottom
              sx={{
                color: "white.main",
                textAlign: "left",
                display: "block",
                flexbasis: "80%",
              }}
            >
              Please check the box to confirm how you'd like to hear from us:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={marketingConsent}
                    onChange={e => setMarketingConsent(e.target.checked)}
                    sx={{
                      color: "white.main",
                    }}
                  />
                }
                label="Email"
              />
            </FormGroup>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: "white.main",
              textAlign: "left",
              display: "block",
            }}
          >
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "var(--ms-1)",
              alignSelf: "center",
              px: "var(--ms3)",
            }}
          >
            Signup
          </Button>
        </form>
      )}

      {MCResult?.result === "success" && (
        <Box
          display="flex"
          alignItems="center"
          marginTop={2}
          sx={{
            color: "white.main",
          }}
        >
          <Typography variant="body1">{MCResult.msg}</Typography>
          <CheckIcon color="primary" />
        </Box>
      )}

      {MCResult?.result === "error" && (
        <Typography
          variant="body2"
          color="error"
          marginTop={2}
          sx={{
            color: "white.main",
          }}
        >
          {MCResult.msg || "There has been a problem. Please try again later."}
        </Typography>
      )}
    </Wrapper>
  )
}

export default MailChimp
