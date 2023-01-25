import React from 'react'
import {Link} from 'gatsby'
import { Button } from '@mui/material';

const ButtonLink = ({linkGroup}) => {

  let linkType = '';
  debugger
  if(linkGroup.internalLinkGroup !== null){
    linkType = <Link className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1esatjf-MuiButtonBase-root-MuiButton-root" to={linkGroup.internalLinkGroup.reference.slug.current}>{linkGroup.internalLinkGroup.label}</Link>
  }
  else{
    linkType = <Button variant="contained" color="primary" className="" href={linkGroup.externalLinkGroup.href}>{linkGroup.externalLinkGroup.label}</Button>
  }
  return(linkType)
}

export default ButtonLink