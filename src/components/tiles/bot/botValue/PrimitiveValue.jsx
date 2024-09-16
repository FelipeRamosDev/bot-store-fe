import BotValuesMenu from '@/components/menus/dropdown/botValuesMenu/BotValuesMenu';

/**
 * Displays a primitive bot value with an associated menu for actions.
 * 
 * @param {Object} props - The component's props.
 * @param {string} [props.className=''] - Additional class names to apply to the component.
 * @param {Object} [props.parentThread] - The parent thread associated with the bot value.
 * @param {Object} [props.parentRule] - The parent rule associated with the bot value.
 * @param {Object} [props.botValue={}] - The primitive bot value to display.
 * @param {string} props.botValue.primitiveType - The type of the primitive value.
 * @param {string} props.botValue.primitiveValue - The actual value of the primitive.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function PrimitiveValue({ className = '', parentThread, parentRule, botValue = {}, ...props }) {
   const primitiveType = botValue.primitiveType;

   return (
      <div className={`bot-value primitive ${className}`} {...props}>
         <div className="menu-wrap">
            <BotValuesMenu botValue={botValue} parentThread={parentThread} parentRule={parentRule} />
         </div>

         <label className="value-name">Primitive</label>
         <span className={`primitive-value ${primitiveType}`}>{botValue.primitiveValue}</span>
      </div>
   );
}
