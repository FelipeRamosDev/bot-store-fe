import FieldSchema from "../FieldSchema";
import DateOnlyPicker from "@/components/inputs/dateOnlyPicker/DateOnlyPicker";

/**
 * DateOnlyFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for date-only fields.
 * It specifies the type of field as `String`, sets the input type to `'text'`,
 * and configures the minimum and maximum date values. It uses `DateOnlyPicker` as the input component.
 *
 * @extends FieldSchema
 */
export default class DateOnlyFieldSchema extends FieldSchema {
   /**
    * Creates an instance of DateOnlyFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the date field schema, including `min` and `max` date values.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = String; // Specifies that the type of field is String.
      this.inputType = 'text'; // Specifies that the input type is 'text' for date input.
      this.min = min; // Minimum allowable date value.
      this.max = max; // Maximum allowable date value.

      this.Input = DateOnlyPicker; // Specifies the input component as DateOnlyPicker.
   }
}
