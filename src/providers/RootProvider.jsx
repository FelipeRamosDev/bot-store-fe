import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/style/darkTheme';
import { APIProvider } from '@/contexts/4HandsAPI';

export default function RootProvider({ children }) {
   return (
      <APIProvider>
         <ThemeProvider theme={darkTheme}>
            {children}
         </ThemeProvider>
      </APIProvider>
   );
}
