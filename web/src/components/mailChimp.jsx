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
  FormLabel,
} from "@mui/material"
import { styled } from "@mui/material/styles"

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
  const [marketing, setMarketing] = useState({
    email: false,
    customisedOnlineAdvertising: false,
  })

  // 2. via `async/await`
  const handleSubmit = async e => {
    e.preventDefault()

    const addResult = await addToMailchimp(e.currentTarget[0].value)
    // I recommend setting `result` to React state
    // but you can do whatever you want

    setMCResult({ MCResult, ...addResult })
  }

  const handleChange = event => {
    setMarketing(...marketing, { [event.target.name]: event.target.checked })
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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={e => handleSubmit(e)}
          sx={{ display: "flex", width: "100%" }}
        >
          <FormControl
            sx={{
              width: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "center", md: "center" },
              flexDirection: { xs: "column", sm: "column" },
              columnGap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                columnGap: "var(--ms2)",
                width: "100%",
                marginBottom: "var(--ms0)",
              }}
            >
              <InputWrapper sx={{ width: "100%" }}>
                <TextField
                  id="email"
                  disableUnderline={true}
                  variant="filled"
                  color="white"
                  InputProps={{
                    disableUnderline: true,
                    fullWidth: true,
                    hiddenLabel: true,
                  }}
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "white.main",
                    borderColor: "white",
                    width: "inherit",
                    minWidth: { xs: "100%", sm: 307 },
                    mb: { xs: 0, sm: 0 },
                  }}
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                />
                <MyFormHelperText />
              </InputWrapper>

              <FormControlLabel
                required
                control={<Checkbox sx={{ color: "background.main" }} />}
                label="Join the flock opt-in"
                sx={{ color: "background.main", flexBasis: "50%" }}
                name="opt-in"
                labelPlacement="end"
              />
            </Box>

            <FormControl
              sx={{
                rowGap: "var(--ms-2)",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              component="fieldset"
              variant="standard"
            >
              {/* <Typography
                variant="body1"
                sx={{ color: "background.main", textAlign: "left" }}
              >
                St Ewe Free Range Eggs will use the information you provide to
                stay in touch and provide company updates, latest news and
                marketing. Please let us know the way(s) you would like to hear
                from us:
              </Typography> */}
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexBasis: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "background.main",
                    textAlign: "left",
                    flexBasis: "100%",
                  }}
                >
                  How would you like to hear from us?
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={marketing?.email}
                      onChange={handleChange}
                      name="email"
                      sx={{ color: "background.main" }}
                    />
                  }
                  label="Email"
                  sx={{ color: "background.main" }}
                  labelPlacement="end"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={marketing?.customisedOnlineAdvertising}
                      onChange={handleChange}
                      name="customisedOnlineAdvertising"
                      sx={{ color: "background.main" }}
                    />
                  }
                  label="Customised online advertising"
                  labelPlacement="end"
                  sx={{ color: "background.main" }}
                />
              </FormGroup>
              <FormHelperText
                sx={{
                  color: "background.main",
                  fontSize: "var(--ms-1)",
                  flexBasis: "100%",
                }}
              >
                You can change your mind at any time by clicking the unsubscribe
                link in the footer of the email you receive from us, or by
                contacting our Marketing Department at marketing@stewe.co.uk.
                For more information about our privacy practices please visit
                our website. By submitting, you agree that we may process your
                information in accordance with these terms.
              </FormHelperText>
            </FormControl>

            <Signup
              sx={{ my: { xs: 3, sm: 6 } }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Signup
            </Signup>
          </FormControl>
        </Box>
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
