import './ContentSplit.scss';

export default function ContentSplit({ breakpoint = 'm', columnDirection = false, children }) {
   let breakpointCSS = '';

   if (breakpoint === 'xs') {
      breakpointCSS = 'breakpoint-xs';
   }

   if (breakpoint === 's') {
      breakpointCSS = 'breakpoint-s';
   }

   if (breakpoint === 'm') {
      breakpointCSS = 'breakpoint-m';
   }

   if (breakpoint === 'l') {
      breakpointCSS = 'breakpoint-l';
   }

   if (breakpoint === 'xl') {
      breakpointCSS = 'breakpoint-xl';
   }

   return (
      <div className={`content-split ${breakpointCSS} ${columnDirection ? 'column-direction' : ''}`}>
         {children.length && <div className="content-a">
            {children[0]}
         </div>}

         {children.length > 1 && <div className="content-b">
            {children[1]}
         </div>}
      </div>
   );
}
