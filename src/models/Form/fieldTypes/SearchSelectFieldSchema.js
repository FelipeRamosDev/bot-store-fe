import FieldSchema from '../FieldSchema';
import SearchSelectInput from '@/components/inputs/searchSelectInput/SearchSelectInput';

/**
 * SearchSelectFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for select field types.
 * It specifies the type of field, the input component to use, and optionally the model for options.
 *
 * @extends FieldSchema
 */
export default class SearchSelectFieldSchema extends FieldSchema {
   /**
    * Creates an instance of SearchSelectFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the select field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup = {}, form) {
      super(setup, form);
      const { OptionModel, style } = setup;

      this.type = String;
      this.OptionModel = OptionModel || SearchSelectFieldSchemaOption;
      this.Input = SearchSelectInput;
      this.style = { minWidth: 200, ...style };
   }
}

/**
 * SearchSelectFieldSchemaOption Class
 *
 * This class represents an option in the select field schema, including its label and value.
 * It also provides a reference to the parent schema for contextual operations.
 */
export class SearchSelectFieldSchemaOption {
   /**
    * Creates an instance of SearchSelectFieldSchemaOption.
    *
    * @param {Object} setup - Configuration settings for the option.
    * @param {SearchSelectFieldSchema} parent - The parent schema to which this option belongs.
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
    * @returns {SearchSelectFieldSchema} The parent schema.
    */
   get parent() {
      return this._parent();
   }
}
