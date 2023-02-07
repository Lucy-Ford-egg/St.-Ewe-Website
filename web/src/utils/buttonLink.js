import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';

const ButtonLink = ({linkGroup, buttonType = "contained", color = "primary"}) => {

  let linkType = false;

  if(linkGroup && linkGroup.internalLinkGroup){
    linkType = <Button variant={buttonType} color={color} component={Link} to={linkGroup?.internalLinkGroup?.reference?.slug.current}  aria-label={`Link to ${linkGroup?.internalLinkGroup?.label}`}>
          {linkGroup?.internalLinkGroup && linkGroup?.internalLinkGroup?.label}
        </Button>
  }
  if(linkGroup && linkGroup.externalLinkGroup){
    linkType = <Button variant={buttonType} color={color} className="" href={linkGroup?.externalLinkGroup?.href} aria-label={`Link to ${linkGroup?.externalLinkGroup?.label}`}>{linkGroup?.externalLinkGroup && linkGroup?.externalLinkGroup?.label}</Button>
  }
  else{
    return linkType
  }

  return(linkType)
}

export default ButtonLink