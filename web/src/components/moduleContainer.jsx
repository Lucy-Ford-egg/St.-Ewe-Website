import React from 'react'
import { brandSpacing } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import { styled } from '@mui/material/styles';
import {contrastBrandPalette} from '../utils/colours'


const Wrapper = styled('div')(({ verticalSpace, backgroundColour }) => ({
    gridColumn: '1/25',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    backgroundColor: backgroundColour?.value,
    paddingTop: `${brandSpacing[verticalSpace?.topPadding]?.value}px`,
    paddingBottom: `${brandSpacing[verticalSpace?.bottomPadding]?.value}px`,
    maxHeight: 'max-content',
    color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
}));


export const ModuleContainer = (props) => {

    const { children, verticalSpace, backgroundColour } = props

        return <Wrapper verticalSpace={verticalSpace} backgroundColour={backgroundColour}>
            {children}
        </Wrapper>
    
}