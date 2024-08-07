import FieldSchema from "../FieldSchema";

export default class ReferenceFieldSchema extends FieldSchema {
   constructor (setup, form) {
      super(setup, form);

      this.type = 'ObjectId';
   }
}
