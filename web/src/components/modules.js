import React from 'react'

import { HeaderSectionAccommodationSearch } from './headerSectionAccommodationSearch'
import { Places } from './places'
import { Posts } from './posts'
import { ImageCaption } from './imageCaption'
import { Text } from './text'
import { GalleryCarousel } from './galleryCarousel'
import { HeroCallToAction } from './heroCallToAction'
import { HeroNewsletter } from './heroNewsletter'
import {MultiColumnTitleTextLink} from './multiColumnTitleTextLink'
import {Map} from './map'
import { CategoryFeature } from './categoryFeature'
import { HeroInfoCallToAction } from './heroInfoCallToAction'
import {TitleSubtitleText} from './titleSubtitleText'
import {ImageTextCallToActionImage} from './imageTextCallToActionImage'
import { ImageLink } from './imageLink'
import {InstagramEmbed} from './InstagramEmbed'


const Modules = ({ sanityConfig, previewData, modules, allPlace, allPost, allFeature, placeLocation, pageContext }) => {

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
debugger
                    if (isModule(module, 'headerSectionAccommodationSearch')) {
                        return (
                        <HeaderSectionAccommodationSearch
                            previewData={previewData && previewData.pageBuilder[i]} 
                            sanityConfig={sanityConfig}
                            key={module._key + i}
                            {...module}  />
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


