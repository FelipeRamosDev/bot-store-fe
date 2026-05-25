import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

/**
 * NumberFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for number fields.
 * It specifies the type of field, the minimum and maximum values, and the input component to use.
 *
 * @extends FieldSchema
 */
export default class NumberFieldSchema extends FieldSchema {
   /**
    * Creates an instance of NumberFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the number field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = Number; // Specifies that the type of field is Number.
      this.inputType = 'text'; // Specifies that the input type is 'text' for the number field.
      this.min = min; // Minimum value for the number field.
      this.max = max; // Maximum value for the number field.

      this.Input = TextInput; // Specifies the input component as TextInput.
   }
}
