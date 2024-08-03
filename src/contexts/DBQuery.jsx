'use client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import APIContext from './4HandsAPI';

const DBQueryContext = createContext();
export default DBQueryContext;

export function DBQuery({ type, collection, filter, limit, sort, paginate, populateMethod, subscribe = false, children }) {
   const instance = useContext(APIContext);
   const [ loading, setLoading ] = useState(true);
   const [ query, setQuery ] = useState([]);
   const [ doc, setDoc ] = useState();
   const socket = useRef();

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
               socket.current = dbQuery.subscribeQuery({
                  onData: query => {
                     setQuery(query);
                     setLoading(false);
                  },
                  onError: err => {
                     setLoading(false);
                     throw err;
                  }
               });
            } else {
               dbQuery.getQuery().then(query => {
                  setQuery(query);
               }).catch(err => {
                  throw err;
               }).finally(() => {
                  setLoading(false);
               });
            }

            break;
         case 'doc':
            if (subscribe) {
               socket.current = dbQuery.subscribeDoc({
                  onData: doc => {
                     setDoc(doc);
                     setLoading(false);
                  },
                  onError: err => {
                     setLoading(false);
                     throw err;
                  }
               });
            } else {
               dbQuery.getDoc().then(doc => {
                  setDoc(doc);
               }).catch(err => {
                  throw err;
               }).finally(() => {
                  setLoading(false);
               });
            }

            break;
      }
   }, [ instance, type, collection, filter, limit, sort, paginate, populateMethod, query.length, subscribe, doc ]);

   return <DBQueryContext.Provider value={{
      socket,
      isLoading: loading,
      doc: doc,
      query: query
   }}>
      {children}
   </DBQueryContext.Provider>
}
