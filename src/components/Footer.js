import { Box, Typography } from '@mui/material'

function Footer() {

    return (
        <Box
            sx={{   marginTop:'auto', backgroundColor: 'primary.main', width:'100%', 


            }}
        >
            <Box
                sx={{
                    flex: 1,  // Make this area take up all available space
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                {/* Content Goes Here */}
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                <Typography variant="h2" fontSize="1rem" fontWeight="500" opacity='0.85'>
                        Hecho por Martin Ponce
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer
