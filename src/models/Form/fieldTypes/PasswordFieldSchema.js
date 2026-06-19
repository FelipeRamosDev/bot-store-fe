import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

/**
 * PasswordFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for password fields.
 * It specifies the type of field as `String`, sets the input type to `'password'`,
 * and uses `TextInput` as the input component.
 *
 * @extends FieldSchema
 */
export default class PasswordFieldSchema extends FieldSchema {
   /**
    * Creates an instance of PasswordFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the password field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);

      this.type = String; // Specifies that the type of field is String.
      this.inputType = 'password'; // Specifies that the input type is 'password' for obscured input.
      this.Input = TextInput; // Specifies the input component as TextInput.
   }
}
