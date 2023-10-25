import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType from '../schemas/siteSettings'
import {ballotSetupType} from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'

import placeCategoriesType from '../schemas/placeCategories'
import placeType from '../schemas/place'
import authorType from '../schemas/author'
import postType  from '../schemas/post'
import pageType from '../schemas/page'

// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import imageWithCaptionType from '../schemas/modules/imageWithCaption'
import textBlockType from '../schemas/modules/textBlock'
import embedBlockType from '../schemas/modules/embedBlock'
import imageCarouselCaptionLinkType from '../schemas/modules/imageCarouselCaptionLink'
import linkGroupType from '../schemas/modules/linkGroup'
import heroCallToActionType from '../schemas/modules/heroCallToAction'
import mapType from '../schemas/modules/map'
import twoColumnTitleTextCtaType from '../schemas/modules/twoColumnTitleTextCta'
import imageCarouselSubtitleTitleTextLinkType from '../schemas/modules/imageCarouselSubtitleTitleTextLink'
import placesGridType from '../schemas/modules/placesGrid'
import postsGridType from '../schemas/modules/postsGrid'
import heroNewsletterType from '../schemas/modules/heroNewsletter'
import heroInfoCallToActionType from '../schemas/modules/heroInfoCallToAction'
import imageTextCallToActionImageType from '../schemas/modules/imageTextCallToActionImage'
import imageWithLinkType from '../schemas/modules/imageWithLink'
import instagramModuleType from '../schemas/modules/instagramModule'

//Components
import titleTextType from '../schemas/components/titleText'
import titleSubtitleTextType from '../schemas/components/titleSubtitleText'
import imageCaptionType from '../schemas/components/imageCaption'
import externalLinkType from './components/externalLink'
import internalLinkType from './components/internalLink'
import heroSlideType from './components/heroSlide'
import blockquoteType from './components/blockquote'
import instagramEmbedsType from './components/instagramEmbeds'



export const schemaTypes = [

  // Settings

  siteSettingsType,
  ballotSetupType,
  designSystemColorType,
  // Navigation
  navigationType,
  navItemType,
  linkType,
  linkDefinedType,
  // Taxonomies
  authorType,
  // Objects
  placeType, 
  postType,
  pageType,
  // Modules
  headerSectionAccommodationSearchType,
  // Old Modules
  imageWithCaptionType,
  textBlockType, 
  embedBlockType,
  imageCarouselCaptionLinkType, 
  linkGroupType,
  heroCallToActionType,
  mapType,
  twoColumnTitleTextCtaType,
  imageCarouselSubtitleTitleTextLinkType,
  placesGridType,
  postsGridType,
  heroNewsletterType,
  heroInfoCallToActionType,
  imageTextCallToActionImageType,
  imageWithLinkType,
  instagramModuleType,
  // Components
  titleTextType,
  titleSubtitleTextType,
  imageCaptionType,
  externalLinkType,
  internalLinkType,
  heroSlideType,
  blockquoteType,
  instagramEmbedsType,
  // Categories
 
  placeCategoriesType,
  categoriesType, 
]
