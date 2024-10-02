'use client';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

/**
 * `CTAButton` is a call-to-action button component with predefined styling and variant.
 * It renders a MUI `Button` with the "contained" variant and "tertiary" color.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {string} [props.className] - CSS classes.
 *
 * @returns {JSX.Element} The rendered `CTAButton` component.
 */
export default function CTAButton({ url, className = '', children, ...props }) {
   const router = useRouter();

   return (
      <Button
         className={`cta-button ${className}`}
         variant="contained"
         color="tertiary"
         onClick={() => router.push(url)}
         {...props}
      >
         {children}
      </Button>
   );
}
