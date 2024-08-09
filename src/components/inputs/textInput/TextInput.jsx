import { TextField, FormControl, FormHelperText } from '@mui/material';

export default function TextInput({ schema, errors = [], fullWidth = true, ...props }) {
   const { inputType = 'text', label, placeholder, color = 'tertiary' } = schema || {};

   return (
      <FormControl fullWidth={fullWidth} error={errors.length}>
         <TextField
            type={inputType}
            label={label}
            placeholder={placeholder}
            variant="filled"
            color={color}
            error={errors.length}
            fullWidth={fullWidth}
            {...props}
         />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </FormControl>
   );
}
