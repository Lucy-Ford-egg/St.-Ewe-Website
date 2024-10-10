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
    '@media only screen and (max-width: 600px)': {
        gridColumn: '1/25',
    }
}));

const LeftAsset = styled('div')(({alignment}) => ({
    display: 'grid',
    gridColumn: '2/5',
    alignItems: 'center',
    justifyContent: 'start',
    
}));

const Content = styled('div')(({ alignment}) => ({
    gridColumn: '5/19',
    display: 'flex',
    justifyContent: 'center',
    '@media only screen and (max-width: 600px)': {
        gridColumn: '2/24',
    }
    
}));

const RightAsset = styled('div')(({ theme }) => ({
    display: 'grid',
    gridColumn: '19/24',
    alignItems: 'center',
    justifyContent: 'end',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
        gridRow: '2/2',
        justifyContent: 'start',
        gridColumn: '5/19',
    }
}));

const Actions = styled('div')(({ theme, alignment }) => ({
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    width: '100%',
    gridColumn: '2/24',
    paddingTop: 'var(--ms0)',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'start',
      gridColumn: '21/24',
      alignItems: 'center',
      gridRow: '1/2',
      paddingTop: 'unset',
    }
  }));

const Asset = styled('div')(({ }) => ({
    maxWidth: 200,
}));


export const TextSection = props => {

    const sm = useMediaQuery('(min-width:600px)');

    const {
        _rawText,
        _type,
        previewData,
        sideAssets,
        link,
    } = props

    const definedText = (previewData && _type === previewData?._type && previewData?.text) || _rawText
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

                {definedLink &&
                  <Actions>
                    <ButtonFormat
                    key={definedLink._key}
                    variant="outlined"
                    color="primary"
                    node={ definedLink }
                    size='large'
                   />
                   </Actions>    
                }
                
                <RightAsset>
                    
                    {definedRightImage && !definedLink && sm && (

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
  fragment TextSectionFragment on SanityTextSection {
    _key
    _type
    _rawText(resolveReferences: { maxDepth: 10 })
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
