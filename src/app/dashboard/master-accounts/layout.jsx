/**
 * Metadata for the Master Accounts page.
 *
 * This object contains the metadata for the Master Accounts page, including the title and description
 * that will be used in the HTML document's head section.
 */
export const metadata = {
   title: "Master Accounts - BotStore Dashboard",
   description: "Look after your master accounts.",
};

/**
 * MasterAccountsLayout Component
 *
 * This component serves as a layout wrapper for the Master Accounts page.
 * It renders the child components passed to it.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 *
 * @returns {JSX.Element} The rendered child components.
 */
export default function MasterAccountsLayout({ children }) {
   return children;
}
