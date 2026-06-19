import '@/style/scss/style.scss';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/style/darkTheme';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';

const appFont = Montserrat({
   weight: ['300', '400', '500', '600', '700', '800', '900'],
   subsets: ['latin']
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
const googleAnalyticsDebugMode = process.env.NEXT_PUBLIC_GA_DEBUG === 'true';

/**
 * Metadata for the BotStore application.
 *
 * This object contains the metadata for the BotStore application, including the title,
 * description, and robots directive that will be used in the HTML document's head section.
 */
export const metadata = {
   title: 'CandlePilot',
   description: 'Use/Create trade bots for cryptocurrencies.',
   manifest: '/manifest.json'
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
               {googleAnalyticsId && (
                  <>
                     <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                        strategy="afterInteractive"
                     />
                     <Script id="google-analytics" strategy="afterInteractive">
                        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', ${googleAnalyticsDebugMode ? "{ debug_mode: true }" : "{}"});`}
                     </Script>
                  </>
               )}
               {children}
            </body>
         </html>
      </ThemeProvider>
   );
}
