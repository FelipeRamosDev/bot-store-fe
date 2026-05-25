import { APIProvider } from "@/contexts/4HandsAPI";
import Login from "@/components/content/dashboard/login/Login";
import BasePage from "@/templates/basePage/BasePage";

/**
 * LoginPage Component
 *
 * This component renders the Login page.
 * It uses the `BasePage` template and includes the `Login` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.searchParams - An object containing the search parameters from the URL.
 * @param {string} [props.searchParams.register] - An optional parameter indicating whether the user is registering.
 *
 * @returns {JSX.Element} The rendered login page.
 */
export default function LoginPage({ searchParams: { register } }) {
   return (
      <APIProvider>
         <BasePage className="login-page" fullContainer={false}>
            <Login isRegister={Boolean(register)} />
         </BasePage>
      </APIProvider>
   );
}
