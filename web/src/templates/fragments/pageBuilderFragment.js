import { graphql } from "gatsby"

export const pageBuilderQuery = graphql`
  fragment PageBuilderFragment on SanityBlogSectionOrClientLoginSectionOrContactSectionOrCtaSectionOrFeaturesListSectionOrHeaderSectionOrImageCarouselSectionOrLocationSectionOrNewsletterSectionOrRecipiesSectionOrStepsSectionOrTeamSectionOrTestimonialSectionOrTimelineSectionOrVideoSection {
    ... on SanityHeaderSection {
      ...HeaderSectionFragment
    }
    ... on SanityTestimonialSection {
      ...TestimonialSectionFragment
    }
    ... on SanityTeamSection {
      ...TeamSectionFragment
    }
    ...on SanityRecipiesSection {
      ... RecipiesSectionFragment
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
    ... on SanityStepsSection{
      ... StepsSectionFragment
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