'use client';
import { createContext, useState } from 'react';
import _4HandsAPI from '4hands-api/client';
import config from '@/config.json';

const APIContext = createContext();

export function APIProvider({ children, intanceTag }) {
   const [ instance ] = useState(new _4HandsAPI({
      apiHost: config.apiHost[intanceTag],
      useSubscription: true,
      ajaxConfig: {
         rejectUnauthorized: false
      }
   }));

   return <APIContext.Provider value={instance}>
      {children}
   </APIContext.Provider>
}

export default APIContext
