import './ClockTimePicker.scss';
import { useEffect, useState } from 'react';
import ClockDropdown from './ClockDropdown';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export default function ClockTimePicker({ className = '', errors = [], schema, onChange = () => {}, fullWidth = true, ...props }) {
   const { label, placeholder, color = 'tertiary', defaultValue = '' } = schema || {};
   const [ currentValue, setCurrentValue ] = useState(defaultValue);

   delete props?.defaultValue;

   useEffect(() => {
      onChange({ target: { value: currentValue }});
   }, [currentValue])

   return (
      <div className={`clock-time-picker ${className}`}>
         <FormControl variant="filled" color={color} fullWidth={fullWidth} error={errors.length}>
            {label && <InputLabel>{label}</InputLabel>}

            <FilledInput
               value={currentValue}
               placeholder={placeholder}
               endAdornment={
                  <InputAdornment position="end">
                     <ClockDropdown value={currentValue} setValue={setCurrentValue} />
                  </InputAdornment>
               }
               {...props}
            />

            {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
         </FormControl>
      </div>
   );
}
