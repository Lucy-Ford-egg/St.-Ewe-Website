import React from "react"
import { Alert, Snackbar, Typography, useTheme, IconButton } from "@mui/material"
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
      return show
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

     <Snackbar sx={{ width: "95%"}} open={showMessage} autoHideDuration={6000} onClose={e => handleClick()} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert
        onClose={e => handleClick(e)}
        severity=""
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.white.main,
          backgroundColor: theme.palette.white.main,
          borderRadius: 0,
          "& a": {
            color: "inherit",
          },
        }}
        action={
            <IconButton
              aria-label="close"
              color="secondary"
              size="small"
              onClick={e => handleClick(e)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
      >
        <Typography color="secondary" align="center" variant="caption" component="div">We use cookies on our website to make your experience better and to help
        us monitor and improve our customer service.</Typography>
        <Typography color="secondary" align="center" variant="caption" component="div">By continuing we will
        assume that you are happy to receive all cookies. You can manage the use
        of cookies through your browser.</Typography>
        <Typography color="secondary" align="center" variant="caption" component="div">Read how we use cookies on our{" "}
        <Link to="/privacy">Privacy Policy</Link> page.</Typography>
      </Alert>

    </Snackbar>
  )
}
