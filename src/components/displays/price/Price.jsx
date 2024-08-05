import './Price.scss';
import { toMoneyString, toMoney } from '@/helpers/format'

export default function Price({ className = '', symbol = '$', noSymbol = false, fractional, amount }) {
   if (!amount && amount !== 0) {
      return <span className={`price-display`}>---</span>;
   }

   let value;
   let color = 'disabled';

   if (noSymbol) {
      value = toMoney(amount, { fractional });
   } else {
      value = toMoneyString(amount, { symbol, fractional });
   }

   if (amount > 0) {
      color = 'success';
   } else if (amount < 0) {
      color = 'error';
   }

   return <span
      color={color}
      className={`price-display ${className}`}
   >{value}</span>;
}
