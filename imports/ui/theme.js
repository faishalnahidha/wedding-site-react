import { createMuiTheme } from '@material-ui/core/styles';

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#7f95ff',
      main: '#4568dc',
      dark: '#003ea9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff6ff',
      main: '#f6c3e5',
      dark: '#c392b3',
      contrastText: '#212529',
    },
    text: {
      primary: 'rgba(33, 37, 41, 0.87)',
      secondary: 'rgba(33, 37, 41, 0.6)',
    },
  },
  typography: {
    fontFamily: 'Nunito Sans, Arial',
    h6: {
      fontWeight: 600,
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'none',
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 50,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '8px',
      },
    },
  },
});
