import React from 'react'
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ verticalSpace, backgroundColour }) => ({
    gridColumn: '1/25',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    backgroundColor: backgroundColour?.value,
    paddingTop: `var(--${verticalSpace?.topPadding?.toLowerCase()})`,
    paddingBottom: `var(--${verticalSpace?.bottomPadding?.toLowerCase()})`,
    maxHeight: 'max-content',
    //color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
}));


export const ModuleContainer = (props) => {

    const { children, verticalSpace, backgroundColour } = props

        return <Wrapper verticalSpace={verticalSpace} backgroundColour={backgroundColour}>
            {children}
        </Wrapper>
    
}