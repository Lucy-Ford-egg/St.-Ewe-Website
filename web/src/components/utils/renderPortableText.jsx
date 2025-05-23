import React from "react"
import { PortableText } from "@portabletext/react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Link from "@mui/material/Link"
import { useTheme } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import { PortableTextInlineLink } from "./portableInlineLink"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { styled } from "@mui/material/styles"
import ReactPlayer from "react-player"

// Utility to sanitize Portable Text blocks
//blocks are array of objects from sanity - map over them - spread object - Only keep markDefs if it’s a real array — otherwise, default to [].
const sanitizePortableText = blocks => {
  return (blocks || []).map(block => ({
    ...block,
    markDefs: Array.isArray(block.markDefs) ? block.markDefs : [],
  }))
}

const ColumnCount = styled("span")(({ value }) => ({
  display: "block",
  "@media only screen and (min-width: 600px)": {
    columnGap: 21,
    columnCount: value?.columns,
    columnFill: "balance",
  },
}))

const ReactPlayerWrapper = styled("div")(({ value }) => ({
  position: "relative", // Essential for absolute positioning
  width: "100%",
  maxWidth: "100%", // Ensures the wrapper never exceeds its container width
  height: "0", // Height controlled by padding
  paddingTop: "56.25%", // 16:9 aspect ratio (adjust as needed)
  overflow: "hidden",

  "& iframe": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%", // The iframe will stretch to fill the parent's width
    height: "100%", // Maintains the aspect ratio set by the padding
    maxWidth: "100%", // Ensures it doesn’t exceed the parent container’s width
  },
  "& .react-player": {
    width: "100% !important",
    height: "100% !important",
  },

  "@media only screen and (min-width: 600px)": {
    paddingTop: "56.25%", // For wider aspect ratios like 21:9, adjust as needed
  },
}))

export const RenderPortableText = props => {
  const {
    setAsHeading = false,
    previewData,
    sanityConfig,
    value,
    textAlign,
    backgroundColour,
    ol,
  } = props

  const theme = useTheme()
  // Sanitize the value before rendering using utility function so its allways an array and cant return null
  const safeValue = sanitizePortableText(value)

  const block = {
    normal: ({ children }) => (
      <Typography
        sx={{ py: 6, color: "inherit" }}
        variant={setAsHeading ? setAsHeading : "body1"}
      >
        {children}
      </Typography>
    ),
    body2: ({ children }) => (
      <Typography
        sx={{ textAlign: textAlign, py: 2, color: "inherit" }}
        variant="body2"
      >
        {children}
      </Typography>
    ),
    caption: ({ children }) => (
      <Typography
        sx={{ textAlign: textAlign, py: 2, color: "inherit" }}
        variant="caption"
      >
        {children}
      </Typography>
    ),
    overline: ({ children }) => (
      <Typography
        sx={{ textAlign: textAlign, py: 1, color: "inherit" }}
        variant="overline"
      >
        {children}
      </Typography>
    ),
    h1: ({ children }) => {
      return (
        <Typography
          sx={{ textAlign: textAlign, py: { xs: 5, md: 0 }, color: "inherit" }}
          variant="h1"
          component="div"
        >
          {children}
        </Typography>
      )
    },
    h2: ({ children }) => {
      return (
        <Typography
          sx={{ textAlign: textAlign, py: { xs: 5 }, color: "inherit" }}
          variant="h2"
        >
          {children}
        </Typography>
      )
    },
    h3: ({ children }) => (
      <Typography sx={{ py: { xs: 5 }, color: "inherit" }} variant="h3">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography sx={{ py: { xs: 7 }, color: "inherit" }} variant="h4">
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography sx={{ py: { xs: 5 }, color: "inherit" }} variant="h5">
        {children}
      </Typography>
    ),
    h6: ({ children }) => {
      return (
        <Typography sx={{ py: { xs: 5 }, color: "inherit" }} variant="h6">
          {children}
        </Typography>
      )
    },
    blockquote: ({ children }) => {
      return (
        <Box sx={{ py: { xs: 5 }, mx: 0 }} component="figure">
          <Typography
            sx={{
              fontStyle: "italic",
              py: { xs: 0 },
              color: "primary.main",
              pl: 3,
            }}
            variant="h3"
            component="blockquote"
          >
            {children}
          </Typography>
          {value?.cite && (
            <Typography
              align="center"
              variant="subtitle1"
              component="figcaption"
            >
              {value?.cite}
            </Typography>
          )}
        </Box>
      )
    },
  }

  const marks = {
    em: ({ children }) => (
      <span style={{ color: value?.value, fontStyle: "italic" }}>
        {children}
      </span>
    ),
    strong: ({ children }) => {
      return (
        <span
          style={{
            fontWeight: 900,
          }}
        >
          {children}
        </span>
      )
    },

    link: ({ children, value }) => {
      return (
        <PortableTextInlineLink
          color={
            backgroundColour?.label === "Super Eggs Secondary Accent"
              ? "var(--original-large)"
              : value?.value
          }
          value={value}
        >
          {children}
        </PortableTextInlineLink>
      )
    },
    internalLink: ({ children, value }) => {
      return (
        <PortableTextInlineLink
          color={
            backgroundColour?.label === "Super Eggs Secondary Accent"
              ? "var(--original-large)"
              : value?.value
          }
          value={value}
        >
          {children}
        </PortableTextInlineLink>
      )
    },
    underline: ({ children }) => (
      <Typography
        variant="body1"
        className="underline"
        component="span"
        sx={{
          textDecoration: "underline",
        }}
      >
        {children}
      </Typography>
    ),
    // Color
    textColor: ({ children, value }) => (
      <span style={{ color: value?.value }}>{children}</span>
    ),
    textColumns: ({ children, value }) => {
      return <ColumnCount value={value}>{children}</ColumnCount>
    },
    highlightColor: ({ children, value }) => (
      <span style={{ background: value?.value }}>{children}</span>
    ),
    file: ({ children, value }) => (
      <Link
        target="_blank"
        rel="noopener"
        href={value?.asset?.url}
        style={{ color: value?.value }}
      >
        {children}
      </Link>
    ),
  }

  const standardPortableText = {
    types: {
      youTube: ({ value }) => {
        const { url } = value
        return (
          <ReactPlayerWrapper>
            <ReactPlayer className="react-player" url={url} />
          </ReactPlayerWrapper>
        )
      },
      // ! Old Image block for deprecation
      image: ({ value }) => {
        return (
          <Box sx={{ py: 6 }}>
            <Image
              // pass asset, hotspot, and crop fields
              asset={
                getGatsbyImageData(
                  previewData && previewData?.image?.asset,
                  { maxWidth: 100 },
                  sanityConfig,
                ) || value?.asset
              }
              // tell Sanity how large to make the image (does not set any CSS)
              // width={1300}
              // style it how you want it
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Typography
              sx={{
                pl: 1,
                borderLeft: `1px solid ${theme?.palette?.tertiary?.main}`,
              }}
              variant="body2"
            >
              {value?.asset?.description}
            </Typography>
          </Box>
        )
      },
      // New Image block
      imageOptions: ({ value }) => {
        return (
          <Box sx={{ py: 6 }}>
            <Image
              // pass asset, hotspot, and crop fields
              asset={
                getGatsbyImageData(
                  previewData && previewData?.image?.asset,
                  { maxWidth: 100 },
                  sanityConfig,
                ) || value?.image?.asset
              }
              // tell Sanity how large to make the image (does not set any CSS)
              // width={1300}
              // style it how you want it
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "auto",
                mixBlendMode: value?.mixBlendMode && value?.mixBlendMode,
              }}
            />
            <Typography
              sx={{
                pl: 1,
                borderLeft: `1px solid ${theme?.palette?.tertiary?.main}`,
              }}
              variant="body2"
            >
              {value?.asset?.description}
            </Typography>
          </Box>
        )
      },
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a style={{ color: "blue" }} href={value?.url}>
            {value?.text}
          </a>
        ) : (
          <div style={{ color: "blue" }} className="callToAction">
            {value?.text}
          </div>
        ),
      blockquote: ({ value }) => {
        return (
          <Box sx={{ mx: { xs: 0, md: -9 } }} component="figure">
            <Typography
              sx={{
                py: { xs: 6, md: 6 },
                color: value?.markDefs[0]?.value,
                pl: 1,
                borderLeft: `1px solid ${theme?.palette?.highlight?.main}`,
              }}
              align="center"
              variant="h2"
              component="blockquote"
            >
              {value?.text}
            </Typography>
            {value?.cite && (
              <Typography
                align="center"
                variant="subtitle1"
                component="figcaption"
              >
                {value?.cite}
              </Typography>
            )}
          </Box>
        )
      },
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <List
          sx={{ listStyle: "inside", pt: { xs: 0 }, mt: { xs: "-4px" } }}
          component="ul"
          dense={true}
        >
          {children}
        </List>
      ),
      number: ({ children }) => (
        <List
          sx={{
            listStyle: "decimal inside",
            pt: { xs: 0 },
            mt: { xs: "-4px" },
          }}
          component="ol"
          dense={true}
        >
          {children}
        </List>
      ),

      // Ex. 2: rendering custom lists
      // checkmarks: ({ children }) => (
      //   <ol className="m-auto text-lg">{children}</ol>
      // ),
    },
    listItem: {
      bullet: ({ value, children }) => (
        <ListItem
          sx={{
            color: "inherit",
            pl: 0,
            alignItems: "start",
            columnGap: 0,
          }}
        >
          <ListItemIcon sx={{ mt: "var(--ms-1)", minWidth: 16 }}>
            <CircleIcon
              color="inherit"
              sx={{ color: "inherit", width: 4, height: 4 }}
            />
          </ListItemIcon>
          <Box
            component="div"
            sx={{
              display: "block",
            }}
          >
            {children}
          </Box>
        </ListItem>
      ),
      number: ({ value, children, index }) => (
        <ListItem
          sx={{
            color: "inherit",
            display: "list-item",
            px: 0,
            alignItems: "center",
            columnGap: 0,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "inline-flex",
            }}
          >
            {ol === "steps" && (
              <span className="step-marker">{`- Step ${index + 1}`}</span>
            )}

            {children}
          </Box>
        </ListItem>
      ),
    },

    block: block,
    marks: marks,
  }

  return (
    <div>
      {value && (
        <PortableText
          value={safeValue || []}
          components={standardPortableText}
        />
      )}
    </div>
  )
}
