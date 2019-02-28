import React from 'react'
import { Grid } from '@material-ui/core'

export default props => (
  <Grid container>
    <Grid item xs={12} style={{padding: 20, backgroundColor: '#a2b2c2'}}>
      <h1> This is a test </h1>
    </Grid>
    <Grid item xs style={{padding: 20, backgroundColor: '#d2e2f2'}}>
      <h1> This is a test </h1>
    </Grid>
    <Grid item xs style={{padding: 20, backgroundColor: '#f2f2a1'}}>
      <h1> This is a test </h1>
    </Grid>
  </Grid>
)
