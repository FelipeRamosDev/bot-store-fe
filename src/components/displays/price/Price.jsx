import { toMoneyString, toMoney } from '@/helpers/format';

/**
 * Price component displays a formatted monetary value.
 *
 * @param {Object} setup - The component's props.
 * @param {string} setup.className - Additional CSS classes for styling.
 * @param {string} setup.symbol - Currency symbol (default is 'USD').
 * @param {boolean} setup.noColor - If true, disables color styling based on value.
 * @param {'success'|'error'|'warn'} setup.forceColor - To force a color ignoring the number reference.
 * @param {boolean} setup.noSymbol - If true, hides the currency symbol.
 * @param {boolean} setup.dashedZero - If true, shows "---" for zero values.
 * @param {number} setup.fractional - Number of decimal places to display.
 * @param {number} setup.amount - The monetary value to format and display.
 * @param {string} setup.size - CSS size for display (e.g., 'small', 'medium', 'large').
 * @param {number} setup.fontSize - Optional font-size of the displayed percentage.
 * @param {string} setup.prefix - A prefix to be displayed before the element.
 * @param {string} setup.posfix - A posfix to be displayed after the element.
 * @returns {JSX.Element} The formatted monetary value.
 */
export default function Price({
   className = '',
   symbol = 'USD',
   noColor = false,
   noSymbol = false,
   dashedZero = false,
   forceColor,
   fractional,
   amount,
   size,
   fontSize,
   prefix,
   posfix
}) {
   // Handle dashed zero display
   if (dashedZero && !amount) {
      return <span className={`price-display ${className}`}>---</span>;
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

   if (forceColor) {
      color = forceColor;
   }

   // Render the formatted monetary value
   return <span
      color={color}
      display-size={size}
      style={{ fontSize }}
      className={`price-display ${className}`}
   >{prefix || ''}{value}{posfix || ''}</span>;
}
