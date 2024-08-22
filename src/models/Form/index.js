import FetchDependency from './FetchDependency';
import FieldSchema from './FieldSchema';

/**
 * Form Class
 *
 * This class represents a form with fields, schema definitions, dependencies, and validation. 
 * It provides methods to manage form data, schema, and handle form validation and changes.
 */
export default class Form {
   /**
    * Creates an instance of Form.
    *
    * @param {Object} setup - Configuration settings for the form.
    * @param {boolean} [setup.editMode=false] - Whether the form is in edit mode.
    * @param {Object} [setup.editData={}] - Initial data for the form in edit mode.
    * @param {FieldSchema[]} [setup.schema=[]] - An array of field schemas for the form.
    * @param {FetchDependency[]} [setup.dependencies=[]] - An array of dependencies to fetch.
    * @param {Function} [setup.onChange=() => {}] - A function to call when the form data changes.
    * @param {Object} [setup.user] - User information associated with the form.
    */
   constructor(setup) {
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

   /**
    * Gets the user ID from the user object.
    *
    * @returns {string|undefined} The user ID or undefined if no user is set.
    */
   get userUID() {
      if (this.user) {
         return this.user._id;
      }
   }

   /**
    * Converts the form data to a plain object.
    *
    * @returns {Object} The form data as an parsed object.
    */
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

   /**
    * Sets the user information in the form.
    *
    * @param {Object} user - The user object to set.
    */
   setUser(user) {
      this.setValue('user', user);
   }

   /**
    * Sets the initial data for the form in edit mode.
    *
    * @param {Object} data - The data to set for editing.
    */
   setEditData(data) {
      if (data) {
         this.editMode = true;
         this.editData = data;
         this._schema.forEach(item => item.init(this));
      }
   }

   /**
    * Gets the value of a field by key, supporting nested keys separated by a dot separated by a dot.
    * Example:
    *   form.getValue('fieldName');
    *   or
    *   form.getValue('path.to.fieldName');
    *
    * @param {string} key - The key of the field to retrieve.
    * @returns {*} The value of the field or undefined.
    */
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

   /**
    * Sets the value of a field by key, supporting nested keys separated by a dot.
    *
    * @param {string} key - The key of the field to set.
    * @param {*} value - The value to set.
    */
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

   /**
    * Deletes a value by key, supporting nested keys separated by a dot.
    *
    * @param {string} key - The key of the value to delete.
    */
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

   /**
    * Clears all form data and reinitializes the schema.
    */
   clearAll() {
      this._data.forEach((value, key) => this.deleteValue(key));
      this._schema.forEach(item => item.init(this));

      if (this.setForm) {
         this.setForm(this);
      }
   }

   /**
    * Gets the schema for a specific key, supporting nested keys separated by a dot.
    *
    * @param {string} key - The key of the schema to retrieve.
    * @returns {FieldSchema|undefined} The schema for the key or undefined.
    */
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

   /**
    * Gets a list of field schemas that use dependencies.
    *
    * @returns {FieldSchema[]} An array of field schemas that use dependencies.
    */
   getUseDependencies() {
      const result = [];

      this._schema.forEach(item => {
         if (item.useDependencies) {
            result.push(item);
         }
      });

      return result;
   }

   /**
    * Sets the schema for a specific key.
    *
    * @param {string} key - The key of the field schema.
    * @param {Object|FieldSchema} value - The field schema or schema configuration.
    */
   setSchema(key, value) {
      if (value.isFieldSchema) {
         this._schema.set(key, value.init(this))
      } else {
         this._schema.set(key, new FieldSchema(value, this).init());
      }
   }

   /**
    * Fetches all dependencies and updates schemas that use dependencies.
    *
    * @returns {Promise<Object>} A promise that resolves with a success status.
    */
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

   /**
    * Gets a dependency by its ID.
    *
    * @param {string} id - The ID of the dependency.
    * @returns {FetchDependency|undefined} The dependency or undefined.
    */
   getDependency(id) {
      if (!id) return;

      return this._dependencies.get(id);
   }

   /**
    * Sets a dependency for the form.
    *
    * @param {Object} dependency - The dependency to set.
    */
   setDependency(dependency) {
      if (!dependency) return;
      const dep = new FetchDependency(dependency, this);

      this._dependencies.set(dep.id, dep);
   }

   /**
    * Triggers the onChange event with the given arguments.
    *
    * @param {...*} args - Arguments to pass to the onChange handler.
    */
   triggerChange(...args) {
      this._onChange(...args);
   }

   /**
    * Validates the entire form and its fields.
    *
    * @returns {Object} An object containing validation results and errors.
    */
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

   /**
    * Gets field errors for the form, including nested fields.
    *
    * @param {string} [path] - The path of the field to get errors for.
    * @returns {Object} An object containing field errors.
    */
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

   /**
    * Sets a setter function for the form.
    *
    * @param {Function} setter - The setter function to set.
    */
   formSetter(setter) {
      if (typeof setter === 'function') {
         Object.defineProperty(this, 'setForm', {
            get: () => setter,
            enumerable: true,
            configurable: true
         });
      }
   }

   /**
    * Sets a setter function for handling form errors.
    *
    * @param {Function} setter - The setter function to set.
    */
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
