import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/loginuserReducer'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { TextField, Button } from '@mui/material'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginForm() {

const loggeduser = useSelector(state => state.loggeduser)


    const dispatch = useDispatch()


    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const credentials = {
        username: data.get('username'),
        password: data.get('password'),
      };
      try {
        await dispatch(logIn(credentials));
        // Redireccionar a la página deseada después del inicio de sesión exitoso
        navigate('/admin/home');
      } catch (exception) {
        console.error('Hubo un error durante el inicio de sesión', exception);
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
         
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {loggeduser.error && loggeduser.error.Type === 'login' && <Alert severity="error">{loggeduser.error.ErrorMessage}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}