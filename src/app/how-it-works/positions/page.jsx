import Positions from "@/components/content/howItWorks/positions/Positions";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'Positions | CandlePilot',
   description: 'See how CandlePilot handles trading positions.',
};

export default function PositionsPage() {
   return (
      <BasePage className="positions" fullContainer={false}>
         <Positions />
      </BasePage>
   );
}
