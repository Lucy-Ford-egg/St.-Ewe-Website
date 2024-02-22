import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import subItemType from '../schemas/subItem'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType, { companyDetailType, companyDetailsType, newsletterType } from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'
// import faqsType from '../schemas/faqs'
import showArchiveType from '../schemas/showArchive'

// Docs
import authorType from '../schemas/author'
import postType from '../schemas/post'
import quoteType from '../schemas/quote'
import caseStudyType from '../schemas/caseStudy'
import pageType from '../schemas/page'
import teamMemberType from '../schemas/teamMember'

// Atoms
import citeType from '../schemas/components/cite'
import externalCiteType from '../schemas/components/externalCite'
import sevicesType from '../schemas/taxonomies/services'
import showCaseStudyArchiveType from '../schemas/components/showCaseStudyArchive'

//Sections
import headerSectionType from '../schemas/sections/headerSection'
import testimonialSectionType from '../schemas/sections/testimonialSection'
import testimonialTileType from '../schemas/sections/testimonialTile'
import teamSectionType from '../schemas/sections/teamSection'
import caseStudySectionType from '../schemas/sections/caseStudySection'
import ctaSectionType from '../schemas/sections/ctaSection'
import featuresListSectionType from '../schemas/sections/featuresListSection'
import featuresTileType from '../schemas/sections/featuresTile'
import videoSectionType from '../schemas/sections/videoSection'
import newsletterSectionType from '../schemas/sections/newsletterSection'
import imageCarouselSectionType from './sections/imageCarouselSection'
import stepsSectionType from '../schemas/sections/stepsSection' 
import stepTileType from '../schemas/sections/stepTile'
import stepDividerType from '../schemas/sections/stepDivider'
import timelineSectionType from '../schemas/sections/timelineSection'
import timeTileType from '../schemas/sections/timeTile'

// Older schema
import videoIdType from '../schemas/videoId'
import iconsType from '../schemas/icons'
import colorChoiceType from '../schemas/colorChoice'
import overlayType from '../schemas/overlay'
import textAlignType from '../schemas/textAlign'

import servicesTileType from '../schemas/modules/servicesTile'


import locationSectionType from '../schemas/modules/locationSection'
import benifitsSectionType from "../schemas/modules/benifitsSection"
import contactSectionType from '../schemas/modules/contactSection'



// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import featureSectionType from './modules/featureSection'



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

  // Atoms
  citeType,
  externalCiteType,
  showCaseStudyArchiveType,
  
  // Taxonomies
  sevicesType,

  // Docs 
  postType,
  pageType,
  caseStudyType,
  quoteType,
  teamMemberType,

  // Sections
  headerSectionType,
  teamSectionType,
  caseStudySectionType,
  newsletterSectionType,
  videoSectionType,
  featuresListSectionType,
  ctaSectionType,
  featuresTileType,
  blogSectionType,
  testimonialTileType,
  stepsSectionType,
  stepTileType,
  stepDividerType,
  timelineSectionType,
  timeTileType,

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

  // Modules
  headerSectionAccommodationSearchType,
  featureSectionType,

  servicesSectionType,
  testimonialSectionType,
  imageCarouselSectionType,
  locationSectionType,
  // faqsSectionType,
  benifitsSectionType,
  contactSectionType,

  // Old

  // Components

  servicesTileType,

  subItemType,
  // Old
]

export const googleMaps = {
  apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
}

export const brandColors = {
  // Note: These are both optional
  defaultColorFormat: 'rgba',
  defaultColorList: [
    { label: 'Coral', value: '#F04D5F' },
    { label: 'Coral Light', value: '#F47C8A' },
    { label: 'Coral Lighter', value: '#FCD9DE' },
    { label: 'Coral Lightest', value: '#FDE3E6' },
    { label: 'Text Grey', value: '#414042' },
    { label: 'Mid Grey', value: '#B8B6B9' },
    { label: 'Light Grey', value: '#F3F3F2' },
    { label: 'Navy', value: '#002856' },
    { label: 'Mid Navy', value: '#00397A' },
    { label: 'Navy Uncoated', value: '#375073'},
    { label: 'White', value: '#FFFFFF' },
  ],
}

// palette: {
//   primary: {
//     main: '#F04D5F', // Coral
//     mid: '#F26979', // Crayola
//     light: '#F47C8A', // Light Coral
//     lighter: '#FCD9DE', // Lighter Coral
//     lightest: '#FDE3E6', // Lightest Coral
//   },
//   secondary: {
//     main: '#002856', // Navy
//     mid: '#375073', // Navy Uncoated
//     light: '#42608A', // Light Navy
//   },
//   tertiary: {
//     main: 'rgba(93, 83, 64, 1)',
//   },
//   text: {
//     primary: '#414042', // Text Grey
//     mid: '#B8B6B9', // Mid Grey
//   },
//   background: {
//     default: '#F3F3F2', // Light Grey
//     main: '#002856',
//   },
//   white: {
//     main: '#ffffff', // White
//   },