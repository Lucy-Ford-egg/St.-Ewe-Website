import React from 'react'
import { Carousel } from '../components/carousel'
import { Places } from '../components/places'
import { Posts } from '../components/posts'
import { ImageCaption } from '../components/imageCaption'
import { Text } from '../components/text'
import { GalleryCarousel } from '../components/galleryCarousel'
import { HeroCallToAction } from '../components/heroCallToAction'
import { HeroNewsletter } from '../components/heroNewsletter'
import {MultiColumnTitleTextLink} from '../components/multiColumnTitleTextLink'
import {Map} from '../components/map'
import { CategoryFeature } from '../components/categoryFeature'
import { HeroInfoCallToAction } from '../components/heroInfoCallToAction'
import {TitleSubtitleText} from '../components/titleSubtitleText'
import {ImageTextCallToActionImage} from '../components/imageTextCallToActionImage'
import { ImageLink } from '../components/imageLink'
import {InstagramEmbed} from '../components/InstagramEmbed'

const Modules = ({ modules, allPlace, allPost, placeLocation, pageContext }) => {

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
            <>
                {modules.map((module, i) => {
                    if (isModule(module, 'imageCarouselSubtitleTitleTextLink')) {
                        return <Carousel {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "placesGrid")) {
                        return <Places {...module} allPlace={allPlace} key={module._key + i} />
                    }
                    else if (isModule(module, "postsGrid")) {
                        return <Posts {...module} allPost={allPost} key={module._key + i} pageContext={pageContext} />
                    }
                    else if (isModule(module, "imageWithCaption")) {
                        return <ImageCaption {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "textBlock")) {
                        return <Text {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "imageCarouselCaptionLink")) {
                        return <GalleryCarousel {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "heroCallToAction")) {
                        return <HeroCallToAction {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "heroNewsletter")) {
                        return <HeroNewsletter {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "map")) {
                        return <Map {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "twoColumnTitleTextCta")) {
                        return <MultiColumnTitleTextLink {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "categoryFeature")) {
                        return <CategoryFeature {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "heroInfoCallToAction")) {
                        return <HeroInfoCallToAction {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "titleSubtitleText")) {
                        return <TitleSubtitleText placeLocation={placeLocation} {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "imageTextCallToActionImage")) {
                        return <ImageTextCallToActionImage {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "imageWithLink")) {
                        return <ImageLink {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "instagramEmbed")) {
                        return <InstagramEmbed {...module} key={module._key + i} />
                    }
                   
                    else
                        return null

                })}
            </>
        )
    } else {
        return null
    }
}

export default Modules