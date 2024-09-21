import SwitchInput from '@/components/inputs/switchInput/SwitchInput';
import FieldSchema from '../FieldSchema';

/**
 * SwitchFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for switch input fields.
 *
 * @extends FieldSchema
 */
export default class SwitchFieldSchema extends FieldSchema {
   /**
    * Creates an instance of SwitchFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the check button group schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    */
   constructor(setup = {}, form) {
      super(setup, form);

      this.type = Boolean;
      this.Input = SwitchInput;
   }
}
