'use client';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#2EB7E5',
         light: '#5CC7EB'
      },
      ['primary-light']: {
         main: '#89d6f0'
      },
      secondary: {
         main: '#0C3845'
      },
      tertiary: {
         main: '#8BFFBC'
      },
      background: {
         default: '#212A2D',
         paper: '#252A2A'
      },
      text: {
         primary: '#fafafa',
         secondary: '#0F282F',
         tertiary:'#254331',
         warn: '#3A290E',
         disabled: 'rgba(250,250,250,0.7)'
      },
      error: {
         main: '#EF664B'
      },
      info: {
         main: 'rgba(250,250,250,0.8)'
      },
      success: {
         main: '#5CE091'
      },
      warn: {
         main: '#D7C150'
      },
      disabled: {
         main: '#808080'
      }
   }
});
