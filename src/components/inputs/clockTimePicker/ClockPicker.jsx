import dayjs from 'dayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ClockPicker({ className = '', value = '', onChange = () => {}, onAccept = () => {} }) {
   return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
         className={`clock-picker ${className}`}
         defaultValue={dayjs(Date.now())}
         onChange={onChange}
         onAccept={onAccept}
      />
   </LocalizationProvider>
}
