import Button from '@mui/material/Button';
import Link from 'next/link';

/**
 * `RubberButton` is a styled button component that utilizes MUI's `Button` component with a "contained" variant.
 * It applies custom styling from the `RubberButton.scss` file and allows additional props to be passed through.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {boolean} [props.isLink] - Determines if the button should behave as a link.
 * @param {Object} [props] - Additional props to be passed to the MUI `Button` component.
 *
 * @returns {JSX.Element} The rendered `RubberButton` component.
 */
export default function RubberButton({ className = '', isLink, children, ...props }) {
   return (
      <Button
         LinkComponent={isLink ? Link : undefined}
         className={`rubber-button ${className}`}
         variant="contained"
         {...props}
      >
         {children}
      </Button>
   );
}
