import { toPercentString } from '@/helpers/format';

/**
 * Percent component displays a percentage value with optional styling.
 *
 * @param {string} className - Additional CSS classes for styling.
 * @param {boolean} noColor - If true, disables color styling.
 * @param {boolean} dashedZero - If true, displays "---%" for a zero value.
 * @param {number} fractional - Number of decimal places to show in the percentage.
 * @param {number} value - The percentage value to display.
 * @param {string} size - Optional size of the displayed percentage.
 * @returns {JSX.Element} The rendered percentage value with optional styling.
 */
export default function Percent({
   className = '',
   noColor = false,
   dashedZero = false,
   fractional = 2,
   value,
   size
}) {
   // Handle dashed zero case
   if (dashedZero && value === 0) {
      return <span className={`percent-display`}>---%</span>;
   }

   // Determine color based on value and noColor flag
   let color = 'disabled';
   if (!noColor) {
      color = value > 0 ? 'success' : value < 0 ? 'error' : 'disabled';
   }

   // Format the percentage value
   const percent = toPercentString(value, { fractional });

   // Render the percentage value
   return (
      <span
         className={`percent-display ${className}`}
         style={{ color: color }}
         data-size={size}
      >
         {percent}
      </span>
   );
}
