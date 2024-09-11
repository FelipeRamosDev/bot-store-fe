import './BotValue.scss';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import FunctionValue from './FunctionValue';
import PrimitiveValue from './PrimitiveValue';

export default function BotValue({ botValue = {}, isSingle, minify, ...props }) {
   if (botValue.valueType === 'function') {
      return <FunctionValue botValue={botValue} minify={minify} {...props} />;
   }

   if (botValue.valueType === 'primitive') {
      return <PrimitiveValue botValue={botValue} {...props} />;
   }

   return <></>;
}
