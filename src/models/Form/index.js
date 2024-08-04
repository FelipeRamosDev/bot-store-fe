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
      if (typeof key !== 'string') {
         return;
      }

      const path = key.split('.');
      if (path.length > 1) {
         let currentSchema;
         let current;
         let result;

         path.map((currKey, i) => {
            if (!i) {
               current = this.getValue(currKey);
               currentSchema = this.getSchema(currKey);
            } else if (current) {
               const schema = current.getSchema(currKey);
               if (!schema) return;

               if (schema.type === Object) {
                  current = current?.getValue(currKey);
                  currentSchema = current?.getSchema(currKey);
               } else {
                  result = current.getValue(currKey);
               }
            }
         });

         return result;
      } else {
         return this._data.get(key);
      }
   }

   setValue(key, value) {
      if (typeof key !== 'string') {
         return;
      }

      const path = key.split('.');
      if (path.length > 1) {
         let currentSchema;
         let current;

         path.map((currKey, i) => {
            if (!i) {
               current = this.getValue(currKey);
               currentSchema = this.getSchema(currKey);
            } else if (current) {
               const schema = current.getSchema(currKey)

               if (schema.type === Object) {
                  current = current?.getValue(currKey);
                  currentSchema = current?.getSchema(currKey);
               } else {
                  current.setValue(currKey, value);
               }
            }
         });
      } else {
         this._data.set(key, value);
   
         if (!this[key]) {
            Object.defineProperty(this, key, {
               get: () => {
                  const getterValue = this.getValue(key);

                  if (getterValue instanceof Form) {
                     return getterValue.toObject();
                  } else {
                     return this.getValue(key);
                  }
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
   }

   deleteValue(key) {
      if (typeof key !== 'string') {
         return;
      }

      const path = key.split('.');
      if (path.length > 1) {
         let schema;
         path.map((currKey, i) => {
            if (!i) {
               schema = this.getSchema(currKey);
            } else {
               schema = schema?.subForm.getSchema(currKey);
            }
   
            if (schema?.type === Object) {
               schema.subForm.deleteValue(currKey);
            } else if (schema) {
               schema.form.deleteValue(currKey);
            }
         });
      } else {
         delete this[key];
         this._data.delete(key);
      }
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

   validateForm() {
      this._schema.forEach(item => {
         item.validateType();
         item.validate();
      });

      const errors = this.getFieldErrors();
      const validatedKeys = Object.keys(errors);
      return {
         hasError: validatedKeys.some(key => errors[key].length),
         errors
      }
   }

   getFieldErrors() {
      let errors = {};

      this._schema.forEach(item => {
         if (item.type === Object) {
            const subErrors = item.subForm.getFieldErrors();

            Object.keys(subErrors).map(key => {
               errors[item.key + '.' + key] = subErrors[key];
            });
         }

         errors[item.key] = item.getErrors();
      });

      return errors;
   }
}
