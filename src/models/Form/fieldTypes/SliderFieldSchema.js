import FieldSchema from "../FieldSchema";
import SliderInput from "@/components/inputs/sliderInput/SliderInput";

/**
 * SliderFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for slider fields.
 * It specifies the type of field as `Number`, sets the input type to `'number'`,
 * and configures the minimum and maximum values. It uses `SliderInput` as the input component.
 *
 * @extends FieldSchema
 */
export default class SliderFieldSchema extends FieldSchema {
   /**
    * Creates an instance of SliderFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the slider field schema, including `min` and `max` values.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup, form) {
      super(setup, form);
      const { min, max } = Object(setup);

      this.type = Number; // Specifies that the type of field is Number.
      this.inputType = 'number'; // Specifies that the input type is 'number' for numerical input.
      this.min = min; // Minimum value for the slider.
      this.max = max; // Maximum value for the slider.

      this.Input = SliderInput; // Specifies the input component as SliderInput.
   }
}
