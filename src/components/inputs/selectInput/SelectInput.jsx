import { useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';

/**
 * `SelectInput` is a component that renders a Material-UI `Select` dropdown with an optional label and error messages.
 * It allows users to choose from a list of options, and includes the ability to add a "None" option.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Additional class names to apply to the component.
 * @param {Array} [props.errors=[]] - An array of error messages to display below the select field.
 * @param {Object} [props.schema={}] - The schema object that defines the select's properties, including label, options, and default value.
 * @param {Function} [props.onChange=() => {}] - A callback function to handle changes to the selected value.
 * @param {Object} [props] - Additional props to pass to the `Select` component.
 * 
 * @returns {JSX.Element} - The rendered select dropdown with optional label and error messages.
 */
export default function SelectInput({ className = '', errors = [], schema = {}, onChange = () => {}, ...props }) {
   const { label, options = [], useNoneOption = false, style } = schema;
   let { value = '' } = schema;
   const inputID = useRef();

   if (!inputID.current) {
      inputID.current = Math.random();
   }

   if (schema.form.editMode && !value && value !== 0) {
      const editValue = schema.getEditValue();

      if (editValue?._id) {
         value = editValue._id;
      } else if (editValue) {
         value = editValue;
      }
   }

   return <FormControl color="tertiary" className={`select-input ${className}`} style={style} variant="filled" error={errors.length} {...props}>
      {label && <InputLabel id={inputID.current}>{label}</InputLabel>}

      <Select
         labelId={inputID.current}
         defaultValue={value}
         onChange={onChange}
      >
         {useNoneOption && <MenuItem value="">None</MenuItem>}
         {options.map(opt => <MenuItem key={Math.random()} value={opt.value}>{opt.label}</MenuItem>)}
      </Select>

      {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
   </FormControl>;
}
