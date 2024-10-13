/**
 * Metadata for the PilotStore page.
 *
 * This object contains the metadata for the Dashboard page, including the title and description
 * that will be used in the HTML document's head section.
 */
export const metadata = {
   title: 'Pilot Store - Dashboard - CandlePilot',
   description: 'Choose a pilot trader bot and automate your cryptocurrencies trades.',
};

/**
 * PilotStoreLayout Component
 *
 * This component serves as a layout wrapper for the PilotStore page.
 * It renders the child components passed to it.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 *
 * @returns {JSX.Element} The rendered child components.
 */
export default function PilotStoreLayout({ children }) {
   return children;
}