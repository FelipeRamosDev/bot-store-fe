import FieldSchema from '../FieldSchema';
import SelectInput from '@/components/inputs/selectInput/SelectInput';

export default class SelectFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { options = [] } = Object(setup);

      this.type = String;
      this.options = options.map(opt => new SelectFieldSchemaOption(opt, this));

      this.Input = SelectInput;
   }
}

export class SelectFieldSchemaOption {
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
