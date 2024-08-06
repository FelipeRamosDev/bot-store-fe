import { toPercentString } from '@/helpers/format';

export default function Percent({ className = '', fractional = 2, value, size }) {
   if (!value && value !== 0) {
      return <span className={`percent-display`}>---</span>;
   }

   let color = 'disabled';

   if (value > 0) {
      color = 'success';
   } else if (value < 0) {
      color = 'error';
   }

   const percent = toPercentString(value, { fractional });
   return <span
      color={color}
      display-size={size}
      className={`percent-display ${className}`}
   >{percent}</span>;
}
