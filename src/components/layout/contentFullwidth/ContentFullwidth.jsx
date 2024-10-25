export default function ContentFullwidth({ className, useContainer, children, ...props }) {
   const classes = [ 'content-fullwidth' ];

   if (className) {
      classes.push(className);
   }

   if (useContainer) {
      classes.push('full-container');
   } else {
      classes.push('no-container');
   }

   return (
      <div className={classes.join(' ')} {...props}>
         {children}
      </div>
   )
}
