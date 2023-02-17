import React from "react"
import { graphql } from "gatsby"
import GoogleMapReact from 'google-map-react'
import {Container, Box} from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { mapStyles } from "../utils/mapStyles"; 

const AnyReactComponent = ({ text }) => <CircleIcon/>;

export const Map = ({map}) => {
  const defaultProps = {
    center: {
      lat: map.lat,
      lng: map.lng
    },
    zoom: 12
  };

  const mapOptions = {
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: mapStyles
  }

  return (
    <Container maxWidth="false" sx={{ px: { xs: 0 }, backgroundColor: 'primary.main' }}>
    
    <Box sx={{height: {xs: 466, width: '100%'}}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions} 
      >
        <AnyReactComponent
          lat={map.lat}
          lng={map.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </Box>
    </Container>
  );
}

export const query = graphql`
  fragment MapFragment on SanityMap {
    map {
      lng
      lat
    }
    _type
  }
`