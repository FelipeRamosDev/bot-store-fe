import '@/style/scss/style.scss';
import MainRoot from '@/layouts/root/MainRoot';

/**
 * Metadata for the BotStore application.
 *
 * This object contains the metadata for the BotStore application, including the title,
 * description, and robots directive that will be used in the HTML document's head section.
 */
export const metadata = {
   title: 'BotStore',
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
export default MainRoot;
