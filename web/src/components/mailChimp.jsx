import React, { useMemo, useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import {
  Typography,
  Button,
  FormHelperText,
  Box,
  TextField,
  useFormControl,
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

  // 2. via `async/await`
  const handleSubmit = async e => {
    e.preventDefault()

    const addResult = await addToMailchimp(e.currentTarget[0].value)
    // I recommend setting `result` to React state
    // but you can do whatever you want

    setMCResult({ MCResult, ...addResult })
  }
  function MyFormHelperText() {
    const { focused } = useFormControl() || {}

    const helperText = useMemo(() => {
      if (focused) {
        return "Don't worry, we don't spam you"
      }

      return ""
    }, [focused])

    return <FormHelperText>{helperText}</FormHelperText>
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
              flexDirection: { xs: "column", sm: "row" },
              columnGap: 4,
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
