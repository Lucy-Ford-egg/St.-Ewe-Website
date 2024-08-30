import React from 'react'
import Box from "@mui/material/Box"
import { StaticImage } from "gatsby-plugin-image"
import Typography from "@mui/material/Typography"
const BorderSection= React.lazy(() =>  import("./borderSection").then(module => ({ default: module.BorderSection })));
const BlogSection= React.lazy(() =>  import("./blogSection").then(module => ({ default: module.BlogSection })));
const HeaderSection = React.lazy(() =>  import('./headerSection').then(module => ({ default: module.HeaderSection })));
const TimelineSection = React.lazy(() =>  import('./timelineSection').then(module => ({ default: module.TimelineSection })));
const VideoSection= React.lazy(() =>  import('./videoSection').then(module => ({ default: module.VideoSection })));
const FeaturesListSection= React.lazy(() =>  import('./featuresListSection').then(module => ({ default: module.FeaturesListSection })));
const CtaSection= React.lazy(() =>  import('./ctaSection').then(module => ({ default: module.CtaSection })));
const TestimonialSection= React.lazy(() =>  import('./testimonialSection').then(module => ({ default: module.TestimonialSection })));
const ImageCarouselSection= React.lazy(() =>  import('./imageCarouselSection').then(module => ({ default: module.ImageCarouselSection })));
const LocationSection= React.lazy(() =>  import('./locationSection').then(module => ({ default: module.LocationSection })));
const ContactSection= React.lazy(() =>  import('./contactSection').then(module => ({ default: module.ContactSection })));
const TeamSection= React.lazy(() =>  import('./teamSection').then(module => ({ default: module.TeamSection })));
const RecipiesSection = React.lazy(() =>  import('./recipiesSection').then(module => ({ default: module.RecipiesSection })));
const NewsletterSection= React.lazy(() =>  import('./newsletterSection').then(module => ({ default: module.NewsletterSection })));
const StepsSection= React.lazy(() =>  import('./stepsSection').then(module => ({ default: module.StepsSection })));
const ClientLoginSection= React.lazy(() =>  import('./clientLoginSection').then(module => ({ default: module.ClientLoginSection })));

const Modules = (props) => {

    const { sanityConfig, previewData, modules, pageContext, getAllPosts, allSanityPost, allSanityRecipies, sanitySiteSettings } = props
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
            <React.Suspense fallback={
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
                py: 6,  
                animation: "blinker 1s linear infinite",
                minHeight: { xs: "100vh", sm: "100vh" },
              }}>

<StaticImage src="../images/loading.png" alt="A chicken" />
                <Typography variant="caption">Cracking eggs...</Typography></Box>}>
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
                    if (isModule(module, 'borderSection')) {
                        return (
                            <BorderSection
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

                    if (isModule(module, 'recipiesSection')) {
                        return <RecipiesSection previewData={previewData && previewData[i]}
                            sanityConfig={sanityConfig}
                            pageContext={pageContext}
                            key={module._key + i}
                            allSanityPost={allSanityPost}
                            allSanityRecipies={allSanityRecipies}
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


