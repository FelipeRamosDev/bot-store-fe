import './ClockTimePicker.scss';
import { useState } from 'react';
import ClockDropdown from './ClockDropdown';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function ClockTimePicker({ className = '', color = 'tertiary', label, defaultValue = '', ...props }) {
   const [ currentValue, setCurrentValue ] = useState(defaultValue);

   return (
      <div className={`clock-time-picker ${className}`}>
         <FormControl variant="filled" color={color}>
            {label && <InputLabel>{label}</InputLabel>}

            <FilledInput
               value={currentValue}
               onChange={(ev) => setCurrentValue(ev.target.value)}
               endAdornment={
                  <InputAdornment position="end">
                     <ClockDropdown value={currentValue} setValue={setCurrentValue} />
                  </InputAdornment>
               }
               {...props}
            />
         </FormControl>
      </div>
   );
}
