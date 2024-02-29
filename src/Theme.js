import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: '#F3F4F6',
        light: 'white'
      },
      secondary: {
        main: '#B1DBED',
      },
    },
    typography: {
      "fontFamily": "Outfit, sans-serif",
    "color":'rgb(68 86 108)'
  }
  ,
  paperCustom: {
    padding: "2rem",
    fontFamily: "roboto",
    margin: "2rem",
    minHeight: window.innerHeight,
    borderRadius: 0
  },
  typographyCustom: {
    marginBottom: "1rem"
  },
  dividerCustom: {
    marginTop: "2rem"
  }
  
  });

  export { theme }