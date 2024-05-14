import React from 'react'
const BlogSection= React.lazy(() =>  import("./blogSection"))
const HeaderSection= React.lazy(() =>  import('./headerSection'))
const TimelineSection= React.lazy(() =>  import('./timelineSection'))
const VideoSection= React.lazy(() =>  import('./videoSection'))
const FeaturesListSection= React.lazy(() =>  import('./featuresListSection'))
const CtaSection= React.lazy(() =>  import('./ctaSection'))
const TestimonialSection= React.lazy(() =>  import('./testimonialSection'))
const ImageCarouselSection= React.lazy(() =>  import('./imageCarouselSection'))
const LocationSection= React.lazy(() =>  import('./locationSection'))
const ContactSection= React.lazy(() =>  import('./contactSection'))
const TeamSection= React.lazy(() =>  import('./teamSection'))
const CaseStudySection = React.lazy(() =>  import('./caseStudySection'))
const NewsletterSection= React.lazy(() =>  import('./newsletterSection'))
const StepsSection= React.lazy(() =>  import('./stepsSection'))
const ClientLoginSection= React.lazy(() =>  import('./clientLoginSection'))

const Modules = (props) => {

    const { sanityConfig, previewData, modules, pageContext, getAllPosts, allSanityPost, allSanityCaseStudy, sanitySiteSettings } = props

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
            <React.Suspense fallback="Loading...">
            <main data-content="main">
                
                {modules && modules.map((module, i) => {

                    if (isModule(module, 'blogSection')) {
                        return <BlogSection previewData={previewData && previewData[i]}
                            sanityConfig={sanityConfig}
                            pageContext={pageContext}
                            key={module._key + i}
                            allSanityPost={allSanityPost}
                            getAllPosts={getAllPosts}
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
            </React.Suspense>
        )
    } else {
        return null
    }
}

export default Modules


