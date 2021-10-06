import { Button, Grid, Typography } from '@material-ui/core'
import Design from '../img/crosstown-lights-design.jpg'
import Software from '../img/crosstown-lights.png'
import Cycles from '../img/crosstown-lights-cycles.jpg'

export default function CrosstownLights () {

  return (
    <Grid container item xs={12} justifyContent='center' style={{ backgroundColor: '#FFF', color: '#333', paddingBottom: 256 }}>
      {/* <Grid item style={{ marginBottom: 0, position: 'relative' }}>
        <Button variant='contained' 
          onClick={()=>{ window.location.hash = '' }}
          style={{
            position: 'absolute',
            top: 52,
            color: 'black', 
            borderColor: 'black', 
            border: 'none',
            outline: 'none',
            backgroundColor: '#333',
            borderRadius: 0 
          }}>Back</Button>
      </Grid> */}
      <Grid container item xs={11} md={10} justifyContent='center'>
        <Grid item xs={12} style={{marginTop: 16}} align='center'>
          <Typography variant='h1'>Crosstown Lights</Typography>        
        </Grid>
        <Grid container item xs={12} justifyContent='center' style={{marginTop: 16}}>
          <Grid item xs={8} align='center'>
            <Typography variant='h5'>A bespoke device created to sequence the lights on Christmas trees on the property of the Crosstown Concourse in Memphis, Tennessee, USA.</Typography>
          </Grid>
        </Grid>
        <Image src={Cycles} size='lg'/>
        <Grid container item xs={12}>
          <Grid container item xs={12} style={{marginBottom: 24}}>
            <Typography variant='h2'>Hardware</Typography>
          </Grid>
          <Grid container item xs={12} md={10} lg={8} style={{marginBottom: 0}}>
            <Typography variant='h5'>
              A Linux based single board computer drives a collection of AC relays
              providing a total capacity of 240 amps @ 120V.
            </Typography>
          </Grid>        
          <Grid xs={12} justifyContent='center' align='center'>
            <Image src={Design} size='md'/>
          </Grid>
          <Grid container item xs={12} style={{marginBottom: 24}}>
            <Typography variant='h2'>Software</Typography>
          </Grid>
          <Grid container item xs={12} md={10} lg={8} style={{marginBottom: 0}}>
            <Typography variant='h5'>
              The software stack is a state machine written in Javascript that uses websockets
              to communicate to a React/Redux application.
            </Typography>
          </Grid>        
          <Grid xs={12} justifyContent='center' align='center'>
            <Image src={Software} size='lg'/>
          </Grid>
          <Grid container item xs={12} md={10} lg={8} style={{marginBottom: 0}}>
            <p>
              <Typography variant='h5'>
                A user enters values for each Step in the Pattern.  At each step the user
                can activate a Channel and/or change the speed of the Pattern for the subsequent steps.
              </Typography>
            </p>
            <p>
              <Typography variant='h5'>
                Songs are composed of Patterns, and Playlists are composed of Songs.  In the Song
                and Playlist editors, the user arranges components building up a library of sequences
                that thye will play on repeat while the building is open to the public.
              </Typography>
            </p>
          </Grid>
        </Grid>      
      </Grid>

    </Grid>
  )

}

function Image (props) {
  const sizeLUT = {
    lg: 12, md: 8, sm: 6
  }
  return (
    <Grid item xs={sizeLUT[props.size]} style={{ marginTop: 64, marginBottom: 64 }}>
      <img src={props.src} style={{ width: '100%' }}/>
    </Grid>
  )
}