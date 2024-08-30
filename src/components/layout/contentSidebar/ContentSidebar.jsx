import './ContentSidebar.scss';

/**
 * ContentSidebar component provides a layout with a main content area, a sidebar, and a header.
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
 * import ContentSidebar from './ContentSidebar';
 * 
 * function App() {
 *   return (
 *     <ContentSidebar className="custom-sidebar" isFullContainer={true}>
 *       <div>Main Content</div>
 *       <div>Sidebar Content</div>
 *       <div>Header Content</div>
 *     </ContentSidebar>
 *   );
 * }
 * 
 * @param {Object} [setup] - The component props.
 * @param {string} [setup.className=''] - Optional CSS class to apply additional styling.
 * @param {boolean} [setup.isFullContainer=false] - Determines if the sidebar should occupy the full width of the container.
 * @param {React.ReactNode[]} setup.children - The content to display in the header, main content area, and sidebar.
 * @returns {JSX.Element} A div element containing a header, main content area, and sidebar.
 */
export default function ContentSidebar({ className = '', children, isFullContainer = false }) {
   return <div className={`${className} content-sidebar ${isFullContainer ? 'full-container' : 'container'}`}>
      <div className="layout-header">
         {children.length > 2 && children[2]}
      </div>

      <div className="content">
         {children.length && children[0]}
      </div>

      <div className="sidebar">
         {children.length > 1 && children[1]}
      </div>
   </div>;
}
