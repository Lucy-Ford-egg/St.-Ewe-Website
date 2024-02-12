import React from 'react'

import { BlogSection } from "./blogSection"

import { HeaderSection } from './headerSection'
import { FeatureSection } from './featureSection'
import { VideoSection } from './videoSection'
import { FeaturesListSection } from './featuresListSection'
import { CtaSection } from './ctaSection'
import { ServicesSection } from './servicesSection'
import { TestimonialSection } from './testimonialSection'
import { ImageCarouselSection } from './imageCarouselSection'
import { LocationSection } from './locationSection'
import { FaqsSection } from './faqsSection'
import { BenifitsSection } from './benifitsSection'
import { ContactSection } from './contactSection'
import { TeamSection } from './teamSection'
import {CaseStudySection} from './caseStudySection'


// import { Places } from './places'
// import { Posts } from './posts'
// import { ImageCaption } from './imageCaption'
// import { Text } from './text'
// import { GalleryCarousel } from './galleryCarousel'
// import { HeroCallToAction } from './heroCallToAction'
// import { HeroNewsletter } from './heroNewsletter'
// import { MultiColumnTitleTextLink } from './multiColumnTitleTextLink'
// import { Map } from './map'
// import { CategoryFeature } from './categoryFeature'
// import { HeroInfoCallToAction } from './heroInfoCallToAction'
// import { TitleSubtitleText } from './titleSubtitleText'
// import { ImageTextCallToActionImage } from './imageTextCallToActionImage'
// import { ImageLink } from './imageLink'
// import { InstagramEmbed } from './InstagramEmbed'




const Modules = (props) => {

    const { sanityConfig, previewData, modules, allFeature, placeLocation, pageContext, allSanityPost, allSanityCaseStudy,  blogInserted } = props

    function isModule(moduletype, testname) {
        console.log(`Modules - ${moduletype} | ${testname}`)
        
        if (moduletype?._type?.indexOf(testname) >= 0) {
            return true
        } else {
            return false
        }
    }

    if (modules != null) {
      
        return (

            <main data-content="main">
                
                {modules.map((module, i) => {

                    if (isModule(module, 'blogSection')) {
                        return <BlogSection previewData={previewData && previewData[i]}
                            sanityConfig={sanityConfig}
                            pageContext={pageContext}
                            key={module._key + i}
                            allSanityPost={allSanityPost}
                            {...module} />
                    }

                    if (isModule(module, 'headerSection')) {
                        return (
                            <HeaderSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }

                    if (isModule(module, 'testimonialSection')) {
                        
                        return (
                            <TestimonialSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }

                    if (isModule(module, 'teamSection')) {
                        
                        return (
                            <TeamSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                               
                                {...module} />
                        )
                    }

                    if (isModule(module, 'caseStudySection')) {
                        return <CaseStudySection previewData={previewData && previewData[i]}
                            sanityConfig={sanityConfig}
                            pageContext={pageContext}
                            key={module._key + i}
                            allSanityPost={allSanityPost}
                            allSanityCaseStudy={allSanityCaseStudy}
                            {...module} />
                    }
                    
                    if (isModule(module, 'featureSection')) {
                        return (
                            <FeatureSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'videoSection')) {

                        return (
                            <VideoSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'featuresListSection')) {
                        return (
                            <FeaturesListSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'ctaSection')) {
                        return (
                            <CtaSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'servicesSection')) {
                        return (
                            <ServicesSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    
                    if (isModule(module, 'imageCarouselSection')) {
                        return (
                            <ImageCarouselSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'locationSection')) {
                        return (
                            <LocationSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'faqsSection')) {
                        return (
                            <FaqsSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'benifitsSection')) {
                        return (
                            <BenifitsSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    if (isModule(module, 'contactSection')) {
                        return (
                            <ContactSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    // if (isModule(module, 'imageCarouselSubtitleTitleTextLink')) {
                    //     return <Carousel {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "placesGrid")) {
                    //     return <Places {...module} allPlace={allPlace} key={module._key + i} pageContext={pageContext} />
                    // }
                    // else if (isModule(module, "postsGrid")) {
                    //     return <Posts {...module} allPost={allPost} key={module._key + i} pageContext={pageContext} />
                    // }
                    // else if (isModule(module, "featureGrid")) {
                    //     return <Features {...module} disableTopPadding={i === 0 ? true : false}  allFeature={allFeature} key={module._key + i} pageContext={pageContext} />
                    // }
                    // else if (isModule(module, "imageWithCaption")) {
                    //     return <ImageCaption {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "textBlock")) {

                    //     return <Text previewData={previewData && previewData.pageBuilder[i]} sanityConfig={sanityConfig} {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "imageCarouselCaptionLink")) {
                    //     return <GalleryCarousel {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "heroCallToAction")) {
                    //     return <HeroCallToAction previewData={previewData && previewData.pageBuilder && previewData.pageBuilder[i]} sanityConfig={sanityConfig} {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "heroNewsletter")) {
                    //     return <HeroNewsletter {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "map")) {
                    //     return <Map {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "twoColumnTitleTextCta")) {
                    //     return <MultiColumnTitleTextLink {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "categoryFeature")) {
                    //     return <CategoryFeature {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "heroInfoCallToAction")) {
                    //     return <HeroInfoCallToAction {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "titleSubtitleText")) {
                    //     return <TitleSubtitleText disableTopPadding={i === 0 ? false : true} placeLocation={placeLocation} {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "imageTextCallToActionImage")) {
                    //     return <ImageTextCallToActionImage {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "imageWithLink")) {
                    //     return <ImageLink {...module} key={module._key + i} />
                    // }
                    // else if (isModule(module, "instagramModule")) {

                    //     return <InstagramEmbed {...module} key={module._key + i} />
                    // }

                    // else
                    //     return null
                    return null

                })}
            </main>

        )
    } else {
        return null
    }
}

export default Modules


