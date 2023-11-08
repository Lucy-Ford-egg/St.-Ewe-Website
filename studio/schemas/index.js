import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType, { ballotSetupType, companyDetailsType, awardsWonType, awardType, newsletterType } from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'
import videoIdType from '../schemas/videoId'
import iconsType from '../schemas/icons'
import colorChoiceType from '../schemas/colorChoice'
import overlayType from '../schemas/overlay'
import textAlignType from '../schemas/textAlign'
import featuresTileType from '../schemas/modules/featuresTile'
import servicesTileType from '../schemas/modules/servicesTile'
import testimonialTileType from '../schemas/modules/testimonialTile'
import testimonialSectionType from '../schemas/modules/testimonialSection'
import imageCarouselSectionType from '../schemas/modules/imageCarouselSection'
import locationSectionType from '../schemas/modules/locationSection'

import placeCategoriesType from '../schemas/placeCategories'
import placeType from '../schemas/place'
import authorType from '../schemas/author'
import postType  from '../schemas/post'
import pageType from '../schemas/page'

// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import unitsListsSectionType from './modules/unitsListsSection'
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'
import featuresListSectionType from './modules/featuresListSection'
import ctaSectionType from './modules/ctaSection'
import servicesSectionType from './modules/servicesSection'

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
  companyDetailsType,
  awardsWonType,
  awardType,
  newsletterType,
  designSystemColorType,
  iconsType,
  textAlignType,
  videoIdType,
  overlayType,
  colorChoiceType,
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
  unitsListsSectionType,
  featureSectionType,
  videoSectionType,
  featuresListSectionType,
  ctaSectionType,
  servicesSectionType,
  testimonialSectionType,
  imageCarouselSectionType,
  locationSectionType,
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
  featuresTileType,
  servicesTileType,
  testimonialTileType,
// Old Components
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
