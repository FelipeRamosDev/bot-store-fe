/**
 * ContentSplit component divides the available space into two sections based on a specified breakpoint.
 * 
 * The component renders its children into two separate sections, `content-a` and `content-b`. 
 * The layout of these sections is responsive and adapts based on the `breakpoint` prop. 
 * An additional `columnDirection` prop determines whether the sections should be arranged in a column direction.
 * 
 * Breakpoints allow for responsive design, adjusting the layout at different screen sizes:
 * - `'xs'` for extra small screens
 * - `'s'` for small screens
 * - `'m'` for medium screens
 * - `'l'` for large screens
 * - `'xl'` for extra large screens
 *
 * @component
 * @example
 * import React from 'react';
 * import ContentSplit from './ContentSplit';
 * 
 * function App() {
 *   return (
 *     <ContentSplit breakpoint="m" columnDirection={true}>
 *       <div>Section A</div>
 *       <div>Section B</div>
 *     </ContentSplit>
 *   );
 * }
 * 
 * @param {Object} [props] The react componect properties.
 * @param {string} [props.breakpoint='m'] - The breakpoint at which the layout changes. Valid values are `'xs'`, `'s'`, `'m'`, `'l'`, and `'xl'`.
 * @param {boolean} [props.columnDirection=false] - If true, arranges the sections in a column direction.
 * @param {boolean} [props.useContainer=false] - If true, adds the full-container CSS class.
 * @param {React.ReactNode[]} props.children - The content to be displayed in the two sections.
 * @returns {JSX.Element} A div element with two sections (`content-a` and `content-b`), styled based on the breakpoint and direction.
 */
export default function ContentSplit({ className = '', breakpoint = 'm', reverse = false, useContainer = false, columnDirection = false, children }) {
   let classes = 'content-split';

   if (breakpoint === 'xs') {
      classes += ' breakpoint-xs';
   }

   if (breakpoint === 's') {
      classes += ' breakpoint-s';
   }

   if (breakpoint === 'm') {
      classes += ' breakpoint-m';
   }

   if (breakpoint === 'l') {
      classes += ' breakpoint-l';
   }

   if (breakpoint === 'xl') {
      classes += ' breakpoint-xl';
   }

   if (columnDirection) {
      classes += ' column-direction';
   }

   if (useContainer) {
      classes += ' full-container';
   }

   if (className) {
      classes += ' ';
      classes += className;
   }

   return (
      <div className={classes}>
         {children.length && <div className="content-a">
            {children[0]}
         </div>}

         {children.length > 1 && <div className="content-b">
            {children[1]}
         </div>}
      </div>
   );
}
