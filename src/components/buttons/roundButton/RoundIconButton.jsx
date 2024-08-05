import IconButton from '@mui/material/IconButton';

export default function RoundIconButton({ className = '', Icon, size = 'medium', ...props }) {
   return <IconButton
      className={`round-button ${className}`}
      size={size}
      {...props}
   >
      <Icon fontSize="inherit" />
   </IconButton>;
}
