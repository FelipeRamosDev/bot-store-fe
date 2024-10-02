import '@/style/scss/style.scss';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/style/darkTheme';
import { Montserrat } from 'next/font/google';

const appFont = Montserrat({
   weight: ['300', '400', '500', '600', '700', '800', '900'],
   subsets: ['latin']
});

/**
 * Metadata for the BotStore application.
 *
 * This object contains the metadata for the BotStore application, including the title,
 * description, and robots directive that will be used in the HTML document's head section.
 */
export const metadata = {
   title: 'CandlePilot',
   description: 'Use/Create trade bots for cryptocurrencies.',
   robots: 'noindex', // Prevents search engines from indexing this page
};

/**
 * Main entry point for the BotStore application.
 *
 * This component serves as the root layout for the application, importing global styles and
 * exporting the `MainRoot` layout component.
 *
 * @returns {JSX.Element} The root layout component for the application.
 */
export default function HomeLayout({ children }) {
   return (
      <ThemeProvider theme={darkTheme}>
         <html lang="en" className={appFont.className}>
            <body>
               {children}
            </body>
         </html>
      </ThemeProvider>
   );
}
