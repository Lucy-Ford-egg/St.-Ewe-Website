import React from 'react'
import { graphql } from "gatsby"
import { PortableText } from '@portabletext/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container, Grid, Typography, Box, useMediaQuery, List, ListItem, ListItemIcon } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';


export const MultiColumnTitleTextLink = ({ columns, text, image, linkGroup }) => {

  const adornment = true

  const isMobile = useMediaQuery('(min-width:600px)');


  const myPortableTextComponents = {
    types: {
      span: ({ value }) => <Typography variant="body1">{value.text}</Typography>,
      image: ({ value }) => <img src={value.imageUrl} />,
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    list: (props) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <List sx={{listStyle: 'inside'}} component="ul" dense={true}>{props.children}</List>
      ) : (
        <List sx={{listStyle: 'decimal inside'}} component="ol" dense={true}>{props.children}</List>
      )),
    listItem: (props ) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <ListItem sx={{pl: 0}}>
          <ListItemIcon sx={{minWidth: 16}}>
            <CircleIcon sx={{width: 4, height: 4}} />
          </ListItemIcon>{props.children}
        </ListItem>
      ) : (
        <ListItem sx={{display: 'list-item', px: 0}}>
          <ListItemIcon sx={{minWidth: 16}}>
          </ListItemIcon>{props.children}
        </ListItem>
      )),
    marks: {
      em: ({children}) => <Typography sx={{fontStyle: 'italic'}} variant="body1">{children}</Typography>,
      strong: ({ children, value }) => <Typography variant="body1" sx={{ fontWeight: 900 }}>{children}</Typography>,
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
  }

  return (
    <Container maxWidth="false" sx={{ px: { xs: 0 }, py: { xs: 2, md: 6 }, backgroundColor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Grid container>
          {columns && columns.map((node, i) => {
            return (
              <Grid item xs={12} md={6}>
                <Typography sx={{ maxWidth: { xs: '100%', md: '80%' }, mb: { xs: 4 } }} variant="h3">{node?.title}</Typography>
                <PortableText value={node._rawText} components={myPortableTextComponents} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Container>
  )

}


{/* <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', gridColumn: {xs: '2/2', md: '1/4'}, gridRow: {xs: '2/5', md: '2/6'}, position: 'relative', zIndex: 1, pt: {xs: 6, md: 6}, pb: {xs: 6, md: 3}, px: {xs: 0, md: 10}, mb: {xs: 0, md: -8} }}>

<Typography align="center" sx={{textAlign: 'center', my: { xs: 5 } }} variant='h2'>{title}</Typography>
<Typography align="center" sx={{textAlign: 'center', my: { xs: 5 }, maxWidth: 'max-content' }} variant='body1' color='white.main' dangerouslySetInnerHTML={{__html: text}}/>
<Box display="flex" alignItems="center" justifyContent="center">
  <ButtonLink linkGroup={linkGroup } variant="contained" color="secondary"/>
</Box>

{adornment &&
<Container maxWidth="sm" sx={{pt: {xs: 6, md: 8}, pb: {xs: 2, md: 8}}}>
  <Box display="flex" justifyContent="center" alignItems="center">
    <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 0, md: 7} }}></Box>
    <ArchIcon/>
    <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 0, md: 7} }}></Box>
  </Box>
</Container>
}

</Container>
<Container maxWidth="xl" disableGutters={isMobile ? true : false} sx={{ px: {xs: 0}, gridColumn: '1/4', gridRow: '1/6' }}>
<GatsbyImage layout="constrained" aspectRatio={133/8} style={{ minHeight: '100%' }} image={getImage(image.asset)} alt={image.asset?.altText} />
</Container> */}

export const query = graphql`
  fragment MultiColumnTitleTextLinkFragment on SanityTwoColumnTitleTextCta {
    _key
    _type
    linkGroup {
      externalLinkGroup {
        label
        href
        blank
      }
      internalLinkGroup {
        label
        reference {
          ... on SanityNews {
            id
            slug {
              current
            }
          }
          ... on SanityPlace {
            id
            slug {
              current
            }
          }
          ... on SanityPage {
            id
            slug {
              current
            }
          }
        }
      }
    }
    columns {
      _rawText(resolveReferences: {maxDepth: 10})
      _key
      _type
      title
    }
  }
`