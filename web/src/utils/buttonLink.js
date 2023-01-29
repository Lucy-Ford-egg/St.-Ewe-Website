import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';

const ButtonLink = ({linkGroup, buttonType = "contained"}) => {

  let linkType = '';

  if(linkGroup.internalLinkGroup !== null){
    linkType = <Button variant={buttonType} component={Link} to={linkGroup.internalLinkGroup.reference.slug.current}>
          {linkGroup.internalLinkGroup.label}
        </Button>
  }
  else{
    linkType = <Button variant={buttonType} color="primary" className="" href={linkGroup.externalLinkGroup.href}>{linkGroup.externalLinkGroup.label}</Button>
  }
  return(linkType)
}

export default ButtonLink