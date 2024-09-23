import React, { useState } from "react"
import { motion } from "framer-motion"
import { useTheme, Typography} from "@mui/material"
import { GatsbyLink } from "gatsby-theme-material-ui"
import { contrastColour } from "../utils/contrastColour"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { formattedDate } from "../utils/formattedDate"
import { RenderPortableText } from "./renderPortableText"
import { styled } from '@mui/material/styles'

const Wrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridColumn: '1/24',
  borderRadius: 'var(--modular-scale-ms4) var(--modular-scale-ms4) 0 0',
  overflow: 'hidden',
  "& a": {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridTemplateRows: '1fr',
  },
  [theme.breakpoints.up('sm')]: {
    gridColumn: 'span 11',
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: 'span 8',
  }
}));

const BlogContent = styled('div')(({ props }) => ({
  display: 'flex',
  zIndex: 2,
  gridRow: '1/1',
  transition: `all 0.2s ease-in-out 0s`,
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

const BlogImage = styled('div')(({ props }) => ({
  display: 'grid',
  gridRow: '1/1',
  zIndex: 0,
}));

const Content = styled('div')(({ props }) => ({
  backgroundColor: 'white',
  transition: `all 0.2s ease-in-out 0s`,
  padding: 'var(--modular-scale-ms2)',
}));

const Category = styled('div')(({ props }) => ({
  backgroundColor: 'var(--rich-yolk-primary)',
  padding: 'var(--modular-scale-ms-1)',
  maxWidth: 'max-content',
  color: 'white'
}));

const Date = styled('div')(({ props }) => ({
  color: 'var(--grand-primary)',
  paddingTop: 'var(--modular-scale-ms-1)',
}));

const Excerpt = styled(motion.div)(({ props }) => ({

}));

const Overlay = styled(motion.div)(({ props }) => ({
  backgroundColor: 'rgba(235, 120, 6, 0.6)',
  gridRow: '1/5',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ReadMore = styled(motion.div)(({ props }) => ({
  gridRow: '1/1',
  zIndex: 2,
  display: 'flex',
  fontSize: 'var(--modular-scale-ms3)',
  paddingTop: 'var(--modular-scale-ms6)',
  justifyContent: 'center',
  alignItems: 'start',
  textTransform: 'uppercase',
  color: 'white',
  fontFamily: 'Colby Narrow',
}));

export const BlogTile = (props) => {

  const [activeTile, setActiveTile] = useState(false)
  const theme = useTheme()

  const { post, previewData } = props

  const {
    tileImage,
    categories,
    author,
    title,
    tileColor,
    date,
    slug,
    _rawExcerpt,
    _key
  } = post

  return (

    <Wrapper theme={theme} key={_key} onMouseEnter={() => setActiveTile(true)} onMouseLeave={() => setActiveTile(false)}>
      <GatsbyLink
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={`/blog/${post?.categories[0]?.slug?.current}/${slug?.current}`}>
        {activeTile && (<ReadMore
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ type: "linear" }}
        >Read More</ReadMore>
        )}
        <BlogContent className="blogContent">
          {categories && (
            <Category>
              <Typography
                variant="body1"
                component="h3"
              >
                {categories[0]?.name}
              </Typography>
            </Category>
          )}
          <Content>
            {title && (
              <Typography
                variant="h4"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {title}
              </Typography>
            )}


            {date && (
              <Date>
                <Typography
                  variant="caption"
                  component="p"
                  color={contrastColour(tileColor).textColour}
                >
                  {formattedDate(date)}
                </Typography>
              </Date>
            )}

            {author && (
              <Typography
                variant="h6"
                component="span"
                color={contrastColour(tileColor).textColour}
                sx={{

                }}
              >

                {author.name}
              </Typography>
            )}

            {_rawExcerpt && activeTile && (
              <Excerpt
                initial={{
                  opacity: 0,
                  display: 'none',
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  display: 'block',
                  y: 0,
                }}>
                <RenderPortableText
                  previewData={previewData}
                  //sanityConfig={sanityConfig}
                  variant={false}
                  //textAlign={definedMirror}
                  value={_rawExcerpt}
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