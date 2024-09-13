import React from "react"
import { graphql } from "gatsby"
import {ModuleContainer} from './moduleContainer'
import {Container, Grid} from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { styled } from '@mui/material/styles';


const Wrapper = styled('div')(({ borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: '2/48'
}));

const Asset = styled('div')(({}) => ({
    maxWidth: 200,
}));


export const TitleSection = props => {

  const {
    _rawTitle,
    _type,
    containerWidth,
    previewData,
    sideAssets,
  } = props

  const definedText = (previewData && _type === previewData?._type && previewData?.title) || _rawTitle
  const definedLeftImage = (previewData && _type === previewData?._type && previewData?.sideAssets?.leftAsset) || sideAssets?.leftAsset
  const definedRightImage = (previewData && _type === previewData?._type && previewData?.sideAssets?.rightAsset) || sideAssets?.rightAsset


  return (
   <ModuleContainer {...props}>
    <Wrapper>
    <Grid container>
    <Grid item sx={0} md={2}>
        {definedLeftImage && (
            
            <Asset>
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedLeftImage.crop}
              hotspot={definedLeftImage?.hotspot}
              asset={
                (definedLeftImage?._ref && urlFor(definedLeftImage).width(206).url()) ||
                definedLeftImage.asset
              }
              width={206}
              height={206}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
              }}
            />
            </Asset>
            
          )}
          </Grid>
        <Grid item xs={12} md={7} sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
        }}
        //maxWidth={containerWidth?.width} 
        >
        {definedText && (
            <RenderPortableText
              previewData={definedText}
            //   sanityConfig={sanityConfig}
              setAsHeading={false}
              value={definedText}
            />
          )}
        </Grid>
        <Grid item xs={0} md={2} sx={{
            display: 'flex',
            justifyContent: 'end',
        }}>
        {definedRightImage && (
            
            <Asset>
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedRightImage.crop}
              hotspot={definedRightImage?.hotspot}
              asset={
                (definedRightImage?._ref && urlFor(definedRightImage).width(206).url()) ||
                definedRightImage.asset
              }
              width={206}
              height={206}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
              }}
            />
            </Asset>
            
          )}
          </Grid>
          </Grid>
          </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment TitleSectionFragment on SanityTitleSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    containerWidth{
        width
    }
    sideAssets {
        leftAsset {
            ...ImageFragment
        }
        rightAsset {
            ...ImageFragment
        }
    }
    verticalSpace {
        topPadding
        bottomPadding
      }
      backgroundColour{
        label
        value
      }
  }
`
