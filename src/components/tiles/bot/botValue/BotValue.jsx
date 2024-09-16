import './BotValue.scss';
import FunctionValue from './FunctionValue';
import PrimitiveValue from './PrimitiveValue';

/**
 * Renders different types of bot values based on their value type.
 * 
 * @param {Object} props - The component's props.
 * @param {Object} [props.botValue={}] - The bot value to display.
 * @param {Object} [props.parentThread] - The parent thread associated with the bot value.
 * @param {Object} [props.parentRule] - The parent rule associated with the bot value.
 * @param {boolean} [props.isSingle] - If true, the component is displayed in a single value format.
 * @param {boolean} [props.minify=false] - If true, displays a minified view of the function value.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function BotValue({ botValue = {}, parentThread, parentRule, isSingle, minify, ...props }) {
   if (botValue.valueType === 'function') {
      return <FunctionValue
         botValue={botValue}
         parentThread={parentThread}
         parentRule={parentRule}
         minify={minify}
         {...props}
      />;
   }

   if (botValue.valueType === 'primitive') {
      return <PrimitiveValue
         botValue={botValue}
         parentThread={parentThread}
         parentRule={parentRule}
         {...props}
      />;
   }

   return <></>;
}
