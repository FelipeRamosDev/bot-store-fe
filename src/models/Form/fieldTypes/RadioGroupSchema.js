import FieldSchema from "../FieldSchema";

export default class RadioGroupSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { options = [], rowDirection } = Object(setup);

      this.type = String;
      this.inputType = 'radio-group';
      this.options = options.map(opt => new RadioGroupSchemaOption(opt, this));
      this.rowDirection = rowDirection;
   }
}

export class RadioGroupSchemaOption {
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
