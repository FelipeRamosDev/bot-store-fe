import { toMoneyString, toMoney } from '@/helpers/format';

export default function Price({ className = '', symbol = 'USD', noColor = false, noSymbol = false, fractional, amount, size }) {
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

   if (!noColor && amount > 0) {
      color = 'success';
   } else if (!noColor && amount < 0) {
      color = 'error';
   }

   return <span
      color={color}
      display-size={size}
      className={`price-display ${className}`}
   >{value}</span>;
}
