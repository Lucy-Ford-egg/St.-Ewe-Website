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

  // const handleSubmit = async e => {
  //   e.preventDefault()

  //   const addResult = await addToMailchimp(email, {
  //     "gdpr[127727]": marketingConsent ? "Y" : "N",
  //   })
  //   setMCResult(addResult)
  // }

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await fetch(
      process.env.NODE_ENV === "development"
        ? `${process.env.GATSBY_FRONTEND}/api/klaviyo-subscribe`
        : `${process.env.GATSBY_FRONTEND}/api/klaviyo-subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          marketingConsent: marketingConsent,
        }),
      },
    )
    debugger
    const result = await response?.json()
    setMCResult(result)
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
          <Box>
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
          </Box>

          {/* GDPR Marketing Permissions */}
          <Box
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
                sx={{
                  color: "white.main",
                }}
              />
            </FormGroup>
          </Box>

          {/* Legal Information */}
          <Box>
            <Typography
              variant="small"
              sx={{
                color: "white.main",
                textAlign: "left",
                display: "block",
              }}
            >
              By subscribing, you acknowledge your information will be
              transferred to Klaviyo for processing.{" "}
              <Link
                href="https://www.klaviyo.com/legal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </Link>
            </Typography>
          </Box>

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
          <Typography variant="body1" marginRight={1}>
            {MCResult.msg}
          </Typography>
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
          {MCResult.msg
            ? MCResult.msg
            : "There has been a problem. Please try again later."}
        </Typography>
      )}
    </Wrapper>
  )
}

export default MailChimp
