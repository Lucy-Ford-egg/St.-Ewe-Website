import React, { useRef } from "react"
import { graphql } from "gatsby"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"
import { useMediaQuery, useTheme } from "@mui/material"
import { LinkType } from "./utils/linkType"

const Wrapper = styled("div")(
  ({ theme, navColour, menu, backgroundColour, verticalSpace }) => ({
    // Base styles
    backgroundColor: backgroundColour?.value,
    //
    gridColumn: "1/25",
    gridTemplateColumns: "repeat(24, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    display: "grid",
    alignItems: "center",
  }),
)

const Images = styled("div")(({ theme, images }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridRow: "1/5",
  overflowX: "hidden",
}))

const ImagesContainer = styled(motion.div)(({ theme, type }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  gridTemplateColumns: "repeat(24, 1fr)",
  gridTemplateRows: "1fr",
  gap: "var(--ms3)",
  flexWrap: "nowrap",
  display: "grid",
  //maxHeight: images?.length === 0 ? 'auto' : sideAssets ? '517px' : 'var(--ms6)',
  "& .imageWrapper": {
    gridColumn: type === "icons" ? "span 2" : "span 9",
    gridRow: "1/1",
    [theme.breakpoints.up("md")]: {
      gridColumn: type === "icons" ? "span 2" : "span 6",
    },
  },
  "& .linkTypeWrapper": {
    gridRow: "1/1",
    width: "100%",
    height: "100%",
    "& > a": {
      maxWidth: "100% !important",
      width: "100% !important",
    },
  },
  "& img": {
    borderRadius: type === "icons" ? 0 : "var(--ms2)",
    maxWidth: "100%",
    objectFit: type === "icons" ? "contain" : "cover",
    height: "auto",
  },
  [theme.breakpoints.up("md")]: {
    gap: "var(--ms7)",
  },
}))

const ImageContainer = styled("div")(({ theme, images }) => ({
  gridColumn: "2/24",
  maxHeight: 269,
  gridTemplateColumns: "repeat(24, 1fr)",
  display: "grid",
  gridRow: "1/5",
  [theme.breakpoints.up("md")]: {
    gridColumn: "3/23",
    maxHeight: 790,
  },
  "& .linkTypeWrapper": {
    gridColumn: "1/25",
    display: "flex",
    maxHeight: 269,
    [theme.breakpoints.up("md")]: {
      maxHeight: 790,
    },
    "& a": {
      width: "100% !inportant",
    },
  },
  "& img": {
    borderRadius: "var(--ms2)",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    zIndex: 0,
    [theme.breakpoints.up("md")]: {
      borderRadius: "var(--ms2)",
    },
  },
}))

const Description = styled(motion.div)(({ theme, images }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    gridColumn: "12/24",
    gridRow: "4/5",
    display: "flex",
    marginTop: "-40px",
    justifyContent: "end",
    alignItems: "center",
    gap: "10px",
    zIndex: 1,
    "& span": {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--quirky-quail-secondary)",
      maxWidth: "fit-content",
      borderRadius: "var(--ms-2)",
      whiteSpace: "pre",
      padding: "var(--ms0) var(--ms1)",
    },
  },
}))

const LeftAsset = styled("div")(({ alignment, theme }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    height: "100%",
    display: "grid",
    gridColumn: "2/6",
    gridRow: "1/5",
    alignItems: "start",
    justifyContent: "start",
    zIndex: 2,
    marginTop: "-155px",
    pointerEvents: "none",
  },
}))

const RightAsset = styled("div")(({ alignment, theme }) => ({
  display: "grid",
  gridColumn: "15/24",
  alignItems: "end",
  justifyContent: "end",
  gridRow: "3/5",
  height: "100%",
  pointerEvents: "none",
  zIndex: 2,
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/5",
    justifyContent: "center",
    gridColumn: "15/24",
    marginBottom: "-155px",
    zIndex: 2,
  },
}))

const Asset = styled("div")(() => ({
  maxWidth: 200,
}))

const ProductImages = styled("div")(({ theme, sideAssets }) => ({
  display: "grid",
  gridColumn: "1 / 25",
  gridRow: "1/5",
  //gridTemplateColumns: 'repeat(24, 1fr)'
}))

const XScroll = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexWrap: "nowrap",
  gridColumnGap: 21,
  overflowX: "scroll",
  gridAutoFlow: "column",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none" /* Firefox */,
  scrollSnapAlign: "start",
  scrollPadding: "0 var(--ms-1)",
  "&::-webkit-scrollbar": {
    display: "none" /* Safari and Chrome */,
  },
  [theme.breakpoints.up("md")]: {
    gridColumnGap: 21,
  },
  "& .linkTypeWrapper": {
    display: "flex",
    flexBasis: "65%",
    width: "65%",
    minWidth: "65%",
    scrollSnapAlign: "start",
    borderRadius: "var(--ms2)",
    overflow: "hidden",
    "& a": {
      padding: 0,
    },
    [theme.breakpoints.up("sm")]: {
      flexBasis: "28%",
      width: "28%",
      minWidth: "28%",
      "&:first-of-type": {
        marginLeft: "unset",
      },
      "&:last-of-type": {
        marginRight: "unset",
      },
    },
    "&:first-of-type": {
      marginLeft: "var(--ms-1)",
    },
    "&:last-of-type": {
      marginRight: "var(--ms-1)",
    },
    "&:nth-child(even)": {
      marginBottom: "var(--ms5)",
    },
    "&:nth-child(odd)": {
      marginTop: "var(--ms5)",
    },
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },
    },
    [theme.breakpoints.up("md")]: {
      flexBasis: "28%",
      width: "28%",
      minWidth: "28%",
      "&:first-of-type": {
        marginLeft: "unset",
      },
      "&:last-of-type": {
        marginRight: "unset",
      },
    },
    "&:first-of-type": {
      marginLeft: "var(--ms-1)",
    },
    "&:last-of-type": {
      marginRight: "var(--ms-1)",
    },
    "&:nth-child(even)": {
      marginBottom: "var(--ms5)",
    },
    "&:nth-child(odd)": {
      marginTop: "var(--ms5)",
    },
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },
    },
  },
  "& img": {
    transition: "all 0.2s ease-in-out 0s",
    maxWidth: "100%",
    objectFit: "cover",
    height: "100%",
  },
}))

export const ImageSection = props => {
  const { type, images, sideAssets, icons = null } = props

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down("sm"))
  // Motion
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const transforms = {
    icons: {
      xs: useTransform(scrollYProgress, [0, 1], ["0%", "-950%"]),
      md: useTransform(scrollYProgress, [0, 1], ["0%", "-450%"]),
    },
    mood: {
      xs: useTransform(scrollYProgress, [0, 1], ["0%", "-350%"]),
      md: useTransform(scrollYProgress, [0, 1], ["0%", "-450%"]),
    },
  }

  // Duplicate images array for infinite effect
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <ModuleContainer {...props} className={`section-${props._type}`}>
      <Wrapper {...props} ref={ref}>
        {sideAssets?.leftAsset && (
          <LeftAsset>
            <Asset>
              <Image
                crop={sideAssets?.leftAsset?.crop}
                hotspot={sideAssets?.leftAsset?.hotspot}
                alt={sideAssets?.leftAsset?.asset?.altText}
                asset={
                  (sideAssets?.leftAsset?._id &&
                    urlFor(sideAssets?.leftAsset).width(600).url()) ||
                  sideAssets?.leftAsset?.asset
                }
                width={600}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Asset>
          </LeftAsset>
        )}
        {sideAssets?.rightAsset && (
          <RightAsset>
            <Asset>
              <Image
                crop={sideAssets?.rightAsset?.crop}
                hotspot={sideAssets?.rightAsset?.hotspot}
                asset={
                  (sideAssets?.rightAsset?._id &&
                    urlFor(sideAssets?.rightAsset).width(1200).url()) ||
                  sideAssets?.rightAsset?.asset
                }
                alt={sideAssets?.rightAsset?.asset?.altText}
                width={1200}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Asset>
          </RightAsset>
        )}

        {images.length > 1 && (type === "mood" || type === "icons") && (
          <Images images={images}>
            <ImagesContainer type={type} icons={icons}>
              {duplicatedImages.map((node, index) => {
                let setImageNode = node?.image

                return (
                  <motion.div
                    key={node?.key}
                    className="imageWrapper"
                    style={{
                      x: transforms[type === "mood" ? "mood" : "icons"][
                        sm ? "xs" : "md"
                      ],
                    }}
                  >
                    <LinkType className="link" node={node?.link}>
                      <Image
                        crop={setImageNode?.crop}
                        hotspot={setImageNode?.asset?.hotspot}
                        asset={
                          (setImageNode?._id && urlFor(setImageNode).url()) ||
                          setImageNode?.asset
                        }
                        alt={setImageNode?.asset?.altText}
                        //width={1200}
                      />
                    </LinkType>
                  </motion.div>
                )
              })}
            </ImagesContainer>
          </Images>
        )}

        {images.length === 1 && (
          <ImageContainer>
            {images[0]?.image?.asset && (
              <LinkType node={images[0]?.link}>
                <Image
                  crop={images[0]?.image?.crop}
                  hotspot={images[0]?.image?.hotspot}
                  asset={
                    (images[0]?.image?._id &&
                      urlFor(images[0]?.image).width(1440).url()) ||
                    images[0]?.image?.asset
                  }
                  alt={images[0]?.image?.asset?.altText}
                  width={1440}
                  height={790}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </LinkType>
            )}
            {images[0]?.asset?.description && (
              <Description>
                <span>{images[0]?.asset?.description}</span>
              </Description>
            )}
          </ImageContainer>
        )}

        {type === "product" && images.length > 1 && (
          <ProductImages sideAssets={sideAssets}>
            <XScroll>
              {images.map((node, index) => {
                let setImageNode = node?.image
                return (
                  <LinkType node={node?.link} key={node?.key}>
                    {setImageNode && (
                      <Image
                        crop={setImageNode?.crop}
                        hotspot={setImageNode?.hotspot}
                        asset={
                          (setImageNode?._id &&
                            urlFor(setImageNode).width(400).url()) ||
                          setImageNode?.asset
                        }
                        alt={setImageNode?.asset?.altText}
                        width={400}
                        height={400}
                      />
                    )}
                  </LinkType>
                )
              })}
            </XScroll>
          </ProductImages>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment ImageSectionFragment on SanityImageSection {
    _key
    _type
    images {
      _key
      _type
      image {
        asset {
          _id
          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
      link {
        external
        internal {
          ... on SanityPage {
            id
            _type
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            slug {
              current
              _type
            }
            categories {
              name
              slug {
                current
              }
            }
          }
        }
      }
    }
    type
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }
    sideAssets {
      leftAsset {
        asset {
          _id
          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
      rightAsset {
        asset {
          _id
          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
    }
  }
`
