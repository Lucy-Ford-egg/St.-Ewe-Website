import React from "react"
import { graphql } from "gatsby"
import {FeaturesGrid} from "../components/featuresGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Features = ({ disableTopPadding, gridTitleSubtitleText, features, allFeature, pageContext}) => {
  
  return (
    <>

      <TitleSubtitleText disableTopPadding={disableTopPadding} displayTitle={gridTitleSubtitleText?.displayTitle} subtitle={gridTitleSubtitleText?.subtitle} text={gridTitleSubtitleText?.text} titleSize={gridTitleSubtitleText?.titleSize} subtitlePosition={gridTitleSubtitleText?.subtitlePosition}/>

      <FeaturesGrid allFeature={allFeature} features={features} pageContext={pageContext}/>

    </>
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
export const allFeatures = graphql`
fragment AllFeaturesGridFragment on SanityFeatureConnection {
  nodes {
   ...FeatureFragment
  }
}
`