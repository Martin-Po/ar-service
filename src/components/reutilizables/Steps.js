import { Avatar, Box, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';



const Steps = ({ selected, step, last, index }) => {
    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Avatar
                    sx={{
                        '@media (max-width:600px)': {
                            width: '1.85rem', height: '1.85rem', 

                        },
                        backgroundColor: selected < index  ? 'primary.dark' : selected === index
                            ? 'secondary.dark'
                            : 'status.ok',
                    }}
                >
                   <Box sx={{fontSize:'1.25rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.65rem', // El texto se muestra en una sola línea
                            },}}>

                        {selected > index ?  <CheckIcon sx={{fontSize:'1.1.2rem'}}/> : index}
                   </Box>
                </Avatar>
                <Box>

                <Typography
                        sx={{
                            textAlign: 'center',
                            '@media (min-width:600px)': {
                                whiteSpace: 'nowrap', // El texto se muestra en una sola línea
                            },
                            '@media (max-width:600px)': {
                                fontSize: '0.85rem', // El texto se muestra en una sola línea
                            },
                        }}
                    >
                {step}
                </Typography>
                </Box>

            </Box>
            {!last && (
                <Box
                    sx={{
                        marginLeft: '2rem',
                        marginRight: '2rem',
                        width: '100%',
                        height: '0.2rem',
                        background: 'black',
                        
                            '@media (max-width:600px)': {
                        margin: '0',

                                height: '0.1rem',

                            },
                    }}
                />
            )}
        </>
    );
    
}

export {Steps}