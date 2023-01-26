import React from 'react'
import {Carousel} from '../components/carousel'
import {PlacesGrid} from '../components/placesGrid'


const Modules = ({ modules, allPlace }) => {

    function isModule(moduletype, testname) {
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
                        return <Carousel {...module} key={module._key + i } />
                    }
                    else if (isModule(module, "placesGrid")) {
                        debugger
                        return  <PlacesGrid {...module} allPlace={allPlace} key={module._key + i} />
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