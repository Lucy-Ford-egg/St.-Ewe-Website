import cmsLogo from '../../static/cms-logo.svg'
import cmsBetaLogo from '../../static/beta-logo.svg'

export const Logo = (props) => {
  
  return (
    <div style={{width: 25}}>
     { props === "production" && <img style={{maxWidth: '100%', height: 'auto'}} src={cmsLogo} alt="Taylor Money Logo"/>}
     {props === "beta" && <img style={{maxWidth: '100%', height: 'auto'}} src={cmsBetaLogo} alt="Taylor Beta Money Logo"/>}
    </div>
  )
}