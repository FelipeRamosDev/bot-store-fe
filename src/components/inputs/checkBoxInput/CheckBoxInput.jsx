import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * `CheckBoxInput` is a wrapper component for a Material-UI Checkbox with a label.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.label=''] - The label to display next to the checkbox.
 * @param {string} [props.color='primary'] - The color of the checkbox.
 * @param {boolean} [props.checked=false] - The checked state of the checkbox.
 * @param {Function} [props.onChange=() => {}] - Callback function for when the checkbox state changes.
 * @returns {JSX.Element} - The rendered `CheckBoxInput` component.
 */
export default function CheckBoxInput({ label, color = 'primary', defaultChecked = false, onChange = () => {} }) {
   return (
      <FormControlLabel
         label={label}
         control={<Checkbox color={color} defaultChecked={defaultChecked} />}
         onChange={(ev, value) => onChange(value, ev)}
      />
   );
}
