import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotsTableImg from "../../home/img/BotsTableImg";

export default function Slots() {
   return (
      <div className="slots-content">
         <StandardPageHeader pageTitle="Slots" titleLabel="How it works" Background={BotsTableImg} />
      </div>
   );
}
