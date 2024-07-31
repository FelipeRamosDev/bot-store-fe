export default class FieldSchema {
   constructor (setup, form) {
      const {
         key,
         defaultValue,
         type = String,
         required = false,
         validators = []
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
   }

   get form() {
      return this._form();
   }

   get error() {
      return Boolean(this.errors.size);
   }

   validate() {
      const currentValue = this.form[this.key];
      this.validators.map(validator => {
         validator.call(this, currentValue);
      });

      if (this.required && !currentValue) {
         this.setError('Required Field', `The "${this.key}" field is required!`)
      }

      return Boolean(this.getErrors().length);
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
