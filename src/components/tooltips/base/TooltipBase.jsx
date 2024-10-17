import Tooltip from '@mui/material/Tooltip';

export default function TooltipBase({ headerTitle, Content, className = '', children }) {
   const classes = [ 'tooltip-base' ];

   if (className) {
      classes.push(className);
   }

   return (
      <Tooltip
         arrow
         enterTouchDelay={0}
         leaveTouchDelay={10000}
         className={classes.join(' ')}
         title={<div className="tooltip-content">
            {headerTitle && <label>{headerTitle}</label>}

            <div className="tooltip-body">
               {Content}
            </div>
         </div>}
      >
         {children}
      </Tooltip>
   );
}
