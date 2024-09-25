import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

/**
 * TextFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for text fields.
 * It specifies the type of field as `String`, sets the input type to `'text'`,
 * and uses `TextInput` as the input component.
 *
 * @extends FieldSchema
 */
export default class TextFieldSchema extends FieldSchema {
   /**
    * Creates an instance of TextFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the text field schema.
    * @param {Object} setup.inputMode - The keyboard mode for mobiles.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup = {}, form);
      const { inputMode } = setup;

      this.type = String; // Specifies that the type of field is String.
      this.inputType = 'text'; // Specifies that the input type is 'text' for standard text input.
      this.inputMode = inputMode || 'text';

      this.Input = TextInput; // Specifies the input component as TextInput.
   }
}
