import { toMoneyString, toMoney } from '@/helpers/format';

/**
 * Price component displays a formatted monetary value.
 *
 * @param {string} className - Additional CSS classes for styling.
 * @param {string} symbol - Currency symbol (default is 'USD').
 * @param {boolean} noColor - If true, disables color styling based on value.
 * @param {boolean} noSymbol - If true, hides the currency symbol.
 * @param {boolean} dashedZero - If true, shows "---" for zero values.
 * @param {number} fractional - Number of decimal places to display.
 * @param {number} amount - The monetary value to format and display.
 * @param {string} size - CSS size for display (e.g., 'small', 'medium', 'large').
 * @returns {JSX.Element} The formatted monetary value.
 */
export default function Price({
   className = '',
   symbol = 'USD',
   noColor = false,
   noSymbol = false,
   dashedZero = false,
   fractional,
   amount,
   size
}) {
   // Handle dashed zero display
   if (dashedZero && amount === 0) {
      return <span className={`price-display ${className}`}>$---</span>;
   }

   // Determine value and color based on props
   let value;
   let color = 'disabled';

   if (noSymbol) {
      value = toMoney(amount, { fractional });
   } else {
      value = toMoneyString(amount, { symbol, fractional });
   }

   if (!noColor) {
      if (amount > 0) {
         color = 'success';
      } else if (amount < 0) {
         color = 'error';
      }
   }

   // Render the formatted monetary value
   return <span
      color={color}
      display-size={size}
      className={`price-display ${className}`}
   >{value}</span>;
}
