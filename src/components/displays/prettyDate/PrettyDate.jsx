export default function PrettyDate({ className = '', time }) {
   const date = new Date(time);
   const dateString = date.toLocaleDateString();
   const timeString = date.toLocaleTimeString();
   
   return <span className={`pretty-date ${className}`}>{dateString} - {timeString}</span>
}
