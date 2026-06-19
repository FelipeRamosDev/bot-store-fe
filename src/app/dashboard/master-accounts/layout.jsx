/**
 * Metadata for the Wallets page.
 *
 * This object contains the metadata for the Wallet page, including the title and description
 * that will be used in the HTML document's head section.
 */
export const metadata = {
   title: "Wallets - CandlePilot Dashboard",
   description: "Look after your wallets.",
};

/**
 * MasterAccountsLayout Component
 *
 * This component serves as a layout wrapper for the Wallet page.
 * It renders the child components passed to it.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 *
 * @returns {JSX.Element} The rendered child components.
 */
export default function WalletsLayout({ children }) {
   return children;
}
