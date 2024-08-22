import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckBoxInput({ label, color = 'primary', defaultChecked = false, onChange = () => {} }) {
   return (
      <FormControlLabel
         label={label}
         control={<Checkbox color={color} defaultChecked={defaultChecked} />}
         onChange={(ev, value) => onChange(value, ev)}
      />
   );
}
