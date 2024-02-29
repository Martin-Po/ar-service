import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Logo from '../assets/logo.png'





import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'

function ResponsiveAppBar() {


    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handlelogOut = () => {

    }

    const handleLanguageChange = () => {
        // Dispatch the action
    }

    const handleThemeChange = () => {
        // Dispatch the action
    }

    return (
        <AppBar
            position="static"
            style={{ backgroundColor: 'primary.main', boxShadow: 'none' }}
        >
            <Container
                maxWidth={false}
                sx={{
                    width: '1300px',
                    '@media (max-width:1300px)': {
                        width: '880px',
                    },
                    '@media (max-width:900px)': {
                        width: '100%',
                    },
                }}
            >
                <Toolbar disableGutters>
                <img
                    style={{
                        width: '100%',
                        maxWidth: '70px',
                        maxHeight: '70px',
                    }}
                    src={Logo}
                    alt="Hero"
                />

                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleLanguageChange}
                        >
                           TIENDA
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleThemeChange}
                        >
                           FAQS
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >      
        <Divider />


      </Menu>
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
