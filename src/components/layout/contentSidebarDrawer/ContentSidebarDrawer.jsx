import SwipeDrawer from '@/components/drawers/base/swipeDrawer/SwipeDrawer';
import { useEffect, useState } from 'react';
import config from '@/config.json';
import { parseClassName } from '@/helpers/parser';

/**
 * ContentSidebarDrawer component provides a layout with a main content area, a sidebar, and a header.
 *
 * The component arranges its children into three distinct sections:
 * - The third child is rendered in the header section.
 * - The first child is rendered in the main content area.
 * - The second child is rendered in the sidebar area.
 *
 * Additional styling can be applied through the `className` prop, and the `isFullContainer` prop 
 * determines whether the sidebar should take up the full width of the container or a limited width.
 *
 * @component
 * @example
 * import React from 'react';
 * import ContentSidebarDrawer from './ContentSidebarDrawer';
 * 
 * function App() {
 *   return (
 *     <ContentSidebarDrawer className="custom-sidebar" isFullContainer={true}>
 *       <div>Main Content</div>
 *       <div>Sidebar Content</div>
 *       <div>Header Content</div>
 *     </ContentSidebarDrawer>
 *   );
 * }
 * 
 * @param {Object} [setup] - The component props.
 * @param {string} [setup.className=''] - Optional CSS class to apply additional styling.
 * @param {boolean} [setup.isFullContainer=false] - Determines if the sidebar should occupy the full width of the container.
 * @param {boolean} [setup.fitMaxWidth=false] - Make the container fit 100% of width.
 * @param {boolean} [setup.sidebarState=false] - The side bar state.
 * @param {Function} [setup.setSidebarState=()=>{})] - The setter for the sidebar state.
 * @param {React.ReactNode[]} setup.children - The content to display in the header, main content area, and sidebar.
 * @returns {JSX.Element} A div element containing a header, main content area, and sidebar.
 */
export default function ContentSidebarDrawer({
   className = '',
   isFullContainer = false,
   fitMaxWidth = false,
   sidebarState = false,
   setSidebarState = () => {},
   children
}) {
   const [ screen, setScreen ] = useState();
   const containerClass = isFullContainer ? 'full-container' : 'container';
   const fitWidthClass = fitMaxWidth ? 'fit-maxwidth' : '';

   const handleScreen = () => {
      if (innerWidth > config.breakpoints.l) {
         setScreen('desktop');
      } else {
         setScreen('mobile');
      }
   }

   useEffect(() => {
      handleScreen();

      removeEventListener('resize', handleScreen);
      addEventListener('resize', handleScreen);
   }, [ screen ]);

   return <div className={parseClassName(className, [ 'content-sidebar', containerClass, fitWidthClass ])}>
      <div className="layout-header">
         {children.length > 2 && children[2]}
      </div>

      <div className="content">
         {children.length && children[0]}
      </div>

      {screen === 'desktop' && (
         <div className="sidebar">
            {children.length > 1 && children[1]}
         </div>
      )}

      {screen === 'mobile' && (
         <SwipeDrawer
            className="sidebar"
            openDrawer={sidebarState}
            setOpenDrawer={setSidebarState}
         >
            {children.length > 1 && children[1]}
         </SwipeDrawer>
      )}
   </div>;
}
