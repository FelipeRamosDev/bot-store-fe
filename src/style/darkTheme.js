'use client';
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const appFont = Montserrat({
   weight: ['300', '400', '500', '600', '700', '800', '900'],
   subsets: ['latin']
});

export const darkTheme = createTheme({
   typography: {
      fontFamily: appFont.style.fontFamily
   },
   palette: {
      mode: 'dark',
      primary: {
         main: '#1f9dc7',
         light: '#5CC7EB'
      },
      ['primary-light']: {
         main: '#89d6f0'
      },
      ['primary-dark']: {
         main: '#2EB7E5'
      },
      secondary: {
         main: '#0C3845'
      },
      tertiary: {
         main: '#8BFFBC'
      },
      background: {
         default: '#212A2D',
         paper: '#202424'
      },
      text: {
         primary: '#fafafa',
         darken: '#c7c7c7',
         secondary: '#0F282F',
         tertiary:'#254331',
         success: '#002510',
         error: '#651809',
         warn: '#3A290E',
         disabled: 'rgba(250,250,250,0.7)'
      },
      error: {
         main: '#EF664B'
      },
      info: {
         main: '#c7c7c7'
      },
      success: {
         main: '#5CE091'
      },
      warn: {
         main: '#D7C150'
      },
      disabled: {
         main: '#808080'
      },
      grey: {
         softMark: '#353535'
      },
      rubber: {
         main: '#2c3232'
      }
   }
});
