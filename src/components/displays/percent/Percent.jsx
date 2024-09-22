import { toPercentString } from '@/helpers/format';

/**
 * Percent component displays a percentage value with optional styling.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.noColor - If true, disables color styling.
 * @param {boolean} props.dashedZero - If true, displays "---%" for a zero value.
 * @param {number} props.fractional - Number of decimal places to show in the percentage.
 * @param {number} props.value - The percentage value to display.
 * @param {string} props.size - Optional size of the displayed percentage.
 * @param {number} props.fontSize - Optional font-size of the displayed percentage.
 * @param {string} props.prefix - A prefix to be displayed before the element.
 * @param {string} props.posfix - A posfix to be displayed after the element.
 * @returns {JSX.Element} The rendered percentage value with optional styling.
 */
export default function Percent({
   className = '',
   noColor = false,
   dashedZero = false,
   fractional = 2,
   value,
   size,
   fontSize,
   prefix,
   posfix
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
   return <span
      color={color}
      display-size={size}
      style={{ fontSize }}
      className={`percent-display ${className}`}
   >{prefix || ''}{percent}{posfix || ''}</span>;

}
