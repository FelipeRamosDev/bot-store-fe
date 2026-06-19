import Slots from "@/components/content/howItWorks/slots/Slots";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'Slots | CandlePilot',
   description: 'Learn how slots organize bot allocation and execution.',
};

export default function SlotsPage() {
   return (
      <BasePage className="slots" fullContainer={false}>
         <Slots />
      </BasePage>
   );
}

