import BasePage from "@/templates/basePage/BasePage";
import EmailConfirmation from "@/components/content/dashboard/emailConfirmation/EmailConfirmation";

/**
 * EmailConfirmationPage Component
 *
 * This component renders the email confirmation page.
 * It uses the `BasePage` template and includes the `EmailConfirmation` component.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.searchParams - An object containing the search parameters from the URL.
 * @param {string} props.searchParams.confirmationtoken - The token used to confirm the user's email.
 *
 * @returns {JSX.Element} The rendered email confirmation page.
 */
export default function EmailConfirmationPage({ searchParams: { confirmationtoken }}) {
   return (
      <BasePage>
         <EmailConfirmation confirmationToken={confirmationtoken} />
      </BasePage>
   );
}
