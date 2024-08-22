import './SliderInput.scss';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';

/**
 * `SliderInput` is a component that combines a slider and a text input field, allowing users to adjust a numerical value.
 * It integrates with Material-UI for styling and provides real-time updates between the slider and input field.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.schema - The schema object that defines the input's properties, including type, label, and range.
 * @param {Array} [props.errors=[]] - An array of error messages to display below the input field.
 * @param {boolean} [props.fullWidth=true] - If `true`, the component will take up the full width of its container.
 * @param {Function} [props.onChange=() => {}] - A callback function to handle changes to the input value.
 * @param {Object} [props] - Additional props to pass to the `TextField` component.
 * 
 * @returns {JSX.Element} - The rendered slider and text input field with optional error messages.
 */
export default function SliderInput({ schema, errors = [], fullWidth = true, onChange = () => {}, ...props }) {
   let { inputType = 'number', label, color = 'tertiary', min = 1, max = 100 } = schema || {};
   const [ value, setValue ] = useState('');

   if (schema.form.editMode && !value && value !== 0) {
      setValue(schema.getEditValue());
   } else if (!schema.form.editMode && !value && value !== 0) {
      setValue(min);
   }

   const handleSliderChange = (ev) => {
      let currentValue = ev?.target?.value;

      if (currentValue > max) {
         currentValue = max;
      }

      if (currentValue < min) {
         currentValue = min;
      }

      setValue(currentValue);
      onChange(ev);
   }

   delete props.defaultValue;
   return (
      <FormControl fullWidth={fullWidth} error={errors.length}>
         {label && <label>{label}</label>}

         <div className="slider-input">
            <Slider className="slider" color={color} min={min} max={max} value={value} onChange={handleSliderChange} />

            <TextField
               type={inputType}
               className="input-text"
               variant="standard"
               color={color}
               error={errors.length}
               min={min}
               max={max}
               value={value}
               onInput={handleSliderChange}
               {...props}
            />
         </div>

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </FormControl>
   );
}
