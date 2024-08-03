'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import APIContext from './4HandsAPI';

const DBQueryContext = createContext();
export default DBQueryContext;

export function DBQuery({ type, collection, filter, limit, sort, paginate, populateMethod, subscribe = false, children }) {
   const instance = useContext(APIContext);
   const [ query, setQuery ] = useState([]);
   const [ doc, setDoc ] = useState();
   let socket;

   if (!type || !collection) {
      throw new Error('Required Params: "type" and "collection" are required!');
   }

   useEffect(() => {
      if (query.length || doc) {
         return;
      }

      const dbQuery = instance.dbQuery(collection, filter);

      if (limit) {
         dbQuery.limit(limit);
      }

      if (sort) {
         dbQuery.sort(sort);
      }

      if (paginate) {
         dbQuery.paginate(paginate);
      }

      if (populateMethod) {
         dbQuery.populateMethod(populateMethod);
      }

      switch (type) {
         case 'query':
            if (subscribe) {
               socket = dbQuery.subscribeQuery({
                  onData: query => {
                     setQuery(query);
                  },
                  onError: err => {
                     throw err;
                  }
               });
            } else {
               dbQuery.getQuery().then(query => {
                  setQuery(query);
               }).catch(err => {
                  throw err;
               });
            }

            break;
         case 'doc':
            if (subscribe) {
               socket = dbQuery.subscribeDoc({
                  onData: doc => {
                     setDoc(doc);
                  },
                  onError: err => {
                     throw err;
                  }
               });
            } else {
               dbQuery.getDoc().then(doc => {
                  setDoc(doc);
               }).catch(err => {
                  throw err;
               });
            }

            break;
      }
   }, [ instance, type, collection, filter, limit, sort, paginate, populateMethod ]);

   return <DBQueryContext.Provider value={{
      socket,
      doc: doc,
      query: query
   }}>
      {children}
   </DBQueryContext.Provider>
}
