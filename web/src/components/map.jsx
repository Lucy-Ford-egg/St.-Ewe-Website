import React from "react"
import GoogleMapReact from 'google-map-react'
import { Container, Box, useTheme, Typography, List,
  ListItem,
  ListItemText, } from "@mui/material"
import { mapStyles } from "../utils/mapStyles";

// TODO: State management for popup boxes.
const AnyReactComponent = ({ text, theme, children }) => (
  <Box
    sx={{
      marginTop: "-33px",
      marginLeft: "-8px",
    }}
  >
  {children}
  </Box>
)

export const Map = (props) => {

  const theme = useTheme()

  const { geopoint, sanitySiteSettings } = props
debugger
  const defaultProps = {
    center: {
      lat: 50.784886806526465,
      lng: -2.363844061627551, 
    },
    zoom: 8
  };

  const mapOptions = {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: mapStyles
  }

  return (
    <Container className="section map" maxWidth="false" sx={{ px: { xs: 0 }, mt: { xs: 2, md: 11 } }}>

      <Box sx={{ height: { xs: 466, md: 738 }, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={mapOptions}
        >
          {sanitySiteSettings?.map((location) => {
            return (
              <AnyReactComponent
              theme={theme}
                key={location?.geopoint?.lat}
                lat={location?.geopoint?.lat}
                lng={location?.geopoint?.lng}
                text="My Marker"
              >
                <Box sx={{position: "relative"}}>
                 <Box sx={{positino: "absolute", p: 2, backgroundColor: "primary.lightest", width: "min-content"}}>
                <Box sx={{ p: 2, boxShadow: "inset 0 0 0 1px white"}}>
                  
                  <List disablePadding={false} sx={{mt: 3}}>
                    {location?.address1 && <ListItem disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} variant="h4" sx={{my: 0}} primary={location?.address1} />
                    </ListItem>
                    }
                    {location?.address2 && 
                    <ListItem sx={{
                       my: 0
                    }}disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={location?.address2} />
                    </ListItem>
                    }
                    {location?.address3 && 
                    <ListItem sx={{
                       my: 0
                    }}disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={location?.address3} />
                    </ListItem>
                    }
                    {location?.address4 && 
                    <ListItem sx={{
                       my: 0
                    }}disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={location?.address4} />
                    </ListItem>
                    }
                    {location?.county && 
                    <ListItem sx={{
                       my: 0
                    }}disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={`${location?.county} ${location?.postcode}` } />
                    </ListItem>
                    }
                  </List>
                  <List>
                  {location?.phone && 
                    <ListItem disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={location?.phone} />
                    </ListItem>
                    }
                  </List>

                  <List>
                  {location?.email && 
                    <ListItem disablePadding>
                      <ListItemText primaryTypographyProps={{variant:"caption"}} primary={location?.email} />
                    </ListItem>
                    }
                  </List>
                </Box>
                </Box>
                
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
    </Box>
              </AnyReactComponent>
            )
          })}

        </GoogleMapReact>
      </Box>
      
    </Container>
  );
}

