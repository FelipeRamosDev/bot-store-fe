import './SelectInput.scss';
import { useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';

export default function SelectInput({ className = '', errors = [], schema = {}, onChange = () => {}, ...props }) {
   const { label, options = [], useNoneOption = false } = schema;
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

   return <FormControl color="tertiary" className={`select-input ${className}`} variant="filled" error={errors.length} {...props}>
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
