import HowItWorks from "@/components/content/howItWorks/HowItWorks";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'How It Works | CandlePilot',
   description: 'Learn how CandlePilot works and how bots interact with your accounts.',
};

export default function HowItWorksPage() {
   return (
      <BasePage className="how-it-works" fullContainer={false}>
         <HowItWorks />
      </BasePage>
   );
}
