import React from "react"
import { graphql } from "gatsby"
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')({
    width: '100%',
    svg:{
        maxWidth: '100%',
        height: 'auto'
    }
  });

export const BorderSection = (props) => {

    const {backgroundColour, joiningColour = 'red'} = props

    const vector6Top = <svg width="1440" height="52" viewBox="0 0 1440 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1440" height="51.8657" fill={`${joiningColour?.value}`}/>
    <path d="M1388.81 26.4279C1405.9 26.5973 1423 27.2579 1440 28.4266V51.8657H0V27.3087C4.9949 26.682 10.1015 26.0214 15.3358 25.3608C20.57 24.7002 25.916 24.0397 31.3897 23.4638C42.337 22.2781 53.7311 21.0585 65.5401 19.7882C112.856 15.0963 167.114 10.5738 226.59 7.4064C286.066 4.17122 350.76 1.88457 418.87 0.800529C486.979 -0.300451 558.519 -0.232698 631.735 0.800529C640.879 0.936034 650.055 1.07154 659.263 1.20704C668.455 1.39336 677.679 1.56275 686.919 1.74907C696.174 1.93538 705.446 2.13864 714.734 2.32496C724.101 2.57903 733.469 2.81617 742.868 3.07024C780.418 4.23897 818.079 5.91585 855.628 7.88067C930.743 11.8103 1005.4 16.9087 1078.15 21.211C1114.53 23.3791 1150.44 25.3608 1185.67 26.9191C1190.08 27.1224 1194.47 27.3087 1198.84 27.512L1211.77 28.0201C1220.34 28.3419 1229.13 28.7993 1236.88 28.7654L1242.88 28.8332C1244.96 28.8162 1247.05 28.7993 1249.12 28.7993C1253.29 28.7654 1257.41 28.7823 1261.62 28.6976C1265.76 28.6309 1269.88 28.5641 1274 28.4973L1274.18 28.4944C1278.39 28.3928 1282.6 28.3081 1286.8 28.2064C1303.96 27.7491 1320.92 27.3087 1337.64 26.8683C1354.67 26.4788 1371.76 26.2924 1388.81 26.4279Z" fill={`${joiningColour}`}/>
    </svg>
     

    return (
        <Wrapper sx={{
            backgroundColor: backgroundColour?.value,
        }}>
            {vector6Top}
        </Wrapper>
    )
}

export const query = graphql`
  fragment BorderSectionFragment on SanityBorderSection {
    _key
    _type
    joiningColour{
        label
        value
      }
      backgroundColour{
        label
        value
      }
  }
`
