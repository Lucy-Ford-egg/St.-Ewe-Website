import { graphql } from "gatsby"

export const pageBuilderQuery = graphql`
  fragment PageBuilderFragment on SanityAccordionSectionOrBlogSectionOrBorderSectionOrCtaSectionOrFeatureSectionOrHeaderSectionOrHeroHeaderSectionOrImageSectionOrRecipesSectionOrTextSectionOrTitleSection {
    ... on SanityHeaderSection {
      ...HeaderSectionFragment
    }
    ... on SanityHeroHeaderSection {
      ...HeroHeaderSectionFragment
    }
    ... on SanityBorderSection {
      ...BorderSectionFragment
    }
    ... on SanityFeatureSection {
      ...FeatureSectionFragment
    }
    ... on SanityTitleSection {
      ...TitleSectionFragment
    }
    ... on SanityTextSection {
      ...TextSectionFragment
    }
    ... on SanityRecipesSection {
      ...RecipesSectionFragment
    }
    ... on SanityImageSection {
      ...ImageSectionFragment
    }
    ... on SanityBlogSection {
      ...BlogSectionFragment
    }
    ... on SanityCtaSection {
      ...CtaSectionFragment
    }
    ... on SanityAccordionSection {
      ...AccordionSectionFragment
    }
  }
`
// ... on SanityNewsletterSection{
//   ... NewsletterSectionFragment
// }
// ... on SanityEmbedSection {
//   ... EmbedSectionFragment
// }
// ... on SanityVideoSection {
//   ...VideoSectionFragment
// }

// ... on SanityTimelineSection{
//   ... TimelineSectionFragment
// }
// ... on SanityContactSection {
//   ... ContactSectionFragment
// }
// ... on SanityLocationSection {
//   ... LocationSectionFragment
// }
// ... on SanityTestimonialSection {
//   ...TestimonialSectionFragment
// }
// ... on SanityTeamSection {
//   ...TeamSectionFragment
// }
