import React, { useMemo, useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import {
  Typography,
  Button,
  FormHelperText,
  Box,
  TextField,
  useFormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Link,
} from "@mui/material"

import { styled } from "@mui/material/styles"
import { Link as GatsbyLink } from "gatsby-theme-material-ui"
import FormControl from "@mui/material/FormControl"
import CheckIcon from "@mui/icons-material/Check"

const Wrapper = styled("form")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const InputWrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    "& .MuiInputBase-root": {
      marginTop: 0,
    },
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const Signup = styled(Button)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    minWidth: 131,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

export const MailChimp = () => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  const [MCResult, setMCResult] = useState(null)

  // 2. via `async/await`
  const handleSubmit = async e => {
    e.preventDefault()
    debugger
    const addResult = await addToMailchimp(e.currentTarget[0].value, {
      "gdpr[127727]": e.currentTarget[1].value,
    })
    // I recommend setting `result` to React state
    // but you can do whatever you want

    setMCResult({ MCResult, ...addResult })
  }

  function MyFormHelperText() {
    const { focused } = useFormControl() || {}

    const helperText = useMemo(() => {
      if (focused) {
        return "Don't worry, we won't spam you"
      }

      return ""
    }, [focused])

    return (
      <FormHelperText sx={{ color: "var(--rich-yolk-secondary)" }}>
        {helperText}
      </FormHelperText>
    )
  }
  return (
    <Wrapper>
      {!MCResult && (
        <FormControl
          noValidate
          autoComplete="off"
          onSubmit={e => handleSubmit(e)}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: { xs: "center", md: "center" },
            flexDirection: { xs: "column", sm: "column" },
            columnGap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              columnGap: "var(--ms2)",
              width: "100%",
              marginBottom: "var(--ms0)",
            }}
          >
            <InputWrapper sx={{ width: "100%", flexBasis: "100%" }}>
              <TextField
                id="mce-EMAIL"
                name="EMAIL"
                label="Email Address"
                type="email"
                required
                disableUnderline={true}
                variant="filled"
                color="white"
                InputProps={{
                  disableUnderline: true,
                  fullWidth: true,
                  hiddenLabel: true,
                }}
                sx={{
                  border: "none",
                  backgroundColor: "white.main",
                  borderColor: "white",
                  width: "inherit",
                  minWidth: { xs: "100%", sm: 307 },
                  mb: { xs: 0, sm: 0 },
                  fontSize: "var(--ms0)",
                }}
                placeholder="Enter your email address"
              />
              <MyFormHelperText />
            </InputWrapper>
          </Box>
          {/* GDPR Marketing Permissions */}
          <Box marginTop={2}>
            <FormControl
              required
              sx={{
                color: "white.main",
                display: "flex",
                flexDirection: "row",
                columnGap: "var(--ms2)",
              }}
            >
              <Typography
                variant="small"
                gutterBottom
                sx={{
                  color: "white.main",
                  flexBasis: "80%",
                  textAlign: "left",
                }}
              >
                Please select all the ways you would like to hear from St Ewe
                Free Range Eggs:
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="gdpr_127727"
                      name="gdpr[127727]"
                      sx={{
                        color: "white.main",
                      }}
                    />
                  }
                  label="Email"
                  sx={{
                    color: "white.main",
                    display: "flex",
                    flexDirection: "row",
                  }}
                />
              </FormGroup>
            </FormControl>
            <Typography
              variant="small"
              gutterBottom
              sx={{
                color: "white.main",
                textAlign: "left",
                display: "block",
                fontSize: "var(--ms-1)",
              }}
            >
              You can unsubscribe at any time by clicking the link in the footer
              of our emails. For information about our privacy practices, please
              visit our{" "}
              <GatsbyLink to="/privacy-policy">privacy policy</GatsbyLink>.
            </Typography>
          </Box>

          {/* Legal Information */}
          <Box marginTop={2}>
            <Typography
              variant="small"
              sx={{
                color: "white.main",
                textAlign: "left",
                display: "block",
                fontSize: "var(--ms-1)",
              }}
            >
              We use Mailchimp as our marketing platform. By clicking below to
              subscribe, you acknowledge that your information will be
              transferred to Mailchimp for processing.{" "}
              <Link
                href="https://mailchimp.com/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white.main",
                }}
              >
                Learn more
              </Link>{" "}
              about Mailchimp's privacy practices.
            </Typography>
          </Box>

          <Signup
            sx={{ my: { xs: 3, sm: 6 } }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Signup
          </Signup>
        </FormControl>
      )}
      {MCResult?.result === "success" && (
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              textAlign: "cnter",
              pr: { xs: 4, md: 4 },
              py: { xs: 4, md: 4 },
            }}
            variant="body1"
            component="p"
          >
            {MCResult.msg}
          </Typography>
          <CheckIcon
            sx={{
              color: "primary.main",
            }}
          />
        </Box>
      )}
    </Wrapper>
  )
}
