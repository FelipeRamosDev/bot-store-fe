/**
 * MainFooter component renders the footer for the application.
 *
 * This component displays version information for the BotStore API and frontend.
 * It can accept additional props to customize its rendering.
 *
 * @component
 * @example
 * import React from 'react';
 * import MainFooter from './MainFooter';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <MainFooter className="custom-footer" />
 *     </div>
 *   );
 * }
 * 
 * @param {Object} props - Additional props to pass to the footer element.
 * @returns {JSX.Element} A footer element containing version information for the application.
 */
export default function MainFooter({ ...props }) {
   return (
      <footer {...props}>
         <p>BotStore (API) - v0.5.9 BETA | BotStore (Frontend) - v0.1.0 BETA</p>
      </footer>
   );
}

export default function MainFooter({ ...props }) {
   return <footer {...props}>
      <p>BotStore (API) - v0.5.9 BETA | BotStore (Frontend) - v0.1.0 BETA</p>
   </footer>
}
