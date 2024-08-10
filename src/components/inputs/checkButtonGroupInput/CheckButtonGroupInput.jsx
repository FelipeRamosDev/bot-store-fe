import { useState } from 'react';
import './CheckButtonGroupInput.scss';
import CheckButton from '@/components/buttons/checkButton/CheckButton';
import FormHelperText from '@mui/material/FormHelperText';

export default function CheckButtonGroupInput({ className = '', schema = {}, errors = [], onChange = () => { }, ...props }) {
   const { label, options = [], defaultValue, multiValue } = schema;
   const [ value, setValue ] = useState(defaultValue);

   const handleChoose = (option) => {
      if (multiValue) {
         setValue(prev => {
            const indexOf = prev.indexOf(option.value);
            const filtered = prev.filter(item => item !== option.value);

            if (indexOf > -1) {
               return filtered;
            } else {
               return [...filtered, option.value];
            }
         });
      } else {
         setValue(option.value);
         onChange({ target: { value: option.value }});
      }
   }

   return <div className={`check-button-group ${className}`} {...props}>
      {label && <label>{label}</label>}

      <div className="options-wrap">
         {options.map(option => {
            let checkValue = false;

            if (multiValue) {
               checkValue = value.some(item => item === option.value);
            } else {
               checkValue = (value === option.value);
            }

            return (
               <CheckButton key={Math.random()} value={checkValue} onChange={(value) => handleChoose(option, value)}>
                  {option.label}
               </CheckButton>
            )
         })}
      </div>

      {errors.map(err => <p className="error-message" key={Math.random()}>{err?.message}</p>)}
   </div>;
}
