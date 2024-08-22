import './RubberButton.scss';
import Button from '@mui/material/Button';

/**
 * `RubberButton` is a styled button component that utilizes MUI's `Button` component with a "contained" variant.
 * It applies custom styling from the `RubberButton.scss` file and allows additional props to be passed through.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {Object} [props] - Additional props to be passed to the MUI `Button` component.
 *
 * @returns {JSX.Element} The rendered `RubberButton` component.
 */
export default function RubberButton({ className = '', children, ...props }) {
   return (
      <Button
         className={`rubber-button ${className}`}
         variant="contained"
         {...props}
      >
         {children}
      </Button>
   );
}
