import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

export default class PasswordFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = String;
      this.inputType = 'password';

      this.Input = TextInput;
   }
}
