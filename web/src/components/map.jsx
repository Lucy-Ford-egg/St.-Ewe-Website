import React, { useState, useRef } from "react"
import GoogleMapReact from "google-map-react"
import {
  Container,
  Box,
  useTheme,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
} from "@mui/material"
import { mapStyles } from "../utils/mapStyles"
import { motion } from "framer-motion"

const AnyReactComponent = ({ children }) => (
  <Box
    sx={{
      marginTop: "-33px",
      marginLeft: "-8px",
    }}
  >
    {children}
  </Box>
)

export const Map = props => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down("md"))
  const lg = useMediaQuery(theme.breakpoints.up("md"))
  const [marker, setMarker] = useState(null)
  const [center, setCenter] = useState({
    lat: 50.91,
    lng: -2.55,
  })
  const markerRef = useRef()

  const handleMarker = (ref) => {
    return setMarker(ref)
  }

  const handleMarkerClick = (latLng) => {
    setCenter(latLng)
  }

  const { sanitySiteSettings } = props

  const zoom = {
    [md]: 6,
    [lg]: 8,
  }

  const defaultProps = {
    center: {
      lat: 50.91,
      lng: -2.55,
    },
    zoom: zoom.true
  }

  const mapOptions = {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: mapStyles,
  }

  return (
    <Container
      className="section map"
      maxWidth="false"
      sx={{ px: { xs: 0 }, mt: { xs: 2, md: 11 }, py: {xs: 0, md: 14}, border: `1px solid ${theme.palette.primary.main}`,}}
    >
      <Container maxWidth="lg" disableGutters={md && true} sx={{ height: { xs: 466, md: 738 }, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          center={center}
          defaultZoom={defaultProps.zoom}
          options={mapOptions}
        >
          {sanitySiteSettings?.map(location => {
            return (
              <AnyReactComponent
                theme={theme}
                key={location?.geopoint?.lat}
                lat={location?.geopoint?.lat}
                lng={location?.geopoint?.lng}
                text="My Marker"
                
              >
                <Box 
                lat={location?.geopoint?.lat}
                lng={location?.geopoint?.lng}
                onClick={e => handleMarkerClick(
                  {
                    lat: location?.geopoint?.lat,
                    lng: location?.geopoint?.lng,
                  }
                )}
                sx={{ 
                  position: 'absolute',
                  left: 0,
                  top: -12,
                  transform: 'translate(-50%, -50%)'
                   }}>
                  {marker === location?.geopoint?.lat && (
                    <motion.div
                      ref={markerRef}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          px: 2,
                          py: 2,
                          backgroundColor: "primary.lightest",
                          width: "min-content",
                        }}
                      >
                        <Box sx={{ 
                          px: 2,
                          pt: 3,
                          pb: 1,
                          boxShadow: "inset 0 0 0 1px white" }}>
                          <svg
                            width="133"
                            height="23"
                            viewBox="0 0 133 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M130.75 12.7161C131.327 12.7161 131.831 12.9164 132.256 13.315C132.682 13.7157 132.895 14.2051 132.895 14.7855C132.895 15.4112 132.686 15.9255 132.266 16.3323C131.847 16.7392 131.319 16.9416 130.684 16.9416C130.121 16.9416 129.647 16.7123 129.264 16.2559C128.882 15.7974 128.689 15.2852 128.689 14.7194C128.689 14.1969 128.899 13.7322 129.318 13.3253C129.737 12.9185 130.214 12.7161 130.748 12.7161M119.611 6.59263H119.286C119.099 6.69383 119.004 6.81155 119.004 6.94166V7.05111C119.076 7.2122 119.224 7.32786 119.448 7.40014C119.672 7.47242 119.835 7.6108 119.935 7.81525C120.369 8.89331 120.802 9.96517 121.236 11.0288L123.99 17.7635C123.932 18.0258 123.786 18.3872 123.556 18.8457C123.324 19.3042 123.114 19.5335 122.927 19.5335C122.783 19.5335 122.541 19.4798 122.2 19.3703C121.861 19.2608 121.589 19.2071 121.386 19.2071C120.837 19.2071 120.392 19.3992 120.052 19.7854C119.713 20.1695 119.543 20.6384 119.543 21.1918C119.543 21.671 119.72 22.0592 120.073 22.3566C120.426 22.654 120.85 22.8027 121.341 22.8027C122.237 22.8027 122.981 22.272 123.574 21.2125C123.661 21.0679 124.031 20.1592 124.68 18.4884C124.984 17.7615 125.446 16.6277 126.067 15.089C126.949 12.9102 127.629 11.2539 128.105 10.1201C128.843 8.40591 129.24 7.53438 129.297 7.50547C129.355 7.47655 129.46 7.43732 129.612 7.38568C129.764 7.33612 129.868 7.28036 129.926 7.22253C130.027 7.17916 130.078 7.07796 130.078 6.91687C130.078 6.78676 129.977 6.68557 129.774 6.61122C129.731 6.59676 129.659 6.5885 129.556 6.5885H127.388C127.302 6.5885 127.207 6.62567 127.107 6.69796C127.006 6.77024 126.955 6.85079 126.955 6.93753C126.955 7.18535 127.121 7.34438 127.454 7.41666C127.787 7.48895 127.953 7.55503 127.953 7.61286C127.953 7.80286 127.672 8.62896 127.109 10.0973C126.747 10.9978 126.394 11.892 126.046 12.778C125.685 11.892 125.331 11.0061 124.984 10.1201C124.421 8.69711 124.137 7.89786 124.137 7.72232C124.137 7.59221 124.246 7.49721 124.462 7.43938C124.91 7.33818 125.148 7.1709 125.177 6.93753C125.148 6.86524 125.077 6.77024 124.959 6.65459L124.721 6.5885H119.604L119.611 6.59263ZM114.375 9.59962C114.808 9.59962 115.123 9.52115 115.318 9.36006C115.513 9.20103 115.61 8.90157 115.61 8.46581C115.61 8.05895 115.515 7.73884 115.328 7.50753C115.139 7.27623 114.852 7.15851 114.461 7.15851C113.882 7.15851 113.434 7.42079 113.117 7.9433C112.885 8.3357 112.719 8.87266 112.618 9.55626L114.375 9.59962ZM112.532 10.3183C112.721 11.5823 113.041 12.5199 113.493 13.1291C114.075 13.9284 114.942 14.327 116.093 14.327C116.413 14.327 116.74 14.2609 117.075 14.1308C117.41 14.0007 117.751 13.8623 118.1 13.7157C118.304 13.7157 118.421 13.8313 118.45 14.0647C118.45 14.1514 118.363 14.3043 118.189 14.5232C118.131 14.5955 118.006 14.74 117.819 14.9589C116.672 16.2373 115.263 16.8775 113.594 16.8775C112.156 16.8775 110.995 16.4273 110.109 15.5269C109.223 14.6264 108.782 13.4575 108.782 12.018C108.782 10.275 109.295 8.89538 110.321 7.87721C111.346 6.86111 112.727 6.351 114.461 6.351C115.501 6.351 116.397 6.60709 117.149 7.1172C118.016 7.71612 118.45 8.5195 118.45 9.52734V10.1634L118.298 10.3163H112.532V10.3183ZM100.466 6.5947L100.334 6.41708H100.246C99.4588 6.67937 98.678 6.93959 97.9053 7.20188C97.4964 7.31753 97.0896 7.42699 96.6806 7.52819C96.0539 7.70167 95.6964 7.81939 95.608 7.87721V8.07341C95.6368 8.27787 95.8197 8.43276 96.1608 8.54222C96.5019 8.65168 96.6704 8.99658 96.6704 9.57691V15.3513C96.6704 15.5558 96.4937 15.7148 96.1382 15.8305C95.7847 15.9461 95.608 16.1134 95.608 16.3323V16.4852C95.7539 16.5574 95.8484 16.5946 95.8936 16.5946H101.154L101.394 16.5285C101.481 16.3984 101.526 16.2972 101.526 16.2229C101.526 16.0638 101.444 15.9503 101.277 15.8842C101.111 15.8181 100.944 15.7582 100.778 15.6983C100.612 15.6405 100.517 15.5413 100.496 15.405C100.474 15.2667 100.464 15.1035 100.464 14.9156V9.57691C100.464 9.12669 100.61 8.77353 100.901 8.5195C101.193 8.26548 101.553 8.13743 101.98 8.13743C102.407 8.13743 102.757 8.28406 102.985 8.57526C103.271 8.92429 103.412 9.50669 103.412 10.3225V15.4567C103.326 15.6467 103.123 15.7892 102.806 15.8821C102.488 15.9771 102.329 16.1113 102.329 16.2869L102.395 16.4604L102.527 16.5925H107.902C108.017 16.5925 108.126 16.4975 108.229 16.3096C108.258 16.1217 108.095 15.9647 107.742 15.8408C107.388 15.7169 107.21 15.5475 107.21 15.3286V9.83713C107.21 8.79212 107.037 7.99906 106.692 7.4621C106.275 6.80742 105.576 6.48111 104.596 6.48111C103.903 6.48111 103.184 6.62567 102.434 6.91687C101.799 7.1647 101.144 7.50547 100.468 7.94123V6.59263L100.466 6.5947ZM87.6208 14.0069C87.9249 15.2832 88.4366 15.9193 89.1599 15.9193C89.9407 15.9193 90.4688 15.3968 90.7421 14.3538C90.9004 13.759 90.9805 12.9185 90.9805 11.8322C90.9805 10.8037 90.8798 9.88256 90.6764 9.07092C90.3579 7.81112 89.8442 7.17916 89.1373 7.17916C88.4304 7.17916 87.9455 7.70786 87.6414 8.76527C87.4379 9.46126 87.3373 10.2791 87.3373 11.2208C87.3373 12.2927 87.4318 13.22 87.6188 14.0027M85.1468 7.63145C86.2441 6.77644 87.7195 6.34893 89.5688 6.34893C91.188 6.34893 92.5072 6.80948 93.5265 7.73058C94.5457 8.65168 95.0553 9.92387 95.0553 11.5471C95.0553 13.1704 94.4326 14.5335 93.1915 15.5042C92.049 16.3881 90.6189 16.83 88.8989 16.83C87.2797 16.83 85.9646 16.3963 84.9536 15.5248C83.8687 14.5975 83.3282 13.3357 83.3282 11.7413C83.3282 9.94452 83.9344 8.5732 85.1488 7.63145M64.9929 1.22713C64.8059 1.22713 64.6744 1.35724 64.6024 1.61952C64.6024 1.793 64.8634 1.95409 65.3833 2.09866C65.9032 2.24323 66.1641 2.65834 66.1641 3.33987C66.1641 3.90575 66.1354 4.74837 66.0778 5.86773C66.0203 6.98709 65.9915 7.82145 65.9915 8.37287L65.8621 12.7966V13.4079C65.8621 13.8726 65.8538 14.2877 65.8415 14.6491C65.8271 15.0126 65.7984 15.2584 65.7552 15.3906C65.7121 15.5207 65.4984 15.6343 65.1162 15.7293C64.734 15.8243 64.5408 15.9792 64.5408 16.1981C64.5408 16.4604 64.6785 16.5905 64.9538 16.5905H68.1409C68.4019 16.5905 68.5313 16.4748 68.5313 16.2415C68.5313 15.9957 68.2745 15.8201 67.7628 15.7189C67.2491 15.6177 66.9922 15.436 66.9922 15.1737C66.9922 14.2733 67.0436 12.0366 67.1443 8.46168C67.1874 6.93546 67.21 5.59925 67.21 4.45304C67.4998 5.00446 67.8101 5.78925 68.1429 6.80742C68.4039 7.60667 68.5621 8.0858 68.6197 8.24482C69.4005 10.3658 69.869 11.6442 70.0293 12.08C70.5204 13.3728 71.0115 14.6285 71.5026 15.8491C71.5889 16.0824 71.6608 16.2415 71.7204 16.3282C71.8355 16.5017 71.965 16.5905 72.1108 16.5905H72.2629C72.5239 16.4459 72.8403 15.8635 73.2164 14.8474C73.4033 14.3104 73.6294 13.6269 73.8883 12.7987L75.265 9.27332L77.1206 4.51912C77.1206 5.6674 77.1432 7.38155 77.1863 9.66158C77.2295 11.9416 77.2521 13.6496 77.2521 14.7834C77.2665 14.8701 77.2624 14.9982 77.2418 15.1655C77.2213 15.3327 77.174 15.4608 77.1021 15.5475C77.0302 15.6343 76.7877 15.7086 76.3747 15.7664C75.9616 15.8243 75.7418 15.9626 75.713 16.1816V16.3984L75.7787 16.4852C75.9534 16.5574 76.1137 16.5946 76.2596 16.5946H82.6276C82.6851 16.5657 82.7447 16.5223 82.8022 16.4645C82.8597 16.4067 82.8906 16.355 82.8906 16.3117C82.8906 16.0783 82.8187 15.9337 82.6728 15.8759L82.1303 15.7231C81.8262 15.6074 81.6248 15.2439 81.5241 14.6326C81.4809 14.3703 81.4584 13.9201 81.4584 13.2799L81.3926 3.80868C81.3926 2.74715 81.6063 2.18953 82.0337 2.13996C82.4611 2.08833 82.7467 1.93963 82.8885 1.69181C82.8885 1.38615 82.7365 1.23539 82.4344 1.23539H77.8274C77.4534 1.23539 77.1432 1.49767 76.8966 2.01811C76.7527 2.43942 76.6089 2.86073 76.463 3.27998L73.7897 10.2502C73.6171 9.87224 73.5143 9.64506 73.4855 9.56452C73.4568 9.48397 73.3273 9.06679 73.0951 8.31298C72.6903 6.91894 72.2013 5.46088 71.6238 3.93466C71.48 3.55672 71.3279 3.16226 71.1697 2.74715C71.0115 2.3341 70.8595 1.97474 70.7156 1.66909C70.6437 1.51006 70.5862 1.40887 70.543 1.3655C70.4567 1.27876 70.3416 1.23539 70.1957 1.23539H64.999L64.9929 1.22713ZM57.1577 8.78798C57.5317 8.10439 57.8769 7.59014 58.1934 7.24112C58.6968 6.67524 59.2208 6.3923 59.7674 6.3923C60.2421 6.3923 60.5791 6.51622 60.7804 6.76198C60.9818 7.00981 61.0825 7.37949 61.0825 7.87308C61.0825 8.30885 61.0393 8.67853 60.953 8.98418C60.8092 9.47778 60.5852 9.72561 60.2811 9.72561C60.0777 9.72561 59.8393 9.66778 59.566 9.55212C58.8859 9.26093 58.4523 9.11636 58.2653 9.11636C57.8605 9.11636 57.5749 9.31669 57.4084 9.71734C57.242 10.118 57.1598 10.5517 57.1598 11.0184V14.9548C57.1598 15.3327 57.2071 15.5702 57.3016 15.6652C57.3961 15.7603 57.616 15.8078 57.9632 15.8078C58.1071 15.8078 58.2386 15.8263 58.3537 15.8635C58.4687 15.9007 58.5406 15.9792 58.5694 16.0989V16.2105C58.5694 16.3757 58.4975 16.5017 58.3537 16.5905H52.6063C52.4193 16.5182 52.3247 16.4087 52.3247 16.2621V16.0659C52.411 15.9792 52.5302 15.9089 52.6823 15.8594C52.8343 15.8078 53.0028 15.7685 53.1919 15.7396L53.2782 15.6529L53.3645 15.4567V9.25473C53.3645 8.99244 53.2802 8.79212 53.1097 8.65374C52.9391 8.51537 52.7213 8.41831 52.4521 8.35841C52.3679 8.24276 52.3247 8.1333 52.3247 8.03004V7.85656C52.3391 7.82765 52.4994 7.76982 52.8035 7.68101C53.1076 7.59427 53.4344 7.49927 53.7837 7.39601C54.6693 7.0759 55.3803 6.82807 55.9187 6.65459C56.457 6.47904 56.7694 6.3923 56.8557 6.3923H56.942L57.0714 6.47904C57.1002 6.50796 57.1208 6.67111 57.1372 6.9685C57.1516 7.2659 57.1598 7.43732 57.1598 7.48069V8.78798H57.1577ZM44.3334 14.0007C44.1444 13.2179 44.0519 12.2906 44.0519 11.2188C44.0519 10.277 44.1526 9.45919 44.356 8.7632C44.6602 7.7058 45.1574 7.17709 45.852 7.17709C46.5465 7.17709 47.0726 7.80699 47.3911 9.06886C47.5924 9.8805 47.6952 10.8016 47.6952 11.8301C47.6952 12.9164 47.615 13.757 47.4568 14.3518C47.1815 15.3947 46.6554 15.9172 45.8746 15.9172C45.1513 15.9172 44.6396 15.279 44.3355 14.0048M41.8635 7.63351C40.6491 8.57526 40.0429 9.94659 40.0429 11.7434C40.0429 13.3377 40.5854 14.5996 41.6683 15.5269C42.6793 16.3963 43.9944 16.8321 45.6136 16.8321C47.3335 16.8321 48.7637 16.3901 49.9062 15.5062C51.1494 14.5356 51.7699 13.2159 51.7699 11.5492C51.7699 9.88256 51.2603 8.65374 50.2411 7.73265C49.2219 6.81155 47.9027 6.351 46.2835 6.351C44.4321 6.351 42.9587 6.7785 41.8615 7.63351M39.5559 16.2869C39.4409 16.4913 39.3093 16.5925 39.1655 16.5925H34.0263C33.7941 16.5925 33.6791 16.448 33.6791 16.1568C33.6791 16.0267 33.788 15.9317 34.0037 15.8738C34.4805 15.7293 34.7188 15.5475 34.7188 15.3286V2.75541C34.3921 2.50758 34.1373 2.31344 33.9544 2.16681C33.7695 2.02224 33.6791 1.91898 33.6791 1.86116C33.6791 1.7455 33.7284 1.6505 33.8291 1.57822C34.201 1.46256 34.9921 1.2581 36.2024 0.96897C37.4127 0.67777 38.1032 0.533203 38.2758 0.533203C38.434 0.533203 38.5121 0.628205 38.5121 0.816142V15.2419C38.5121 15.5475 38.6847 15.7437 39.0319 15.8305C39.3792 15.9172 39.5518 16.07 39.5518 16.289M22.998 6.59263H22.6733C22.4863 6.69383 22.3918 6.81155 22.3918 6.94166V7.05111C22.4637 7.2122 22.6117 7.32786 22.8356 7.40014C23.0596 7.47242 23.222 7.6108 23.3226 7.81525C23.7562 8.89331 24.1898 9.96517 24.6234 11.0288L27.3769 17.7635C27.3193 18.0258 27.1734 18.3872 26.9433 18.8457C26.7111 19.3042 26.5015 19.5335 26.3145 19.5335C26.1707 19.5335 25.9282 19.4798 25.5891 19.3703C25.2501 19.2608 24.9789 19.2071 24.7754 19.2071C24.2268 19.2071 23.7809 19.3992 23.4418 19.7854C23.1028 20.1695 22.9322 20.6384 22.9322 21.1918C22.9322 21.671 23.1089 22.0592 23.4644 22.3566C23.8179 22.654 24.2412 22.8027 24.7323 22.8027C25.6282 22.8027 26.372 22.272 26.9659 21.2125C27.0522 21.0679 27.4221 20.1592 28.0714 18.4884C28.3755 17.7615 28.8379 16.6277 29.4584 15.089C30.3399 12.9102 31.0201 11.2539 31.4968 10.1201C32.2345 8.40591 32.6311 7.53438 32.6886 7.50547C32.7462 7.47655 32.851 7.43732 33.003 7.38568C33.1551 7.33612 33.2599 7.28036 33.3174 7.22253C33.4181 7.17916 33.4695 7.07796 33.4695 6.91687C33.4695 6.78676 33.3688 6.68557 33.1654 6.61122C33.1222 6.59676 33.0503 6.5885 32.9475 6.5885H30.7797C30.6934 6.5885 30.5989 6.62567 30.4982 6.69796C30.3975 6.77024 30.3461 6.85079 30.3461 6.93753C30.3461 7.18535 30.5126 7.34438 30.8454 7.41666C31.1783 7.48895 31.3448 7.55503 31.3448 7.61286C31.3448 7.80286 31.0633 8.62896 30.5002 10.0973C30.1386 10.9978 29.7851 11.892 29.4379 12.778C29.0762 11.892 28.7228 11.0061 28.3755 10.1201C27.8125 8.69711 27.531 7.89786 27.531 7.72232C27.531 7.59221 27.6399 7.49721 27.8556 7.43938C28.3036 7.33818 28.542 7.1709 28.5707 6.93753C28.542 6.86524 28.47 6.77024 28.355 6.65459L28.1166 6.5885H23L22.998 6.59263ZM18.1054 11.9086C17.4047 12.1998 17.0245 12.3588 16.965 12.3877C16.367 12.7223 16.067 13.2675 16.067 14.0213C16.067 14.2836 16.1286 14.5087 16.254 14.6966C16.3773 14.8867 16.5725 14.9796 16.8355 14.9796C17.1725 14.9796 17.4663 14.8598 17.7232 14.6202C17.978 14.3807 18.1074 14.0874 18.1074 13.7384V11.9086H18.1054ZM13.3361 10.6446C13.2066 10.6446 13.1306 10.5909 13.108 10.4815C13.0854 10.372 13.0751 10.2254 13.0751 10.0375C13.0751 9.86398 13.0998 9.67604 13.1512 9.47365C13.2005 9.27125 13.2703 9.11223 13.3566 8.99657C13.8457 8.41831 14.6409 7.85036 15.7403 7.29481C16.8396 6.73926 17.7643 6.46045 18.5122 6.46045H18.8143C19.1883 6.46045 19.5438 6.52654 19.8828 6.65665C20.2219 6.78676 20.5486 6.9747 20.8651 7.22253C21.5555 7.77395 21.9007 8.49885 21.9007 9.39723V13.5917C21.9007 14.1865 21.9685 14.6099 22.1062 14.8639C22.2439 15.118 22.4493 15.2439 22.7247 15.2439L23.224 15.1779C23.3679 15.1779 23.4542 15.2584 23.485 15.4174C23.485 15.7809 23.0925 16.1072 22.3096 16.3984C21.6562 16.6462 21.1116 16.7681 20.676 16.7681C20.0369 16.7681 19.5479 16.6566 19.2068 16.4294C18.8657 16.2043 18.4999 15.7933 18.1074 15.1985C17.604 15.6549 17.115 16.0163 16.6382 16.2807C16.0485 16.6049 15.4711 16.766 14.9101 16.766C14.0306 16.766 13.4203 16.5512 13.0751 16.1217C12.7299 15.6921 12.5573 15.025 12.5573 14.1225C12.5573 13.8891 12.619 13.6207 12.7422 13.315C12.8655 13.0093 13.0196 12.8131 13.2087 12.7243C13.6854 12.4765 14.4005 12.2225 15.354 11.9602C16.5396 11.6256 17.2691 11.4108 17.5444 11.3158C17.8177 11.2208 17.9965 11.1114 18.0746 10.9875C18.1547 10.8636 18.1938 10.6859 18.1938 10.4526V9.97137C18.1938 9.31669 18.1218 8.82929 17.978 8.50711C17.7746 8.05482 17.378 7.82971 16.7862 7.82971C16.4101 7.82971 16.1718 7.90613 16.0711 8.05895C15.9704 8.21178 15.919 8.46168 15.919 8.8107V9.13701C15.919 9.3993 15.5656 9.71528 14.8567 10.085C14.1478 10.4546 13.6423 10.6405 13.3402 10.6405M0.743998 1.41093C0.692627 1.48322 0.667969 1.55963 0.667969 1.64017V5.10565C0.667969 5.32251 0.805643 5.43196 1.08099 5.43196C1.29881 5.43196 1.53717 4.895 1.79608 3.81901C2.05704 2.74508 2.43925 2.20605 2.94474 2.20605H4.93999V15.1056C4.93999 15.469 4.67286 15.6859 4.1386 15.7602C3.60434 15.8325 3.33721 16.0143 3.33721 16.3055C3.45229 16.4934 3.63311 16.5884 3.87969 16.5884H10.6011L10.7305 16.5017L10.8826 16.2167L10.7305 15.9337C10.6155 15.8325 10.3319 15.7582 9.88601 15.7148C9.43805 15.6714 9.21407 15.3596 9.21407 14.7772V2.20605H11.123C11.7724 2.20605 12.2141 2.74301 12.4463 3.81901C12.6765 4.895 12.9025 5.43196 13.1183 5.43196C13.219 5.43196 13.3197 5.40718 13.4224 5.35555C13.5231 5.30598 13.5745 5.23576 13.5745 5.14696V1.57409C13.5745 1.44398 13.4655 1.32006 13.2477 1.20441H0.957702C0.871398 1.26843 0.801533 1.33865 0.750162 1.41093"
                              fill="#F04D5F"
                            />
                          </svg>

                          <List disablePadding={false} sx={{ mt: 0 }}>
                            {location?.address1 && (
                              <ListItem disablePadding>
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  variant="h4"
                                  sx={{ my: "0 !important" }}
                                  primary={location?.address1}
                                />
                              </ListItem>
                            )}
                            {location?.address2 && (
                              <ListItem
                                sx={{
                                  my: 0,
                                }}
                                disablePadding
                              >
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={location?.address2}
                                />
                              </ListItem>
                            )}
                            {location?.address3 && (
                              <ListItem
                                sx={{
                                  my: 0,
                                }}
                                disablePadding
                              >
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={location?.address3}
                                />
                              </ListItem>
                            )}
                            {location?.address4 && (
                              <ListItem
                                sx={{
                                  my: 0,
                                }}
                                disablePadding
                              >
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={location?.address4}
                                />
                              </ListItem>
                            )}
                            {location?.county && (
                              <ListItem
                                sx={{
                                  my: 0,
                                }}
                                disablePadding
                              >
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={`${location?.county} ${location?.postcode}`}
                                />
                              </ListItem>
                            )}
                          </List>
                          <List>
                            {location?.phone && (
                              <ListItem disablePadding>
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={location?.phone}
                                />
                              </ListItem>
                            )}
                            {location?.email && (
                              <ListItem disablePadding>
                                <ListItemText
                                  primaryTypographyProps={{
                                    variant: "caption",
                                  }}
                                  sx={{ my: "0 !important" }}
                                  primary={location?.email}
                                />
                              </ListItem>
                            )}
                          </List>
                        </Box>
                      </Box>
                    </motion.div>
                  )}
                  {marker !== location?.geopoint?.lat && (
                    <IconButton
                      onClick={e => handleMarker(location?.geopoint?.lat)}
                      aria-label="view address"
                    >
                      <svg
                        width="20"
                        height="36"
                        viewBox="0 0 20 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.3198 0.55957C7.86421 0.590591 5.51331 1.5591 3.74844 3.26682C1.98356 4.97453 0.938215 7.29228 0.826397 9.74556C0.714579 12.1988 1.54475 14.6021 3.14696 16.4633C4.74917 18.3244 7.00221 19.5028 9.44484 19.7571V34.4746C9.44484 34.7066 9.53702 34.9292 9.70112 35.0933C9.86521 35.2574 10.0878 35.3496 10.3198 35.3496C10.5519 35.3496 10.7745 35.2574 10.9386 35.0933C11.1026 34.9292 11.1948 34.7066 11.1948 34.4746V19.7571C13.6375 19.5028 15.8905 18.3244 17.4927 16.4633C19.0949 14.6021 19.9251 12.1988 19.8133 9.74556C19.7015 7.29228 18.6561 4.97453 16.8912 3.26682C15.1264 1.5591 12.7755 0.590591 10.3198 0.55957Z"
                          fill="#F04D5F"
                        />
                      </svg>
                    </IconButton>
                  )}
                </Box>
              </AnyReactComponent>
            )
          })}
        </GoogleMapReact>
      </Container>
    </Container>
  )
}
