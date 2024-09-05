import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import BotValuesMenu from "@/components/menus/dropdown/botValuesMenu/BotValuesMenu";

export default function PrimitiveValue({ className = '', botValue = {} }) {
   const primitiveType = botValue.primitiveType;

   return (
      <div className={`bot-value primitive ${className}`}>
         <div className="menu-wrap">
            <BotValuesMenu botValue={botValue} />
         </div>

         <label className="value-name">Primitive</label>
         <span className={`primitive-value ${primitiveType}`}>{botValue.primitiveValue}</span>
      </div>
   );
}
