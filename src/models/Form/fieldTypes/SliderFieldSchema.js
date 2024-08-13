import FieldSchema from "../FieldSchema";
import SliderInput from "@/components/inputs/sliderInput/SliderInput";

export default class SliderFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = Number;
      this.inputType = 'number';
      this.min = min;
      this.max = max;

      this.Input = SliderInput;
   }
}

