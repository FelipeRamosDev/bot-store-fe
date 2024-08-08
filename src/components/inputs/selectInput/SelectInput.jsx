import './SelectInput.scss';
import { useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SelectInput({ className = '', schema = {}, onChange = () => {}, ...props }) {
   const { label, value = '', options = [], useNoneOption = false } = schema;
   const [ displayValue, setDisplayValue ] = useState(value);
   const inputID = useRef();

   if (!inputID.current) {
      inputID.current = Math.random();
   }


   return <FormControl color="tertiary" className={`select-input ${className}`} variant="filled" {...props}>
      {label && <InputLabel id={inputID.current}>{label}</InputLabel>}

      <Select
         labelId={inputID.current}
         defaultValue={value}
         onChange={onChange}
      >
         {useNoneOption && <MenuItem value="">None</MenuItem>}
         {options.map(opt => <MenuItem key={Math.random()} value={opt.value}>{opt.label}</MenuItem>)}
      </Select>
   </FormControl>;
}
