import React from "react"
import { Container, Grid, Typography, useTheme, Box, Button } from "@mui/material"
import { ButtonFormat } from '../components/buttonFormat'
import { RenderPortableText } from "./renderPortableText"
import ListAltIcon from '@mui/icons-material/ListAlt'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { ImageCarouselSection } from "./imageCarouselSection"

export const PropertyHeader = props => {
  const theme = useTheme()
  const { title, summary, unitId, sanityConfig, previewData, extendedSummary, links } = props
  
  

  const checkIcon = (originalFilename) => {

    if( originalFilename.includes('Inventory')){
      return <ListAltIcon/>
    }
    if(originalFilename.includes('Tariff')){
      return <ReceiptLongIcon/>
    }
    else{
      return null
    }      
  }
  

  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: {
          xs: theme.spacing(10),
          md: theme.spacing(14),
        },
        pb: {
          xs: theme.spacing(0),
          md: theme.spacing(14),
        },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography sx={{pt: {xs: `0 !important` , sm: `0 !important`,  md: `0 !important`}}} variant="h2">{title}</Typography>
          <Typography variant="body1">{summary}</Typography>
          {extendedSummary && (
                <Box sx={{ py: { xs: 6, md: 6 } }}>
                  <RenderPortableText previewData={previewData} sanityConfig={sanityConfig} color='text.main' variant={false} value={previewData && previewData.extendedSummary ? previewData.extendedSummary : extendedSummary}/>
                </Box>
              )}
              <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flexBasis: "100%",
                    columnGap: 6,
                  }}
                >
          {links && links.map((node, i) => {

                      return (
                        <Button size="large"
                        variant="outlined"
                        color="primary"
                        to={node.asset.url}
                        endIcon={checkIcon(node.asset.originalFilename)}
                        >
                          {node.asset.title}
                        
                        </Button>
                      )
                    })}
                    </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: 700,
            }}
          >
            <iframe
              title={`Calendar for Unit - ${unitId}`}
              src={`https://bookings.gemapark.co.uk/widgets/PricingCalendar.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&amp;pid=${process.env.GATSBY_GEMAPARK_PID}&amp;uid=${unitId}&amp;pcsd=today&amp;pcld=endofyear%20%2b1y&amp;pced=tomorrow&amp;pce=slide&amp;pcpp=processPrice`}
              marginwidth="0"
              marginheight="0"
              frameborder="0"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
