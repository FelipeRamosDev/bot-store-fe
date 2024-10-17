export default function TooltipTableHead({ children, ...props }) {
   return (
      <div className="tooltip-head" {...props}>
         {children}
      </div>
   );
}
