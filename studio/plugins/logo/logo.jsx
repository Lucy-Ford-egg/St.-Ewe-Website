import cmsLogo from '../../static/cms-logo.svg'

export const Logo = () => {
  return (
    <div style={{width: 25}}>
     <img style={{maxWidth: '100%', height: 'auto'}} src={cmsLogo} alt="Heligan Campsite"/>
    </div>
  )
}