import './AboutMe.css';
import React from 'react'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'

export default function AboutMe(){
  return (
    <>
      <Grid 
        container item xs={12}
        spacing={0}         
        justifyContent='center'
        style={{ margin: '48px 0px 32px' }}
      >
        <Grid item container xs={12} sm={8} md={6}  alignItems='center'>          
          <Grid item xs={11}>
            <Typography 
              color='#FFF' 
              variant='h1' 
              align='right'              
              style={{marginBottom: 12, lineHeight: '48px', outline: '0px solid red', whiteSpace: 'no-wrap'}} >
                <div className='biggerCaps'>B</div>
                <div className='smallerCaps'>ill</div>
                <br/>
                <div style={{whiteSpace: 'nowrap', outline: '0px solid green'}}>
                  <div className='biggerCaps'>M</div>
                  <div className='smallerCaps'>C</div>
                  <div className='biggerCaps'>K</div>
                  <div className='smallerCaps'>ESSY</div>
                </div>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container 
            xs={12} sm={12} md={6} 
            alignItems='flex-start' justify='flex-start'
            style={{ color: '#FFF', fontWeight: 300, fontSize: 32, textAlign: 'center', textTransform: 'uppercase' }}>
          <Grid item xs={12}>
            Data Visualization
          </Grid>
          <Grid item xs={12}>
            Interaction Design
          </Grid>
          <Grid item xs={12}>
            3D Graphics
          </Grid>
        </Grid>          
        <Grid container item xs={12} justify='center' style={{marginTop: 16}}>
          <Grid container item xs={12} sm={8} md={6} justify='space-evenly' direction='row'>
            <Grid container item xs={3} justify='center'>
              <a className='contact-text' href="https://billautomata.github.io/portfolio/cv.pdf" ><Typography variant='body2' className='contact-text'>CV</Typography></a>
            </Grid>
            <Grid container item xs={3} justify='center'>
              <a className='contact-text' href="mailto:bmckessy@gmail.com?subject=Hello%20I%20saw%20your%20portfolio,%20and%20I%20am%20interested%20in%20speaking%20with%20you"><Typography variant='body2' className='contact-text' >Email</Typography></a></Grid>
            <Grid container item xs={3} justify='center'>
              <a className='contact-text' href="https://github.com/billautomata" ><Typography variant='body2' className='contact-text' >Github</Typography></a>
            </Grid>
            <Grid container item xs={3} justify='center'>
              <a className='contact-text' href="https://www.linkedin.com/in/bill-mckessy" ><Typography variant='body2' className='contact-text' >LinkedIn</Typography></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}