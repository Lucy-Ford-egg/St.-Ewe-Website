import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';
import {animationHover} from '../utils/animationHover'

// text
//         navigationItemUrl {
//           externalUrl
//         }



export const NavigationLink = ({text, navigationItemUrl, buttonType = "contained", color = "primary"}) => {

  let linkType = '';

  if(navigationItemUrl?.internalnavigationItemUrl !== null){
    linkType = <Button sx={{...animationHover('white'), textAlign: {xs: "left", md: "center"}}} variant={buttonType} color={color} component={Link} to={navigationItemUrl?.internalnavigationItemUrl.reference?.slug.current}  aria-label={`Link to ${text}`} disableRipple={true}>
          {text}
        </Button>
  }
  else{
    linkType = <Button sx={{textAlign: 'center' }} variant={buttonType} color={color} href={navigationItemUrl.externalnavigationItemUrl?.href} aria-label={`Link to ${text}`} disableRipple={true}>{text}</Button>
  }
  return(linkType)
}
