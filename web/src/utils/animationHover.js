export const animationHover = (lineColor) => {
  return{
    transition: 'all 0.2s ease-in 0s',
	  position: 'relative',
	  display: 'inline-block',
    textDecoration:' none',
	  backgroundSize:' 0 100%',
	  transition: 'background-size .3s ease',
    backgroundColor: 'transparent',
	  backgroundImage: `linear-gradient(transparent calc(100% - 1px), ${lineColor} 1px)`,
	  backgroundRepeat: 'no-repeat',
	  cursor: 'pointer',
	  '&:hover': {
	  	backgroundSize: '100% 100%',
      backgroundColor: 'transparent',
	  }
  }
}