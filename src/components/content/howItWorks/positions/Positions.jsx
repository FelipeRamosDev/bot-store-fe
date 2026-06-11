import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotCardImg from "../../home/img/BotCardImg";

export default function Positions() {
   return (
      <div className="positions-content">
         <StandardPageHeader pageTitle="Positions" titleLabel="How it works" Background={BotCardImg} />
      </div>
   );
}
