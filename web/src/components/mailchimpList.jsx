import React, { useMemo, useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import Box from "@mui/material/Box"
import FormLabel from "@mui/material/FormLabel"
import FormControl, { useFormControl }  from "@mui/material/FormControl"

import CheckIcon from "@mui/icons-material/Check"
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch"

export const MailchimpList = () => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  const [MCResult, setMCResult] = useState(null)

  // 2. via `async/await`
  const handleSubmit = async e => {
    e.preventDefault()
    const addResult = await addToMailchimp(e.currentTarget[2].value, {
      fName: e.currentTarget[0].value,
      lName: e.currentTarget[1].value,
    })
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
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
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
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: { xs: "center", md: "unset" },
              flexDirection: { xs: "column", md: "column" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                columnGap: 3,
              }}
            >
              <Box sx={{ width: "100%" }}>
                <FormLabel htmlFor="fName">First Name</FormLabel>
                <TextField
                  id="fName"
                  hiddenLabel={true}
                  disableUnderline={true}
                  variant="filled"
                  color="primary"
                  inputProps={{ sx: { border: "none", borderRadius: 0 } }}
                  fullWidth={true}
                  required
                  sx={{
                    backgroundColor: "white.main",
                    borderColor: "white",
                    width: { xs: "100%", md: "auto" },
                    minWidth: { xs: "100%" },
                    maxWidth: 350,
                    mb: { xs: 0, md: 0 },
                  }}
                  name="fName"
                  type="text"
                />
                <MyFormHelperText />
              </Box>

              <Box sx={{ width: "100%" }}>
                <FormLabel htmlFor="lName">Last Name</FormLabel>
                <TextField
                  id="lName"
                  hiddenLabel={true}
                  disableUnderline={true}
                  variant="filled"
                  color="primary"
                  inputProps={{ sx: { border: "none", borderRadius: 0 } }}
                  fullWidth={true}
                  required
                  sx={{
                    backgroundColor: "white.main",
                    borderColor: "white",
                    width: { xs: "100%", md: "auto" },
                    minWidth: { xs: "100%" },
                    maxWidth: 350,
                    mb: { xs: 0, md: 0 },
                  }}
                  name="lName"
                  type="text"
                />
                <MyFormHelperText />
              </Box>
            </Box>
            <Box sx={{ width: "100%", flexBasis: "100%" }}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                hiddenLabel={true}
                disableUnderline={true}
                variant="filled"
                color="primary"
                inputProps={{ sx: { border: "none", borderRadius: 0 } }}
                fullWidth={true}
                required
                sx={{
                  backgroundColor: "white.main",
                  borderColor: "white",
                  width: { xs: "100%", md: "100%" },
                  minWidth: { xs: "100%" },
                  mb: { xs: 0, md: 0 },
                }}
                name="email"
                type="email"
              />
              <MyFormHelperText />
            </Box>
            <Button
              sx={{
                mt: { xs: 10, md: 10 },
                mx: { xs: 0, md: 0 },
                minWidth: { xs: "100%", md: 109 },
              }}
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Signup
            </Button>
          </FormControl>
        </Box>
      )}

      <>
        {MCResult?.result === "success" && (
          <Box display="flex" alignItems="center">
            <Typography
              sx={{ pr: { xs: 4, md: 4 }, py: { xs: 4, md: 4 } }}
              variant="h4"
              component="p"
            >
              {MCResult.msg}
            </Typography>
            <CheckIcon color="tertiary" />
          </Box>
        )}
        {MCResult?.result === "error" && (
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box display="flex" alignItems="center" flexDirection="row">
              <Typography
                sx={{ pr: { xs: 4, md: 4 }, py: { xs: 4, md: 4 } }}
                variant="h4"
                component="p"
              >
                {MCResult?.msg}
              </Typography>
              <DoNotTouchIcon color="primary" />
            </Box>
            <Box sx={{ display: "block", width: "100%" }}>
              <Button
                onClick={e => setMCResult(null)}
                variant="outlined"
                color="secondary"
              >
                Start Again
              </Button>
            </Box>
          </Box>
        )}
      </>
    </Box>
  )
}
