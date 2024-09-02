import './BotValue.scss';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import FunctionValue from './FunctionValue';
import PrimitiveValue from './PrimitiveValue';

export default function BotValue({ botValue = {}, ...props }) {
   if (botValue.valueType === 'function') {
      return <>
         {botValue.toCompare && <BotThreadDivider text={botValue.toCompare} />}
         <FunctionValue botValue={botValue} {...props} />
      </>
   }

   if (botValue.valueType === 'primitive') {
      return <>
         {botValue.toCompare && <BotThreadDivider text={botValue.toCompare} />}
         <PrimitiveValue botValue={botValue} {...props} />
      </>;
   }

   return <></>;
}
