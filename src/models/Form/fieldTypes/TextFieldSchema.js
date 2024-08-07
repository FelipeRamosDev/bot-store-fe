import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

export default class TextFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = String;
      this.inputType = 'text';

      this.Input = TextInput;
   }
}
