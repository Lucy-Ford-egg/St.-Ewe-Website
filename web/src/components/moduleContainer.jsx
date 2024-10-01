import React from 'react'
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ verticalSpace, backgroundColour, elevation = 0 }) => ({
    gridColumn: '1/25',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    backgroundColor: backgroundColour?.value,
    paddingTop: `var(--${verticalSpace?.topPadding?.toLowerCase()})`,
    paddingBottom: `var(--${verticalSpace?.bottomPadding?.toLowerCase()})`,
    maxHeight: 'max-content',
    //color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
    zIndex: elevation,
}));


export const ModuleContainer = (props) => {

    const { children, verticalSpace, backgroundColour, elevation } = props

        return <Wrapper {...props}>
            {children}
        </Wrapper>
    
}