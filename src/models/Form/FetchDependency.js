import { API } from '@/contexts/4HandsAPI';

export default class FetchDependency {
   constructor (setup, form) {
      const { id, queryType, collection, filter, limit, paginate, sort, filterUser = true } = Object(setup);

      if (!form) {
         throw new Error('The "form" param is required at FormDependency.contructor!');
      }

      if (!id) {
         throw new Error('The "id" param is required at FormDependency.contructor!');
      }

      if (filterUser) {
         filter.user = 'fadfafa';
      }

      const dbQuery = API.dbQuery(collection, filter);

      limit && dbQuery.limit(limit);
      paginate && dbQuery.paginate(paginate);
      sort && dbQuery.sort(sort);

      this.data;
      this._form = () => form;

      this.id = id;
      this.queryType = queryType;
      this.dbQuery = dbQuery;
   }

   async exec() {
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
      } catch (err) {
         throw err;
      }
   }
}
