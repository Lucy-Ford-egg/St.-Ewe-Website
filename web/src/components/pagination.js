import React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"
import { Button } from "gatsby-theme-material-ui"
import EastIcon from "@mui/icons-material/East"
import WestIcon from "@mui/icons-material/West"

export const Pagination = props => {
  const { pageContext } = props
  const theme = useTheme()


  const renderDots = () => {
    let dots = []

    for (let i = 0; i < pageContext.numberOfPages; i++) {
      dots = [
        ...dots,
        i + pageContext.humanPageNumber !== 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              borderRadius: 1000,
              fontSize: 14,
              fontWeight: 500,
              color:
                pageContext.humanPageNumber === i + 1
                  ? theme.palette.white.main
                  : theme.palette.highlight.main,
              backgroundColor:
                pageContext.humanPageNumber === i + 1
                  ? theme.palette.primary.main
                  : "transparent",
              mx: 18,
            }}
            key={`dot-${i}`}
          >
            {i + 1}
          </Box>
        ),
      ]
    }

    return dots
  }

  return (
    <Container maxWidth="lg" sx={{py: {xs: 8, md: 8} }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
          color="secondary"
            disabled={pageContext && pageContext.humanPageNumber === 1 ? true : false}
            variant="text"
            sx={{ fontWeight: 500, display: "inline-flex", minWidth: "auto" }}
            to={pageContext && pageContext.previousPagePath}
            startIcon={<WestIcon sx={{ mx: 5 }} />}
          >
            Recent
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {pageContext && renderDots()}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button
          color="secondary"
            disabled={
              pageContext && pageContext.humanPageNumber === pageContext.numberOfPages
                ? true
                : false
            }
            variant="text"
            sx={{ fontWeight: 500, display: "inline-flex",  minWidth: "auto" }}
            to={pageContext && pageContext.nextPagePath}
            endIcon={<EastIcon sx={{ mx: 5 }} />}
          >
            Older
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
