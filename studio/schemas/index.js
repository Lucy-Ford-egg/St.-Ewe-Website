import navigation from './navigation'
import navItem from './navItem'
import linkDefined from './parts/linkDefined'
import subItem from './subItem'
import link from './parts/link'
import categories from './taxonomies/categories'
import siteSettings, { companyDetail, companyDetails, newsletter } from './siteSettings'
import footerContent, { footerMenu, accreditations, accreditation } from './footerContent'
import designSystemColor from './designSystemColor'
// import faqs from '../schemas/faqs'
import showArchive from './showArchive'
// Docs
import author from './author'
import post from './post'
import quote from './quote'
import recipes from './recipies'
import page from './page'
import teamMember from './teamMember'
// Atoms
import ingredient from './ingredients'
import recipesCategory from './taxonomies/recipesCategory'
import duration from './parts/duration'
import serves from './parts/serves'
import ingredientsList from './parts/ingredientsList'
import ingredientItem from './parts/ingredientItem'
import verticalSpace from './parts/verticalSpace'
import containerWidth from './parts/containerWidth'
import hotspotItem from './parts/hotspotItem'
import supportAssets from './parts/supportingAssets'
import textColumns from './parts/textColumns'
import imageLink from './parts/imageLink'

import cite from './components/cite'
import externalCite from './components/externalCite'
import showRecipesArchive from './parts/showRecipesArchive'
import accordionTile from './components/accordionTile'
import imageOptions from './imageOptions'

//Sections
import imageSection from './sections/imageSection'
import heroHeaderSection from './sections/heroHeaderSection'
import blogSection from './sections/blogSection'
import featureSection from './sections/featureSection'
import embedSection from './sections/embedSection'
import titleSection from './sections/titleSection'
import textSection from './sections/textSection'
import borderSection from './sections/borderSection'
import hotspots from './hotspots'
import hotspotSection from './sections/hotspotSection'
import headerSection from './sections/headerSection'
import testimonialSection from './sections/testimonialSection'
import testimonialTile from './sections/testimonialTile'
import teamSection from './sections/teamSection'
import recipesSection from './sections/recipesSection'
import ctaSection from './sections/ctaSection'
import featuresListSection from './sections/featuresListSection'
import featuresTile from './sections/featuresTile'
import videoSection from './sections/videoSection'
import newsletterSection from './sections/newsletterSection'
import stepsSection from './sections/stepsSection'
import stepTile from './sections/stepTile'
import stepDivider from './sections/stepDivider'
import timelineSection from './sections/timelineSection'
import timeTile from './sections/timeTile'
import contactSection from './sections/contactSection'
import locationSection from './sections/locationSection'
import loginTile from './sections/loginTile'
import clientLoginSection from './sections/clientLoginSection'
// Older schema
import videoId from './videoId'
import icons from './icons'
import colorChoice from './colorChoice'
import overlay from './overlay'
import textAlign from './parts/textAlign'
import servicesTile from './modules/servicesTile'
import benifitsSection from "./modules/benifitsSection"
import headerSectionAccommodationSearch from './modules/headerSectionAccommodationSearch'

export const schema = {
  types: [
    // Settings
    footerContent,
    footerMenu,
    accreditations,
    accreditation,
    

    siteSettings,
    companyDetail,
    companyDetails,
    newsletter,
    designSystemColor,

    imageOptions,
    // Parts
    duration,
    serves,
    ingredientsList,
    ingredientItem,
    verticalSpace,
    containerWidth,
    hotspots,
    supportAssets,
    textColumns,
    imageLink,
    // Atoms
    ingredient,
    recipesCategory,
    cite,
    externalCite,
    showRecipesArchive,
    accordionTile,
    // Taxonomies
    // Docs 
    post,
    page,
    hotspotItem,
    recipes,
    quote,
    teamMember,
    // Sections
    imageSection,
    heroHeaderSection,
    featureSection,
    embedSection,
    titleSection,
    textSection,
    borderSection,
    hotspotSection,
    headerSection,
    teamSection,
    recipesSection,
    newsletterSection,
    videoSection,
    featuresListSection,
    ctaSection,
    featuresTile,
    blogSection,
    testimonialTile,
    stepsSection,
    stepTile,
    stepDivider,
    timelineSection,
    timeTile,
    loginTile,
    clientLoginSection,
    videoId,
    // faqs,
    icons,
    textAlign,
    // videoId,
    overlay,
    colorChoice,
    showArchive,

    //Old

    // Navigation
    navigation,
    navItem,
    link,
    linkDefined,
    //Old

    // Taxonomies
    author,
    categories,
    //Old

    // Modules
    headerSectionAccommodationSearch,
    testimonialSection,
    locationSection,
    // faqsSection,
    benifitsSection,
    contactSection,

    // Old

    // Components

    servicesTile,

    subItem,
    // Old],
  ]
}


export const googleMaps = {
  apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
}

export const brandColors = {
  // Note: These are both optional
  defaultColorFormat: 'rgba',

  defaultColorList: [
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
    { label: 'Quirky Quail Secondary', value: '#fcedde' },
    { label: 'Transparent', value: 'transparent' },
    { label: 'Off White', value: '#F7F7F7'},
  ]
}

export const brandSpacing = [
  { "MS-5": 5 },
  { "MS-4": 6 },
  { "MS-3": 9 },
  { "MS-1": 10 },
  { "MS-2": 14 },
  { "MS0": 16 },
  { "MS1": 23 },
  { "MS2": 26 },
  { "MS3": 37 },
  { "MS4": 42 },
  { "MS5": 59 },
  { "MS6": 68 },
  { "MS7": 96 },
  { "MS8": 110 },
  { "MS9": 155 },
]