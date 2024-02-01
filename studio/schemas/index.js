import {locate} from '../locate'

import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import subItemType from '../schemas/subItem'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType, {companyDetailType, companyDetailsType, newsletterType } from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'
// import faqsType from '../schemas/faqs'
import showArchiveType from '../schemas/showArchive'

//Sections
import headerSectionType from '../schemas/sections/headerSection'
import testimonialSectionType from '../schemas/sections/testimonialSection'
import testimonialTileType from '../schemas/sections/testimonialTile'


// Older schema
import videoIdType from '../schemas/videoId'
import iconsType from '../schemas/icons'
import colorChoiceType from '../schemas/colorChoice'
import overlayType from '../schemas/overlay'
import textAlignType from '../schemas/textAlign'
import featuresTileType from '../schemas/modules/featuresTile'
import servicesTileType from '../schemas/modules/servicesTile'


import imageCarouselSectionType from '../schemas/modules/imageCarouselSection'
import locationSectionType from '../schemas/modules/locationSection'
import benifitsSectionType from "../schemas/modules/benifitsSection"
import contactSectionType from '../schemas/modules/contactSection'

import authorType from '../schemas/author'
import postType  from '../schemas/post'
import caseStudyType  from '../schemas/caseStudy'
import pageType from '../schemas/page'


// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'
import featuresListSectionType from './modules/featuresListSection'
import ctaSectionType from './modules/ctaSection'
import servicesSectionType from './modules/servicesSection'
// import faqsSectionType from './modules/faqsSection'
import blogSectionType from './modules/blogSection'

export const schemaTypes = [
  // Settings
  siteSettingsType,
  companyDetailType,
  companyDetailsType,
  newsletterType,
  designSystemColorType,

  // Sections

  headerSectionType,
  // faqsType,
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
  postType,
  pageType,
  caseStudyType,
  //Old
  
  // Modules
  headerSectionAccommodationSearchType,
  featureSectionType,
  videoSectionType,
  featuresListSectionType,
  ctaSectionType,
  servicesSectionType,
  testimonialSectionType,
  imageCarouselSectionType,
  locationSectionType,
  // faqsSectionType,
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

export const presentationConfig = {
  // Required: set the base URL to the preview location in the front end
  previewUrl: 'http://localhost:8000', //'https://taylormoney.netlify.app'
  locate: locate,
}

export const googleMaps = {
  apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
}

export const brandColors = {
  // Note: These are both optional
  defaultColorFormat: 'rgba',
  defaultColorList: [
    { label: 'Coral', value: '#F04D5F' },
    { label: 'Coral Light', value: '#F47C8A' },       
    { label: 'Text Grey', value: '#414042' },
    { label: 'Mid Grey', value: '#B8B6B9' },
    { label: 'Light Grey', value: '#F3F3F2' },
    { label: 'Navy', value: '#002856' },
    { label: 'White', value: '#FFFFFF' },
  ],
}
