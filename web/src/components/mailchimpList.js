import React, {useMemo, useState} from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Button, FormHelperText, Box, OutlinedInput, useFormControl, FormControl } from "@mui/material"

export const MailchimpList = () => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  const [MCResult, setMCResult] = useState(
    {
      result: '',
      msg: ''
    })

  // 2. via `async/await`
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    const result = await addToMailchimp()
    // I recommend setting `result` to React state
    // but you can do whatever you want
    setMCResult(result)
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
    <Box component="form" noValidate autoComplete="off" onSubmit={(e) => handleSubmit()}>
      <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <OutlinedInput sx={{minWidth: 286, maxWidth: 350}} name="email" type="email" placeholder="Please enter text" />
          <MyFormHelperText />
        </Box>
        <Button sx={{mx: {xs: 6, md: 6, minWidth: 145}}} variant="contained" color="secondary" type="submit">Join</Button>
      </FormControl>
    </Box>
  )
}