import './RadioGroupInput.scss';
import { useRef } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroupInput({ label, defaultValue, rowDirection = true, options = [], onChange, ...props }) {
   const groupID = useRef();
   
   if (!groupID.current) {
      groupID.current = Math.floor(Math.random() * 1000000);
   }

   return (
      <div className="radio-group-input">
         {label && <FormLabel id={groupID} className="group-label">{label}</FormLabel>}

         <RadioGroup
            row={rowDirection}
            aria-labelledby={groupID}
            defaultValue={defaultValue}
            onChange={(ev) => onChange(ev.target.value, ev)}
            {...props}
         >
            {options.map(opt => (
               <FormControlLabel key={Math.random()} value={opt.value} control={<Radio color="tertiary" />} label={opt.label} />
            ))}
         </RadioGroup>
      </div>
   );
}

