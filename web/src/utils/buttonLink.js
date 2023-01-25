import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';

const ButtonLink = ({linkGroup}) => {

  let linkType = '';
  debugger
  if(linkGroup.internalLinkGroup !== null){
    linkType = <Button variant="contained" color="primary" className="" to={linkGroup.internalLinkGroup.reference.slug.current}>{linkGroup.internalLinkGroup.label}</Button>
  }
  else{
    linkType = <Button variant="contained" color="primary" className="" href={linkGroup.externalLinkGroup.href}>{linkGroup.externalLinkGroup.label}</Button>
  }
  return(linkType)
}

export default ButtonLink