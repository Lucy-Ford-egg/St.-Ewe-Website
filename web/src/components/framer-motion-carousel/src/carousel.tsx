import * as React from "react"
import {
    animate,
    // AnimationOptions,
    PanInfo,
    useMotionValue,
} from "framer-motion"
import { Container, useTheme, useMediaQuery, Box } from "@mui/material"
import { CarouselProps, CarouselRef } from "./types"
import Arrow from "./arrow"
import Slider from "./slider"
// import Dots from "./dots"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

// const transition: AnimationOptions<any> = {
//     type: "spring",
//     bounce: 0,
// }

const Contaier = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
>((props, ref) => (
    <Box
        ref={ref}
        sx={{
            position: "relative",
            width: {xs: "100%", sm: "80%"},
            height: "100%",
            overflowX: {xs: "hidden", sm: "visible"},
            display: "flex",
        }}
    >
        {props.children}
    </Box>
))

export const Carousel = React.forwardRef(
    (
        {
            children,
            renderArrowLeft,
            renderArrowRight,
            // renderDots,
            autoPlay = true,
            interval = 2000,
            loop = true,
        }: CarouselProps,
        ref: React.Ref<CarouselRef>,
    ) => {
        const theme = useTheme()
        const sm = useMediaQuery(theme.breakpoints.down("sm"))
        const x = useMotionValue(0)
        const containerRef = React.useRef<HTMLDivElement>(null)
        const [index, setIndex] = React.useState(0)

        const calculateNewX = () =>
            -index * (containerRef.current?.clientWidth || 0)

        const handleEndDrag = (e: Event, dragProps: PanInfo) => {
            const clientWidth = containerRef.current?.clientWidth || 0

            const { offset } = dragProps

            // fix:https://github.com/jiangbo2015/framer-motion-carousel/issues/11
            // stop start slide and end slide move
            if (
                (index + 1 === childrens.length && offset.x < 0) ||
                (index === 0 && offset.x > 0)
            ) {
                animate(x, calculateNewX(), {type: "spring",
                bounce: 0,})
                return
            }

            if (offset.x > clientWidth / 4) {
                handlePrev()
            } else if (offset.x < -clientWidth / 4) {
                handleNext()
            } else {
                animate(x, calculateNewX(), {type: "spring",
                bounce: 0,})
            }
        }

        const childrens = React.Children.toArray(children)

        const handleNext = () => {
            const idx = loop ? 0 : index
            setIndex(index + 1 === childrens.length ? idx : index + 1)
        }

        const handlePrev = () => {
            const idx = loop ? childrens.length - 1 : 0
            setIndex(index - 1 < 0 ? idx : index - 1)
        }

        React.useEffect(() => {
            const controls = animate(x, calculateNewX(), {type: "spring",
            bounce: 0,})
            return controls?.stop
        }, [index])

        React.useEffect(() => {
            if (!autoPlay) {
                return
            }
            const timer = setInterval(() => handleNext(), interval)
            return () => clearInterval(timer)
        }, [handleNext, interval])

        React.useImperativeHandle(
            ref,
            () => {
                return {
                    handleNext,
                    handlePrev,
                    setIndex,
                }
            },
            [index],
        )

        return (
            <>
            <Contaier ref={containerRef}>
                {childrens.map((child, i) => (
                    <Slider
                        onDragEnd={handleEndDrag}
                        totalSliders={childrens.length}
                        x={x}
                        i={i}
                        key={i}
                    >
                        {child}
                    </Slider>
                ))}
                
                {/* dots */}
                {/* {renderDots ? (
                    renderDots({ setActiveIndex: setIndex, activeIndex: index })
                ) : (
                    <Dots
                        length={childrens.length}
                        setActiveIndex={setIndex}
                        activeIndex={index}
                    />
                )} */}
            </Contaier>

            <Container
                    maxWidth="xl"
                    sx={{
                        display: {xs: "none", sm: "block"},
                        position: {xs: "relative", sm: "absolute"},
                        top: {xs: 6, sm: "25%"},
                        left:{xs: "unset", sm: "50%"},
                        transform: {xs: "translate(-50%, -25%)", sm: "translate(-40%, -25%)"},
                        ml: {sm: "-3vw", lg: "-34px", xl: "-6%"},
                        
                    }}
                >
                    {/* left arrow */}
                    {renderArrowLeft ? (
                        renderArrowLeft({ handlePrev, activeIndex: index })
                    ) : (
                        <Arrow left onClick={handlePrev}>
                            <ArrowBackIcon sx={{color: sm ? "tertiary.main" : "white.main"}}/>
                        </Arrow>
                    )}

                    {/* right arrow */}
                    {renderArrowRight ? (
                        renderArrowRight({ handleNext, activeIndex: index })
                    ) : (
                        <Arrow onClick={handleNext}>
                            <ArrowForwardIcon
                                sx={{color: sm ? "tertiary.main" : "white.main"}}                            />
                        </Arrow>
                    )}
                   
                </Container>

            <Container
                    maxWidth="xl"
                    sx={{
                        display: {xs: "flex", sm: "none"},
                        position: "relative",
                        pt: 6,
                    }}
                >
                    {/* left arrow */}
                    {renderArrowLeft ? (
                        renderArrowLeft({ handlePrev, activeIndex: index })
                    ) : (
                        <Arrow left onClick={handlePrev}>
                            <ArrowBackIcon sx={{color: sm ? "tertiary.main" : "white.main"}}/>
                        </Arrow>
                    )}

                    {/* right arrow */}
                    {renderArrowRight ? (
                        renderArrowRight({ handleNext, activeIndex: index })
                    ) : (
                        <Arrow onClick={handleNext}>
                            <ArrowForwardIcon
                                sx={{color: sm ? "tertiary.main" : "white.main"}}                            />
                        </Arrow>
                    )}
                </Container>
            </>
        )
    },
)
