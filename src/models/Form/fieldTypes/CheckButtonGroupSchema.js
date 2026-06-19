import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import FieldSchema from '../FieldSchema';

/**
 * CheckButtonGroupSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for check button group fields.
 * It specifies whether the field allows multiple values and the input component to use.
 *
 * @extends FieldSchema
 */
export default class CheckButtonGroupSchema extends FieldSchema {
   /**
    * Creates an instance of CheckButtonGroupSchema.
    *
    * @param {Object} setup - Configuration settings for the check button group schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup = {}, form) {
      super(setup, form);
      const { OptionModel, multiValue = false } = setup;

      this.multiValue = multiValue;
      this.type = this.multiValue ? Array : String;
      this.OptionModel = OptionModel || CheckButtonGroupSchemaOption;
      this.Input = CheckButtonGroupInput;
   }
}

/**
 * CheckButtonGroupSchemaOption Class
 *
 * This class represents an option in the check button group schema, including its label and value.
 * It also provides a reference to the parent schema for contextual operations.
 */
export class CheckButtonGroupSchemaOption {
   /**
    * Creates an instance of CheckButtonGroupSchemaOption.
    *
    * @param {Object} setup - Configuration settings for the option.
    * @param {CheckButtonGroupSchema} parent - The parent schema to which this option belongs.
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
    * @returns {CheckButtonGroupSchema} The parent schema.
    */
   get parent() {
      return this._parent();
   }
}
