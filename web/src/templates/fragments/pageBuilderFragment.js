import { graphql } from "gatsby"

export const pageBuilderQuery = graphql`
  fragment PageBuilderFragment on SanityBlogSectionOrBorderSectionOrClientLoginSectionOrContactSectionOrCtaSectionOrEmbedSectionOrFeatureSectionOrFeaturesListSectionOrHeaderSectionOrHeroHeaderSectionOrHotspotSectionOrImageCarouselSectionOrLocationSectionOrNewsletterSectionOrRecipesSectionOrStepsSectionOrTeamSectionOrTestimonialSectionOrTextSectionOrTimelineSectionOrTitleSectionOrVideoSection {
    ... on SanityHeaderSection {
      ...HeaderSectionFragment
    }
    ... on SanityHeroHeaderSection{
      ...HeroHeaderSectionFragment
    }
    ... on SanityBorderSection{
      ...BorderSectionFragment
    }
    ... on SanityFeatureSection{
      ...FeatureSectionFragment 
    }
    ... on SanityTestimonialSection {
      ...TestimonialSectionFragment
    }
    ... on SanityTeamSection {
      ...TeamSectionFragment
    }
    ... on SanityTitleSection {
      ... TitleSectionFragment
    }
    ... on SanityTextSection {
      ... TextSectionFragment
    }
    ... on SanityEmbedSection {
      ... EmbedSectionFragment
    }
    ...on SanityRecipesSection {
      ... RecipesSectionFragment
    }
    ... on SanityVideoSection {
      ...VideoSectionFragment
    }
    ... on SanityCtaSection {
      ...CtaSectionFragment
    }
    ... on SanityNewsletterSection{
      ... NewsletterSectionFragment
    }      
    ... on SanityImageCarouselSection {
      ...ImageCarouselSectionFragment
    }
    ...on SanityBlogSection {
      ... BlogSectionFragment
    }
    ... on SanityTimelineSection{
      ... TimelineSectionFragment
    }
    ... on SanityContactSection {
      ... ContactSectionFragment
    }
    ... on SanityLocationSection {
      ... LocationSectionFragment
    }
  }
`