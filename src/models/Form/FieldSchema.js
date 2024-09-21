import Form from '.';

/**
 * FieldSchema Class
 *
 * This class defines a schema for a form field, including its type, validation rules, and other properties.
 * It handles field initialization, validation, error management, and more.
 */
export default class FieldSchema {
   /**
    * Creates an instance of FieldSchema.
    *
    * @param {Object} setup - Configuration settings for the field schema.
    * @param {Form} form - The form instance that this field schema belongs to.
    * @param {string} [setup.key] - The unique key for the field.
    * @param {string} [setup.label] - The label for the field.
    * @param {string} [setup.placeholder] - The placeholder text for the field.
    * @param {*} [setup.defaultValue] - The default value for the field.
    * @param {Object} [setup.subForm] - The schema for a sub-form, if applicable.
    * @param {Function} [setup.type=String] - The data type of the field (e.g., String, Number).
    * @param {boolean} [setup.required=false] - Whether the field is required.
    * @param {string} [setup.inputType='text'] - The HTML input type for the field (e.g., 'text', 'password').
    * @param {Function[]} [setup.validators=[]] - An array of validation functions.
    * @param {Object[]} [setup.options=[]] - Options for fields like select or radio buttons.
    * @param {Function} [setup.parseInput] - A function to parse the input value.
    * @param {boolean} [setup.useDependencies=false] - Whether to use dependencies for the field.
    * @param {Function} [setup.onInput=(value) => {}] - A function to handle input changes.
    * @param {Object} [s] - The CSS custom style.
    */
   constructor(setup = {}, form) {
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
         style
      } = Object(setup);

      if (parseInput && typeof parseInput !== 'function') {
         throw new Error(`The "parseInput" param should receive a function but received "${typeof parseInput}"!`);
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
      this.style = style;

      this.validators = validators.map(validator => {
         if (typeof validator !== 'function') {
            throw new Error('The validator should be a function!');
         }

         return validator;
      });
   }

   /**
    * Gets the form instance associated with this field schema.
    *
    * @returns {Form} The form instance.
    */
   get form() {
      return this._form();
   }

   /**
    * Gets the sub-form associated with this field schema, if applicable.
    *
    * @returns {Form|undefined} The sub-form instance or undefined.
    */
   get subForm() {
      if (this.type === Object) {
         return this.form.getValue(this.key);
      }
   }

   /**
    * Checks if the field has any errors.
    *
    * @returns {boolean} True if there are errors, otherwise false.
    */
   get error() {
      return Boolean(this.errors.size);
   }
   
   /**
    * Appends a dispatch function for handling field updates.
    *
    * @param {Function} dispatch - The dispatch function.
    */
   appendDispatch(dispatch) {
      this.dispatch = dispatch;
   }

   /**
    * Initializes the field schema, setting default values and options.
    *
    * @param {Form} form - The form instance to set as the parent form.
    * @returns {FieldSchema} The current instance of FieldSchema.
    */
   init(form) {
      this.setParentForm(form);
      const subForm = this._subForm();

      if (this.type === Object && subForm) {
         if (this.form.editMode) {
            subForm.editMode = true;
            subForm.editData = this.form.editData[this.key];
         }

         const newForm = new Form(subForm, this);
         this.form.setValue(this.key, newForm);
      }
      
      else if (this.defaultValue && !this.form.editMode) {
         if (typeof this.defaultValue === 'function') {
            this.form.setValue(this.key, this.defaultValue());
         } else {
            this.form.setValue(this.key, this.defaultValue);
         }
      }

      this.setOptions();
      return this;
   }

   /**
    * Gets the value of the field in edit mode.
    *
    * @returns {*} The edit value of the field.
    */
   getEditValue() {
      return this.form.editData[this.key];
   }

   /**
    * Sets the options for the field, handling dynamic and static options.
    */
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

   /**
    * Sets the parent form for this field schema.
    *
    * @param {Form} form - The form instance to set as the parent form.
    * @returns {FieldSchema} The current instance of FieldSchema.
    */
   setParentForm(form) {
      if (form instanceof Form) {
         this._form = () => form;
      }

      return this;
   }

   /**
    * Parses the current value of the field based on its type.
    *
    * @returns {*} The parsed value.
    */
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
            if (this.form.editMode) {
               if (!currentValue || !Object.keys(currentValue).length) {
                  return;
               }

               return { ...this.getEditValue(), ...currentValue };
            } else {
               return Object(currentValue);
            }
         case Date:
            return new Date(currentValue).getTime();
         case Boolean:
            return Boolean(currentValue);
      }
   }

   /**
    * Validates the current value of the field using the provided validators.
    *
    * @returns {boolean} True if there are validation errors, otherwise false.
    */
   validate() {
      const currentValue = this.form[this.key];

      this.validators.map(validator => {
         if (!currentValue && this.form.editMode) {
            return;
         }

         validator.call(this, currentValue);
      });

      if (this.required && !currentValue && !this.form?.editMode) {
         this.setError('Required Field', `The "${this.label || this.key}" field is required!`);
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

   /**
    * Validates the type of the field value to ensure it matches the expected type.
    *
    * @throws {Error} Throws an error if the value type is incorrect.
    */
   validateType() {
      const currentValue = this.form[this.key];
      if (!currentValue) {
         return;
      }
      
      switch (this.type) {
         case String:
            if (typeof currentValue !== 'string') {
               this.setError('Invalid Type', `The field "${this.key}" is required to be a valid string!`);
            } else {
               this.clearError('Invalid Type');
            }

            break;
         case Number:
            if (isNaN(currentValue)) {
               this.setError('Invalid Type', `The field "${this.key}" is required to be a valid number!`);
            } else {
               this.clearError('Invalid Type');
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

   /**
    * Gets the list of errors for the field.
    *
    * @returns {Object[]} An array of error objects.
    */
   getErrors() {
      const output = [];

      this.errors.forEach(err => output.push(err));
      return output;
   }

   /**
    * Sets an error for the field.
    *
    * @param {string} name - The name of the error.
    * @param {string} message - The error message.
    */
   setError(name, message) {
      this.errors.set(name, {name, message});
   }

   /**
    * Clears an error for the field.
    *
    * @param {string} name - The name of the error to clear.
    */
   clearError(name) {
      this.errors.delete(name);
   }
}
