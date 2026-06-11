import Positions from "@/components/content/howItWorks/positions/Positions";
import BasePage from "@/templates/basePage/BasePage";

export default function PositionsPage() {
   return (
      <BasePage className="positions" fullContainer={false}>
         <Positions />
      </BasePage>
   );
}
