import { Box, CssBaseline, Grid } from '@mui/material';
import './App.css';
import AppBar from './components/AppBar'
import { Hero } from './components/Hero';
import Footer from './components/Footer';
import { Hero_2 } from './components/Hero_2';
import { Banner } from './components/Banner';


function App() {
  return (
    <div style={{backgroundColor: '#B1DBED',  minHeight: '100vh', position: 'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <CssBaseline />
            <AppBar/>
            <Hero_2/>
            
            <Grid
                container
                
                sx={{
                  margin: '50px auto 0 auto',
                  width: '1280px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  
                  "@media (max-width: 1300px)": {
                    width: '992px',

                  }, '@media (max-width:1024px)': {
                    width: '100%',
                }, 
                }}
            >

              <Banner/>

              </Grid>

              <Footer />

      </div>

  );
}

export default App;
