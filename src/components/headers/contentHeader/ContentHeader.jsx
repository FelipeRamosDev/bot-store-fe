import './ContentHeader.scss';

/**
 * ContentHeader component is used to render a header with optional toolbar elements.
 *
 * This component provides a layout for a header section, which can include
 * any children elements (such as titles or descriptions) and an optional toolbar.
 * The toolbar is a customizable component that can be passed as a prop.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.children] - The content to be displayed in the header.
 * @param {React.ComponentType} [props.Toolbar=() => <></>] - A component to be rendered as a toolbar. Defaults to an empty component if not provided.
 *
 * @example
 * import React from 'react';
 * import ContentHeader from './ContentHeader';
 * 
 * function MyToolbar() {
 *   return <button>Click me!</button>;
 * }
 * 
 * function MyComponent() {
 *   return (
 *     <ContentHeader Toolbar={MyToolbar}>
 *       <h1>Header Title</h1>
 *     </ContentHeader>
 *   );
 * }
 * 
 * @returns {JSX.Element} A div containing the header content and the optional toolbar.
 */
export default function ContentHeader({ children, Toolbar = () => <></> }) {
   return <div className="content-header">
      {children}

      <div className="toolbar">
         <Toolbar />
      </div>
   </div>
}
