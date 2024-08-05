import FieldSchema from "../FieldSchema";

export default class NumberFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = Number;
      this.inputType = 'text';
      this.min = min;
      this.max = max;
   }
}
