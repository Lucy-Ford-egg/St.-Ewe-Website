import React, { useMemo, useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Typography, Button, FormHelperText, Box, TextField, useFormControl, FormLabel, FormControl } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

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
    <Box sx={{
      maxWidth: '100%'
    }}>
      {!MCResult &&
        <Box component="form" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}  sx={{ display: 'flex', width: '100%'}}>
          <FormControl sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: {xs : 'center', md: 'unset'}, flexDirection: { xs: 'column', md: 'column' } }}>
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: "column", md: "row"},
            columnGap: 3,
          }}>
          <Box sx={{width: '100%'}}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <TextField id="firstName" hiddenLabel={true}  disableUnderline={true} variant="filled" color="primary" inputProps={{ sx:{ border: 'none', borderRadius: 0}  }} fullWidth={true}  required sx={{
                backgroundColor: 'white.main', borderColor: 'white', width: {xs: '100%', md: 'auto'}, minWidth: {xs: '100%'}, maxWidth: 350, mb: { xs: 0, md: 0 }
              }} name="firstName" type="text"/>
              <MyFormHelperText />
            </Box>

            <Box sx={{width: '100%'}}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <TextField id="lastName" hiddenLabel={true}  disableUnderline={true} variant="filled" color="primary" inputProps={{ sx:{ border: 'none', borderRadius: 0}  }} fullWidth={true}  required sx={{
                backgroundColor: 'white.main', borderColor: 'white', width: {xs: '100%', md: 'auto'}, minWidth: {xs: '100%'}, maxWidth: 350, mb: { xs: 0, md: 0 }

              }} name="lastName" type="text" />
              <MyFormHelperText />
            </Box>
            </Box>
            <Box sx={{width: '100%', flexBasis: '100%'}}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField id="email" hiddenLabel={true}  disableUnderline={true} variant="filled" color="primary" inputProps={{ sx:{ border: 'none', borderRadius: 0}  }} fullWidth={true}  required sx={{
                backgroundColor: 'white.main', borderColor: 'white', width: {xs: '100%', md: '100%'}, minWidth: {xs: '100%'}, mb: { xs: 0, md: 0 }

              }} name="email" type="email" />
              <MyFormHelperText />
            </Box>
            <Button sx={{ mt: {xs: 10, md: 10}, mx: { xs: 0, md: 0}, minWidth: { xs: '100%', md: 109 } }} size="large" variant="contained" color="primary" type="submit">Signup</Button>
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