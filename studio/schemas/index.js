import locationType from '../schemas/location'
import categoriesType from '../schemas/categories'
import placesType from '../schemas/places'
import newsType  from '../schemas/news'
import authorType from '../schemas/author'
import pageType from '../schemas/page'
import imageWithCaptionType from '../schemas/modules/imageWithCaption'
import heroType from '../schemas/modules/hero'
import textBlockType from '../schemas/modules/textBlock'
import imageCarouselCaptionLinkType from '../schemas/modules/imageCarouselCaptionLink'
import linkGroupType from '../schemas/modules/linkGroup'
import heroCallToActionType from '../schemas/modules/heroCallToAction'
import mapType from '../schemas/modules/map'
import titleTextType from '../schemas/components/titleText'
import twoColumnTitleTextCtaType from '../schemas/modules/twoColumnTitleTextCta'

export const schemaTypes = [
  locationType, 
  placesType, 
  categoriesType, 
  newsType, 
  authorType, 
  pageType, 
  imageWithCaptionType, 
  heroType,
  textBlockType, 
  imageCarouselCaptionLinkType, 
  linkGroupType, 
  heroCallToActionType,
  mapType,
  twoColumnTitleTextCtaType,
  // Components
  titleTextType
]
