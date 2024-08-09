import './CheckButton.scss';
import { Button } from '@mui/material';

export default function CheckButton({ className = '', color = 'tertiary', value = false, onChange = () => {}, children, ...props }) {
   const checkClass = value ? 'checked' : '';

   const handleClick = () => {
      onChange(value);
   };

   return <Button
      className={`check-button ${className} ${checkClass}`}
      onClick={handleClick}
      color={color}
      {...props}
   >
      {children}
   </Button>;
}
