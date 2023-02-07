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
    linkType = <Button sx={{...animationHover('white')}} variant={buttonType} color={color} component={Link} to={navigationItemUrl?.internalnavigationItemUrl.reference?.slug.current}  aria-label={`Link to ${text}`}>
          {text}
        </Button>
  }
  else{
    linkType = <Button sx={{ }} variant={buttonType} color={color} href={navigationItemUrl.externalnavigationItemUrl?.href} aria-label={`Link to ${text}`}>{text}</Button>
  }
  return(linkType)
}
