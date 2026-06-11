import { useEffect, useState } from 'react';
import DateDropdown from './DateDropdown';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

/**
 * `DateOnlyPicker` is a component that renders an input field for date selection with a dropdown calendar.
 * It allows users to pick a date from a dropdown or input it manually.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Optional CSS class name to apply to the container.
 * @param {Array} [props.errors=[]] - Array of error messages to display below the input field.
 * @param {Object} [props.schema={}] - Schema object defining the label, placeholder, color, and default value for the input.
 * @param {Function} [props.onChange=() => {}] - Callback function triggered when the date value changes.
 * @param {boolean} [props.fullWidth=true] - Whether the input should take up the full width of its container.
 * @param {Object} [props] - Additional props to pass to the `FilledInput` component.
 *
 * @returns {JSX.Element} - The rendered `DateOnlyPicker` component.
 */
export default function DateOnlyPicker({ className = '', errors = [], schema, onChange = () => {}, fullWidth = true, ...props }) {
   const { label, placeholder, color = 'tertiary', defaultValue = '' } = schema || {};
   const [ currentValue, setCurrentValue ] = useState(defaultValue);

   delete props?.defaultValue;

   useEffect(() => {
      onChange({ target: { value: currentValue }});
   }, [currentValue, onChange]);

   return (
      <div className={`date-only-picker ${className}`}>
         <FormControl variant="filled" color={color} fullWidth={fullWidth} error={errors.length}>
            {label && <InputLabel>{label}</InputLabel>}

            <FilledInput
               value={currentValue}
               placeholder={placeholder || 'YYYY-MM-DD'}
               endAdornment={
                  <InputAdornment position="end">
                     <DateDropdown value={currentValue} setValue={setCurrentValue} />
                  </InputAdornment>
               }
               {...props}
            />

            {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
         </FormControl>
      </div>
   );
}
