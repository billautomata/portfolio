import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'

import './App.css'

import AboutMe from './Home-Components/AboutMe'
import CrosstownLights from './Home-Components/CrosstownLights.js'
import QQQHeaderVisualization from './Home-Components/QQQ-header-visualization'
import Random from './Home-Components/Random'
import Sections from './Home-Components/Sections'
import ThreeDeeWork from './Home-Components/3DWork'

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '1px',
        border: '1px solid white',
        borderColor: 'white',
        outline: '1px solid white'
      },
      label: {
        color: 'white',        
        fontWeight: '700',
        // letterSpacing: '.5px',
        position: 'relative',
        top: '1px'
      }
    }
  },  
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      // main: '#01579b',
      main: '#333'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#546e7a',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontWeight: 100
    },
    h5: {
      fontWeight: 300,
      lineHeight: '1em'
    },
    h6: {
      textTransform: 'uppercase',
      fontWeight: 300,
      letterSpacing: '1px'
    },
    body1: {
      fontSize: 16
    },
    body2: {
      fontSize: 18,
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Route exact path='/' component={Home}/>
        <Route exact path='/3D' component={ThreeDeeWork}/>
        <Route exact path='/crosstown-lights' component={CrosstownLights}/>
      </ThemeProvider>
    </HashRouter>
  );
}

function Home () {
  return (
    <>
      <AboutMe/>
      <QQQHeaderVisualization/>
      <Sections/>
    </>
  )
}

export default App;
