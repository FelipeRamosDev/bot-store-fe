import Slots from "@/components/content/howItWorks/slots/Slots";
import BasePage from "@/templates/basePage/BasePage";

export default function SlotsPage() {
   return (
      <BasePage className="slots" fullContainer={false}>
         <Slots />
      </BasePage>
   );
}

