import BasePage from '../basePage/BasePage';
import RootAuthProvider from '@/providers/RootAuthProvider';

/**
 * `AuthBasePage` is a wrapper component that provides a base layout for pages that require authentication.
 * It wraps its children with an `AuthUserProvider` to provide authentication context and a `BasePage` component
 * to ensure consistent layout with an authentication-specific header menu.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `AuthUserProvider` and `BasePage`.
 *
 * @returns {JSX.Element} The rendered `BasePage` component containing the `AuthUserProvider` and children.
 */
export default function AuthBasePage({ className, children, ...props }) {
   if (className) {
      className += ' auth-page';
   } else {
      className = 'auth-page'
   }

   return (
      <RootAuthProvider>
         <BasePage className={className} headerMenu="auth" {...props}>
            {children}
         </BasePage>
      </RootAuthProvider>
   );
}
