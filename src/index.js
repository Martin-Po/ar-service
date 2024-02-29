import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App  />
    </ThemeProvider>
)
reportWebVitals()
