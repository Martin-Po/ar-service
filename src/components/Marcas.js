import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';



const Marcas = () => {

    const Marcas = [
        {
            id: 1,
            src: 'yamaha.png',
            text: 'yamaha',
        },
        {
            id: 3,
            src: 'marshall.png',
            text: 'marshall',
        },{
            id: 4,
            src: 'sansui.png',
            text: 'sansui',
        },
       
        {
            id: 5,
            src: 'onkyo.png',
            text: 'onkyo',
        },
        {
            id: 6,
            src: 'infinity.png',
            text: 'infinity',
        },
        {
            id: 7,
            src: 'marantz.png',
            text: 'marantz',
        },
        {
            id: 9,
            src: 'bose.png',
            text: 'bose',
        },
        {
            id: 16,
            src: 'jvc.png',
            text: 'jvc',
        },
        {
            id: 10,
            src: 'nakamichi.png',
            text: 'nakamichi',
        },
        {
            id: 14,
            src: 'akai.png',
            text: 'akai',
        },
        {
            id: 11,
            src: 'tecnics.png',
            text: 'tecnics',
        },
        {
            id: 15,
            src: 'harman.png',
            text: 'harman',
        },
        {
            id: 12,
            src: 'jbl.png',
            text: 'jbl',
        },
        {
            id: 13,
            src: 'pioneer.png',
            text: 'pioneer',
        },
    ]

    const [maxHeight, setMaxHeight] = useState('75px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 860 && window.innerWidth < 1024) {
                setMaxHeight('50px');
                
            } 
            else if (window.innerWidth < 500) {
                setMaxHeight('25px');
            }else if (window.innerWidth < 860) {
                setMaxHeight('40px');}
             else {
                setMaxHeight('75px'); // Default height for larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call the function initially to set maxHeight based on current window width

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const route = process.env.PUBLIC_URL + '/assets/marcas/'
    return (
        <div style={{ width: '100vw', maxWidth: '100%' }}>

            <Box
                
                sx={{
                    margin: '50px auto 0 auto',
                    width: '1280px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    flexWrap:'wrap',


                    '@media (max-width: 1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <Typography
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                fontWeight: 'bold',
                                fontSize: '2.5rem',
                                margin: '2rem',
                                width:'100%',
                                '@media (max-width:960px)': {
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    fontSize: '2rem',
                                },
                                '@media (max-width:700px)': {
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    fontSize: '1.65rem',
                                },
                                '@media (max-width:600px)': {
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    fontSize: '1.35rem',
                                },
                            }}
                        >
                            Trabajamos con todas las marcas del mercado
                        </Typography>
                {Marcas.map(marca => { return (
                    <img
                    key={marca.id}
                    style={{
                        margin:'0.25rem',
                        maxWidth: '100%',
                        height: 'auto', // Ensure aspect ratio is maintained
                        maxHeight: maxHeight, // Default height
                    }}
                    src={route + marca.src}
                    alt="Hero"
                />
                
                // Apply responsive styling using @media queries
              
                    )})}

               
            </Box>
        </div>
    )
}
export { Marcas }
