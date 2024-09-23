import { graphql } from "gatsby"

export const pageBuilderQuery = graphql`
  fragment PageBuilderFragment on SanityBlogSectionOrBorderSectionOrClientLoginSectionOrContactSectionOrCtaSectionOrEmbedSectionOrFeatureSectionOrFeaturesListSectionOrHeaderSectionOrHotspotSectionOrImageCarouselSectionOrLocationSectionOrNewsletterSectionOrRecipesSectionOrStepsSectionOrTeamSectionOrTestimonialSectionOrTextSectionOrTimelineSectionOrTitleSectionOrVideoSection {
    ... on SanityHeaderSection {
      ...HeaderSectionFragment
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
    ... on SanityFeaturesListSection {
      ...FeaturesListSectionFragment
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
    ... on SanityClientLoginSection {
      ... ClientLoginSectionFragment
    }
  }
`