import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D28D9', // This is the purple color used in the app logo
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // This prevents uppercase text in buttons
        },
      },
    },
  },
});

export default theme;