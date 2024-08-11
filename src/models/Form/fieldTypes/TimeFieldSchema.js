import FieldSchema from "../FieldSchema";
import ClockTimePicker from "@/components/inputs/clockTimePicker/ClockTimePicker";

export default class TimeFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = String;
      this.inputType = 'text';
      this.min = min;
      this.max = max;

      this.Input = ClockTimePicker;
   }
}
