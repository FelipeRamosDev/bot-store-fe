import Pilots from "@/components/content/howItWorks/pilots/Pilots";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'Pilots | CandlePilot',
   description: 'Understand pilot bots and how they execute strategies.',
};

export default function PilotsPage() {
   return (
      <BasePage className="pilots" fullContainer={false}>
         <Pilots />
      </BasePage>
   );
}
