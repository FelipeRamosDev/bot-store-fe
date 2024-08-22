export default function PrettyDate({ className = '', divisor = ' - ', time, hideYear = false, hideSeconds = false }) {
   const date = new Date(time);
   const day = date.getDate();
   const month = date.getMonth() + 1;
   let string = '';

   string = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;

   if (!hideYear) {
      string += `/${date.getFullYear()}`
   }

   string += divisor;
   string += `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

   if (!hideSeconds) {
      string += `:${date.getSeconds().toString().padStart(2, '0')}`;
   }

   return <span className={`pretty-date ${className}`}>{string}</span>
}
