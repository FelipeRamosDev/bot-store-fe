import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/style/darkTheme';

export default function RootPublicProvider({ children }) {
   return (
      <ThemeProvider theme={darkTheme}>
         {children}
      </ThemeProvider>
   );
}
