import React from 'react'
import { BlogSection } from "./blogSection"
import { HeaderSection } from './headerSection'
import { TimelineSection } from './timelineSection'
import { VideoSection } from './videoSection'
import { FeaturesListSection } from './featuresListSection'
import { CtaSection } from './ctaSection'
import { TestimonialSection } from './testimonialSection'
import { ImageCarouselSection } from './imageCarouselSection'
import { LocationSection } from './locationSection'
import { ContactSection } from './contactSection'
import { TeamSection } from './teamSection'
import { CaseStudySection} from './caseStudySection'
import { NewsletterSection } from './newsletterSection'
import { StepsSection } from './stepsSection'
import { ClientLoginSection } from './clientLoginSection'

const Modules = (props) => {

    const { sanityConfig, previewData, modules, pageContext, allSanityPost, allSanityCaseStudy, sanitySiteSettings } = props

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
                
                {modules && modules.map((module, i) => {

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

                    if (isModule(module, 'newsletterSection')) {
                        return (
                            <NewsletterSection
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

                    if (isModule(module, 'stepsSection')) {
                        
                        return (
                            <StepsSection
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
                    
                    if (isModule(module, 'timelineSection')) {
                        return (
                            <TimelineSection
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
                            sanitySiteSettings={sanitySiteSettings}
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
                    if (isModule(module, 'clientLoginSection')) {
                        return (
                            <ClientLoginSection
                                previewData={previewData && previewData[i]}
                                sanityConfig={sanityConfig}
                                key={module._key + i}
                                {...module} />
                        )
                    }
                    
                    return null

                })}
            </main>

        )
    } else {
        return null
    }
}

export default Modules


