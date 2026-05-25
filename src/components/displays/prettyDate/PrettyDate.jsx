/**
 * PrettyDate component formats and displays a date and time in a readable format.
 *
 * @param {string} className - Additional CSS classes for styling.
 * @param {string} divisor - Separator between date and time (default is ' - ').
 * @param {number | string | Date} time - The date/time value to format.
 * @param {boolean} hideYear - If true, hides the year in the date.
 * @param {boolean} hideSeconds - If true, hides the seconds in the time.
 * @returns {JSX.Element} The formatted date and time.
 */
export default function PrettyDate({
   className = '',
   divisor = ' - ',
   time,
   hideYear = false,
   hideSeconds = false
}) {
   const date = new Date(time);

   // Format day and month with leading zeros
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');

   // Start building the date string
   let string = `${day}/${month}`;

   // Append the year if not hidden
   if (!hideYear) {
      string += `/${date.getFullYear()}`;
   }

   // Append the divisor and time
   string += divisor;
   string += `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

   // Append seconds if not hidden
   if (!hideSeconds) {
      string += `:${date.getSeconds().toString().padStart(2, '0')}`;
   }

   // Render the formatted date and time
   return <span className={`pretty-date ${className}`}>{string}</span>;
}
