import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * `DatePicker` is a date picker component using MUI's StaticDatePicker with Day.js.
 * It allows users to pick a date from a static picker interface.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Optional CSS class name to apply to the picker.
 * @param {dayjs.Dayjs|string} [props.value=''] - The current date value. Can be a `dayjs.Dayjs` object or a date string.
 * @param {Function} [props.onChange=() => {}] - Callback function triggered when the date value changes.
 * @param {Function} [props.onAccept=() => {}] - Callback function triggered when the date is accepted.
 *
 * @returns {JSX.Element} - The rendered `DatePicker` component.
 */
export default function DatePicker({
   className = '',
   value = '',
   onChange = () => {},
   onAccept = () => {}
}) {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <StaticDatePicker
            className={`date-picker ${className}`}
            value={value ? dayjs(value) : dayjs()}
            onChange={onChange}
            onAccept={onAccept}
         />
      </LocalizationProvider>
   );
}
