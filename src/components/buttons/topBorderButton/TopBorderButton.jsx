import { Button } from "@mui/material";

/**
 * `TopBorderButton` is a styled button component that utilizes MUI's `Button` component with an "outlined" variant.
 * It applies custom styling from the `top-border-button` class and allows additional props to be passed through.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - Additional CSS class names to apply to the button.
 * @param {boolean} [props.fullWidth=true] - Whether the button should stretch to fill its container's width.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {Object} [props] - Additional props to be passed to the MUI `Button` component.
 *
 * @returns {JSX.Element} The rendered `TopBorderButton` component.
 */
export default function TopBorderButton({ className = '', fullWidth = true, children, ...props }) {
   return (
      <Button
         className={`top-border-button ${className}`}
         variant="outlined"
         color="tertiary"
         fullWidth={fullWidth}
         {...props}
      >
         {children}
      </Button>
   );
}
