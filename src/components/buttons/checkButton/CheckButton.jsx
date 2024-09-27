import { Button } from '@mui/material';

/**
 * `CheckButton` is a customizable button component that toggles its visual state based on the `value` prop.
 * It supports different colors and can trigger an `onChange` callback when clicked.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the button.
 * @param {string} [props.color='tertiary'] - The color of the button, applied from MUI's color palette.
 * @param {boolean} [props.value=false] - Determines whether the button is in a checked state.
 * @param {Function} [props.onChange=() => {}] - Callback function to handle button clicks, receiving the current `value` as an argument.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {Object} [props] - Additional props to be passed to the MUI `Button` component.
 *
 * @returns {JSX.Element} The rendered `CheckButton` component.
 */
export default function CheckButton({ className = '', color = 'tertiary', value = false, onChange = () => {}, children, ...props }) {
   const checkClass = value ? 'checked' : '';

   const handleClick = () => {
      onChange(value);
   };

   return (
      <Button
         className={`check-button ${className} ${checkClass}`}
         onClick={handleClick}
         color={color}
         {...props}
      >
         {children}
      </Button>
   );
}
