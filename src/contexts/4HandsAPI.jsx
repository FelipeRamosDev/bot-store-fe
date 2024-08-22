'use client';
import { createContext, useState } from 'react';
import _4HandsAPI from '4hands-api/client';
import config from '@/config.json';

const APIContext = createContext();
export const API = new _4HandsAPI({
   apiHost: config.apiHost.DEV,
   useSubscription: true,
   ajaxConfig: {
      rejectUnauthorized: false
   }
});

export function APIProvider({ children }) {
   const [ instance ] = useState(API);

   return <APIContext.Provider value={instance}>
      {children}
   </APIContext.Provider>;
}

export default APIContext;
