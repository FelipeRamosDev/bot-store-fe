import dayjs from 'dayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * `ClockPicker` is a time picker component using MUI's StaticTimePicker with Day.js.
 * It allows users to pick a time from a static picker interface.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Optional CSS class name to apply to the picker.
 * @param {dayjs.Dayjs|string} [props.value=''] - The current time value. Can be a `dayjs.Dayjs` object or a time string.
 * @param {Function} [props.onChange=() => {}] - Callback function triggered when the time value changes.
 * @param {Function} [props.onAccept=() => {}] - Callback function triggered when the time is accepted.
 *
 * @returns {JSX.Element} - The rendered `ClockPicker` component.
 */
export default function ClockPicker({
   className = '',
   value = '',
   onChange = () => {},
   onAccept = () => {}
}) {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <StaticTimePicker
            className={`clock-picker ${className}`}
            value={value ? dayjs(value) : dayjs()}  // Ensure value is converted to dayjs object
            onChange={onChange}
            onAccept={onAccept}
         />
      </LocalizationProvider>
   );
}
