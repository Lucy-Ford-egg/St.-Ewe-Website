import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkType from '../schemas/link'

import locationType from '../schemas/location'
import categoriesType from '../schemas/categories'
import placeType from '../schemas/place'
import newsType  from '../schemas/news'
import authorType from '../schemas/author'
import postType  from '../schemas/post'
import pageType from '../schemas/page'
import moduleSpacingType from '../schemas/moduleSpacing'
import imageWithCaptionType from '../schemas/modules/imageWithCaption'
import textBlockType from '../schemas/modules/textBlock'
import imageCarouselCaptionLinkType from '../schemas/modules/imageCarouselCaptionLink'
import linkGroupType from '../schemas/modules/linkGroup'
import heroCallToActionType from '../schemas/modules/heroCallToAction'
import mapType from '../schemas/modules/map'
import twoColumnTitleTextCtaType from '../schemas/modules/twoColumnTitleTextCta'
import imageCarouselSubtitleTitleTextLinkType from '../schemas/modules/imageCarouselSubtitleTitleTextLink'
import placesGridType from '../schemas/modules/placesGrid'
import postsGridType from '../schemas/modules/postsGrid'
import heroNewsletterType from '../schemas/modules/heroNewsletter'
import categoryFeatureType from '../schemas/modules/categoryFeature'
import heroInfoCallToActionType from '../schemas/modules/heroInfoCallToAction'

//Components
import titleTextType from '../schemas/components/titleText'
import titleSubtitleTextType from '../schemas/components/titleSubtitleText'
import imageCaptionType from '../schemas/components/imageCaption'
import externalLinkType from './components/externalLink'
import internalLinkType from './components/internalLink'
import heroSlideType from './components/heroSlide'

export const schemaTypes = [
  navigationType,
  navItemType,
  linkType,
  moduleSpacingType,
  // Taxonomies
  categoriesType,
  locationType, 
  authorType,
  // Objects
  placeType, 
  newsType, 
  postType, 
  pageType,
  // Modules
  imageWithCaptionType,
  textBlockType, 
  imageCarouselCaptionLinkType, 
  linkGroupType,
  heroCallToActionType,
  mapType,
  twoColumnTitleTextCtaType,
  imageCarouselSubtitleTitleTextLinkType,
  placesGridType,
  postsGridType,
  heroNewsletterType,
  categoryFeatureType,
  heroInfoCallToActionType,
  // Components
  titleTextType,
  titleSubtitleTextType,
  imageCaptionType,
  externalLinkType,
  internalLinkType,
  heroSlideType,
]
