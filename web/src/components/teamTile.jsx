import React, { useState } from "react"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {
  Grid,
  Typography,
  Divider,
  Box,
  IconButton,
  SvgIcon,
  useTheme,
} from "@mui/material"
import { CiMail, CiLinkedin, CiCircleRemove } from "react-icons/ci"
import { contrastColour, convertHexToRGBA } from "../utils/contrastColour"
import { Button } from "gatsby-theme-material-ui"
import { motion } from "framer-motion"

export const TeamTile = props => {
  const { definedTileColor, member, i } = props

  const theme = useTheme()

  const [showBio, setShowBio] = useState(false)
  const image = member?.image
  const memberShortName = member?.name.split(" ")
  const email = member?.email
  const memberExcerpt = member?.excerpt

  const arrowRight = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1484 12.8323C21.2329 12.7504 21.2824 12.6389 21.2864 12.5213C21.2864 12.5063 21.2864 12.4933 21.2924 12.4783C21.2984 12.4633 21.2924 12.4513 21.2864 12.4373C21.2824 12.3194 21.233 12.2076 21.1484 12.1253L17.4794 8.45627C17.3851 8.36519 17.2588 8.3148 17.1277 8.31594C16.9966 8.31708 16.8712 8.36966 16.7785 8.46236C16.6858 8.55507 16.6332 8.68047 16.6321 8.81157C16.631 8.94267 16.6814 9.06897 16.7724 9.16327L19.5874 11.9793L8.84544 11.9793C8.71283 11.9793 8.58565 12.032 8.49188 12.1257C8.39811 12.2195 8.34544 12.3467 8.34544 12.4793C8.34544 12.6119 8.39811 12.7391 8.49188 12.8328C8.58565 12.9266 8.71283 12.9793 8.84544 12.9793L19.5874 12.9793L16.7724 15.7953C16.6814 15.8896 16.631 16.0159 16.6321 16.147C16.6332 16.2781 16.6858 16.4035 16.7785 16.4962C16.8712 16.5889 16.9966 16.6415 17.1277 16.6426C17.2588 16.6438 17.3851 16.5934 17.4794 16.5023L21.1484 12.8323Z"
        fill="white"
      />
    </svg>
  )

  return (
    <Grid
      item
      xs="auto"
      sm="auto"
      md="auto"
      lg={3}
      xl={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "unset", sm: "45vw", md: "32.5vw", lg: "100%" },
        minWidth: { xs: "87vw", sm: "unset", md: "unset", lg: "unset"},
        maxWidth: { xs: 315, sm: "50%", md: "25%", lg: "35%", xl: "25%"},
        flexBasis: {xs: "unset", sm: "unset", md: "unset", lg: "100%"},
        height: "100%",
        "&:last-of-type":{
          mr: {xs: 6, lg: "unset"}
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        {showBio && memberExcerpt && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            style={{
              position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              height: "100%",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexbasis: "100%",
                height: "100%",
                px: 5,
                py: 5,
                backgroundColor: definedTileColor?.value,
                color: contrastColour(definedTileColor).textColour,
                
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={e => setShowBio(false)}
                  sx={{ color: "inherit", "&:hover": { cursor: "pointer" } }}
                >
                  <CiCircleRemove style={{ color: "inherit" }} />
                </IconButton>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  component="div"
                  color={contrastColour(definedTileColor).textColour}
                  sx={{
                    mb: 6,
                  }}
                >
                  {memberExcerpt}
                </Typography>
                {member?.slug?.current && member.bio &&  (
                <Button
                  sx={{
                    ...theme.typography.caption,
                    fontFamily: "Merriweather",
                    textTransform: "unset",
                    fontStyle: "italic",
                    color: "inherit",
                    px: 0,
                    "&:hover":{
                      color: contrastColour(definedTileColor).tonalLight.mui,
                      cursor: "pointer",
                    }
                
                  }}
                  variant="text"
                  to={`/team-members/${member?.slug?.current}`}
                  endIcon={
                    <SvgIcon
                      color={contrastColour(definedTileColor).textColour}
                    >
                      {arrowRight}
                    </SvgIcon>
                  }
                >
                  Read More
                </Button>
                )}
              </Box>
            </Box>
          </motion.div>
        )}

        <Box
          sx={{
            backgroundColor: definedTileColor?.value,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box onClick={e => setShowBio(!showBio)}>
            <Box sx={{ position: "relative" }}>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileHover={{
                  opacity: showBio === true ? 0 : 1,
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 1,
                  height: "100%",
                  backgroundColor: definedTileColor?.value && convertHexToRGBA(
                    definedTileColor?.value,
                    0.6,
                  ),
                }}
              >
                <motion.div
                  intial={{
                    y: 10,
                  }}
                  animate={{
                    y: showBio === true && 0,
                  }}
                >
                  <Typography
                    color={contrastColour(definedTileColor).textColour}
                    variant="h5"
                  >
                    Read Bio
                  </Typography>
                </motion.div>
              </motion.div>
              {image && (
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={image?.crop}
                  hotspot={image?.hotspot}
                  asset={
                    (image?._ref && urlFor(image).width(250).url()) ||
                    image.asset
                  }
                  width={312}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: 220,
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pt: 5,
                px: 5,
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                {member?.position && (
                  <Typography
                    color={contrastColour(definedTileColor).textColour}
                    variant="overline"
                  >
                    {member?.position}
                  </Typography>
                )}
              </Box>
              <Divider
                sx={{
                  borderColor: contrastColour(definedTileColor).textColour,
                  my: 5,
                }}
              />
              {member?.name && (
                <Typography
                  color={contrastColour(definedTileColor).textColour}
                  variant="h4"
                >
                  {member?.name}
                </Typography>
              )}
              <Divider
                sx={{
                  borderColor: contrastColour(definedTileColor).textColour,
                  my: 5,
                }}
              />
            </Box>
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: showBio === true ? 0 : 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 5,
                  px: 5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: contrastColour(definedTileColor).textColour,
                    }}
                  >
                    {email && (
                      <IconButton
                        sx={{
                          p: 0,
                          borderRadius: 0,
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": {
                            cursor: "pointer !important",
                          },
                        }}
                        href={`mailto:${email}`}
                        target="_top"
                        rel="noopener noreferrer"
                      >
                        <CiMail style={{ color: "inherit" }} />
                        <Typography
                          variant="caption"
                          color={contrastColour(definedTileColor).textColour}
                          component="p"
                          sx={{
                            ml: 3,
                            fontStyle: "italic",
                            fontFamily: "Merriweather",
                          }}
                        >{`Email ${memberShortName[0]}`}</Typography>
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {member?.linkedIn && (
                    <IconButton
                      size="small"
                      href={member?.linkedIn}
                      aria-label={`Go to ${member?.name} linkedIn profile`}
                      sx={{
                        color: contrastColour(definedTileColor).textColour,
                      }}
                    >
                      <CiLinkedin style={{ color: "inherit" }} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
