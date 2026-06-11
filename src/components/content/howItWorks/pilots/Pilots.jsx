import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotThreadImg from "../../home/img/BotThreadImg";

export default function Pilots() {
   return (
      <div className="pilots-content">
         <StandardPageHeader pageTitle="Pilots" titleLabel="How it works" Background={BotThreadImg} />
      </div>
   );
}
