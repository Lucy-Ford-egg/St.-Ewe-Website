import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles'

// Styled Components
const Wrapper = styled(motion.div)(({ theme }) => ({
    display: 'grid',
    gridColumn: '1/25',
    gridTemplateColumns: 'repeat(24, 1fr)',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    overflow: 'hidden',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.up('lg')]: {}
}));

const Title = styled(motion.div)(({ theme }) => ({
    gridColumn: '1/25',
    gridRow: '2/2',
    alignSelf: 'center',
    zIndex: 2,
    [theme.breakpoints.up('lg')]: {
        color: 'var(--original-large)',

        textAlign: 'center',
        fontFamily: 'Colby Narrow',
        fontSize: 'var(--ms9)',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'var(--ms9)',
        textTransform: 'uppercase',
    }
}));

const Layer = styled(motion.div)(({ theme }) => ({
    gridColumn: '1/25',
    gridRow: '1/4',

    [theme.breakpoints.up('lg')]: {}
}));

const Base = styled(motion.div)(({ theme }) => ({
    //   width: '100%',
    //   height: 100,
    //   backgroundColor: 'var(--super-eggs-primary)',
    //   [theme.breakpoints.up('lg')]: {}
}));

// Helper function to render layers
const renderLayer = (layer, index, transform, mobile, tablet) => (
    <Layer key={index} style={{ y: transform }}>
        <Image
            crop={layer?.crop}
            hotspot={layer?.hotspot}
            asset={layer?._id ? urlFor(layer).url() : layer?.asset}
            style={{
                objectFit: "cover",
                objectPosition: "top center",
                width: "100%",
                height: "100%",
            }}
        />
        <Base />
    </Layer>
);

export const HeroHeaderSection = props => {
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down("sm"))
    const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
    const {
        title, layers = [], previewData
    } = props

    // Motion
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
    const transforms = [
        useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]),
        useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
    ]

    return (
        <ModuleContainer {...props} ref={ref} elevation="1">
            {layers.length > 0 && (
                <Wrapper>
                    {layers.map((layer, index) => renderLayer(layer, index, transforms[index], mobile, tablet))}
                    <Title>{title}</Title>
                </Wrapper>
            )}
        </ModuleContainer>
    )
}

export const query = graphql`
  fragment HeroHeaderSectionFragment on SanityHeroHeaderSection {
    _key
    _type
    title
    layers {
      ...ImageFragment
    }
    backgroundColour {
      value
      label
    }
  }
`
