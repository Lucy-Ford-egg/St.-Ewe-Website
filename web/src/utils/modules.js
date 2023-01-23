import React from 'react'
import {Carousel} from '../components/carousel'


const Modules = ({ modules }) => {

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
                    // else if (isModule(child.__typename, "_Modules_Content")) {
                    //     return  <SideBySide {...child} key={child + i} />
                    // }
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