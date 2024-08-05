import FieldSchema from "../FieldSchema";

export default class PasswordFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = String;
      this.inputType = 'password';
   }
}
