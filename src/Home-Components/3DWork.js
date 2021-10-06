import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'

import LionEevee from '../img/3dWork/lion-eevee.mp4'
import LionFlowers from '../img/3dWork/lion-moving-flowers-eevee.mp4'
import MarsHawk from '../img/3dWork/marshawk-redo copy.mp4'
import OceanMoon from '../img/3dWork/ocean-moon.mp4'
import SeaCreature from '../img/3dWork/sea-creature.mp4'
import SnakeSkin from '../img/3dWork/sneg-skin.mp4'

import DarkHairWithStrip from '../img/3dWorkImages/dark-hair-with-stripe.jpg'
import GoHawk from '../img/3dWorkImages/gohawk.jpg'
import HallOfMirrors3 from '../img/3dWorkImages/hall-of-mirrors3.jpeg'
import Leon2 from '../img/3dWorkImages/leon-2.jpg'
import LeonFlowers2 from '../img/3dWorkImages/leon-flowers-2.jpg'
import LeonFlowers3 from '../img/3dWorkImages/leon-flowers-3.jpg'
import LeonFlowers4 from '../img/3dWorkImages/leon-flowers-4.jpg'
import LeonFlowers from '../img/3dWorkImages/leon-flowers.jpeg'
import LionGold from '../img/3dWorkImages/lion-gold.jpeg'
import LionPurple from '../img/3dWorkImages/lion-purple.jpeg'
import MarsHairUp from '../img/3dWorkImages/mars-hair-up.jpeg'
import mohawk1024samples from '../img/3dWorkImages/mohawk-1024-samples.jpeg'
import morespring from '../img/3dWorkImages/more-spring.jpeg'
import motorcycle3 from '../img/3dWorkImages/motorcycle3.jpg'
import snakeskindark2 from '../img/3dWorkImages/snake-skin-dark-2.jpeg'
import schmohawk from '../img/3dWorkImages/schmohawk.jpeg'
import schmohawk3 from '../img/3dWorkImages/schmohawk3.jpeg'
import sphinxwear1 from '../img/3dWorkImages/sphinx-wear-1.jpeg'
import tubemars3 from '../img/3dWorkImages/tube-mars3.jpg'


const work = [
  { name: 'foo', image: schmohawk3, type: 'image', expanded: true },
  { name: 'foo', image: MarsHawk, type: 'video', expanded: true },
  { name: 'foo', image: schmohawk, type: 'image', expanded: true },
  { name: 'foo', image: morespring, type: 'image', expanded: true },
  { name: 'foo', image: DarkHairWithStrip, type: 'image' },
  { name: 'foo', image: MarsHairUp, type: 'image' },
  // { name: 'foo', image: GoHawk, type: 'image' },
  { name: 'foo', image: OceanMoon, type: 'video', expanded: true },
  { name: 'foo', image: SeaCreature, type: 'video', expanded: true },
  { name: 'foo', image: LionFlowers, type: 'video', expanded: true },
  { name: 'foo', image: HallOfMirrors3, type: 'image' },
  { name: 'foo', image: LeonFlowers2, type: 'image' },
  { name: 'foo', image: LeonFlowers3, type: 'image' },
  { name: 'foo', image: LeonFlowers4, type: 'image' },
  { name: 'foo', image: LeonFlowers, type: 'image' },
  { name: 'foo', image: LionGold, type: 'image' },
  { name: 'foo', image: LionPurple, type: 'image' },
  { name: 'foo', image: Leon2, type: 'image' },
  { name: 'foo', image: SnakeSkin, type: 'video', expanded: true },
  { name: 'foo', image: motorcycle3, type: 'image', expanded: true },
  { name: 'foo', image: snakeskindark2, type: 'image' },
  { name: 'foo', image: sphinxwear1, type: 'image' },
  { name: 'foo', image: tubemars3, type: 'image' },

  { name: 'foo', image: LionEevee, type: 'video' },
]

export default function ThreeDeeWork () {

  let [ expanded, setExpanded ] = useState(work.map((o,i)=>{ return { idx: i, value: o.expanded } }).filter(o=>o.value).map(o=>o.idx))
  const padding = '4px 4px'

  useEffect(()=>{
    // setInterval(()=>{
    //   let videos = document.getElementsByTagName('video')
    //   console.log(videos.length)
    //   for(let i = 0; i < videos.length; i++) {
    //     let video = videos[i]
    //     video.currentTime = Math.random() * 9;
    //   }
    // },3000)
  })

  return (
    <Grid container item xs={12} justifyContent='center' style={{backgroundColor: 'black'}}>
      <Grid container item xs={12} style={{ padding: '24px 24px'}} alignItems='center' justifyContent='space-between'>
        <Grid item style={{ marginBottom: 0 }}>
          <Button variant='outlined' 
            onClick={()=>{ window.location.hash = '' }}
            style={{color: 'white', borderColor: 'white', border: '0.5px solid white', borderRadius: 0 }}>Back</Button>
        </Grid>
        <Grid item>
          <Typography variant='h3' 
            style={{ 
              color: 'white', 
              fontWeight: 100, 
              letterSpacing: '-1.75px', 
              marginLeft: 24, 
              marginBottom: 0, 
              paddingBottom: 0, 
              lineHeight: '1em' 
            }}>A collection of images and videos I have made.</Typography>
        </Grid>
      </Grid>

      {
        work.map((o,idx)=>{
          const isExpanded = expanded.indexOf(idx) !== -1
          const sizes = {
            xs: 12,
            sm: 12,
            md: isExpanded ? 12 : 6
          }
          return (
            <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} key={`key_${o.image}`}
              style={{ height: isExpanded ? 768 : 384, position: 'relative', backgroundColor: '#000' }}
              onClick={()=>{
                const expandedIndex = expanded.indexOf(idx)
                console.log(expandedIndex)
                if (expandedIndex === -1) {
                  expanded.push(idx); 
                } else {
                  expanded = expanded.filter(o=>o!==idx)
                }
                setExpanded(Object.assign([], expanded, expanded)) 
              }}>
              {
                o.type === 'video' ?
                <video controls loop
                style={{
                  padding,
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  objectFit: isExpanded ? 'contain' : 'cover',
                  zIndex: 1
                }}>
                  <source src={o.image} type='video/mp4'/>
                </video> 
                :
                <img src={o.image}
                  style={{
                    padding,
                    boxSizing: 'border-box',  
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    objectFit: 'cover',
                    zIndex: 1
                  }}                
                />
              }

            </Grid>
          )
        })
      }
    </Grid>
  )
}