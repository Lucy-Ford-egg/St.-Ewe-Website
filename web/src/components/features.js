import React from "react"
import { graphql } from "gatsby"
import { Container } from "@mui/material"
import {FeaturesGrid} from "../components/featuresGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Features = ({ gridTitleSubtitleText, features, allFeature, pageContext}) => {
  
  return (
    <Container className="section features" maxWidth="xl" sx={{ pt: { xs: 10, md: 11 }}}>

      <TitleSubtitleText displayTitle={gridTitleSubtitleText?.displayTitle} subtitle={gridTitleSubtitleText?.subtitle} text={gridTitleSubtitleText?.text} titleSize={gridTitleSubtitleText?.titleSize} subtitlePosition={gridTitleSubtitleText?.subtitlePosition} titleWidth={gridTitleSubtitleText?.titleWidth}/>

      <FeaturesGrid allFeature={allFeature} features={features} pageContext={pageContext}/>

    </Container>
  )
}

export const query = graphql`
fragment FeaturesGridFragment on SanityFeatureGrid {
  ...FeatureFragment
  gridTitleSubtitleText {
    ...TitleSubtitleTextFragment
  }
}
`
