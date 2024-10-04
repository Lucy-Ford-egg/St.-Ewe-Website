import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastBrandPalette } from '../utils/colours'
import { BorderSection } from "./borderSection"

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles'
import mask from '../../static/assets/svg-mask.svg'


const Wrapper = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(24, 1fr)',
  gridColumn: '1/25',
  [theme.breakpoints.up('lg')]: {

  }
}));

const ListWrapper = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '14/23',
  display: 'grid',
  gridTemplateColumns: 'repeat(24, 1fr)',
  [theme.breakpoints.up('sm')]: {

  }
}));


const List = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  display: 'grid',
  "& .title": {
    textTransform: 'uppercase'
  },
  backgroundColor: contrastBrandPalette[backgroundColour?.label]?.contrastBase,
  padding: 'var(--ms3) var(--ms3)',
  "& li": {

  },
  [theme.breakpoints.up('sm')]: {

  }
}));

const Border = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  svg: {
    width: "100%",
    height: 'auto',
    outline: "none",
    border: "none",
    path: {
        fill: contrastBrandPalette[backgroundColour?.label]?.contrastBase,
    },
  },
  [theme.breakpoints.up('sm')]: {

  }
}));

const Content = styled('div')(({ mirror, theme }) => ({
  gridColumn: mirror ? '3/13' : '3/13',
  "& .title": {
    textTransform: 'uppercase'
  },
  [theme.breakpoints.up('sm')]: {

    gridColumn: mirror ? '3/13' : '3/13',
  },
  [theme.breakpoints.up('lg')]: {

    gridColumn: mirror ? '3/13' : '3/13',
  }

}));


export const RecipeBodySection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const {
    title,
    _rawText,
    textAlign,
    image,
    previewData,
    sanityConfig,
    links,
    mirror,
    backgroundColour,
    pageContext,
    _type,
    data,
  } = props

  const definedText =
    (previewData && _type === previewData?._type && previewData?.text) ||
    _rawText
  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links

  // const definedImage =
  //   (previewData && _type === previewData?._type && previewData?.image) || image
  debugger
  const definedImage = (image?.asset && image) || (pageContext?.node?.featuredMedia)

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour

  return (

    <ModuleContainer {...props}>

      <Wrapper>
        <Content mirror={mirror}>
          <Typography variant="h3" className="title">Instructions</Typography>
          <RenderPortableText value={data?.sanityRecipes?._rawInstructions} />
        </Content>

        <ListWrapper mirror={mirror} backgroundColour={backgroundColour}>
          <Border backgroundColour={backgroundColour}><svg width="443" height="36" viewBox="0 0 443 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7492 10.4279C10.4913 10.5973 5.22845 11.2579 0 12.4266V35.8657L443 35.8657V11.3087C441.463 10.682 439.892 10.0214 438.282 9.36084C436.672 8.70025 435.027 8.03966 433.343 7.46376C429.975 6.27809 426.47 9.05855 422.837 7.78819C408.281 3.09632 391.589 10.5738 373.292 7.4064C354.995 4.17122 335.093 1.88457 314.139 0.800529C293.186 -0.300451 271.178 -0.232698 248.654 0.800529C245.841 0.936034 243.018 1.07154 240.185 1.20704C237.357 1.39336 234.52 1.56275 231.677 1.74907C228.83 1.93538 225.977 2.13864 223.12 2.32496C220.238 2.57903 217.357 2.81617 214.465 3.07024C202.913 4.23897 191.327 0.915846 179.775 2.88067C156.667 6.81032 133.701 4.9087 111.319 9.21099C100.126 11.3791 89.0801 9.36083 78.2403 10.9191C76.8853 11.1224 75.5352 11.3087 74.1901 11.512L70.2135 12.0201C67.5772 12.3419 64.8721 12.7993 62.4861 12.7654L60.6403 12.8332C60.0021 12.8162 59.3589 12.7993 58.7207 12.7993C57.4394 12.7654 56.1728 12.7823 54.8767 12.6976C53.5855 12.6299 52.2993 12.5621 51.0131 12.4944C49.717 12.3928 48.4209 12.3081 47.1297 12.2064C41.8522 11.7491 36.6336 11.3087 31.4886 10.8683C26.2503 10.4788 20.9924 10.2924 15.7492 10.4279Z" fill="#99CBEB"/>
            </svg></Border>
          <List mirror={mirror} backgroundColour={backgroundColour}>

            <Typography variant="h2" className="title">Ingredients</Typography>
            {data?.sanityRecipes?.ingredientsList?.map((item) => {
              return (
                <li key={item?._key}>{`${item?.ingredient?.wholeNumber ? item?.ingredient?.wholeNumber : ''} ${item?.ingredient?.title} ${item?.ingredient?.preparation ? " - " + item?.ingredient?.preparation : ''}`}</li>
              )
            })}

          </List>
          <Border  backgroundColour={backgroundColour} style={{
             transform: ' rotate(180deg)',
          }}><svg width="443" height="36" viewBox="0 0 443 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7492 10.4279C10.4913 10.5973 5.22845 11.2579 0 12.4266V35.8657L443 35.8657V11.3087C441.463 10.682 439.892 10.0214 438.282 9.36084C436.672 8.70025 435.027 8.03966 433.343 7.46376C429.975 6.27809 426.47 9.05855 422.837 7.78819C408.281 3.09632 391.589 10.5738 373.292 7.4064C354.995 4.17122 335.093 1.88457 314.139 0.800529C293.186 -0.300451 271.178 -0.232698 248.654 0.800529C245.841 0.936034 243.018 1.07154 240.185 1.20704C237.357 1.39336 234.52 1.56275 231.677 1.74907C228.83 1.93538 225.977 2.13864 223.12 2.32496C220.238 2.57903 217.357 2.81617 214.465 3.07024C202.913 4.23897 191.327 0.915846 179.775 2.88067C156.667 6.81032 133.701 4.9087 111.319 9.21099C100.126 11.3791 89.0801 9.36083 78.2403 10.9191C76.8853 11.1224 75.5352 11.3087 74.1901 11.512L70.2135 12.0201C67.5772 12.3419 64.8721 12.7993 62.4861 12.7654L60.6403 12.8332C60.0021 12.8162 59.3589 12.7993 58.7207 12.7993C57.4394 12.7654 56.1728 12.7823 54.8767 12.6976C53.5855 12.6299 52.2993 12.5621 51.0131 12.4944C49.717 12.3928 48.4209 12.3081 47.1297 12.2064C41.8522 11.7491 36.6336 11.3087 31.4886 10.8683C26.2503 10.4788 20.9924 10.2924 15.7492 10.4279Z" fill="#99CBEB"/>
          </svg></Border>
        </ListWrapper>
      </Wrapper>

    </ModuleContainer>

  )
}

export const query = graphql`
  fragment RecipeBodySectionFragment on SanityRecipeBodySection {
    _key
    _type
    verticalSpace {
      topPadding
      bottomPadding
    }
    mirror
    backgroundColour {
      value
      label
    }
  }
`
