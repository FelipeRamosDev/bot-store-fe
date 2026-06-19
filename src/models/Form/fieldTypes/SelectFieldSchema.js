import FieldSchema from '../FieldSchema';
import SelectInput from '@/components/inputs/selectInput/SelectInput';

/**
 * SelectFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for select field types.
 * It specifies the type of field, the input component to use, and optionally the model for options.
 *
 * @extends FieldSchema
 */
export default class SelectFieldSchema extends FieldSchema {
   /**
    * Creates an instance of SelectFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the select field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup = {}, form) {
      super(setup, form);
      const { OptionModel, style } = setup;

      this.type = String;
      this.OptionModel = OptionModel || SelectFieldSchemaOption;
      this.Input = SelectInput;
      this.style = { minWidth: 200, ...style };
   }
}

/**
 * SelectFieldSchemaOption Class
 *
 * This class represents an option in the select field schema, including its label and value.
 * It also provides a reference to the parent schema for contextual operations.
 */
export class SelectFieldSchemaOption {
   /**
    * Creates an instance of SelectFieldSchemaOption.
    *
    * @param {Object} setup - Configuration settings for the option.
    * @param {SelectFieldSchema} parent - The parent schema to which this option belongs.
    */
   constructor(setup, parent) {
      const { label, value } = Object(setup);

      this._parent = () => parent;
      this.label = label;
      this.value = value;
   }

   /**
    * Gets the parent schema of this option.
    *
    * @returns {SelectFieldSchema} The parent schema.
    */
   get parent() {
      return this._parent();
   }
}
