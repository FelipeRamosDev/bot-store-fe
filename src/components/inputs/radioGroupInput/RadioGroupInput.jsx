import './RadioGroupInput.scss';
import { useRef } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

/**
 * `RadioGroupInput` renders a Material-UI `RadioGroup` component with a list of radio buttons.
 * It includes an optional label and allows for horizontal or vertical arrangement of radio buttons.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.schema - The schema object defining the radio group properties, including label, default value, and options.
 * @param {Function} [props.onChange] - Callback function triggered when a radio button selection changes.
 * @param {Object} [props] - Additional props to pass to the `RadioGroup` component.
 * 
 * @returns {JSX.Element} - The rendered `RadioGroup` with radio buttons and optional label.
 */
export default function RadioGroupInput({ schema, onChange, style, ...props }) {
   const groupID = useRef();
   const { label, defaultValue, rowDirection = true, options = [] } = schema || {};
   
   if (!groupID.current) {
      groupID.current = Math.floor(Math.random() * 1000000);
   }

   return (
      <div className="radio-group-input" style={style}>
         {label && <FormLabel id={groupID} className="group-label">{label}</FormLabel>}

         <RadioGroup
            row={rowDirection}
            aria-labelledby={groupID}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
         >
            {options.map(opt => (
               <FormControlLabel key={Math.random()} value={opt.value} control={<Radio color="tertiary" />} label={opt.label} />
            ))}
         </RadioGroup>
      </div>
   );
}

