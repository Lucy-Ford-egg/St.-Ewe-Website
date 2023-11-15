import React from "react"
import { graphql } from "gatsby"
import {Link} from 'gatsby-theme-material-ui'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { Icons } from "./icons"
import { ButtonFormat } from "./buttonFormat"
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';

export const ContactSection = props => {
  const theme = useTheme()
  const {
    title,
    icon,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    subtitle,
    links,
    showForm,
  } = props

  const textColour = theme.palette.text.main

  // Forms
  const label = { inputProps: { 'aria-label': 'Checkbox demo'  } };
  //
  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: {
          xs: theme.spacing(10),
          md: theme.spacing(10),
        },
        pt: topPadding
          ? 0
          : {
              xs: theme.spacing(10),
              md: theme.spacing(10),
            },
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          maxWidth: theme.breakpoints.values.xl,
          mx: "auto",
        }}
      >
        <Grid
          container
          rowSpacing={{ xs: 6, sm: 6, md: 6 }}
          columnSpacing={{ xs: 13, sm: 13, md: 13 }}
          direction={mirror ? "row-reverse" : "row"}
          sx={{
            
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              {image && (
                <GatsbyImage
                  image={
                    getGatsbyImageData(
                      previewData?.image?.asset?._ref,
                      { maxWidth: 1440 },
                      sanityConfig,
                    ) || getImage(image?.asset)
                  }
                  layout="constrained"
                  aspectRatio={133 / 8}
                  alt={image.asset?.altText}
                  style={{
                    minHeight: "100%",
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box>
              {icon && (
                <Icons
                  type={
                    previewData && previewData.icon ? previewData.icon : icon
                  }
                />
              )}

              {subtitle && (
                <Typography
                  color={textColour}
                  sx={{ mt: { xs: 4, md: 4 } }}
                  variant="overline"
                  component="p"
                >
                  {previewData && previewData.subtitle
                    ? previewData.subtitle
                    : subtitle}
                </Typography>
              )}

              <Typography color={textColour} variant="h2">
                {previewData && previewData.title ? previewData.title : title}
              </Typography>
              {text && (
                <Divider
                  component="div"
                  role="presentation"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    maxWidth: 305,
                  }}
                />
              )}
              <Typography
                color={textColour}
                sx={{ py: { xs: 5, md: 6 } }}
                variant="body1"
              >
                {previewData && previewData.text ? previewData.text : text}
              </Typography>

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
                {links &&
                  links.map((node, i) => {
                    return (
                      <ButtonFormat
                        variant={i === 0 ? "contained" : "outlined"}
                        color={i === 0 ? "primary" : "tertiary"}
                        node={
                          previewData && previewData.node
                            ? previewData.node
                            : node
                        }
                        sx={{}}
                      />
                    )
                  })}
              </Box>
            </Box>
            {showForm && (
              <Box>
                <form
                  method="POST"
                  name="contact-mui"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="contact-mui" />
                  <TextField
                    label="Name"
                    name="name"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    required
                    fullWidth
                    type="email"
                    margin="normal"
                  />
                  <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel required control={
                    <Checkbox {...label} size="small" icon={<CheckBoxOutlineBlankSharpIcon />}
                    checkedIcon={<CheckBoxSharpIcon  />} />} label="I accept the Terms" />
                  <Link to='/terms' target="_blank" rel="noopener"><Typography variant='caption'>Terms &amp; Conditions</Typography></Link>
                  <Button sx={{my: 6}} type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment ContactSectionFragment on SanityContactSection {
    _key
    _type
    image {
      asset {
        gatsbyImageData
      }
    }
    icon
    subtitle
    title
    text
    showForm
    mirror
    topPadding
  }
`
