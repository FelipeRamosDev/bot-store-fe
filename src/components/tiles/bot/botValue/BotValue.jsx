import './BotValue.scss';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import FunctionValue from './FunctionValue';
import PrimitiveValue from './PrimitiveValue';

export default function BotValue({ botValue = {}, isSingle, minify, ...props }) {
   if (botValue.valueType === 'function') {
      return <>
         {botValue.toCompare && !isSingle && <BotThreadDivider text={botValue.toCompare} />}
         <FunctionValue botValue={botValue} minify={minify} {...props} />
      </>
   }

   if (botValue.valueType === 'primitive') {
      return <>
         {botValue.toComparee && !isSingle && <BotThreadDivider text={botValue.toCompare} />}
         <PrimitiveValue botValue={botValue} {...props} />
      </>;
   }

   return <></>;
}
