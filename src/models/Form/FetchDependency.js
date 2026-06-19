import { API } from '@/contexts/4HandsAPI';

/**
 * FetchDependency Class
 *
 * This class handles fetching data either from a database query or an API endpoint.
 * It can manage queries of different types, including endpoint requests and database queries,
 * and supports filtering by user ID if specified.
 */
export default class FetchDependency {
   /**
    * Creates an instance of FetchDependency.
    *
    * @param {Object} setup - Configuration settings for the fetch operation.
    * @param {Function} form - The form instance that this dependency belongs to.
    * @param {string} [setup.id] - The unique identifier for the dependency.
    * @param {string} [setup.queryType] - The type of query to perform ('query', 'doc', or 'endpoint').
    * @param {string} [setup.collection] - The collection to query from, used if `queryType` is not 'endpoint'.
    * @param {number} [setup.limit] - The limit on the number of results.
    * @param {Object} [setup.paginate] - Pagination settings.
    * @param {Object} [setup.sort] - Sorting settings.
    * @param {Object} [setup.httpRequest] - Configuration for an API endpoint request.
    * @param {Object} [setup.filter] - Filtering criteria for the query.
    * @param {boolean} [setup.filterUser=false] - Whether to filter results by the current user ID.
    * @param {Function} [setup.onLoad=()=>{}] - The callback to execute when the dependency is loaded.
    */
   constructor(setup, form) {
      const {
         id,
         queryType,
         collection,
         limit,
         paginate,
         sort,
         httpRequest,
         filter = {},
         filterUser = false,
         onLoad = () => {}
      } = Object(setup);

      if (!form) {
         throw new Error('The "form" param is required at FormDependency.constructor!');
      }

      if (!id) {
         throw new Error('The "id" param is required at FormDependency.constructor!');
      }

      if (queryType !== 'endpoint') {
         const dbQuery = API.dbQuery(collection, filter);

         limit && dbQuery.limit(limit);
         paginate && dbQuery.paginate(paginate);
         sort && dbQuery.sort(sort);
         this.dbQuery = dbQuery;
      }

      this.data;
      this._form = () => form;

      this.id = id;
      this.queryType = queryType;
      this.filterUser = filterUser;
      this.onLoad = onLoad;

      if (this.queryType === 'endpoint' && httpRequest) {
         this.httpRequest = new HttpRequestSetup(httpRequest, this);
      }
   }

   /**
    * Gets the form instance associated with this dependency.
    *
    * @returns {Function} The form instance.
    */
   get form() {
      return this._form();
   }

   /**
    * Executes the fetch operation based on the query type.
    *
    * @returns {Promise<Object>} The fetched data.
    * @throws {Error} Throws an error if the fetch operation fails.
    */
   async exec() {
      const userUID = this.form.userUID;
      if (this.filterUser && userUID) {
         this.dbQuery.filter = { ...this.dbQuery.filter, user: userUID };
      }

      try {
         if (this.queryType === 'query') {
            const query = await this.dbQuery.getQuery();

            if (query.error) {
               throw query;
            }

            this.data = query;
            return query;
         }

         else if (this.queryType === 'doc') {
            const doc = await this.dbQuery.getQuery();

            if (!doc) return;
            if (doc.error) throw doc;

            this.data = doc;
            return doc;
         }

         else if (this.queryType === 'endpoint') {
            const response = await this.sendRequest();

            if (!response) return;
            if (response.error) throw response;

            this.data = response;
            return response;
         }
      } catch (err) {
         throw err;
      } finally {
         this.onLoad();
      }
   }

   /**
    * Sends an HTTP request to the specified endpoint.
    *
    * @returns {Promise<Object>} The response from the HTTP request.
    * @throws {Error} Throws an error if the request fails.
    */
   async sendRequest() {
      if (!this.httpRequest) return;
      const { method = 'GET', body = {}, isAuth = false, endpoint } = this.httpRequest;
      const upperMethod = method.toUpperCase();

      if (typeof endpoint !== 'string') {
         throw new Error('The "endpoint" param is required!');
      }

      try {
         switch (upperMethod) {
            case 'GET':
               if (isAuth) {
                  return await API.ajax.authGet(endpoint, body);
               } else {
                  return await API.ajax.get(endpoint, body);
               }
            case 'POST':
               if (isAuth) {
                  return await API.ajax.authPost(endpoint, body);
               } else {
                  return await API.ajax.post(endpoint, body);
               }
            case 'PUT':
               if (isAuth) {
                  return await API.ajax.authPut(endpoint, body);
               } else {
                  return await API.ajax.put(endpoint, body);
               }
            case 'DELETE':
               if (isAuth) {
                  return await API.ajax.authDelete(endpoint, body);
               } else {
                  return await API.ajax.delete(endpoint, body);
               }
         }
      } catch (err) {
         throw err;
      }
   }
}

/**
 * HttpRequestSetup Class
 *
 * This class represents the configuration for an HTTP request to an endpoint,
 * including the method, request body, and authentication settings.
 */
export class HttpRequestSetup {
   /**
    * Creates an instance of HttpRequestSetup.
    *
    * @param {Object} setup - Configuration settings for the HTTP request.
    * @param {FetchDependency} dependency - The fetch dependency this request setup is associated with.
    * @param {string} setup.endpoint - The endpoint URL for the request.
    * @param {string} [setup.method='GET'] - The HTTP method to use (e.g., 'GET', 'POST').
    * @param {Object} [setup.body={}] - The request body to send.
    * @param {boolean} [setup.isAuth=false] - Whether the request requires authentication.
    */
   constructor(setup = {}, dependency) {
      const { endpoint, method, body, isAuth } = setup;

      this._dependency = () => dependency; // Reference to the fetch dependency.
      this.endpoint = endpoint; // The endpoint URL for the request.
      this.method = method; // The HTTP method to use.
      this.body = body; // The request body.
      this.isAuth = isAuth; // Whether the request requires authentication.
   }

   /**
    * Gets the fetch dependency associated with this HTTP request setup.
    *
    * @returns {FetchDependency} The fetch dependency.
    */
   get dependency() {
      return this._dependency();
   }
}
