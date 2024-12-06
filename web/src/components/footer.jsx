import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { useMenuContext } from "./utils/useMenuContext"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import { SocialIcon } from "react-social-icons"

import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ theme, navOpen }) => ({
  display: navOpen ? "none" : "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  gridColumn: "1/25",
  backgroundColor: "var(--original-large)",
  paddingTop: "var(--ms5)",
  paddingBottom: "var(--ms4)",
  [theme.breakpoints.up("lg")]: {},
}))

const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  gridColumn: "2/22",
  rowGap: "var(--ms4)",
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/23",
    rowGap: "unset",
  },
}))

const FooterMenu = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gridColumn: "span 25",
  [theme.breakpoints.up("sm")]: {
    gridColumn: "span 12",
  },
  [theme.breakpoints.up("md")]: {
    gridColumn: "span 6",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "span 6",
  },
  "&.noData": {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  "& ul": {
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& li": {
      display: "block",

      "& a": {
        fontFamily: "var(--font-secondary)",
        fontWeight: 500,
        display: "flex",
        paddingTop: "var(--ms-3)",
        paddingBottom: "var(--ms-3)",
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: "unset",
        "&:hover": {
          cursor: "pointer",
          color: "var(--rich-yolk-primary) !important",
        },
      },
    },
  },
}))

const Credit = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gridColumn: "2/24",
  alignItems: "center",
  textAlign: "center",
  marginTop: "var(--ms6)",
  fontSize: "var(--ms-2) !important",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "unset",
    marginTop: "var(--ms6)",
    columnGap: "var(--ms2)",
  },
}))

const SocialIconWrapper = styled(SocialIcon)(({ theme }) => ({
  "&:first-of-type": {
    marginLeft: "-0.75rem",
  },
  [theme.breakpoints.up("lg")]: {
    margin: "0 var(--ms-3)",
  },
  "&:hover": {
    cursor: "pointer !important",
    "& .social-svg-icon": {
      fill: "var(--rich-yolk-primary) !important",
    },
  },
}))

const Accreditations = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 21,
  [theme.breakpoints.up("lg")]: {},
}))

const LogoWrapper = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.2s ease-in-out 0s",
  "&:hover": {
    cursor: "pointer !important",
    opacity: 0.6,
  },
}))

export const Footer = () => {
  const theme = useTheme()

  const { navOpen } = useMenuContext()

  const data = useStaticQuery(graphql`
    query FooterMenu {
      allSanityFooterContent {
        nodes {
          footerMenuOne {
            ...FooterMenuFragment
          }
          footerMenuTwo {
            ...FooterMenuFragment
          }
          footerMenuThree {
            ...FooterMenuFragment
          }
          footerMenuFour {
            ...FooterMenuFragment
          }
          incorparated
          companyName
          accreditations {
            image {
              ...ImageFragment
            }
            _key
            url
          }
        }
      }
    }
  `)

  const renderLink = menuItem => {
    return (
      <>
        {menuItem?.link?.internal ? (
          <GatsbyButton
            size="large"
            // color="white"
            variant="text"
            to={`/${menuItem?.link?.internal?.slug?.current}`}
            sx={{
              textTransform: "unset",
              color: "var(--white)",
              textAlign: "center",
              fontFamily: "Roboto Serif",
              fontSize: "var(--Modular-Scale-MS0, 16px)",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "var(--ms2)",
            }}
          >
            {menuItem?.text}
          </GatsbyButton>
        ) : menuItem?.link?.external ? (
          <Link
            size="large"
            // color="white"
            href={menuItem?.link?.external}
            sx={{
              textTransform: "unset",
              textDecoration: "unset",
              color: "var(--white)",
              textAlign: "center",
              fontFamily: "Roboto Serif",
              fontSize: "var(--Modular-Scale-MS0, 16px)",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "var(--ms2)",
            }}
          >
            {menuItem?.text}
          </Link>
        ) : null}
      </>
    )
  }

  return (
    <Wrapper navOpen={navOpen}>
      <Container>
        <FooterMenu
          className={
            data?.allSanityFooterContent?.nodes[0]?.footerMenuOne?.title
              ? "hasData"
              : "noData"
          }
        >
          <Typography
            variant="h4"
            color="white.main"
            sx={{
              mb: 6,
            }}
          >
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuOne?.title}
          </Typography>

          <ul>
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuOne?.links?.map(
              menuItem => {
                return (
                  <li
                    style={{
                      display: menuItem?.inline ? "inline-flex" : "block",
                    }}
                    key={menuItem?._key}
                  >
                    {renderLink(menuItem)}
                  </li>
                )
              },
            )}
          </ul>
        </FooterMenu>

        <FooterMenu
          className={
            data?.allSanityFooterContent?.nodes[0]?.footerMenuTwo?.title
              ? "hasData"
              : "noData"
          }
        >
          <Typography
            variant="h4"
            color="white.main"
            sx={{
              mb: 6,
            }}
          >
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuTwo?.title}
          </Typography>

          <ul>
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuTwo?.links?.map(
              menuItem => {
                const menuItemText = menuItem?.text || ""
                const socialMediaPlatforms = [
                  "Twitter",
                  "Facebook",
                  "Instagram",
                  "Tiktok",
                  "Youtube",
                ]
                const containsSocialMedia = socialMediaPlatforms.some(
                  platform => menuItemText.includes(platform),
                )

                return (
                  <li
                    style={{
                      display: menuItem?.inline ? "inline-flex" : "block",
                    }}
                    key={menuItem?._key}
                  >
                    {containsSocialMedia ? (
                      <SocialIconWrapper
                        network={
                          menuItem?.text.toLowerCase().includes("twitter")
                            ? "x"
                            : ""
                        }
                        style={{ height: 44, width: 44 }}
                        url={menuItem?.link?.external}
                        rel="noopener"
                        target="_blank"
                        bgColor="transparent"
                        fgColor={theme.palette.background.main}
                      />
                    ) : (
                      renderLink(menuItem)
                    )}
                  </li>
                )
              },
            )}
          </ul>
        </FooterMenu>

        <FooterMenu
          className={
            data?.allSanityFooterContent?.nodes[0]?.footerMenuThree?.title
              ? "hasData"
              : "noData"
          }
        >
          <Typography
            variant="h4"
            color="white.main"
            sx={{
              mb: 6,
            }}
          >
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuThree?.title}
          </Typography>

          <ul>
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuThree?.links?.map(
              menuItem => {
                return (
                  <li
                    style={{
                      display: menuItem?.inline ? "inline-flex" : "block",
                    }}
                    key={menuItem?._key}
                  >
                    {renderLink(menuItem)}
                  </li>
                )
              },
            )}
          </ul>
        </FooterMenu>

        <FooterMenu
          className={
            data?.allSanityFooterContent?.nodes[0]?.footerMenuFour?.title
              ? "hasData"
              : "noData"
          }
        >
          <Typography
            variant="h4"
            color="white.main"
            sx={{
              mb: 6,
            }}
          >
            {data?.allSanityFooterContent?.nodes[0]?.footerMenuFour?.title}
          </Typography>
          {data?.allSanityFooterContent?.nodes[0]?.footerMenuFour && (
            <ul>
              {data?.allSanityFooterContent?.nodes[0]?.footerMenuFour?.links?.map(
                menuItem => {
                  return (
                    <li
                      style={{
                        display: menuItem?.inline ? "inline-flex" : "block",
                      }}
                      key={menuItem?._key}
                    >
                      {renderLink(menuItem)}
                    </li>
                  )
                },
              )}
            </ul>
          )}
          <Accreditations>
            {data?.allSanityFooterContent?.nodes[0]?.accreditations?.map(
              node => {
                return (
                  <LogoWrapper href={node?.url} key={node?._key}>
                    <Image
                      crop={node?.image?.crop}
                      hotspot={node?.image?.hotspot}
                      alt={node?.asset?.altText}
                      asset={
                        (node?.image?._ref &&
                          urlFor(node?.image).width().url()) ||
                        node?.image?.asset
                      }
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </LogoWrapper>
                )
              },
            )}
          </Accreditations>
        </FooterMenu>
      </Container>
      <Credit>
        <Typography color="white.main" variant="small">
          {`${data?.allSanityFooterContent?.nodes[0]?.incorparated}. Copyright © ${new Date().getFullYear()} ${data?.allSanityFooterContent?.nodes[0]?.companyName}`}
        </Typography>
        <Typography
          color="white.main"
          variant="small"
          sx={{ color: "rgba(255,255,255,0.6)" }}
        >
          {`Designed & Built by`}{" "}
          <Link
            rel="noopener"
            target="_blank"
            color="white.main"
            className="link-animation"
            href="https://www.gendall.co.uk"
            style={{
              color: "white",
            }}
          >
            Gendall
          </Link>
        </Typography>

        <Typography
          color="white.main"
          variant="small"
          sx={{ color: "rgba(255,255,255,0.6)" }}
        >
          {`Illustrations by`}{" "}
          <Link
            rel="noopener"
            target="_blank"
            color="white.main"
            className="link-animation"
            href="https://www.jenniferarmitage.co.uk/"
            style={{
              color: "white",
            }}
          >
            Jennifer Armitage
          </Link>
        </Typography>
      </Credit>
    </Wrapper>
  )
}
