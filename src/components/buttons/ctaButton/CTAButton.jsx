import './CTAButton.scss';
import { Button } from "@mui/material";

export default function CTAButton({ children, ...props }) {
   return <Button
      className="cta-button"
      variant="contained"
      color="tertiary"
      {...props}
   >{children}</Button>
}
