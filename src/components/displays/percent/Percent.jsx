import { toPercentString } from '@/helpers/format';

export default function Percent({ className = '', noColor = false, dashedZero = false, fractional = 2, value, size }) {
   if (!value) {
      if (dashedZero && value === 0) {
         return <span className={`percent-display`}>---%</span>;
      }
   }

   let color = 'disabled';

   if (!noColor && value > 0) {
      color = 'success';
   } else if (!noColor && value < 0) {
      color = 'error';
   }

   const percent = toPercentString(value, { fractional });
   return <span
      color={color}
      display-size={size}
      className={`percent-display ${className}`}
   >{percent}</span>;
}
