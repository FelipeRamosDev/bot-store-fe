import { Button } from "@mui/material";

export default function TopBorderButton({ className = '', fullWidth = true, children, ...props }) {
   return <Button
      className={`top-border-button ${className}`}
      variant="outlined"
      color="tertiary"
      fullWidth={fullWidth}
      {...props}
   >
      {children}
   </Button>
}
