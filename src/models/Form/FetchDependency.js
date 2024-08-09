import { API } from '@/contexts/4HandsAPI';

export default class FetchDependency {
   constructor (setup, form) {
      const {
         id,
         queryType,
         collection,
         limit,
         paginate,
         sort,
         httpRequest,
         filter = {},
         filterUser = false
      } = Object(setup);

      if (!form) {
         throw new Error('The "form" param is required at FormDependency.contructor!');
      }

      if (!id) {
         throw new Error('The "id" param is required at FormDependency.contructor!');
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

      if (this.queryType === 'endpoint' && httpRequest) {
         this.httpRequest = new HttpRequestSetup(httpRequest, this);
      }
   }

   get form() {
      return this._form();
   }

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
            if (response.error) throw doc;

            this.data = response;
            return response;
         }
      } catch (err) {
         throw err;
      }
   }

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

export class HttpRequestSetup {
   constructor (setup = {}, dependency) {
      const { endpoint, method, body, isAuth } = setup;

      this._dependency = () => dependency;
      this.endpoint = endpoint;
      this.method = method;
      this.body = body;
      this.isAuth = isAuth;
   }

   get dependency() {
      return this._dependency();
   }
}
