import WhatsIsCandlePilot from "@/components/content/howItWorks/whatIsCandlePilot/WhatIsCandlePilot";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'What Is CandlePilot | CandlePilot',
   description: 'Get an overview of CandlePilot and its trading workflow.',
};

export default function WhatIsCandlePilotPage() {
   return (
      <BasePage className="what-is-candlepilot" fullContainer={false}>
         <WhatsIsCandlePilot />
      </BasePage>
   );
}
