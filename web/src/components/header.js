import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby-theme-material-ui"
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  Button,
  useTheme,
  useScrollTrigger,
  Slide,
} from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import MainNavigation from "./mainNavigation"
// import mdMainNavigation from "./mdMainNavigation"
// import { SearchOverlay } from "./searchOverlay"

const Header = (props) => {
  const { headerOver = false, navColor, navOverlay, children, window } = props

   // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const [anchorElNav, setAnchorElNav] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [showSearch, setShowSearch] = useState(false)

  const theme = useTheme()

  const toggleOpenNavMenu = toggle => {
    setAnchorElNav(toggle)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const sm = useMediaQuery("(max-width:640px)")
  const md = useMediaQuery("(max-width:900px)")
  const lg = useMediaQuery("(min-width:1200px)")
  const smallDesktop = useMediaQuery(theme.breakpoints.between('900', '1057'))

  const data = useStaticQuery(graphql`
    query MainNavigationQuery {
      sanityNavigation(navId: { current: { eq: "main-menu" } }) {
        items {
          _type
          childItems {
            _type
            link {
              external
              internal {
                ... on SanityPage {
                  id
                  slug {
                    current
                  }
                }
                ... on SanityPost {
                  id
                  slug {
                    current
                  }
                }
              }
            }
            text
          }
          link {
            link {
              external
              internal {
                ... on SanityPage {
                  id
                  slug {
                    current
                  }
                }
                ... on SanityPost {
                  id
                  slug {
                    current
                  }
                }
              }
            }
            text
          }
        }
      }
    }
  `)

  const logoColor = navColor ? navColor?.value : "#002856";
  //  theme.palette.white : theme.palette.tertiary
  return (
    <>
    <HideOnScroll {...props}>
      <AppBar
        //position={headerOver ? "static" : "absolute"}
        //color={anchorElNav ? "primary" : "background"}
        sx={{
          background:  navOverlay === true ? 'linear-gradient(85deg, #F3F3F3 48.08%, rgba(243, 243, 243, 0.00) 87.43%)' : 'transparent',
          boxShadow: 'unset',
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 7, py: 5, borderTop: `1px solid ${logoColor}`, borderBottom: `1px solid ${logoColor}` }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", alignItems: "center", justifyContent: { xs: 'space-between', sm: 'space-between', md: 'flex-end', lg: 'flex-end' }, flexWrap: { xs: 'wrap', sm: 'wrap', md: 'wrap', lg: 'wrap' } }}
          >
            <Link
              to="/"
              sx={{
                display: "flex",
                width: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto', }
                // svg: {
                //   path: {
                //     fill: anchorElNav && "white",
                //   },
                // },
              }}
              aria-label="Return to home page"
            >
              <svg width="224" height="55" viewBox="0 0 224 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={logoColor} d="M220.071 21.5345C221.047 21.5345 221.897 21.8729 222.616 22.5462C223.334 23.2231 223.695 24.0499 223.695 25.0303C223.695 26.0874 223.341 26.9562 222.633 27.6435C221.925 28.3308 221.033 28.6727 219.96 28.6727C219.009 28.6727 218.207 28.2854 217.562 27.5144C216.916 26.7399 216.59 25.8746 216.59 24.9187C216.59 24.036 216.944 23.251 217.652 22.5637C218.36 21.8764 219.165 21.5345 220.068 21.5345M201.253 11.19H200.705C200.389 11.3609 200.229 11.5598 200.229 11.7796V11.9645C200.351 12.2366 200.601 12.432 200.979 12.5541C201.357 12.6762 201.632 12.91 201.802 13.2554C202.534 15.0766 203.267 16.8873 203.999 18.6841L208.651 30.0613C208.554 30.5044 208.307 31.1149 207.918 31.8894C207.526 32.664 207.172 33.0512 206.856 33.0512C206.613 33.0512 206.203 32.9605 205.627 32.7756C205.054 32.5907 204.596 32.5 204.253 32.5C203.326 32.5 202.572 32.8245 202 33.4769C201.427 34.1258 201.139 34.9178 201.139 35.8528C201.139 36.6622 201.437 37.3181 202.034 37.8205C202.631 38.3229 203.347 38.5741 204.176 38.5741C205.69 38.5741 206.946 37.6775 207.95 35.8877C208.095 35.6435 208.72 34.1084 209.817 31.2859C210.331 30.0578 211.112 28.1424 212.16 25.5432C213.649 21.8624 214.798 19.0643 215.604 17.149C216.85 14.2532 217.52 12.7809 217.617 12.732C217.714 12.6832 217.891 12.6169 218.148 12.5297C218.405 12.446 218.582 12.3518 218.679 12.2541C218.849 12.1808 218.936 12.0098 218.936 11.7377C218.936 11.5179 218.766 11.347 218.422 11.2214C218.35 11.1969 218.228 11.183 218.054 11.183H214.392C214.246 11.183 214.087 11.2458 213.917 11.3679C213.747 11.49 213.66 11.6261 213.66 11.7726C213.66 12.1913 213.941 12.4599 214.503 12.582C215.066 12.7041 215.347 12.8158 215.347 12.9135C215.347 13.2344 214.871 14.63 213.92 17.1106C213.309 18.6317 212.712 20.1424 212.125 21.6391C211.515 20.1424 210.917 18.6457 210.331 17.149C209.38 14.7451 208.901 13.3949 208.901 13.0984C208.901 12.8786 209.085 12.7181 209.449 12.6204C210.206 12.4494 210.609 12.1668 210.657 11.7726C210.609 11.6505 210.487 11.49 210.289 11.2946L209.886 11.183H201.243L201.253 11.19ZM192.408 16.2698C193.141 16.2698 193.672 16.1372 194.002 15.8651C194.332 15.5964 194.495 15.0905 194.495 14.3544C194.495 13.6671 194.335 13.1263 194.019 12.7355C193.7 12.3448 193.214 12.1459 192.554 12.1459C191.575 12.1459 190.819 12.589 190.284 13.4717C189.892 14.1346 189.611 15.0417 189.441 16.1965L192.408 16.2698ZM189.295 17.4839C189.614 19.6191 190.156 21.203 190.919 22.2322C191.902 23.5824 193.367 24.2558 195.31 24.2558C195.852 24.2558 196.404 24.1441 196.97 23.9243C197.536 23.7045 198.112 23.4708 198.702 23.2231C199.046 23.2231 199.243 23.4185 199.292 23.8127C199.292 23.9592 199.146 24.2174 198.851 24.5872C198.754 24.7093 198.542 24.9536 198.226 25.3234C196.289 27.483 193.908 28.5645 191.089 28.5645C188.659 28.5645 186.698 27.804 185.202 26.2828C183.706 24.7617 182.96 22.787 182.96 20.3552C182.96 17.4106 183.827 15.0801 185.56 13.36C187.292 11.6435 189.624 10.7818 192.554 10.7818C194.311 10.7818 195.824 11.2144 197.095 12.0761C198.56 13.0879 199.292 14.4451 199.292 16.1476V17.2222L199.035 17.4804H189.295V17.4839ZM168.911 11.1935L168.689 10.8934H168.54C167.21 11.3365 165.891 11.7761 164.586 12.2192C163.895 12.4146 163.208 12.5995 162.517 12.7704C161.458 13.0635 160.854 13.2624 160.705 13.36V13.6915C160.754 14.0369 161.063 14.2985 161.639 14.4835C162.215 14.6684 162.5 15.251 162.5 16.2314V25.9863C162.5 26.3317 162.201 26.6003 161.601 26.7957C161.004 26.9911 160.705 27.2737 160.705 27.6435V27.9017C160.952 28.0238 161.111 28.0866 161.188 28.0866H170.074L170.48 27.9749C170.626 27.7551 170.702 27.5842 170.702 27.4586C170.702 27.1899 170.564 26.998 170.282 26.8864C170.001 26.7748 169.72 26.6736 169.439 26.5724C169.158 26.4747 168.998 26.3072 168.963 26.077C168.925 25.8432 168.908 25.5676 168.908 25.2501V16.2314C168.908 15.4708 169.154 14.8742 169.647 14.4451C170.14 14.0159 170.748 13.7996 171.47 13.7996C172.192 13.7996 172.782 14.0473 173.167 14.5393C173.65 15.1289 173.889 16.1128 173.889 17.4909V26.1642C173.743 26.4852 173.4 26.7259 172.865 26.8829C172.327 27.0434 172.06 27.2702 172.06 27.5667L172.171 27.8598L172.393 28.0831H181.474C181.668 28.0831 181.852 27.9226 182.026 27.6051C182.074 27.2876 181.8 27.0225 181.203 26.8131C180.606 26.6038 180.304 26.3177 180.304 25.9479V16.671C180.304 14.9056 180.012 13.5659 179.429 12.6588C178.725 11.5528 177.544 11.0016 175.889 11.0016C174.719 11.0016 173.504 11.2458 172.237 11.7377C171.164 12.1564 170.057 12.732 168.915 13.4682V11.19L168.911 11.1935ZM147.212 23.715C147.726 25.8711 148.59 26.9457 149.812 26.9457C151.131 26.9457 152.023 26.063 152.485 24.3011C152.752 23.2963 152.888 21.8764 152.888 20.0412C152.888 18.3038 152.718 16.7477 152.374 15.3766C151.836 13.2484 150.968 12.1808 149.774 12.1808C148.58 12.1808 147.761 13.074 147.247 14.8603C146.903 16.036 146.733 17.4176 146.733 19.0085C146.733 20.8193 146.893 22.3858 147.209 23.708M143.033 12.9449C144.886 11.5005 147.379 10.7783 150.503 10.7783C153.238 10.7783 155.467 11.5563 157.189 13.1123C158.91 14.6684 159.771 16.8175 159.771 19.5598C159.771 22.302 158.719 24.6047 156.623 26.2444C154.693 27.7377 152.277 28.4843 149.371 28.4843C146.636 28.4843 144.414 27.7516 142.706 26.2793C140.873 24.7128 139.961 22.5811 139.961 19.8877C139.961 16.8524 140.985 14.5358 143.036 12.9449M108.986 2.12587C108.67 2.12587 108.448 2.34567 108.327 2.78876C108.327 3.08183 108.767 3.35396 109.646 3.59818C110.524 3.8424 110.965 4.54366 110.965 5.69499C110.965 6.65094 110.916 8.0744 110.819 9.96537C110.722 11.8563 110.673 13.2658 110.673 14.1974L110.454 21.6705V22.7032C110.454 23.4882 110.441 24.1895 110.42 24.8001C110.395 25.4141 110.347 25.8293 110.274 26.0526C110.201 26.2724 109.84 26.4642 109.194 26.6247C108.549 26.7852 108.222 27.0469 108.222 27.4167C108.222 27.8598 108.455 28.0796 108.92 28.0796H114.304C114.745 28.0796 114.964 27.8842 114.964 27.49C114.964 27.0748 114.53 26.7782 113.665 26.6073C112.798 26.4363 112.364 26.1293 112.364 25.6862C112.364 24.1651 112.45 20.3866 112.621 14.3474C112.693 11.7691 112.732 9.51182 112.732 7.57549C113.221 8.50702 113.745 9.83279 114.308 11.5528C114.748 12.903 115.016 13.7124 115.113 13.9811C116.432 17.5641 117.223 19.7237 117.494 20.4599C118.324 22.6439 119.154 24.7652 119.983 26.8271C120.129 27.2213 120.25 27.49 120.351 27.6365C120.546 27.9296 120.764 28.0796 121.011 28.0796H121.268C121.708 27.8354 122.243 26.8515 122.878 25.135C123.194 24.2279 123.576 23.0731 124.013 21.674L126.339 15.7185L129.474 7.68714C129.474 9.62695 129.512 12.5227 129.585 16.3744C129.658 20.2261 129.696 23.1114 129.696 25.0268C129.72 25.1734 129.713 25.3897 129.679 25.6723C129.644 25.9549 129.564 26.1712 129.442 26.3177C129.321 26.4642 128.911 26.5898 128.214 26.6875C127.516 26.7852 127.144 27.019 127.096 27.3888V27.7551L127.207 27.9017C127.502 28.0238 127.773 28.0866 128.019 28.0866H138.777C138.874 28.0377 138.975 27.9645 139.072 27.8668C139.169 27.7691 139.221 27.6819 139.221 27.6086C139.221 27.2143 139.1 26.9701 138.853 26.8724L137.937 26.6143C137.423 26.4189 137.083 25.8048 136.913 24.7721C136.84 24.3291 136.802 23.5685 136.802 22.4869L136.691 6.48697C136.691 4.69369 137.052 3.75169 137.774 3.66796C138.496 3.58073 138.978 3.32954 139.218 2.91087C139.218 2.39452 138.961 2.13983 138.451 2.13983H130.668C130.036 2.13983 129.512 2.58292 129.095 3.46211C128.852 4.17384 128.609 4.88557 128.363 5.59381L123.847 17.3688C123.555 16.7303 123.382 16.3465 123.333 16.2104C123.284 16.0744 123.066 15.3696 122.673 14.0962C121.99 11.7412 121.163 9.27806 120.188 6.69978C119.945 6.06132 119.688 5.39495 119.421 4.69368C119.154 3.99591 118.897 3.38885 118.654 2.87249C118.532 2.60385 118.435 2.4329 118.362 2.35963C118.216 2.2131 118.022 2.13983 117.775 2.13983H108.996L108.986 2.12587ZM95.75 14.8986C96.3817 13.7438 96.9649 12.8751 97.4995 12.2855C98.35 11.3295 99.2352 10.8515 100.159 10.8515C100.96 10.8515 101.53 11.0609 101.87 11.4761C102.21 11.8947 102.38 12.5192 102.38 13.3531C102.38 14.0892 102.307 14.7137 102.161 15.2301C101.918 16.0639 101.54 16.4826 101.026 16.4826C100.683 16.4826 100.28 16.3849 99.8183 16.1895C98.6693 15.6976 97.9369 15.4534 97.621 15.4534C96.9371 15.4534 96.4546 15.7918 96.1735 16.4686C95.8923 17.1455 95.7534 17.8781 95.7534 18.6666V25.3164C95.7534 25.9549 95.8333 26.3561 95.993 26.5166C96.1526 26.6771 96.5241 26.7573 97.1107 26.7573C97.3537 26.7573 97.5759 26.7887 97.7703 26.8515C97.9647 26.9143 98.0862 27.0469 98.1348 27.2492V27.4376C98.1348 27.7167 98.0133 27.9296 97.7703 28.0796H88.061C87.7451 27.9575 87.5855 27.7726 87.5855 27.5249V27.1934C87.7313 27.0469 87.9326 26.9283 88.1895 26.8445C88.4463 26.7573 88.731 26.691 89.0504 26.6422L89.1961 26.4956L89.3419 26.1642V15.6871C89.3419 15.244 89.1996 14.9056 88.9115 14.6719C88.6234 14.4381 88.2554 14.2741 87.8007 14.1729C87.6584 13.9776 87.5855 13.7927 87.5855 13.6182V13.3252C87.6098 13.2763 87.8805 13.1786 88.3943 13.0286C88.908 12.8821 89.46 12.7216 90.0501 12.5471C91.5462 12.0064 92.7473 11.5877 93.6568 11.2946C94.5663 10.9981 95.0939 10.8515 95.2397 10.8515H95.3855L95.6042 10.9981C95.6528 11.0469 95.6875 11.3225 95.7153 11.8249C95.7396 12.3273 95.7534 12.6169 95.7534 12.6902V14.8986H95.75ZM74.0855 23.7045C73.7662 22.3823 73.61 20.8158 73.61 19.005C73.61 17.4141 73.7801 16.0325 74.1237 14.8568C74.6375 13.0705 75.4775 12.1773 76.6508 12.1773C77.8242 12.1773 78.7128 13.2414 79.2509 15.3731C79.591 16.7442 79.7646 18.3003 79.7646 20.0377C79.7646 21.8729 79.6292 23.2929 79.3619 24.2977C78.8968 26.0595 78.0081 26.9422 76.689 26.9422C75.4671 26.9422 74.6028 25.8642 74.089 23.7115M69.913 12.9484C67.8615 14.5393 66.8375 16.8559 66.8375 19.8912C66.8375 22.5846 67.7539 24.7163 69.5833 26.2828C71.2912 27.7516 73.5128 28.4878 76.2482 28.4878C79.1537 28.4878 81.5697 27.7412 83.4997 26.2479C85.5999 24.6082 86.6482 22.3788 86.6482 19.5633C86.6482 16.7477 85.7873 14.6719 84.0656 13.1158C82.3438 11.5598 80.1152 10.7818 77.3798 10.7818C74.2522 10.7818 71.7632 11.504 69.9096 12.9484M66.0148 27.5667C65.8204 27.9121 65.5982 28.0831 65.3552 28.0831H56.6735C56.2812 28.0831 56.0868 27.8389 56.0868 27.3469C56.0868 27.1271 56.2708 26.9666 56.6353 26.869C57.4406 26.6247 57.8433 26.3177 57.8433 25.9479V4.70764C57.2914 4.28898 56.8609 3.96102 56.552 3.71331C56.2396 3.46909 56.0868 3.29465 56.0868 3.19696C56.0868 3.00158 56.1701 2.84109 56.3402 2.71898C56.9685 2.52361 58.305 2.17821 60.3496 1.68977C62.3942 1.19783 63.5606 0.953613 63.8521 0.953613C64.1194 0.953613 64.2513 1.1141 64.2513 1.43159V25.8014C64.2513 26.3177 64.5429 26.6492 65.1296 26.7957C65.7162 26.9422 66.0078 27.2004 66.0078 27.5702M38.043 11.19H37.4945C37.1786 11.3609 37.019 11.5598 37.019 11.7796V11.9645C37.1404 12.2366 37.3904 12.432 37.7688 12.5541C38.1471 12.6762 38.4214 12.91 38.5915 13.2554C39.3239 15.0766 40.0563 16.8873 40.7888 18.6841L45.4403 30.0613C45.3431 30.5044 45.0967 31.1149 44.7079 31.8894C44.3156 32.664 43.9616 33.0512 43.6457 33.0512C43.4027 33.0512 42.9931 32.9605 42.4203 32.7756C41.8475 32.5907 41.3893 32.5 41.0457 32.5C40.1188 32.5 39.3656 32.8245 38.7928 33.4769C38.22 34.1258 37.9319 34.9178 37.9319 35.8528C37.9319 36.6622 38.2304 37.3181 38.831 37.8205C39.428 38.3229 40.1431 38.5741 40.9728 38.5741C42.4863 38.5741 43.7429 37.6775 44.7461 35.8877C44.8919 35.6435 45.5167 34.1084 46.6136 31.2859C47.1274 30.0578 47.9084 28.1424 48.9568 25.5432C50.446 21.8624 51.595 19.0643 52.4003 17.149C53.6465 14.2532 54.3165 12.7809 54.4137 12.732C54.5109 12.6832 54.6879 12.6169 54.9448 12.5297C55.2017 12.446 55.3787 12.3518 55.4759 12.2541C55.646 12.1808 55.7328 12.0098 55.7328 11.7377C55.7328 11.5179 55.5627 11.347 55.219 11.2214C55.1461 11.1969 55.0246 11.183 54.851 11.183H51.1888C51.043 11.183 50.8833 11.2458 50.7133 11.3679C50.5432 11.49 50.4564 11.6261 50.4564 11.7726C50.4564 12.1913 50.7376 12.4599 51.2999 12.582C51.8623 12.7041 52.1434 12.8158 52.1434 12.9135C52.1434 13.2344 51.6679 14.63 50.7167 17.1106C50.1058 18.6317 49.5087 20.1424 48.9221 21.6391C48.3111 20.1424 47.714 18.6457 47.1274 17.149C46.1763 14.7451 45.7007 13.3949 45.7007 13.0984C45.7007 12.8786 45.8847 12.7181 46.2492 12.6204C47.0059 12.4494 47.4086 12.1668 47.4572 11.7726C47.4086 11.6505 47.2871 11.49 47.0927 11.2946L46.69 11.183H38.0465L38.043 11.19ZM29.7778 20.1703C28.5941 20.6622 27.9519 20.9309 27.8512 20.9797C26.8411 21.5449 26.3343 22.466 26.3343 23.7394C26.3343 24.1825 26.4384 24.5628 26.6502 24.8803C26.8584 25.2013 27.1882 25.3583 27.6325 25.3583C28.2018 25.3583 28.6982 25.1559 29.1321 24.7512C29.5626 24.3465 29.7813 23.8511 29.7813 23.2615V20.1703H29.7778ZM21.7209 18.0351C21.5022 18.0351 21.3738 17.9444 21.3356 17.7595C21.2974 17.5746 21.2801 17.3269 21.2801 17.0094C21.2801 16.7163 21.3217 16.3989 21.4085 16.0569C21.4918 15.715 21.6098 15.4464 21.7556 15.251C22.5818 14.2741 23.9252 13.3147 25.7823 12.3762C27.6395 11.4377 29.2016 10.9667 30.4651 10.9667H30.9754C31.6072 10.9667 32.2077 11.0783 32.7805 11.2981C33.3533 11.5179 33.9052 11.8354 34.4398 12.2541C35.6061 13.1856 36.1893 14.4102 36.1893 15.9279V23.0138C36.1893 24.0185 36.3039 24.7338 36.5364 25.1629C36.769 25.592 37.1161 25.8048 37.5813 25.8048L38.4248 25.6932C38.6678 25.6932 38.8136 25.8293 38.8657 26.0979C38.8657 26.712 38.2027 27.2632 36.8801 27.7551C35.7762 28.1738 34.8563 28.3796 34.1204 28.3796C33.0408 28.3796 32.2147 28.1912 31.6384 27.8075C31.0622 27.4272 30.4443 26.7329 29.7813 25.7281C28.9308 26.4991 28.1046 27.1097 27.2993 27.5563C26.303 28.104 25.3276 28.3761 24.3799 28.3761C22.8942 28.3761 21.8632 28.0133 21.2801 27.2876C20.6969 26.5619 20.4053 25.435 20.4053 23.9104C20.4053 23.5161 20.5094 23.0626 20.7177 22.5462C20.926 22.0299 21.1863 21.6984 21.5057 21.5484C22.311 21.1298 23.519 20.7006 25.1297 20.2575C27.1327 19.6923 28.365 19.3295 28.8301 19.169C29.2918 19.0085 29.5938 18.8236 29.7257 18.6143C29.8611 18.405 29.9271 18.1049 29.9271 17.7107V16.8978C29.9271 15.7918 29.8056 14.9684 29.5626 14.4241C29.2189 13.6601 28.549 13.2798 27.5492 13.2798C26.914 13.2798 26.5113 13.4089 26.3412 13.6671C26.1711 13.9252 26.0843 14.3474 26.0843 14.937V15.4883C26.0843 15.9313 25.4873 16.4651 24.2897 17.0896C23.0921 17.7142 22.2381 18.0282 21.7279 18.0282M0.44875 2.43638C0.361968 2.55849 0.320312 2.68758 0.320312 2.82365V8.67798C0.320312 9.04431 0.552889 9.22922 1.01804 9.22922C1.386 9.22922 1.78867 8.32211 2.22606 6.50441C2.66691 4.6902 3.31258 3.7796 4.16652 3.7796H7.53716V25.5711C7.53716 26.1851 7.08589 26.5515 6.18335 26.6771C5.28081 26.7992 4.82954 27.1062 4.82954 27.5981C5.02393 27.9156 5.32941 28.0761 5.74596 28.0761H17.1006L17.3193 27.9296L17.5762 27.4481L17.3193 26.9701C17.1249 26.7992 16.6459 26.6736 15.8926 26.6003C15.1358 26.527 14.7575 26.0002 14.7575 25.0164V3.7796H17.9823C19.0792 3.7796 19.8256 4.68671 20.2178 6.50441C20.6066 8.32211 20.9885 9.22922 21.353 9.22922C21.523 9.22922 21.6931 9.18735 21.8667 9.10013C22.0368 9.0164 22.1236 8.89777 22.1236 8.74775V2.71201C22.1236 2.49221 21.9396 2.28287 21.5716 2.0875H0.809767C0.663972 2.19565 0.545947 2.31427 0.459164 2.43638" />
                <path fill={logoColor} d="M214.665 49.547C214.665 49.8645 214.696 50.1541 214.755 50.4192C214.817 50.6844 214.918 50.9077 215.064 51.0926C215.21 51.2775 215.397 51.4241 215.63 51.5287C215.862 51.6334 216.15 51.6892 216.49 51.6892C216.692 51.6892 216.897 51.6648 217.101 51.616C217.306 51.5671 217.497 51.5113 217.674 51.452L217.462 50.6321C217.358 50.6774 217.237 50.7158 217.108 50.7507C216.976 50.7856 216.855 50.803 216.74 50.803C216.372 50.803 216.116 50.6949 215.97 50.4786C215.824 50.2622 215.755 49.9552 215.755 49.561V45.9917H217.476V45.1055H215.755V43.3087H214.849L214.717 45.1055L213.717 45.1718V45.9917H214.665V49.547ZM207.67 51.5287H208.749V46.8744C209.076 46.55 209.364 46.3022 209.617 46.1348C209.871 45.9673 210.166 45.8836 210.499 45.8836C210.919 45.8836 211.228 46.0196 211.419 46.2883C211.61 46.5569 211.707 46.9966 211.707 47.6036V51.5322H212.787V47.4606C212.787 46.6337 212.63 46.0057 212.321 45.5835C212.009 45.1613 211.516 44.9485 210.843 44.9485C210.395 44.9485 210.003 45.0532 209.666 45.259C209.329 45.4649 209.006 45.7231 208.697 46.0336H208.659L208.565 45.109H207.67V51.5357V51.5287ZM202.008 47.8409C202.043 47.5164 202.116 47.2268 202.227 46.9756C202.338 46.7244 202.473 46.5116 202.64 46.3406C202.807 46.1697 202.994 46.0371 203.199 45.9429C203.404 45.8487 203.622 45.8033 203.851 45.8033C204.351 45.8033 204.74 45.9778 205.014 46.3267C205.292 46.6756 205.427 47.178 205.427 47.8409H202.008ZM201.192 49.7459C201.349 50.1611 201.567 50.51 201.845 50.7961C202.123 51.0822 202.446 51.302 202.817 51.459C203.188 51.6125 203.591 51.6892 204.022 51.6892C204.452 51.6892 204.851 51.6229 205.191 51.4904C205.532 51.3578 205.844 51.2043 206.125 51.0263L205.743 50.3111C205.507 50.4611 205.257 50.5832 205 50.6739C204.744 50.7681 204.459 50.8135 204.153 50.8135C203.539 50.8135 203.043 50.6111 202.661 50.2064C202.279 49.8017 202.067 49.2504 202.022 48.5526H206.337C206.365 48.3956 206.375 48.1968 206.375 47.956C206.375 47.499 206.316 47.0838 206.205 46.7139C206.09 46.3441 205.927 46.0266 205.712 45.7615C205.497 45.4963 205.23 45.2939 204.91 45.1544C204.591 45.0148 204.226 44.9415 203.824 44.9415C203.456 44.9415 203.102 45.0183 202.758 45.1718C202.418 45.3253 202.112 45.5486 201.845 45.8382C201.578 46.1278 201.362 46.4837 201.199 46.9024C201.036 47.321 200.956 47.7955 200.956 48.3224C200.956 48.8492 201.036 49.3237 201.192 49.7389M190.827 51.5253H191.907V46.8709C192.493 46.208 193.028 45.8801 193.51 45.8801C193.924 45.8801 194.225 46.0161 194.416 46.2848C194.611 46.5535 194.705 46.9931 194.705 47.6001V51.5287H195.784V46.8744C196.371 46.2115 196.905 45.8836 197.388 45.8836C197.791 45.8836 198.089 46.0196 198.283 46.2883C198.478 46.5569 198.572 46.9966 198.572 47.6036V51.5322H199.651V47.4606C199.651 46.6337 199.491 46.0057 199.172 45.5835C198.853 45.1613 198.363 44.9485 197.704 44.9485C197.308 44.9485 196.944 45.0602 196.607 45.2869C196.27 45.5102 195.933 45.8103 195.6 46.1801C195.468 45.7929 195.263 45.4893 194.989 45.273C194.711 45.0567 194.33 44.9485 193.837 44.9485C193.451 44.9485 193.094 45.0532 192.764 45.259C192.434 45.4649 192.129 45.7231 191.851 46.0336H191.813L191.719 45.109H190.824V51.5357L190.827 51.5253ZM185.165 47.8374C185.2 47.5129 185.273 47.2233 185.381 46.9721C185.492 46.7209 185.627 46.5081 185.794 46.3371C185.96 46.1662 186.148 46.0336 186.353 45.9394C186.557 45.8452 186.776 45.7998 187.005 45.7998C187.505 45.7998 187.894 45.9743 188.168 46.3232C188.446 46.6721 188.581 47.1745 188.581 47.8374H185.162H185.165ZM184.35 49.7424C184.506 50.1576 184.725 50.5065 185.002 50.7926C185.28 51.0787 185.603 51.2985 185.974 51.4555C186.346 51.609 186.748 51.6857 187.179 51.6857C187.609 51.6857 188.008 51.6195 188.349 51.4869C188.692 51.3543 189.001 51.2008 189.282 51.0228L188.901 50.3076C188.664 50.4576 188.415 50.5797 188.158 50.6705C187.897 50.7647 187.616 50.81 187.311 50.81C186.696 50.81 186.2 50.6077 185.818 50.2029C185.436 49.7982 185.224 49.2469 185.179 48.5491H189.494C189.518 48.3921 189.532 48.1933 189.532 47.9525C189.532 47.4955 189.477 47.0803 189.362 46.7105C189.248 46.3406 189.084 46.0231 188.869 45.758C188.654 45.4928 188.387 45.2904 188.067 45.1509C187.748 45.0113 187.387 44.938 186.981 44.938C186.613 44.938 186.259 45.0148 185.915 45.1683C185.575 45.3218 185.27 45.5451 185.002 45.8347C184.735 46.1243 184.52 46.4802 184.357 46.8989C184.193 47.3175 184.114 47.792 184.114 48.3189C184.114 48.8457 184.193 49.3202 184.35 49.7354M180.014 48.6503C179.851 48.5806 179.705 48.4794 179.58 48.3468C179.452 48.2142 179.354 48.0537 179.285 47.8653C179.216 47.6769 179.181 47.4606 179.181 47.2233C179.181 46.7488 179.313 46.379 179.577 46.1173C179.84 45.8591 180.16 45.7266 180.538 45.7266C180.917 45.7266 181.236 45.8557 181.5 46.1173C181.764 46.379 181.895 46.7453 181.895 47.2233C181.895 47.4606 181.861 47.6734 181.791 47.8653C181.722 48.0537 181.621 48.2142 181.496 48.3468C181.371 48.4794 181.225 48.5806 181.062 48.6503C180.899 48.7201 180.726 48.755 180.542 48.755C180.358 48.755 180.184 48.7201 180.021 48.6503M178.087 53.4896C178.216 53.7024 178.396 53.8803 178.625 54.0303C178.858 54.1804 179.136 54.292 179.462 54.3688C179.785 54.442 180.146 54.4804 180.542 54.4804C181.041 54.4804 181.489 54.4211 181.888 54.3025C182.288 54.1839 182.628 54.0234 182.909 53.821C183.19 53.6186 183.405 53.3814 183.555 53.1127C183.704 52.8441 183.777 52.558 183.777 52.2614C183.777 51.7241 183.589 51.3334 183.218 51.0926C182.847 50.8519 182.288 50.7298 181.541 50.7298H180.306C179.868 50.7298 179.57 50.6635 179.41 50.5309C179.25 50.3983 179.174 50.2308 179.174 50.0285C179.174 49.8505 179.212 49.704 179.292 49.5854C179.372 49.4668 179.469 49.3586 179.58 49.2609C179.729 49.3307 179.886 49.3865 180.052 49.4249C180.219 49.4633 180.382 49.4842 180.538 49.4842C180.861 49.4842 181.166 49.4319 181.451 49.3272C181.736 49.2225 181.982 49.0725 182.194 48.8841C182.406 48.6957 182.572 48.4619 182.694 48.1828C182.815 47.9037 182.878 47.5932 182.878 47.2512C182.878 46.9791 182.829 46.7279 182.729 46.4976C182.628 46.2674 182.503 46.0789 182.354 45.9289H183.669V45.0951H181.448C181.323 45.0497 181.187 45.0148 181.035 44.9834C180.882 44.952 180.715 44.938 180.542 44.938C180.215 44.938 179.906 44.9904 179.615 45.0951C179.32 45.1997 179.063 45.3532 178.844 45.5521C178.625 45.751 178.452 45.9917 178.323 46.2743C178.195 46.5569 178.133 46.8744 178.133 47.2268C178.133 47.6141 178.219 47.956 178.389 48.2526C178.56 48.5492 178.75 48.7829 178.962 48.9609V49.0132C178.796 49.1283 178.639 49.2853 178.49 49.4877C178.341 49.69 178.268 49.9273 178.268 50.2029C178.268 50.4576 178.323 50.6739 178.431 50.8449C178.542 51.0159 178.674 51.1519 178.834 51.2496V51.302C178.546 51.5043 178.317 51.7276 178.15 51.9753C177.983 52.2231 177.9 52.4812 177.9 52.7569C177.9 53.0325 177.962 53.2872 178.091 53.4965M179.004 52.0556C179.108 51.8707 179.275 51.6927 179.504 51.5253C179.643 51.5706 179.785 51.5985 179.931 51.6125C180.076 51.6264 180.208 51.6334 180.333 51.6334H181.437C181.857 51.6334 182.177 51.6892 182.399 51.8044C182.617 51.9195 182.729 52.1254 182.729 52.4254C182.729 52.5929 182.68 52.7569 182.583 52.9139C182.486 53.0744 182.35 53.2104 182.177 53.3291C182 53.4477 181.788 53.5454 181.538 53.6187C181.288 53.6919 181.01 53.7303 180.701 53.7303C180.122 53.7303 179.667 53.6291 179.341 53.4268C179.011 53.2244 178.848 52.9523 178.848 52.6068C178.848 52.4219 178.9 52.237 179.004 52.0521M172.95 49.2155C173.047 49.0446 173.207 48.8911 173.429 48.7585C173.651 48.6259 173.95 48.5108 174.318 48.4166C174.686 48.3189 175.137 48.2351 175.671 48.1654V49.9517C175.362 50.2343 175.074 50.4472 174.797 50.5937C174.519 50.7402 174.227 50.81 173.922 50.81C173.616 50.81 173.342 50.7298 173.127 50.5728C172.912 50.4123 172.804 50.1506 172.804 49.7808C172.804 49.5784 172.853 49.39 172.95 49.219M172.273 51.2078C172.627 51.5253 173.078 51.6823 173.623 51.6823C174.019 51.6823 174.394 51.5915 174.748 51.4101C175.102 51.2287 175.435 51.0124 175.741 50.7542H175.769L175.862 51.5218H176.758V47.5827C176.758 46.7802 176.581 46.1383 176.234 45.6603C175.883 45.1788 175.317 44.938 174.536 44.938C174.019 44.938 173.543 45.0288 173.116 45.2102C172.686 45.3916 172.322 45.5765 172.023 45.7719L172.457 46.5255C172.71 46.3476 172.998 46.1906 173.318 46.051C173.637 45.9115 173.988 45.8382 174.363 45.8382C174.627 45.8382 174.842 45.8836 175.008 45.9778C175.175 46.072 175.307 46.1906 175.411 46.3406C175.512 46.4907 175.581 46.6616 175.623 46.857C175.661 47.0524 175.682 47.2478 175.682 47.4501C174.314 47.6001 173.314 47.8618 172.69 48.2386C172.061 48.6119 171.749 49.1527 171.749 49.8575C171.749 50.4402 171.926 50.8903 172.283 51.2043M165.296 51.5218H166.375V46.8675C166.698 46.543 166.99 46.2953 167.243 46.1278C167.496 45.9603 167.792 45.8766 168.125 45.8766C168.545 45.8766 168.854 46.0127 169.045 46.2813C169.239 46.55 169.333 46.9896 169.333 47.5967V51.5253H170.412V47.4536C170.412 46.6267 170.256 45.9987 169.944 45.5765C169.631 45.1544 169.138 44.9415 168.465 44.9415C168.017 44.9415 167.625 45.0462 167.288 45.2521C166.951 45.4579 166.629 45.7161 166.32 46.0266H166.281L166.188 45.102H165.292V51.5287L165.296 51.5218ZM159.821 49.2155C159.919 49.0446 160.078 48.8911 160.3 48.7585C160.523 48.6259 160.821 48.5108 161.189 48.4166C161.557 48.3189 162.008 48.2351 162.543 48.1654V49.9517C162.234 50.2343 161.946 50.4472 161.668 50.5937C161.39 50.7402 161.099 50.81 160.793 50.81C160.488 50.81 160.214 50.7298 159.998 50.5728C159.783 50.4123 159.676 50.1506 159.676 49.7808C159.676 49.5784 159.724 49.39 159.821 49.219M159.144 51.2078C159.499 51.5253 159.95 51.6823 160.495 51.6823C160.891 51.6823 161.265 51.5915 161.62 51.4101C161.974 51.2287 162.307 51.0124 162.612 50.7542H162.64L162.734 51.5218H163.629V47.5827C163.629 46.7802 163.452 46.1383 163.102 45.6603C162.751 45.1788 162.185 44.938 161.404 44.938C160.887 44.938 160.412 45.0288 159.985 45.2102C159.554 45.3916 159.19 45.5765 158.891 45.7719L159.325 46.5255C159.578 46.3476 159.867 46.1906 160.186 46.051C160.505 45.9115 160.856 45.8382 161.231 45.8382C161.495 45.8382 161.71 45.8836 161.876 45.9778C162.043 46.072 162.175 46.1906 162.279 46.3406C162.38 46.4907 162.449 46.6616 162.491 46.857C162.529 47.0524 162.55 47.2478 162.55 47.4501C161.182 47.6001 160.182 47.8618 159.558 48.2386C158.929 48.6119 158.617 49.1527 158.617 49.8575C158.617 50.4402 158.794 50.8903 159.151 51.2043M149.9 51.5218H150.914V46.7488C150.914 46.3616 150.897 45.9324 150.862 45.4649C150.827 44.9974 150.796 44.5717 150.768 44.1809H150.82L151.504 46.1103L153.174 50.646H153.792L155.451 46.1103L156.149 44.1809H156.201C156.166 44.5682 156.131 44.9974 156.1 45.4649C156.069 45.9324 156.055 46.3581 156.055 46.7488V51.5218H157.093V42.8481H155.805L154.146 47.5025L153.542 49.2749H153.49L152.858 47.5025L151.188 42.8481H149.9V51.5218Z" />
                <path fill={logoColor} d="M140.571 51.5148H141.651V46.8605C141.974 46.5361 142.265 46.2883 142.519 46.1209C142.772 45.9534 143.067 45.8697 143.4 45.8697C143.82 45.8697 144.129 46.0057 144.32 46.2744C144.511 46.543 144.608 46.9827 144.608 47.5897V51.5183H145.688V47.4467C145.688 46.6198 145.532 45.9918 145.219 45.5696C144.907 45.1474 144.414 44.9346 143.741 44.9346C143.293 44.9346 142.904 45.0393 142.571 45.2451C142.237 45.451 141.918 45.7022 141.609 45.9918L141.647 44.6695V42.1051H140.568V51.5183L140.571 51.5148ZM136.576 49.5331C136.576 49.8506 136.607 50.1402 136.669 50.4054C136.732 50.6705 136.833 50.8938 136.978 51.0787C137.124 51.2636 137.312 51.4102 137.544 51.5148C137.777 51.6195 138.065 51.6753 138.405 51.6753C138.606 51.6753 138.811 51.6509 139.016 51.6021C139.221 51.5532 139.412 51.4974 139.589 51.4381L139.377 50.6182C139.273 50.6635 139.155 50.7019 139.023 50.7368C138.891 50.7717 138.77 50.7891 138.655 50.7891C138.287 50.7891 138.03 50.681 137.884 50.4647C137.739 50.2483 137.669 49.9413 137.669 49.5471V45.9778H139.391V45.0916H137.669V43.2948H136.763L136.631 45.0916L135.632 45.1579V45.9778H136.579V49.5331H136.576ZM133.452 50.2204C133.452 50.6949 133.538 51.0578 133.715 51.3055C133.889 51.5532 134.184 51.6753 134.597 51.6753C134.746 51.6753 134.868 51.6649 134.965 51.6474C135.062 51.63 135.146 51.6021 135.215 51.5672L135.069 50.7473C135.007 50.7647 134.962 50.7752 134.93 50.7752H134.833C134.753 50.7752 134.684 50.7403 134.621 50.6705C134.559 50.6007 134.528 50.4751 134.528 50.3007V42.1016H133.448V50.2204H133.452ZM127.991 49.2086C128.088 49.0377 128.248 48.8842 128.47 48.7516C128.692 48.619 128.991 48.5039 129.359 48.4097C129.727 48.312 130.178 48.2282 130.713 48.1584V49.9448C130.404 50.2274 130.116 50.4402 129.838 50.5868C129.56 50.7333 129.269 50.8031 128.963 50.8031C128.658 50.8031 128.383 50.7229 128.168 50.5658C127.953 50.4054 127.845 50.1437 127.845 49.7738C127.845 49.5715 127.894 49.3831 127.991 49.2121M127.314 51.2008C127.668 51.5183 128.12 51.6753 128.661 51.6753C129.057 51.6753 129.432 51.5846 129.786 51.4032C130.14 51.2218 130.473 51.0055 130.779 50.7473H130.806L130.9 51.5148H131.796V47.5758C131.796 46.7733 131.619 46.1313 131.268 45.6534C130.918 45.1719 130.352 44.9311 129.571 44.9311C129.053 44.9311 128.581 45.0218 128.151 45.2033C127.72 45.3847 127.356 45.5696 127.057 45.765L127.491 46.5186C127.745 46.3407 128.033 46.1837 128.352 46.0441C128.672 45.9046 129.022 45.8313 129.397 45.8313C129.661 45.8313 129.876 45.8766 130.043 45.9708C130.209 46.0651 130.341 46.1837 130.445 46.3337C130.546 46.4837 130.616 46.6547 130.657 46.8501C130.699 47.0455 130.716 47.2408 130.716 47.4432C129.349 47.5932 128.349 47.8549 127.724 48.2317C127.096 48.605 126.783 49.1458 126.783 49.8506C126.783 50.4333 126.96 50.8833 127.318 51.1974M121.562 47.827C121.597 47.5025 121.67 47.2129 121.778 46.9617C121.889 46.7105 122.024 46.4977 122.191 46.3267C122.357 46.1558 122.545 46.0232 122.75 45.929C122.954 45.8348 123.173 45.7894 123.402 45.7894C123.902 45.7894 124.291 45.9639 124.565 46.3128C124.843 46.6617 124.978 47.1641 124.978 47.827H121.559H121.562ZM120.747 49.732C120.903 50.1472 121.121 50.4961 121.399 50.7822C121.677 51.0683 122 51.2881 122.371 51.4451C122.743 51.5986 123.145 51.6753 123.576 51.6753C124.006 51.6753 124.405 51.6091 124.746 51.4765C125.086 51.3439 125.398 51.1904 125.679 51.0124L125.297 50.2972C125.061 50.4472 124.812 50.5693 124.555 50.66C124.298 50.7543 124.013 50.7996 123.708 50.7996C123.093 50.7996 122.597 50.5972 122.215 50.1925C121.833 49.7878 121.621 49.2365 121.576 48.5387H125.891C125.919 48.3817 125.929 48.1829 125.929 47.9421C125.929 47.4851 125.874 47.0699 125.759 46.7001C125.645 46.3302 125.481 46.0127 125.266 45.7476C125.051 45.4824 124.784 45.28 124.464 45.1405C124.145 45.0009 123.784 44.9276 123.378 44.9276C123.01 44.9276 122.656 45.0044 122.312 45.1579C121.968 45.3114 121.666 45.5347 121.399 45.8243C121.132 46.1139 120.917 46.4698 120.754 46.8885C120.59 47.3071 120.511 47.7816 120.511 48.3085C120.511 48.8353 120.59 49.3098 120.747 49.725M112.179 51.5114H113.481L114.759 46.2883C114.828 45.9534 114.901 45.6254 114.974 45.3045C115.047 44.9835 115.12 44.6555 115.193 44.3206H115.245C115.314 44.6555 115.383 44.9835 115.449 45.3045C115.515 45.6254 115.588 45.9534 115.665 46.2883L116.966 51.5114H118.282L120.07 42.8377H119.018L118.112 47.5583C118.025 48.0259 117.942 48.4899 117.862 48.9539C117.782 49.418 117.706 49.8855 117.626 50.3635H117.574C117.47 49.889 117.362 49.4145 117.258 48.9504C117.154 48.4864 117.046 48.0189 116.942 47.5618L115.744 42.8412H114.745L113.547 47.5618C113.45 48.0294 113.349 48.4934 113.245 48.9574C113.141 49.4215 113.04 49.889 112.943 50.367H112.891C112.811 49.8925 112.728 49.4249 112.641 48.9644C112.554 48.5073 112.471 48.0398 112.391 47.5618L111.485 42.8412H110.354L112.183 51.5148L112.179 51.5114Z" />
              </svg>


            </Link>

            {/* <mdMainNavigation menu={data} anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu} /> */}

            {!md && <MainNavigation
              navColor={logoColor}
              menu={data}
              handleCloseNavMenu={handleCloseNavMenu}
            />}

            <Box sx={{ flexGrow: 1, alignItems: "center", order: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: '1rem',
                }}
              >
                {!sm && <Button
                  to="/client-login"
                  variant="contained"
                  color="primary"
                  size={!smallDesktop ? "large" : "small"}
                 
                >Client Login</Button>
                }
                <IconButton
                  size="large"
                  aria-label="open menu"
                  onClick={e => toggleOpenNavMenu(!anchorElNav)}
                  color="inherit"
                  sx={{
                    display: { xs: "block", sm: "block", md: "none", lg: "none" },
                  }}
                  disableRipple={true}
                >
                  {anchorElNav ? (
                    <CloseIcon color="tertiary" />
                  ) : (
                    <MenuIcon color="tertiary" />
                  )}
                </IconButton>

              </Box>
            </Box>


          </Toolbar>
        </Container>
        {md && anchorElNav && <>
          <MainNavigation
            navColor={logoColor}
            menu={data}
            handleCloseNavMenu={handleCloseNavMenu}
          />

        </>}
      </AppBar>
      </HideOnScroll>
    </>
  )
}

export default Header
