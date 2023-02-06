import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { TextField, FormHelperText, Box, OutlinedInput } from "@mui/material"

export const MailchimpList = () => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  // // 1. via `.then`
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
  //   .then(data => {
  //     // I recommend setting data to React state
  //     // but you can do whatever you want (including ignoring this `then()` altogether)
  //     console.log(data)
  //   })
  //   .catch(() => {
  //     // unnecessary because Mailchimp only ever
  //     // returns a 200 status code
  //     // see below for how to handle errors
  //   })
  // }

  // 2. via `async/await`
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email, listFields)
    // I recommend setting `result` to React state
    // but you can do whatever you want
  }
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "Don't worry, we don't spam you";
      }

      return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={() => handleSubmit(email, { listFields })}>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput placeholder="Please enter text" />
        <MyFormHelperText />
      </FormControl>
    </Box>
  )
}