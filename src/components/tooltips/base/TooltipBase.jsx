import Tooltip from '@mui/material/Tooltip';

export default function TooltipBase({ headerTitle, Content, className = '', children }) {
   const classes = [ 'tooltip-base' ];

   if (className) {
      classes.push(className);
   }

   return (
      <Tooltip
         arrow
         title={<div className="tooltip-content">
            {headerTitle && <label>{headerTitle}</label>}

            <div className="tooltip-body">
               {Content}
            </div>
         </div>}
         className={classes.join(' ')}
      >
         {children}
      </Tooltip>
   );
}
