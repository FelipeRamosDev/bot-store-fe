import { useEffect, useState } from 'react';
import './CheckButtonGroupInput.scss';
import CheckButton from '@/components/buttons/checkButton/CheckButton';

/**
 * `CheckButtonGroupInput` renders a group of check buttons for single or multiple selections.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Custom class name for styling.
 * @param {Object} [props.schema={}] - Schema defining the input options and behavior.
 * @param {Array} [props.errors=[]] - List of error messages to display.
 * @param {Function} [props.onChange=() => {}] - Callback function to handle value changes.
 * @returns {JSX.Element} - The rendered `CheckButtonGroupInput` component.
 */
export default function CheckButtonGroupInput({ className = '', schema = {}, errors = [], onChange = () => { }, ...props }) {
   const { label, options = [], defaultValue, multiValue } = schema;
   const [ value, setValue ] = useState(defaultValue);

   useEffect(() => {
      if (schema.form?.editMode) {
         const editValue = schema.getEditValue();

         if (editValue) {
            setValue(editValue);
         }
      }
   }, [schema, schema.form?.editMode, setValue]);

   const handleChoose = (option) => {
      if (multiValue) {
         const indexOf = value.indexOf(option.value);
         const filtered = value.filter(item => item !== option.value);
         let newValue;

         if (indexOf > -1) {
            newValue = filtered;
         } else {
            newValue = [...filtered, option.value];
         }

         setValue(newValue);
         onChange({ target: { value: newValue }});
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
