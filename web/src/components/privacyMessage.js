import React from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Container from "@mui/material/Container"
import { useTheme } from "@mui/material"

import {Link} from "gatsby-theme-material-ui"
import CloseIcon from '@mui/icons-material/Close';


export const PrivacyMessage = () => {
  const theme = useTheme()
  const storage =
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage
      : null

  function getSavedState() {
    if (storage) {
      const show = storage.privacy ? JSON.parse(storage.privacy) : true
      return true //show
    } else return true
  }

  const [showMessage, setShowMessage] = React.useState(getSavedState())

  function handleClick(e) {
    setShowMessage(false)
    typeof window !== "undefined" &&
      window.localStorage.setItem("privacy", false)
  }

  const handleClose = () => {
    return false
  }

  return (

     <Snackbar sx={{width: '100%', left:'0 !important', right: '0 !important', backgroundColor: theme.palette.highlight.main,}} open={showMessage} autoHideDuration={6000} onClose={e => handleClick()}>
      <Container maxWidth='xl'>
      <Alert
        onClose={e => handleClick(e)}
        severity=""
        sx={{
          color: theme.palette.white.main,
          borderRadius: 0,
          width: '100%',
          "& a": {
            color: "inherit",
          },
        }}
        action={
            <IconButton
              aria-label="close privacy message"
              color="secondary"
              size="small"
              onClick={e => handleClick(e)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
      >
        <Typography color="secondary" align="left" variant="caption" component="div">We use cookies on our website to make your experience better and to help
        us monitor and improve our customer service. <br/>By continuing we will
        assume that you are happy to receive all cookies. You can manage the use
        of cookies through your browser. Read how we use cookies on our{" "}
        <Link to="/privacy">Privacy Policy</Link> page.</Typography>

      
      </Alert>
      </Container>
    </Snackbar>
  )
}
