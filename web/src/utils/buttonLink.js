import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';

const ButtonLink = ({linkGroup, buttonType = "contained", color = "primary"}) => {

  let linkType = '';

  if(linkGroup?.internalLinkGroup !== null){
    linkType = <Button variant={buttonType} color={color} component={Link} to={linkGroup?.internalLinkGroup.reference?.slug.current}  aria-label={`Link to ${linkGroup?.internalLinkGroup.label}`}>
          {linkGroup?.internalLinkGroup.label}
        </Button>
  }
  else{
    linkType = <Button variant={buttonType} color={color} className="" href={linkGroup.externalLinkGroup?.href} aria-label={`Link to ${linkGroup.externalLinkGroup?.label}`}>{linkGroup.externalLinkGroup?.label}</Button>
  }
  return(linkType)
}

export default ButtonLink