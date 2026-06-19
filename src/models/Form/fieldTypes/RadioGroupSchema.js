import FieldSchema from "../FieldSchema";
import RadioGroupInput from "@/components/inputs/radioGroupInput/RadioGroupInput";

/**
 * RadioGroupSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for radio group fields.
 * It specifies the type of field as `String`, sets the direction of the radio group (rows or columns),
 * and uses `RadioGroupInput` as the input component. Optionally, it allows specifying a custom model for options.
 *
 * @extends FieldSchema
 */
export default class RadioGroupSchema extends FieldSchema {
   /**
    * Creates an instance of RadioGroupSchema.
    *
    * @param {Object} setup - Configuration settings for the radio group field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);
      const { OptionModel, rowDirection } = Object(setup);

      this.type = String; // Specifies that the type of field is String.
      this.rowDirection = rowDirection; // Specifies the direction of the radio group (rows or columns).

      this.OptionModel = OptionModel || RadioGroupSchemaOption; // Specifies the model for options, defaults to RadioGroupSchemaOption.
      this.Input = RadioGroupInput; // Specifies the input component as RadioGroupInput.
   }
}

/**
 * RadioGroupSchemaOption Class
 *
 * This class represents an option in the radio group schema, including its label and value.
 * It also provides a reference to the parent schema for contextual operations.
 */
export class RadioGroupSchemaOption {
   /**
    * Creates an instance of RadioGroupSchemaOption.
    *
    * @param {Object} setup - Configuration settings for the option.
    * @param {RadioGroupSchema} parent - The parent schema to which this option belongs.
    */
   constructor(setup, parent) {
      const { label, value } = Object(setup);

      this._parent = () => parent; // Reference to the parent schema.
      this.label = label; // The display label for the option.
      this.value = value; // The value associated with the option.
   }

   /**
    * Gets the parent schema of this option.
    *
    * @returns {RadioGroupSchema} The parent schema.
    */
   get parent() {
      return this._parent();
   }
}
