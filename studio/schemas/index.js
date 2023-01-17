import locationType from '../schemas/location'
import categoriesType from '../schemas/categories'
import placeType from '../schemas/place'
import newsType  from '../schemas/news'
import authorType from '../schemas/author'
import postType  from '../schemas/post'
import pageType from '../schemas/page'
import imageWithCaptionType from '../schemas/modules/imageWithCaption'
import textBlockType from '../schemas/modules/textBlock'
import imageCarouselCaptionLinkType from '../schemas/modules/imageCarouselCaptionLink'
import linkGroupType from '../schemas/modules/linkGroup'
import heroCallToActionType from '../schemas/modules/heroCallToAction'
import mapType from '../schemas/modules/map'
import twoColumnTitleTextCtaType from '../schemas/modules/twoColumnTitleTextCta'
//Components
import titleTextType from '../schemas/components/titleText'
import imageCaptionType from '../schemas/components/imageCaption'
import externalLinkType from './components/externalLink'
import internalLinkType from './components/internalLink'

export const schemaTypes = [
  locationType, 
  placeType, 
  categoriesType, 
  newsType, 
  authorType,
  postType, 
  pageType, 
  imageWithCaptionType,
  textBlockType, 
  imageCarouselCaptionLinkType, 
  linkGroupType,
  heroCallToActionType,
  mapType,
  twoColumnTitleTextCtaType,
  // Components
  titleTextType,
  imageCaptionType,
  externalLinkType,
  internalLinkType
]
