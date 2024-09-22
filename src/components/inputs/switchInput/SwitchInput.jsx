import { FormControlLabel, Switch } from '@mui/material';

/**
 * SwitchInput component renders a labeled toggle switch using MUI components.
 *
 * @param {object} props - The component properties.
 * @param {string} props.className - Additional CSS class for styling. Defaults to an empty string.
 * @param {object} props.schema - An object containing switch configuration such as label, defaultValue, and form.
 * @param {string} props.schema.label - The label text displayed next to the switch.
 * @param {boolean} props.schema.defaultValue - The default checked state of the switch.
 * @param {function} props.onChange - Callback function invoked when the switch is toggled. Defaults to an empty function.
 * @param {object} props.style - Optional custom styles to apply to the switch.
 * @param {object} props.props - Additional props passed to the FormControlLabel component.
 * 
 * @returns {JSX.Element} A form control label with a switch input.
 */
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
