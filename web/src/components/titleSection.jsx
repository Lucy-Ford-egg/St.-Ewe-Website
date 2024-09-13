import React from "react"
import { graphql } from "gatsby"
import { ModuleContainer } from './moduleContainer'
import { useMediaQuery } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { styled } from '@mui/material/styles'
import { ButtonFormat } from "./buttonFormat"


const Wrapper = styled('div')(({ borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: '2/24',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
}));

const LeftAsset = styled('div')(({ }) => ({
    display: 'grid',
    gridColumn: '2/6',
    alignItems: 'center',
    justifyContent: 'start',
}));

const Content = styled('div')(({ }) => ({
    gridColumn: '7/17',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
}));

const RightAsset = styled('div')(({ }) => ({
    display: 'grid',
    gridColumn: '17/24',
    alignItems: 'center',
    justifyContent: 'end',
    '@media only screen and (max-width: 600px)': {
        gridRow: '2/2',
        justifyContent: 'center',
        gridColumn: '7/17',
    }
}));

const Asset = styled('div')(({ }) => ({
    maxWidth: 200,
}));


export const TitleSection = props => {

    const sm = useMediaQuery('(min-width:600px)');

    const {
        _rawTitle,
        _type,
        alignment,
        previewData,
        sideAssets,
        link,
    } = props

    const definedText = (previewData && _type === previewData?._type && previewData?.title) || _rawTitle
    const definedLeftImage = (previewData && _type === previewData?._type && previewData?.sideAssets?.leftAsset) || sideAssets?.leftAsset
    const definedRightImage = (previewData && _type === previewData?._type && previewData?.sideAssets?.rightAsset) || sideAssets?.rightAsset
    const definedLink = ( _type === previewData?._type && previewData && previewData?.link) || link


    return (
        <ModuleContainer {...props}>
            <Wrapper>
                {sm && (
                <LeftAsset>
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
                </LeftAsset>
                )}
                <Content>
                    {definedText && (
                        <RenderPortableText
                            previewData={definedText}
                            //   sanityConfig={sanityConfig}
                            setAsHeading={false}
                            value={definedText}
                        />
                    )}
                </Content>
                
                <RightAsset>
                    
                         {definedLink &&
                            <ButtonFormat
                            key={definedLink._key}
                            variant="outlined"
                            color="primary"
                            node={ definedLink }
                            size='large'
                           />    
                        }
                    
                    {definedRightImage && !definedLink && !sm && (

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
                </RightAsset>
        
            </Wrapper>
        </ModuleContainer>
    )
}

export const query = graphql`
  fragment TitleSectionFragment on SanityTitleSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    alignment
    link {
        ...LinkFragment
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
