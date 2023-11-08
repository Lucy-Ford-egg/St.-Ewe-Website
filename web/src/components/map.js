import React from "react"
import { graphql } from "gatsby"
import GoogleMapReact from 'google-map-react'
import {Container, Box} from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place';
import { mapStyles } from "../utils/mapStyles"; 

const AnyReactComponent = ({ text }) => <PlaceIcon color="primary"/>;

export const Map = (props) => {

  const {geopoint} = props
  const defaultProps = {
    center: {
      lat: geopoint.lat,
      lng: geopoint.lng
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
    <Container className="section map" maxWidth="false" sx={{ px: { xs: 0 }, mt: { xs: 2, md: 11} }}>
    
    <Box sx={{height: {xs: 466, md: 466}, width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions} 
      >
        <AnyReactComponent
          lat={geopoint.lat}
          lng={geopoint.lng}
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