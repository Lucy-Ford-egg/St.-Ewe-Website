import React from 'react'
import {ArrowProps} from './types'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'

const baseArrowStyle: React.CSSProperties = {
    position: "absolute",
    width: "50px",
    height: "50px",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
}

const Arrow = ({ left = false, children, onClick }: ArrowProps) => {
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.down("sm"))
    return(
    <IconButton
        aria-label="change slide"
        onClick={onClick}
        style={{
            ...baseArrowStyle,
            left: left ? "20px" : "initial",
            right: !left ? "10px" : "initial",
        }}
        sx={{
            border: `1px solid ${sm ? theme.palette.text.primary : "white"}`,
          }}
    >
        {children}
    </IconButton>
)}

export default Arrow