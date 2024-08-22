'use client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import APIContext from './4HandsAPI';

const DBQueryContext = createContext();
export default DBQueryContext;

export function DBQuery({ type, collection, filter, limit, sort, paginate, populateMethod, subscribe = false, onData = () => {}, children }) {
   const instance = useContext(APIContext);
   const [ loading, setLoading ] = useState(true);
   const [ query, setQuery ] = useState();
   const [ doc, setDoc ] = useState();
   const socket = useRef();

   if (!type || !collection) {
      throw new Error('Required Params: "type" and "collection" are required!');
   }

   useEffect(() => {
      if (query || doc) {
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
               if (!socket.current) {
                  socket.current = dbQuery.subscribeQuery({
                     onData: query => {
                        setQuery(query);
                        setLoading(false);
                        onData(query);
                     },
                     onError: err => {
                        setLoading(false);
                        throw err;
                     }
                  });
               }
            } else {
               dbQuery.getQuery().then(query => {
                  setQuery(query);
                  onData(query);
               }).catch(err => {
                  throw err;
               }).finally(() => {
                  setLoading(false);
               });
            }

            break;
         case 'doc':
            if (subscribe) {
               if (!socket.current) {
                  socket.current = dbQuery.subscribeDoc({
                     onData: doc => {
                        setDoc(doc);
                        setLoading(false);
                        onData(doc);
                     },
                     onError: err => {
                        setLoading(false);
                        throw err;
                     }
                  });
               }
            } else {
               dbQuery.getDoc().then(doc => {
                  setDoc(doc);
                  onData(doc);
               }).catch(err => {
                  throw err;
               }).finally(() => {
                  setLoading(false);
               });
            }

            break;
      }
   }, [ instance, type, collection, filter, limit, sort, paginate, populateMethod, query, subscribe, doc, onData ]);

   return <DBQueryContext.Provider value={{
      socket,
      isLoading: loading,
      doc: doc,
      query: query || []
   }}>
      {children}
   </DBQueryContext.Provider>
}
