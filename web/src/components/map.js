import React from "react"
import { graphql } from "gatsby"
import GoogleMapReact from 'google-map-react'
import {Container} from "@mui/material"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const Map = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <Container maxWidth="false" sx={{ px: { xs: 0 }, py: { xs: 9, md: 9 }, backgroundColor: 'primary.main' }}>
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
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