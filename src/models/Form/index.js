import FetchDependency from './FetchDependency';
import FieldSchema from './FieldSchema';

export default class Form {
   constructor (setup) {
      const { editMode = false, editData = {}, schema = [], dependencies = [], onChange = () => {}, user } = Object(setup);

      this._data = new Map();
      this._schema = new Map();
      this._dependencies = new Map();
      this._onChange = onChange.bind(this);
      this.setErrors = () => {};
      this.user = user;
      this.editMode = editMode;
      this.editData = editData;

      schema.map(item => this.setSchema(item.key, item));
      dependencies.map(item => this.setDependency(item));
   }

   get userUID() {
      if (this.user) {
         return this.user._id;
      }
   }

   toObject() {
      const data = {};

      this._data.forEach((item, key) => {
         const schema = this.getSchema(key);

         if (schema) {
            const parsed = schema.parse();
            if (parsed) data[key] = parsed;
         } else {
            if (item) data[key] = item;
         }
      });

      return data;
   }

   setUser(user) {
      this.setValue('user', user);
   }

   setEditData(data) {
      if (data) {
         this.editMode = true;
         this.editData = data;
         this._schema.forEach(item => item.init(this));
      }
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

   clearAll() {
      this._data.forEach((value, key) => this.deleteValue(key));
      this._schema.forEach(item => item.init(this));

      if (this.setForm) {
         this.setForm(this);
      }
   }

   getSchema(key) {
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
         });

         return schema;
      } else {
         return this._schema.get(key);
      }
   }

   getUseDependencies() {
      const result = [];

      this._schema.forEach(item => {
         if (item.useDependencies) {
            result.push(item);
         }
      });

      return result;
   }

   setSchema(key, value) {
      if (value.isFieldSchema) {
         this._schema.set(key, value.init(this))
      } else {
         this._schema.set(key, new FieldSchema(value, this).init());
      }
   }

   async fetchDependencies() {
      const dependencies = [];
      this._dependencies.forEach(item => dependencies.push(item));

      try {
         for (const item of dependencies) {
            await item.exec();
         }

         this.getUseDependencies().map(schema => schema?.setOptions());
         return { success: true };
      } catch (err) {
         throw err;
      }
   }

   getDependency(id) {
      if (!id) return;

      return this._dependencies.get(id);
   }

   setDependency(dependency) {
      if (!dependency) return;
      const dep = new FetchDependency(dependency, this);

      this._dependencies.set(dep.id, dep);
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

      this.setErrors(errors);
      return {
         hasError: validatedKeys.some(key => errors[key].length),
         errors
      }
   }

   getFieldErrors(path) {
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

      if (path) {
         return errors[path];
      } else {
         return errors;
      }
   }

   formSetter(setter) {
      if (typeof setter === 'function') {
         Object.defineProperty(this, 'setForm', {
            get: () => setter,
            enumerable: true,
            configurable: true
         });
      }
   }

   errorSetter(setter) {
      if (typeof setter === 'function') {
         Object.defineProperty(this, 'setErrors', {
            get: () => setter,
            enumerable: true,
            configurable: true
         });
      }
   }
}
