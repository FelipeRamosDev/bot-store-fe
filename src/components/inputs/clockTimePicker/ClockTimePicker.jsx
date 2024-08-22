import './ClockTimePicker.scss';
import { useEffect, useState } from 'react';
import ClockDropdown from './ClockDropdown';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

/**
 * `ClockTimePicker` is a component that renders an input field for time selection with a dropdown clock.
 * It allows users to pick a time from a dropdown or input it manually.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Optional CSS class name to apply to the container.
 * @param {Array} [props.errors=[]] - Array of error messages to display below the input field.
 * @param {Object} [props.schema={}] - Schema object defining the label, placeholder, color, and default value for the input.
 * @param {Function} [props.onChange=() => {}] - Callback function triggered when the time value changes.
 * @param {boolean} [props.fullWidth=true] - Whether the input should take up the full width of its container.
 * @param {Object} [props] - Additional props to pass to the `FilledInput` component.
 *
 * @returns {JSX.Element} - The rendered `ClockTimePicker` component.
 */
export default function ClockTimePicker({ className = '', errors = [], schema, onChange = () => {}, fullWidth = true, ...props }) {
   const { label, placeholder, color = 'tertiary', defaultValue = '' } = schema || {};
   const [ currentValue, setCurrentValue ] = useState(defaultValue);

   delete props?.defaultValue;

   useEffect(() => {
      onChange({ target: { value: currentValue }});
   }, [currentValue, onChange])

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
