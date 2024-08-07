import './SelectInput.scss';
import { useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function SelectInput({ className = '', schema = {}, ...props }) {
   const { label, value = '', options = [], onChange = () => {}, useNone = false } = schema;
   const inputID = useRef();

   if (!inputID.current) {
      inputID.current = Math.random();
   }

   return <FormControl color="tertiary" className={`select-input ${className}`} variant="filled" {...props}>
      {label && <InputLabel id={inputID.current}>{label}</InputLabel>}

      <Select
         labelId={inputID.current}
         value={value}
         onChange={onChange}
      >
         {useNone && <MenuItem value="">None</MenuItem>}
         {options.map(opt => <MenuItem value={opt.value}>{opt.label}</MenuItem>)}
      </Select>
   </FormControl>;
}
