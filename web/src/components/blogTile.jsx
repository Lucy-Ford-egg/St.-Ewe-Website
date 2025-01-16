import React, { useState } from "react"
import { motion } from "framer-motion"
import { useTheme, Typography } from "@mui/material"
import { GatsbyLink } from "gatsby-theme-material-ui"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/utils/renderPortableText"
import { styled } from "@mui/material/styles"
import { format } from "date-fns"

const Wrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "1/24",
  borderRadius: "var(--ms4)",
  overflow: "hidden",
  "& a": {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "auto 1fr",
    [theme.breakpoints.up("sm")]: {
      gridTemplateRows: "minmax(303px, auto)1fr",
    },
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: "span 9",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "span 6",
  },
}))

const BlogContent = styled("div")(({ props }) => ({
  display: "flex",
  zIndex: 2,
  gridColumn: "1/1",
  gridRow: "1/1",
  transition: `all 0.2s ease-in-out 0s`,
  flexDirection: "column",
  justifyContent: "flex-end",
}))

const BlogImage = styled("div")(({ props }) => ({
  display: "grid",
  gridColumn: "1/1",
  gridRow: "1/1",
  zIndex: 0,
}))

const Content = styled("div")(({ props }) => ({
  backgroundColor: "white",
  transition: `all 0.2s ease-in-out 0s`,
  padding: "var(--ms2)",
  "& .blogPostTitle": {
    wordBreak: "break-word",
    color: "var(--original-large)",
  },
}))

const Category = styled("div")(({ props }) => ({
  backgroundColor: "var(--rich-yolk-primary)",
  padding: "var(--ms-1)",
  maxWidth: "max-content",
  color: "white",
}))

const PublishedDate = styled("div")(({ props }) => ({
  color: "var(--grand-primary)",
  paddingTop: "var(--ms-1)",
}))

const Excerpt = styled(motion.div)(({ props }) => ({}))

const Overlay = styled(motion.div)(({ props }) => ({
  backgroundColor: "rgba(235, 120, 6, 0.6)",
  gridColumn: "1/1",
  gridRow: "1/5",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const ReadMore = styled(motion.div)(({ props }) => ({
  gridColumn: "1/1",
  gridRow: "1/1",
  flexShrink: 1,
  flexGrow: 1,
  zIndex: 2,
  display: "grid",
  fontSize: "var(--ms3)",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "var(--ms4)",
  textTransform: "uppercase",
  color: "white",
  fontFamily: "Colby Narrow",
}))

export const BlogTile = props => {
  const [activeTile, setActiveTile] = useState(false)
  const theme = useTheme()

  const { post, previewData } = props

  const { tileImage, categories, title, date, slug, excerpt, _key } = post

  const formattedDate = date => {
    if (!date) {
      throw new Error("Date value is undefined or invalid")
    }
    const setDate = new Date(date) // Ensure a Date object is created
    if (isNaN(setDate)) {
      throw new Error("Invalid date format")
    }

    return format(setDate, "dd MMM yyyy")
  }
  let formatted = ""
  try {
    formatted = formattedDate(date)
    console.log("Formatted Date:", formatted)
  } catch (error) {
    console.error(error.message)
  }

  return (
    <Wrapper
      theme={theme}
      key={_key}
      onMouseEnter={() => setActiveTile(true)}
      onMouseLeave={() => setActiveTile(false)}
    >
      <GatsbyLink
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={`/news/${post?.categories[0]?.slug?.current}/${slug?.current}`}
      >
        <BlogContent className="blogContent">
          {activeTile && (
            <ReadMore
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ type: "linear" }}
            >
              Read More
            </ReadMore>
          )}
          {categories && (
            <Category>
              <Typography variant="body1" component="h3">
                {categories[0]?.name}
              </Typography>
            </Category>
          )}
          <Content>
            {title && (
              <Typography className="blogPostTitle" variant="h4">
                {title}
              </Typography>
            )}

            {date && (
              <PublishedDate>
                <Typography variant="caption" component="p">
                  {formatted}
                </Typography>
              </PublishedDate>
            )}

            {excerpt && activeTile && (
              <Excerpt
                initial={{
                  opacity: 1,
                  display: "block",
                  y: 0,
                }}
                animate={{
                  opacity: 1,
                  display: "block",
                  y: 0,
                }}
              >
                <RenderPortableText
                  previewData={previewData}
                  //sanityConfig={sanityConfig}
                  variant={false}
                  //textAlign={definedMirror}
                  value={excerpt}
                />
              </Excerpt>
            )}
          </Content>
        </BlogContent>
        <BlogImage>
          {tileImage && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={tileImage?.crop}
              hotspot={tileImage?.hotspot}
              asset={
                (tileImage &&
                  tileImage?._ref &&
                  urlFor(tileImage).width(600).url()) ||
                tileImage.asset
              }
              width={310}
              height={310}
              alt={tileImage?.asset?.altText}
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}
        </BlogImage>
        {activeTile && (
          <Overlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ type: "linear" }}
          />
        )}
      </GatsbyLink>
    </Wrapper>
  )
}
