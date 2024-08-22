import { TextField, FormControl, FormHelperText } from '@mui/material';

/**
 * `TextInput` is a controlled text input component that integrates with Material-UI.
 * It renders a text field with error handling and optional default values based on the provided schema.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.schema - The schema object that defines the input's properties and behavior.
 * @param {Array} [props.errors=[]] - An array of error messages to display below the input.
 * @param {boolean} [props.fullWidth=true] - If `true`, the input will take up the full width of its container.
 * @param {Object} [props] - Additional props to pass to the `TextField` component.
 * 
 * @returns {JSX.Element} - The rendered text input field with optional error messages.
 */
export default function TextInput({ schema, errors = [], fullWidth = true, ...props }) {
   const { inputType = 'text', label, placeholder, color = 'tertiary' } = schema || {};
   let defaultValue;

   if (schema.form.editMode) {
      defaultValue = schema.getEditValue();
   }

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
            defaultValue={defaultValue}
         />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </FormControl>
   );
}
