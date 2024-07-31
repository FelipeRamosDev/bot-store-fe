import { TextField, FormControl, FormHelperText } from '@mui/material';

export default function TextInput({ type = 'text', label, placeholder, color = 'tertiary', errors = [], fullWidth = true, ...props }) {
   return (
      <FormControl fullWidth={fullWidth} error={errors.length}>
         <TextField
            type={type}
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
