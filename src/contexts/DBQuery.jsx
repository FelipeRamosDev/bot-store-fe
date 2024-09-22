'use client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import APIContext from './4HandsAPI';

const DBQueryContext = createContext();
export default DBQueryContext;

/**
 * DBQuery Context
 *
 * This component performs a database query or document retrieval and provides
 * the results via context. It handles querying, sorting, pagination, and
 * subscription to real-time updates if specified.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {string} props.type - The type of database operation to perform ('query' or 'doc').
 * @param {string} props.collection - The name of the collection to query.
 * @param {Object} [props.filter] - The filter criteria for the query. Uses the same standards of mongoose filter.
 * @param {number} [props.limit] - The maximum number of results to return.
 * @param {Object} [props.sort] - The sorting criteria for the results. For example: { fieldName: -1 }
 * @param {Object} [props.page] - Pagination options for the query.
 * @param {string} [props.populateMethod] - Method to populate related data.
 * @param {boolean} [props.subscribe=false] - Whether to subscribe to real-time updates.
 * @param {Function} [props.onData=() => {}] - Callback function to handle real-time snapshot updates.
 * @param {React.ReactNode} props.children - The child components to be rendered within this provider.
 *
 * @returns {JSX.Element} The context provider component wrapping the children.
 */
export function DBQuery({ type, collection, filter, limit, sort, page, populateMethod, subscribe = false, onData = () => {}, children }) {
   const instance = useContext(APIContext);
   const [ loading, setLoading ] = useState(true);
   const [ query, setQuery ] = useState();
   const [ doc, setDoc ] = useState();
   const socket = useRef();
   const subscriptionID = useRef();
   const querySet = useRef();
   const currentPage = useRef();

   if (!type || !collection) {
      throw new Error('Required Params: "type" and "collection" are required!');
   }

   if (!currentPage.current) {
      currentPage.current = 1;
   }

   function handleQueryUpdate(loaded) {
      setQuery(prev => {
         const map = new Map();
         const result = [];

         prev.map(item => {
            map.set(item._id, item);
         });

         loaded.map(item => {
            map.set(item._id, item);
         });

         map.forEach(item => result.push(item));
         onData(result);
         return result;
      });
   }

   async function reloadLimit(limit) {
      try {
         setLoading(true);
         const loaded = await querySet.current.reloadLimit(limit);

         if (loaded.error) {
            throw loaded;
         }

         handleQueryUpdate(loaded);
      } catch (err) {
         throw err;
      } finally {
         setLoading(false);
      }
   }

   async function goPage(pageNumber) {
      const newPage = pageNumber + 1;

      if (currentPage.current > newPage) {
         return;
      } else {
         currentPage.current = newPage;
      }

      try {
         setLoading(true);
         const pageLoaded = await querySet.current.goPage(pageNumber + 1);

         if (pageLoaded.error) {
            throw pageLoaded;
         }

         handleQueryUpdate(pageLoaded);
      } catch (err) {
         throw err;
      } finally {
         setLoading(false);
      }
   }

   async function refresh() {
      const executedQuery = querySet.current?.executedQuery;

      if (!executedQuery) {
         return;
      }

      try {
         switch (executedQuery) {
            case 'getQuery':
               const resultQuery = await querySet.current.getQuery()
               return setQuery(resultQuery);
            case 'getDoc':
               const resultDoc = await querySet.current.getDoc();
               return setDoc(resultDoc);
         }
      } catch (err) {
         throw err;
      }
   }

   useEffect(() => {
      if (query || doc) {
         return;
      }

      querySet.current = instance.dbQuery(collection, filter);

      if (limit) {
         querySet.current.limit(limit);
      }

      if (sort) {
         querySet.current.sort(sort);
      }

      if (page) {
         querySet.current.page(page);
      }

      if (populateMethod) {
         querySet.current.populateMethod(populateMethod);
      }

      switch (type) {
         case 'query':
            if (subscribe) {
               if (!socket.current) {
                  querySet.current.executedQuery = 'subscribeQuery';

                  socket.current = querySet.current.subscribeQuery({
                     onSubscribe: (id) => {
                        subscriptionID.current = id;
                     },
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
               querySet.current.executedQuery = 'getQuery';

               querySet.current.getQuery().then(query => {
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
                  querySet.current.executedQuery = 'subscribeDoc';

                  socket.current = querySet.current.subscribeDoc({
                     onSubscribe: (id) => {
                        subscriptionID.current = id;
                     },
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
               querySet.current.executedQuery = 'getDoc';

               querySet.current.getDoc().then(doc => {
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
   }, [ instance, type, collection, filter, limit, sort, page, populateMethod, query, subscribe, doc, onData ]);

   return <DBQueryContext.Provider value={{
      socket,
      isLoading: loading,
      doc: doc,
      limit: querySet.current?.options?.limit || limit,
      query: query || [],
      goPage,
      reloadLimit,
      refresh
   }}>
      {children}
   </DBQueryContext.Provider>
}
