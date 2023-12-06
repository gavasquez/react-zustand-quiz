import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
//* Importaciones para el modo dark
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//* modo dark
const darkTheme = createTheme( {
  palette: {
    mode: 'dark',
  },
} );


ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <ThemeProvider theme={ darkTheme }>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
