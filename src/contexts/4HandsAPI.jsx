'use client';
import { createContext, useState } from 'react';
import _4HandsAPI from '4hands-api/client';
import config from '@/config.json';

// Create a context for the API instance
const APIContext = createContext();

/**
 * API instance configured for the application.
 *
 * This instance of `_4HandsAPI` is initialized with configuration settings
 * for the API host and other options. It is used for making API requests
 * throughout the application.
 */
export const API = new _4HandsAPI({
   apiHost: config.apiHost.DEV,
   useSubscription: true,
   ajaxConfig: {
      rejectUnauthorized: false
   }
});

/**
 * APIProvider Component
 *
 * This component provides the API instance to the React component tree via context.
 * It uses the `APIContext` to make the API instance available to child components.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this provider.
 *
 * @returns {JSX.Element} The context provider component wrapping the children.
 */
export function APIProvider({ children }) {
   const [ instance ] = useState(API);

   return (
      <APIContext.Provider value={instance}>
         {children}
      </APIContext.Provider>
   );
}

export default APIContext;
