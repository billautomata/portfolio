import React from 'react'
import * as d3 from 'd3'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import QQQData from '../data/QQQ-composition.js'
import QQQ_composition from '../data/qqq_holdings_1630655795103.csv'

export default class QQQHeaderVisualization extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      qqqData: {
        children: []
      }
    }
    this.svgRef = React.createRef()
    this.divRef = React.createRef()

    this.treePackDiv = this.treePackDiv.bind(this)
    this.treemapLegend = this.treemapLegend.bind(this)
  }

  componentDidMount() {
    console.log('innerWidth', window.innerWidth, window.devicePixelRatio)
    this.setState({ scale: 0.25 * (window.innerWidth / this.w) })
    this.w = Math.min(700, 0.9*window.innerWidth)
    this.h = this.w

    const w = this.w
    const h = this.h

    // https://www.invesco.com/us/financial-products/etfs/holdings?audienceType=Investor&ticker=QQQ
    d3.csv(QQQ_composition).then(d=>{
      const preData = {}

      d.forEach(holding=>{
        if (preData[holding.Sector] === undefined) {
          preData[holding.Sector] = {
            name: holding.Sector,
            children: []
          }
        }
        preData[holding.Sector].children.push({ name: holding['Holding Ticker'].trim(), value: Number(holding.Weight) })
      })

      this.data = {
        name: 'QQQ',
        children: Object.values(preData).sort((a,b)=>{ 
          return d3.sum(b.children, d=>d.value) - d3.sum(a.children, d=>d.value)
        })
      }

      this.treePackDiv(this.divRef)
      // this.treemapLegend()
    })

  }

  treemapLegend () {

    const w = 1000
    const h = 60

    const svg = d3.select(this.svgRef.current)
      .attr('viewBox', `0 0 ${w} ${h}`)
      .style('outline', '1px solid black')
    
    const gGraphics = svg.append('g')
    const gText = svg.append('g')

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const maxSectorPercent = d3.max(this.data.children, child=>{return d3.sum(child.children, d=>{return d.value})})    
    const scaleXPercent = d3.scaleLinear().domain([0,100]).range([0,w])

    const pivot = 4

    function decidePosition(idx, posX, width) {
      if(idx < pivot) {
        return [ posX + width, 25 ]
      } else {
        return idx % 2 === 0 ? [ posX + (width * 2), 10 ] : [ posX + (width * 2), 45 ]
      }
    }

    let runningX = 0
    this.data.children.forEach((child,childIdx) => {
      const sum = d3.sum(child.children, d=>d.value)
      console.log(sum)
      gGraphics.append('rect').attr('x', runningX).attr('y', 10)
        .attr('width', scaleXPercent(sum)).attr('height',20)
        .attr('fill', color(childIdx)).attr('stroke', 'white')
      gText.append('text').text(child.name)
        .attr('font-size', 12).attr('fill', childIdx < pivot ? 'white' : '#333')
        .attr('x', decidePosition(childIdx, runningX, (scaleXPercent(sum)*0.5))[0])
        .attr('y', decidePosition(childIdx, runningX, (scaleXPercent(sum)*0.5))[1])        
        .attr('dy', 0.33)
        .attr('text-anchor', childIdx < pivot ? 'middle' : 'end')

      runningX += scaleXPercent(sum)
    })

  }

  treePackDiv (div) {
    const shouldTransition = true
    const transitionSpeed = 500
    const rotationDelay = 2000

    const percentScaleX = d3.scaleLinear().domain([0,this.data.children.length]).range([0,this.w])
    const maxSectorPercent = d3.max(this.data.children, child=>{return d3.sum(child.children, d=>{return d.value})})    
    const percentScaleY = d3.scaleLinear().domain([0,maxSectorPercent]).range([0,this.h-40])

    const self = this

    const parent = d3.select(div.current)
      .style('width', this.w+'px')
      .style('height', this.h+'px')
      .style('margin', 'auto')
      
    parent.style('position', 'relative')

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const treemap = d3.treemap()
      .tile(d3.treemapBinary)
      .size([this.w, this.h])
      .padding(1)
      .round(true)(d3.hierarchy(this.data).sum(d => d.value).sort((a, b) => b.value - a.value))

    const circlePack = d3.pack()
      .size([this.w - 2, this.h - 2])
      .padding(3)(d3.hierarchy({children: treemap.leaves().map(o=>{return o.data})}).sum(d => d.value))        

    treemap.leaves().forEach(leaf=>{
      const p = parent.append('div')
        .attr('id', 'idx_'+leaf.data.name)
        .style('position', 'absolute')        
        .style('top', leaf.y0 +'px')
        .style('left', leaf.x0 +'px')
        .style('width', (leaf.x1 - leaf.x0)+'px')
        .style('height', (leaf.y1 - leaf.y0)+'px')
        .style('background', color(leaf.parent.data.name))
        .style('color', 'white')
        .style('overflow', 'hidden')
        .style('box-sizing', 'border-box')
        .style('border-radius', '0%')
        .style('opacity', 1)
      p.append('div').attr('class', 'name')
        .style('display', 'inline-block')
        .style('position','absolute')
        .style('top', '4px')
        .style('left', '4px')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .text(leaf.data.name)
      p.append('div').attr('class', 'percent')
        .style('display', 'inline-block')
        .style('font-size', '10px')
        .style('font-weight', '400')
        .style('position','absolute')
        .style('top', '18px')
        .style('left', '4px')  
        .text(leaf.data.value+'%')
    })

    // transitionToCircleChart()
    // transitionToSunburstChart()
    transitionToTreeMap()
    // transitionToBarChart()

    function transitionToCircleChart () {
      console.log('transition to circle chart')
      circlePack.leaves().forEach((d,leafIdx)=>{
        const tooSmall = 20
        const div = parent.select('div#idx_'+d.data.name)
        const divName = div.select('div.name')
        const divPercent = div.select('div.percent')

        divName.style('font-size', d.r <= tooSmall ? '10px' : '12px')
        
        const nameWidth = div.select('div.name').node().getBoundingClientRect().width
        const nameHeight = div.select('div.name').node().getBoundingClientRect().height + (d.r <= tooSmall ? -6 : 0)
        const percentHeight = div.select('div.percent').node().getBoundingClientRect().height
        const percentWidth = div.select('div.percent').node().getBoundingClientRect().width

        const p = d.r > tooSmall ? (d.r-6)+'px' : (d.r-4)+'px'        
        const positionName = { top: (d.r-nameHeight)+'px', left: (d.r-(nameWidth*0.5))+'px' }
        const positionPercent = { top: (d.r-percentHeight+(nameHeight*0.75))+'px', left: (d.r-(percentWidth*0.5))+'px' }

        div.transition().duration(transitionSpeed)
          .style('border-radius', '100%')
          .style('width', d.r*2 +'px')
          .style('height', d.r*2 + 'px')
          .style('left', (d.x-d.r)+'px')
          .style('top', (d.y-d.r)+'px')
          .style('transform', 'rotateZ(0deg)')
          .style('overflow', 'hidden')
        
        divName.style('transform', null)
        divPercent.style('transform', null)

        divName.transition().duration(transitionSpeed)        
          .style('top', positionName.top)
          .style('left', positionName.left)          
        
        divPercent.transition().duration(transitionSpeed)
          .style('top', positionPercent.top)
          .style('left', positionPercent.left)      

        if(d.r <= tooSmall) {
          div.select('div.percent').style('display', 'none')
        }    
      })
      parent.transition().duration(transitionSpeed).delay(rotationDelay).on('end', ()=>{
        if (shouldTransition) { setTimeout(transitionToSunburstChart, 1) }      
      })
    }

    function transitionToBarChart () {
      console.log('transition to bar chart')

      parent.transition().duration(transitionSpeed).delay(rotationDelay).on('end', ()=>{
        if (shouldTransition) { setTimeout(transitionToTreeMap, 1) }
      })

      let runningChild = 0
      self.data.children.forEach((sector,i)=>{        
        const ease = d3.easeQuad
        // const ease = d3.easeBounce
        let runningY = (self.h * 0.5) + ((self.w/97.222) * d3.sum(sector.children,d=>d.value))
        const xPosition = percentScaleX(i)
        sector.children.forEach((child,childIdx)=>{
          const height = percentScaleY(child.value)
          // const delay = (11.3 - height) * 20 * i + (Math.random()*20)
          const speedMulti = Math.random() + 1
          // const delay = 0 // 
          const delay = (Math.random() * 200) + 50
          // const delay = (102 - runningChild) * 5
          runningY -= height + 1
          const div = parent.select('div#idx_'+child.name)
          const divName = div.select('div.name')
          const divPercent = div.select('div.percent')
          div.transition().duration(transitionSpeed*speedMulti).delay(delay).ease(ease)
            .style('left', xPosition+'px')
            .style('top', runningY+'px')
            .style('width', percentScaleX(.95)+'px')
            .style('border-radius', '0%')
            .style('height', height+'px')
            .style('transform', null)
            .style('overflow', 'hidden')

          divName.transition().duration(transitionSpeed*speedMulti).delay(delay).ease(ease)
            .style('top', '4px')
            .style('left', '4px')
            .style('font-size', '12px')
            .style('transform', null)
            .style('color','#FFF')

          divPercent.transition().duration(transitionSpeed*speedMulti).delay(delay).ease(ease)
            .style('display', null)
            .style('top', '18px')
            .style('left', '4px')  
            .style('transform', null)
            .style('color','#FFF')
        })      
        runningChild += 1
      })      
    }

    function transitionToTreeMap () {
      console.log('transition to treemap chart')
      treemap.leaves().forEach(leaf=>{
        const div = parent.select('div#idx_'+leaf.data.name)
        const divName = div.select('div.name')
        const divPercent = div.select('div.percent')

        div.transition().duration(transitionSpeed)
          .style('top', leaf.y0 +'px')
          .style('left', leaf.x0 +'px')
          .style('width', (leaf.x1 - leaf.x0)+'px')
          .style('height', (leaf.y1 - leaf.y0)+'px')
          .style('font-size', '12px')
          .style('font-weight', '600')
          .style('border-radius', '0%')
          .style('opacity', 1)

        divName.transition().duration(transitionSpeed)
          .style('top', '4px')
          .style('left', '4px')
          .style('font-size', '12px')

        divPercent.transition().duration(transitionSpeed)
          .style('display', null)
          .style('top', '18px')
          .style('left', '4px') 
      })
      parent.transition().duration(transitionSpeed).delay(rotationDelay).attr('foo', 1).on('end', ()=>{
        if (shouldTransition) { setTimeout(transitionToCircleChart, 1) }
      })      
    }

    function transitionToSunburstChart () {
      const radius = self.w * 0.4
      const sunburstElements = treemap.leaves()
      const elementHeight = ((3.14 * radius * 2 * .9) / sunburstElements.length)
      // const textHeight = elementHeight
      console.log('element height', elementHeight)

      const scaleElementWidth = d3.scaleLinear().domain([0,15]).range([0,150])

      const scaleElementIndexToAngle = d3.scaleLinear()
        .domain([0,sunburstElements.length])
        .range([Math.PI, Math.PI*3])

      const startPosition = 0
      const scaleElementRotationAngle = d3.scaleLinear()
        .domain([0,sunburstElements.length])
        .range([startPosition, startPosition+363])
                
        parent.transition().duration(transitionSpeed).delay(rotationDelay).attr('foo', 1).on('end', () => {
        if (shouldTransition) { setTimeout(transitionToBarChart, 1) }
      })

      sunburstElements
        .forEach((leaf, leafIdx) => {              
          const div = parent.select('div#idx_'+leaf.data.name)
          const divName = div.select('div.name')
          const divPercent = div.select('div.percent')
          const xPosition = (self.w*0.5) - (radius * Math.cos(scaleElementIndexToAngle(leafIdx))) + 'px'
          const yPosition = (self.w*0.5) - (radius * Math.sin(scaleElementIndexToAngle(leafIdx))) + 'px'

          const rotation = scaleElementRotationAngle(leafIdx + .133)

          div.transition().duration(transitionSpeed+(leafIdx*10))
            .style('top', yPosition).style('left', xPosition)
            .style('border-radius', '0%')
            .style('transform-origin', 'top left')
            .style('transform', ['rotateZ(',rotation,'deg)'].join(''))
            .style('width', scaleElementWidth(leaf.data.value)+'px')
            .style('height', String(elementHeight)+'px')
            .style('overflow', null)
                
          divName.style('font-size', '12px')

          const textTransformRotation = rotation > 90 && rotation < 270 ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
          const divNameWidth = divName.node().getBoundingClientRect().width
          divName.transition().duration(transitionSpeed).delay(leafIdx*5)
            .style('color','#FFF')
            .style('top', '1px').style('left', '4px')
            .style('transform', textTransformRotation)
            // .style('font-size', `${textHeight}px`)
          divPercent.transition().duration(transitionSpeed).delay(leafIdx*5).style('color','#FFF')
          .style('top', '2px').style('left', (divNameWidth + 8) + 'px').style('display', null).style('transform', textTransformRotation)          
        })
      
    }

  }

  render () {
    return (
      <Grid container item>
        <Grid container item
          style={{
            outline: '0px solid red', 
            marginBottom: 24,
            zIndex: -1
          }}
        >        
          <Grid container item ref={this.divRef} />
        </Grid>
        <Grid container item xs={12}>
          <svg ref={this.svgRef} height='0'/>
        </Grid>
        <Grid container item xs={12} justifyContent='space-around' alignItems='center'>
          {
            this.state.qqqData.children.map(child=>{
              return (
                <Grid container item 
                   xs={4} sm={4} md={2}
                  style={{ outline: '1px solid red', textAlign: 'center', padding: 8 }}>
                  <Typography align='center' style={{width: '100%'}}>{child.name}</Typography>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    )
  }

}