import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import subItemType from '../schemas/subItem'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType, {companyDetailType, companyDetailsType, newsletterType } from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'
import faqsType from '../schemas/faqs'
import showArchiveType from '../schemas/showArchive'

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
import benifitsSectionType from "../schemas/modules/benifitsSection"
import contactSectionType from '../schemas/modules/contactSection'

import unitType from '../schemas/unit'
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
import faqsSectionType from './modules/faqsSection'
import blogSectionType from './modules/blogSection'

export const schemaTypes = [
  // Settings
  siteSettingsType,
  companyDetailType,
  companyDetailsType,
  newsletterType,
  designSystemColorType,
  faqsType,
  iconsType,
  textAlignType,
  videoIdType,
  overlayType,
  colorChoiceType,
  showArchiveType,
  //Old

  // Navigation
  navigationType,
  navItemType,
  linkType,
  linkDefinedType,
  //Old

  // Taxonomies
  authorType,
  categoriesType, 
  //Old
  
  // Objects
  unitType, 
  postType,
  pageType,
  //Old
  
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
  faqsSectionType,
  benifitsSectionType,
  contactSectionType,
  blogSectionType,
  // Old

  // Components
  featuresTileType,
  servicesTileType,
  testimonialTileType,
  subItemType,
  // Old
 

]
