import BasePage from "@/templates/basePage/BasePage";
import EmailConfirmation from "@/components/content/dashboard/emailConfirmation/EmailConfirmation";

export default function EmailConfirmationPage({ searchParams: { confirmationtoken }}) {
   return <BasePage>
      <EmailConfirmation confirmationToken={confirmationtoken} />
   </BasePage>;
}
