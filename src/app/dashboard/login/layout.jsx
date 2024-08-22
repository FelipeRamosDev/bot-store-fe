/**
 * Metadata for the Login page.
 *
 * This object contains the metadata for the Login page, including the title and description
 * that will be used in the HTML document's head section.
 */
export const metadata = {
   title: "Dashboard - Login",
   description: "Login if you already have an account or register a new account",
};

/**
 * LoginLayout Component
 *
 * This component serves as a layout wrapper for the Login page.
 * It renders the child components passed to it.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 *
 * @returns {JSX.Element} The rendered child components.
 */
export default function LoginLayout({ children }) {
   return children;
}
