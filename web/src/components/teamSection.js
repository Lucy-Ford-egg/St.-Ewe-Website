import React from "react"
import {Container} from "@mui/material"

export const TeamSection = (props) => {

  const {teamMembers} = props
  return (
    <Container maxWidth="xl">
      <Grid container>
        {teamMembers.map(() => {
          return (
            <Grid item xs={12} md={4}>
                      
            </Grid>
          )
        })}
        
      </Grid>
    </Container>
  )
}