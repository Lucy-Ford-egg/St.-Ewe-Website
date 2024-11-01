// Sections
import heroHeaderSection from '../sections/heroHeaderSection'
import featureSection from '../sections/featureSection'
import accordionSection from '../sections/accordionSection'
import teamSection from '../sections/teamSection'
import titleSection from '../sections/titleSection'
import textSection from '../sections/textSection'
import borderSection from '../sections/borderSection'
import headerSection from '../sections/headerSection'
import recipesSection from '../sections/recipesSection'
import ctaSection from '../sections/ctaSection'
import imageSection from '../sections/imageSection'
import blogSection from '../sections/blogSection'

export const pageBuilder = [
  {type: heroHeaderSection.name},
  {type: headerSection.name},
  {type: titleSection.name},
  {type: textSection.name},
  {type: featureSection.name},
  {type: borderSection.name},
  {type: recipesSection.name},
  {type: imageSection.name},
  {type: blogSection.name},
  {type: ctaSection.name},
  {type: accordionSection.name},
  {type: teamSection.name},
]
