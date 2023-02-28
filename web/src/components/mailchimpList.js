import React, { useMemo, useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Typography, Button, FormHelperText, Box, TextField, useFormControl } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import CheckIcon from '@mui/icons-material/Check';
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"

export const MailchimpList = () => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  const [MCResult, setMCResult] = useState(null)

  // 2. via `async/await`
  const handleSubmit = async (e) => {

    e.preventDefault();

    const addResult = await addToMailchimp(e.currentTarget[0].value)
    // I recommend setting `result` to React state
    // but you can do whatever you want

    setMCResult({ MCResult, ...addResult })
  }
  function MyFormHelperText() {

    const { focused } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (focused) {
        return "Don't worry, we don't spam you";
      }

      return '';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  return (
    <Box>
      {!MCResult &&
        <Box component="form" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <FormControl sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box>
              <TextField id="email" disableUnderline={true} variant="outlined" color="white" inputProps={{ sx:{ border: 'none'}  }} fullWidth={true} hiddenLabel={true} required sx={{
                backgroundColor: clientTheme.palette.white.main, borderColor: 'white', borderRadius: 0, minWidth: 280, maxWidth: 350, mb: { xs: 6, md: 0 }

              }} name="email" type="email" placeholder="Enter your email address" />
              <MyFormHelperText />
            </Box>
            <Button sx={{ mx: { xs: 6, md: 6, minWidth: { xs: '100%', md: 145 }, width: { xs: '100% !important', md: 'fit-content' } } }} variant="contained" color="secondary" type="submit">Join</Button>
          </FormControl>
        </Box>
      }
      {
        MCResult?.result === 'success' && <Box display="flex" alignItems="center">

          <Typography sx={{ pr: { xs: 4, md: 4 }, py: { xs: 4, md: 4 } }} variant="h4" component="p">{MCResult.msg}</Typography>
          <CheckIcon color="white" />
        </Box>
      }
    </Box>

  )
}