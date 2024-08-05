import FieldSchema from "../FieldSchema";

export default class ObjectFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = Object;
   }
}
