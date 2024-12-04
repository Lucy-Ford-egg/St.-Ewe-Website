import React, { useState, useMemo } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import {
  Typography,
  Button,
  FormHelperText,
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
    debugger
    const addResult = await addToMailchimp(email, {
      "gdpr[127727]": marketingConsent ? "Y" : "N",
    })
    setMCResult(addResult)
  }

  const MyFormHelperText = () => {
    const helperText = useMemo(() => "Don't worry, we won't spam you", [])
    return (
      <FormHelperText
        sx={{
          color: "var(--original-medium)",
        }}
      >
        {helperText}
      </FormHelperText>
    )
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
              id="mce-EMAIL"
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
            <MyFormHelperText />
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
              Please select all the ways you would like to hear from us:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
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
              transferred to Mailchimp for processing.{" "}
              <Link
                href="https://mailchimp.com/legal/terms"
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
          {MCResult.msg}
        </Typography>
      )}
    </Wrapper>
  )
}

export default MailChimp
