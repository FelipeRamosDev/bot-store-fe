import FieldSchema from "../FieldSchema";
import ClockTimePicker from "@/components/inputs/clockTimePicker/ClockTimePicker";

/**
 * TimeFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for time fields.
 * It specifies the type of field as `String`, sets the input type to `'text'`,
 * and configures the minimum and maximum time values. It uses `ClockTimePicker` as the input component.
 *
 * @extends FieldSchema
 */
export default class TimeFieldSchema extends FieldSchema {
   /**
    * Creates an instance of TimeFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the time field schema, including `min` and `max` time values.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = String; // Specifies that the type of field is String.
      this.inputType = 'text'; // Specifies that the input type is 'text' for time input.
      this.min = min; // Minimum allowable time value.
      this.max = max; // Maximum allowable time value.

      this.Input = ClockTimePicker; // Specifies the input component as ClockTimePicker.
   }
}
