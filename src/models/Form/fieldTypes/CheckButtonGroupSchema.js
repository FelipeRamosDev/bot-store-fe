import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import FieldSchema from '../FieldSchema';

export default class CheckButtonGroupSchema extends FieldSchema {
   constructor (setup = {}, form) {
      super(setup, form);
      const { OptionModel } = setup;

      this.type = String;
      this.OptionModel = OptionModel || CheckButtonGroupSchemaOption;
      this.Input = CheckButtonGroupInput;
   }
}

export class CheckButtonGroupSchemaOption {
   constructor (setup, parent) {
      const { label, value } = Object(setup);

      this._parent = () => parent;
      this.label = label;
      this.value = value;
   }

   get parent() {
      return this._parent();
   }
}
