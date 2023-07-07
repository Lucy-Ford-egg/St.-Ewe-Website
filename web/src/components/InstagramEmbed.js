import React from "react"
import { graphql } from "gatsby"
import { Container, Grid, Box, Button } from "@mui/material"
import { Helmet } from "react-helmet"
import InstagramIcon from '@mui/icons-material/Instagram';

export const InstagramEmbed = ({ title, _rawInstagramEmbeds }) => {

  return (
    <>
     <Container maxWidth="xl" sx={{py: 5, pb: 8, pr: 0, mr: 0}} disableGutters={true}>
      {_rawInstagramEmbeds.allInstagramEmbeds && <Helmet>
      <script async src="//www.instagram.com/embed.js"></script>
      </Helmet>}
      { title && <Button variant="text" size="large" color="secondary" startIcon={<InstagramIcon />} sx={{pb:6, display: "inline-flex",  svg: {fontSize: "32px !important"} }} to={`@${title}`}>@{title}</Button>}
      {_rawInstagramEmbeds.allInstagramEmbeds && <Grid container columnSpacing={4} sx={{overflowX: "scroll", flexDirection: "row !important", flexWrap: {xs: "no-wrap !important", sm: "nowrap !important", md: "nowrap !important", lg: "nowrap !important" }}}>
        
          <>
            {_rawInstagramEmbeds.allInstagramEmbeds && _rawInstagramEmbeds.allInstagramEmbeds.map((node, i) => {
              
            return (
              <Grid key={`instagram-${i}`} item xs={8} md={4} sx={{minWidth: "326px"}}>
                <Box sx={{iframe: {
                  width: "100% !important", minWidth: "100% !important" }}} dangerouslySetInnerHTML={{__html: node.content[0].children[0].text}}></Box>
              </Grid>
              )
            })
          }
          </>
      </Grid> }
    </Container>
    </>
  )
}
export const query = graphql`
  fragment InstagramEmbedFragment on SanityInstagramModule {
    _rawInstagramEmbeds(resolveReferences: {maxDepth: 10})
    title
  }
`
         
