import FieldSchema from "./FieldSchema";

export default class Form {
   constructor (setup) {
      const { schema = [], onChange = () => {} } = Object(setup);

      this._data = new Map();
      this._schema = new Map();
      this._onChange = onChange.bind(this);

      schema.map(item => this.setSchema(item.key, item));
   }

   toObject() {
      const data = {};

      this._data.forEach((item, key) => {
         const schema = this.getSchema(key);

         if (schema) {
            data[key] = schema.parse();
         } else {
            data[key] = item;
         }
      });

      return data;
   }

   getValue(key) {
      return this._data.get(key);
   }

   setValue(key, value) {
      this._data.set(key, value);

      if (!this[key]) {
         Object.defineProperty(this, key, {
            get: () => {
               return this.getValue(key);
            },
            enumerable: true,
            configurable: true
         });
      }

      const fieldSchema = this.getSchema(key);
      if (fieldSchema) {
         fieldSchema.validateType();
         fieldSchema.validate();
      }

      this.triggerChange(key, fieldSchema?.getErrors() || []);
   }

   deleteValue(key) {
      delete this[key];
      this._data.delete(key);
   }

   getSchema(key) {
      return this._schema.get(key);
   }

   setSchema(key, value) {
      this._schema.set(key, new FieldSchema(value, this));
   }

   triggerChange(...args) {
      this._onChange(...args);
   }

   getFieldErrors() {
      const errors = {};

      this._schema.forEach(item => (errors[item.key] = item.getErrors()));
      return errors;
   }
}
