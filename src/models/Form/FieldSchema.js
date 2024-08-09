import Form from '.';

export default class FieldSchema {
   constructor (setup = {}, form) {
      const {
         key,
         label,
         placeholder,
         defaultValue,
         subForm,
         type = String,
         required = false,
         inputType = 'text',
         validators = [],
         options = [],
         Input,
         parseInput,
         useDependencies = false,
         onInput = (value) => {},
      } = Object(setup);

      if (parseInput && typeof parseInput !== 'function') {
         throw new Error(`The "parseInput" param is should receive a function but received "${typeof parseInput}"!`);
      }

      this.isFieldSchema = true;
      this._form = () => form;
      this._subForm = () => subForm;
      this._options = options;
      this.key = key;
      this.defaultValue = defaultValue;
      this.type = type;
      this.required = required;
      this.label = label;
      this.placeholder = placeholder;
      this.inputType = inputType;
      this.useDependencies = useDependencies;
      this.errors = new Map();
      this.onInput = onInput;
      this.parseInput = parseInput ? parseInput.bind(this) : undefined;
      this.Input = Input;

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

   get subForm() {
      if (this.type === Object) {
         return this.form.getValue(this.key);
      }
   }

   get error() {
      return Boolean(this.errors.size);
   }

   init(form) {
      this.setParentForm(form);
      const subForm = this._subForm();

      if (this.type === Object && subForm) {
         this.form.setValue(this.key, new Form(subForm, this));
      } else if (this.defaultValue) {
         if (typeof this.defaultValue === 'function') {
            this.form.setValue(this.key, this.defaultValue());
         } else {
            this.form.setValue(this.key, this.defaultValue);
         }
      }

      this.setOptions();
      return this;
   }

   setOptions() {
      if (typeof this._options === 'function') {
         const parsed = this._options.call(this, this.form);

         if (!Array.isArray(parsed)) {
            throw new Error('Dynamic options function should return an array');
         }

         this.options = parsed;
      } else if (Array.isArray(this._options) && this.OptionModel) {
         this.options = this._options.map(opt => new this.OptionModel(opt, this));
      }
   }

   setParentForm(form) {
      if (form instanceof Form) {
         this._form = () => form;
      }

      return this;
   }

   parse() {
      let currentValue = this.form[this.key];

      if (this.parseInput) {
         currentValue = this.parseInput(currentValue);
      }

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
         this.setError('Required Field', `The "${this.label || this.key}" field is required!`)
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
