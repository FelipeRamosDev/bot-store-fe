import FieldSchema from "../FieldSchema";
import RadioGroupInput from "@/components/inputs/radioGroupInput/RadioGroupInput";

export default class RadioGroupSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);
      const { OptionModel, rowDirection } = Object(setup);

      this.type = String;
      this.rowDirection = rowDirection;

      this.OptionModel = OptionModel || RadioGroupSchemaOption;
      this.Input = RadioGroupInput;
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
