import Pilots from "@/components/content/howItWorks/pilots/Pilots";
import BasePage from "@/templates/basePage/BasePage";

export default function PilotsPage() {
   return (
      <BasePage className="pilots" fullContainer={false}>
         <Pilots />
      </BasePage>
   );
}
