import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import ScreenshotOffice from '../img/screenshot-wide.png'
import ScreenshotStock from '../img/screenshot-stock.png'
import ScreenshotCrosstownLights from '../img/crosstown-lights-cycles.jpg'
import Screenshot3DWork from '../img/3dWorkImages/schmohawk3.jpeg'
import OldPortfolio from '../img/old-portfolio.png'

function Image (props) {
  return (
    <Grid item container xs={12}
    style={{ 
      backgroundImage: `url(${props.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      overflow: 'hidden', height: 300,
    }}>
      <div style={{position: 'relative', outline: '0px solid blue', width: '100%'}}>
        <div style={{
          position: 'absolute', 
          top: '0px', left: '0px', 
          right: '0px', bottom: '0px'                           
          }}>            
        </div>
      </div>
    </Grid>  
  )
}

function Prose (props) {
  return (
    <Grid container item xs={12} justifyContent='flex-start' alignItems='flex-start'>
      <Grid item xs={10} sm={11} md={11}>
        <Typography variant='body1' align='right' 
          style={{
            fontSize: 36, 
            marginTop: 4, 
            marginBottom: 4,
            fontWeight: 100,
            letterSpacing: '-1.5px',
            // fontStyle: 'italic'
          }}>
            {props.name}
        </Typography> 
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={8} align='right'>
          <Typography variant='body1' align='right'
            style={{ fontWeight: 300, fontStyle: 'italic' }}
          >{props.about}</Typography>                  
      </Grid>                
    </Grid>    
  )
}

export default function Sections () {
  const projects = [
    { name: 'The Office Script Search', about: 'Search, visualize, and analyze every line from all nine seasons of the NBC television show The Office.', image: ScreenshotOffice, link: 'https://billautomata.github.io/the-office-script-search/', codeLink: 'https://github.com/billautomata/the-office-script-search/' },
    { name: 'Crosstown Lights', about: 'A device to sequence the lights on Christmas trees at the Crosstown Concourse in Memphis, TN, USA.', image: ScreenshotCrosstownLights, hash: 'crosstown-lights', codeLink: 'https://github.com/billautomata/light-controller/' },
    { name: '3D', about: 'A collection of videos and still images focused on 3D graphics.', image: Screenshot3DWork, hash: '3d' },    
    { name: 'Old Portfolio', about: 'All my really old stuff', image: OldPortfolio, link: 'http://creative-co.de' }
    // { name: 'Random Stuff', about: 'A garden for new ideas and a graveyard for unused components.', image: ScreenshotStock, hash: 'random' },
    // { name: 'Stock Visualization', about: 'An interactive stock prospectus.  Compare lifetime returns, year-over-year performance, and composition.', image: ScreenshotStock },
    // { name: 'Weather', about: 'My take on a weather dashboard.', image: Screenshot3DWork },
  ]

  return (
    <Grid container justifyContent='space-evenly'>
      {
        projects.map(project=>{
          return (
            <Grid container item 
              justifyContent='center' alignItems='flex-start'
              xs={11} sm={11} md={11} lg={5} xl={5}
              onClick={()=>{
                if (project.hash !== undefined) {
                  window.location.hash = project.hash
                  setTimeout(()=>{window.scrollTo(0,0)},0)
                } else {
                  window.open(project.link)
                }                
              }} 
              style={{
                backgroundColor: '#000',
                borderRadius: '128px', 
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
                borderTopRightRadius: '16px',
                border: '1px solid #777',
                color: '#FFF',
                cursor: 'pointer',
                marginBottom: 24,
                overflow: 'hidden',
                paddingBottom: 24, 
              }}                      
            >         
              <Image image={project.image}/>
              <Prose name={project.name} about={project.about}/>
              <Grid container item xs={12} align='center' alignItems='center' style={{marginTop: 24}}>
                <Grid item xs={project.codeLink ? 6 : 12}>
                  <Button variant='outlined' 
                    onClick={()=>{
                      if (project.hash !== undefined) {
                        window.location.hash = project.hash
                        setTimeout(()=>{window.scrollTo(0,0)},0)
                      } else {
                        window.open(project.link)
                      }                
                    }}
                    style={{width: '80%'}}>VISIT SITE</Button>
                </Grid>
                {
                  project.codeLink ? 
                    <Grid item xs={6}><Button onClick={()=>{ window.open(project.codeLink) }} 
                      variant='outlined' style={{width: '80%'}}>VIEW CODE</Button></Grid>
                    :
                    <></>
                }
                
              </Grid>
          </Grid>  
          )
        })                
      }
    </Grid>
  )  
}