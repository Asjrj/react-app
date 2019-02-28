import React from 'react'
import { Grid } from '@material-ui/core'

const ProductComponent = (props) => (
  <Grid container >
    <Grid item xs={12} style={{padding: 20, backgroundColor: '#f2f2f2'}}>
    <h1> Prodct data here </h1>
    </Grid>  
  </Grid>
)

export default ProductComponent