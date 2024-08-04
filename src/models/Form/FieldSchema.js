import Form from ".";

export default class FieldSchema {
   constructor (setup, form) {
      const {
         key,
         defaultValue,
         type = String,
         required = false,
         validators = [],
         subForm
      } = Object(setup);

      if (!form) {
         throw new Error('The "form" param is required to build a FieldSchema!');
      }

      this._form = () => form;
      this.key = key;
      this.defaultValue = defaultValue;
      this.type = type;
      this.required = required;
      this.errors = new Map();

      this.validators = validators.map(validator => {
         if (typeof validator !== 'function') {
            throw new Error('The validator should be a function!');
         }

         return validator;
      });

      if (this.type === Object && subForm) {
         this.form.setValue(this.key, new Form(subForm, this));
      } else if (this.defaultValue) {
         if (typeof this.defaultValue === 'function') {
            this.form.setValue(this.key, this.defaultValue());
         } else {
            this.form.setValue(this.key, this.defaultValue);
         }
      }
   }

   get form() {
      return this._form();
   }

   get subForm() {
      if (this.type === Object) {
         return this.form.getValue(this.key);
      }
   }

   get error() {
      return Boolean(this.errors.size);
   }

   parse() {
      const currentValue = this.form[this.key];

      switch (this.type) {
         case String:
         case Array:
            return currentValue;
         case Number:
            return Number(currentValue);
         case Object:
            return Object(currentValue);
         case Date:
            return new Date(currentValue).getTime();
      }
   }

   validate() {
      const currentValue = this.form[this.key];
      this.validators.map(validator => {
         validator.call(this, currentValue);
      });

      if (this.required && !currentValue) {
         this.setError('Required Field', `The "${this.key}" field is required!`)
      } else {
         this.clearError('Required Field');
      }

      let errors = this.getErrors();
      if (this.type === Object) {
         this.subForm.validateForm();
         errors = {...errors, ...this.subForm.getFieldErrors()};
      }

      return Boolean(errors.length);
   }

   validateType() {
      const currentValue = this.form[this.key];
      if (!currentValue) {
         return;
      }
      
      switch (this.type) {
         case String:
            if (typeof currentValue !== 'string') {
               throw new Error(`The field "${this.key}" is required to be a valid string!`);
            }

            break;
         case Number:
            if (isNaN(currentValue)) {
               throw new Error(`The field "${this.key}" is required to be a valid number! But received NaN.`);
            }

            break;
         case []:
         case Array:
            if (!Array.isArray(currentValue)) {
               throw new Error(`The field "${this.key}" is required to be a valid array!`);
            }

            break;
         case Object:
            if (typeof currentValue !== 'object' || Array.isArray(currentValue)) {
               throw new Error(`The field "${this.key}" is required to be a valid object!`);
            }

            break;
         case Date:
            try {
               new Date(currentValue);
            } catch (error) {
               throw new Error(`The field "${this.key}" is required to be a valid date!`);
            }

            break;
      }
   }

   getErrors() {
      const output = [];

      this.errors.forEach(err => output.push(err));
      return output;
   }

   setError(name, message) {
      this.errors.set(name, {name, message})
   }

   clearError(name) {
      this.errors.delete(name);
   }
}
