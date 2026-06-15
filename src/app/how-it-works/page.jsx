import HowItWorks from "@/components/content/howItWorks/HowItWorks";
import BasePage from "@/templates/basePage/BasePage";

export default function HowItWorksPage() {
   return (
      <BasePage className="how-it-works" fullContainer={false}>
         <HowItWorks />
      </BasePage>
   );
}
