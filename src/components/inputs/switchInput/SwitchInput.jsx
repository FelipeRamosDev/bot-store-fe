import { FormControlLabel, Switch } from '@mui/material';

export default function SwitchInput({ className = '', schema, onChange = () => {}, style, ...props }) {
   const { label, defaultValue, form } = schema || {};

   return (
      <FormControlLabel
         className={`switch-input ${className}`}
         label={label}
         sx={{ flex: '100%', ...style }}
         control={(
            <Switch
               color="success"
               defaultChecked={Boolean(defaultValue)}
               onChange={(ev) => (
                  onChange({ target: { value: ev.target.checked }})
               )}
            />
         )}
         {...props}
      />
   );
}
