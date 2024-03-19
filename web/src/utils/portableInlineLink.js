import React from 'react'
import { Link } from '@mui/material';

export const PortableTextInlineLink = ({value, children, color}) => {

  const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined
  let linkType = value?.href && <Link sx={{color: color, display: 'inline-block', mx: '5px'}} className="portableTextInlineLink link-animation" href={value?.href} rel={rel} aria-label={`Link to ${children}`}> {children}</Link>

  // if(linkGroup && linkGroup.internalLinkGroup && linkGroup?.internalLinkGroup?.reference && linkGroup?.internalLinkGroup?.reference?.slug && linkGroup?.internalLinkGroup?.reference?.slug?.current){
  //   linkType = <GatsbyLink variant={buttonType} color={color} component={Link} to={linkGroup?.internalLinkGroup?.reference?.slug?.current}  aria-label={`Link to ${linkGroup?.internalLinkGroup?.label}`}>
  //         {linkGroup?.internalLinkGroup && linkGroup?.internalLinkGroup?.label}
  //       </GatsbyLink>
  // }
  // if(linkGroup && linkGroup.externalLinkGroup){
  //   linkType = <Link href={linkGroup?.externalLinkGroup?.href} aria-label={`Link to ${linkGroup?.externalLinkGroup?.label}`}>{linkGroup?.externalLinkGroup && linkGroup?.externalLinkGroup?.label}</Link>
  // }
  // else{
  //   return 
  // }

  return(linkType)
}