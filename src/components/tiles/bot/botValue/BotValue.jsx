import './BotValue.scss';
import FunctionValue from './FunctionValue';
import PrimitiveValue from './PrimitiveValue';

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
