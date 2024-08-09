import { useState } from 'react';
import './CheckButtonGroupInput.scss';
import CheckButton from '@/components/buttons/checkButton/CheckButton';
import FormHelperText from '@mui/material/FormHelperText';

export default function CheckButtonGroupInput({ className = '', schema = {}, errors = [], onChange = () => { }, ...props }) {
   const { label, options = [], defaultValue } = schema;
   const [value, setValue] = useState(defaultValue);
   const handleChoose = (option) => {
      setValue(option.value);
      onChange({ target: { value: option.value }});
   }

   return <div className={`check-button-group ${className}`} {...props}>
      {label && <label>{label}</label>}

      <div className="options-wrap">
         {options.map(option => (
            <CheckButton key={Math.random()} value={(value === option.value)} onChange={(value) => handleChoose(option, value)}>
               {option.label}
            </CheckButton>
         ))}
      </div>

      {errors.map(err => <p className="error-message" key={Math.random()}>{err?.message}</p>)}
   </div>;
}
