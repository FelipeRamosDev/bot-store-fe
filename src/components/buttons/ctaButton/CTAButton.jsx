import './CTAButton.scss';
import { Button } from "@mui/material";

/**
 * `CTAButton` is a call-to-action button component with predefined styling and variant.
 * It renders a MUI `Button` with the "contained" variant and "tertiary" color.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {Object} [props] - Additional props to be passed to the MUI `Button` component.
 *
 * @returns {JSX.Element} The rendered `CTAButton` component.
 */
export default function CTAButton({ className = '', children, ...props }) {
   return (
      <Button
         className={`cta-button ${className}`}
         variant="contained"
         color="tertiary"
         {...props}
      >
         {children}
      </Button>
   );
}
