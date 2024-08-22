import './RubberButton.scss';
import Button from '@mui/material/Button';

export default function RubberButton({ className = '', children, ...props }) {
   return <Button
      className={`rubber-button ${className}`}
      variant="contained"
      {...props}
   >
      {children}
   </Button>
}
