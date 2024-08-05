import FieldSchema from "../FieldSchema";

export default class TextFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = String;
      this.inputType = 'text';
   }
}
