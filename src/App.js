import { Box, CssBaseline, Grid } from '@mui/material';
import './App.css';
import AppBar from './components/AppBar'
import { Hero } from './components/Hero';
import Footer from './components/Footer';
import { Hero_2 } from './components/Hero_2';
import { Banner } from './components/Banner';
import { Marcas } from './components/Marcas';
import { Testimonios } from './components/Testimonios';


function App() {
  return (
    <div style={{backgroundColor: '#B1DBED',  minHeight: '100vh', position: 'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <CssBaseline />
            <AppBar/>
            <Hero_2/>
            <Banner/>
            <Marcas/>
            <Testimonios/>

            
    

              <Footer />

      </div>

  );
}

export default App;
