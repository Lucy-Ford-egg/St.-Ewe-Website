import cmsLogo from '../../static/cms-logo.svg'
import cmsBetaLogo from '../../static/beta-logo.svg'

export const Logo = (props) => {
  
  return (
    <div style={{width: 21}}>
     { props === "production" && <img style={{maxWidth: '100%', height: 'auto'}} src={cmsLogo} alt="St Ewe Logo"/>}
     {props === "beta" && <img style={{maxWidth: '100%', height: 'auto'}} src={cmsBetaLogo} alt="St Ewe Logo"/>}
    </div>
  )
}