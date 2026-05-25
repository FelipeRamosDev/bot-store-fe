import BasePage from "@/templates/basePage/BasePage";
import ResetPassword from "@/components/content/dashboard/resetPassword/ResetPassword";
import { APIProvider } from "@/contexts/4HandsAPI";

/**
 * ResetPasswordPage Component
 *
 * This component renders the "reset password" page.
 * It uses the `BasePage` template and includes the `ResetPassword` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.searchParams - An object containing the search parameters from the URL.
 * @param {string} props.searchParams.confirmationtoken - The token used to confirm the user's email.
 *
 * @returns {JSX.Element} The rendered "reset password" page.
 */
export default function ResetPasswordPage({ searchParams: { useremail, resettoken } }) {
   return (
      <APIProvider>
         <BasePage className="reset-password-page" fullContainer={false}>
            <ResetPassword useremail={useremail} resettoken={resettoken} />
         </BasePage>
      </APIProvider>
   );
}
