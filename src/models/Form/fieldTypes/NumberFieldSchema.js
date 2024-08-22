import FieldSchema from "../FieldSchema";
import TextInput from "@/components/inputs/textInput/TextInput";

export default class NumberFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = Number;
      this.inputType = 'text';
      this.min = min;
      this.max = max;

      this.Input = TextInput;
   }
}
