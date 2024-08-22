import IconButton from '@mui/material/IconButton';

/**
 * `RoundIconButton` is a button component that renders an icon inside a rounded button.
 * It uses MUI's `IconButton` with customizable size and additional props.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {React.ElementType} props.Icon - The icon component to be displayed inside the button.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - The size of the button. Can be 'small', 'medium', or 'large'.
 * @param {Object} [props] - Additional props to be passed to the MUI `IconButton` component.
 *
 * @returns {JSX.Element} The rendered `RoundIconButton` component.
 */
export default function RoundIconButton({ className = '', Icon, size = 'medium', ...props }) {
   return (
      <IconButton
         className={`round-button ${className}`}
         size={size}
         {...props}
      >
         <Icon fontSize="inherit" />
      </IconButton>
   );
}
