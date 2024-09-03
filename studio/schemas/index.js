import navigationType from '../schemas/navigation'
import navItemType from '../schemas/navItem'
import linkDefinedType from '../schemas/linkDefined'
import subItemType from '../schemas/subItem'
import linkType from '../schemas/link'
import categoriesType from '../schemas/categories'
import siteSettingsType, { companyDetailType, companyDetailsType, newsletterType, footerDetailsType } from '../schemas/siteSettings'
import designSystemColorType from '../schemas/designSystemColor'
// import faqsType from '../schemas/faqs'
import showArchiveType from '../schemas/showArchive'

// Docs
import authorType from '../schemas/author'
import postType from '../schemas/post'
import quoteType from '../schemas/quote'
import recipiesType from './recipies'
import pageType from '../schemas/page'
import teamMemberType from '../schemas/teamMember'

// Atoms
import ingredientsType from './ingredients'
import recipiesCategoryType from '../schemas/taxonomies/recipiesCategory'
import durationType from './parts/duration'
import servesType from './parts/serves'
import ingredientsList from './parts/ingredientsList'
import ingredientItem from './parts/ingredientItem'
import verticalSpace from './parts/verticalSpace'

import citeType from '../schemas/components/cite'
import externalCiteType from '../schemas/components/externalCite'
import sevicesType from '../schemas/taxonomies/services'
import showRecipiesArchiveType from './components/showRecipiesArchive'
import accordionTileType from '../schemas/components/accordionTile'
import imageOptionsType from '../schemas/imageOptions'

//Sections
import borderSectionType from '../schemas/sections/borderSection'

import headerSectionType from '../schemas/sections/headerSection'
import testimonialSectionType from '../schemas/sections/testimonialSection'
import testimonialTileType from '../schemas/sections/testimonialTile'
import teamSectionType from '../schemas/sections/teamSection'
import recipiesSectionType from './sections/recipiesSection'
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
import contactSectionType from '../schemas/sections/contactSection'
import locationSectionType from '../schemas/sections/locationSection'
import loginTileType from '../schemas/sections/loginTile'
import clientLoginSectionType from '../schemas/sections/clientLoginSection'


// Older schema
import videoIdType from '../schemas/videoId'
import iconsType from '../schemas/icons'
import colorChoiceType from '../schemas/colorChoice'
import overlayType from '../schemas/overlay'
import textAlignType from '../schemas/textAlign'

import servicesTileType from '../schemas/modules/servicesTile'
import benifitsSectionType from "../schemas/modules/benifitsSection"




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
  footerDetailsType,
  imageOptionsType,

  // Parts
  durationType,
  servesType,
  ingredientsList,
  ingredientItem,
  verticalSpace,
  // Atoms


  ingredientsType,
  recipiesCategoryType,
  citeType,
  externalCiteType,
  showRecipiesArchiveType,
  accordionTileType,
  
  // Taxonomies
  sevicesType,

  // Docs 
  postType,
  pageType,
  recipiesType,
  quoteType,
  teamMemberType,

  // Sections
  borderSectionType,

  headerSectionType,
  teamSectionType,
  recipiesSectionType,
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
  loginTileType,
  clientLoginSectionType,

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

  defaultColorList : [
    { label: 'Original Primary', value: '#2661ab' },
    { label: 'Original Medium', value: '#99cbeb' },
    { label: 'Orignal Large', value: '#1b2e51' },
    { label: 'Rich Yolk Primary', value: '#eb7806' },
    { label: 'Rich Yolk Secondary', value: '#fcc501' },
    { label: 'Super Eggs Primary', value: '#006d69' },
    { label: 'Super Eggs Secondary', value: '#d1e0d7' },
    { label: 'Super Eggs Secondary Dark', value: '#045b54' },
    { label: 'Super Eggs Secondary Accent', value: '#e9551d' },
    { label: 'Rich Yolk Opulent Hot Foil', value: '#e5ab4a' },
    { label: 'Rich Yolk Opulent Primary', value: '#202020' },
    { label: 'Rich Yolk Opulent Secondary', value: '#000000' },
    { label: 'Grand Primary', value: '#848886' },
    { label: 'White', value: '#ffffff' },
    { label: 'Dabbling Duck Primary', value: '#27224e' },
    { label: 'Dabbling Duck Secondary', value: '#625e9c' },
    { label: 'Quirky Quail Primary', value: '#3b2516' },
    { label: 'Quirky Quail Secondary', value: '#fcedde' }
  ]
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