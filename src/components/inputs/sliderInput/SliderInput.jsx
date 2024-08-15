import './SliderInput.scss';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';

export default function SliderInput({ schema, errors = [], fullWidth = true, ...props }) {
   let { inputType = 'number', label, color = 'tertiary', min = 1, max = 100 } = schema || {};
   const [ value, setValue ] = useState(min);

   const handleSliderChange = (ev) => {
      let currentValue = ev?.target?.value;

      if (currentValue > max) {
         currentValue = max;
      }

      if (currentValue < min) {
         currentValue = min;
      }

      setValue(currentValue);
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
