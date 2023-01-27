import React from 'react'
import { Carousel } from '../components/carousel'
import { Places } from '../components/places'
import { ImageCaption } from '../components/imageCaption'
import { Text } from '../components/text'
import { GalleryCarousel } from '../components/galleryCarousel'


const Modules = ({ modules, allPlace }) => {

    function isModule(moduletype, testname) {
        if (moduletype?._type?.indexOf(testname) >= 0) {
            return true
        } else {
            return false
        }
    }

    if (modules != null) {
        debugger
        return (
            <>
                {modules.map((module, i) => {
                    if (isModule(module, 'imageCarouselSubtitleTitleTextLink')) {
                        return <Carousel {...module} key={module._key + i} />
                    }
                    else if (isModule(module, "placesGrid")) {
                        return <Places {...module} allPlace={allPlace} key={module._key + i} />
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