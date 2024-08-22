import FieldSchema from "../FieldSchema";

export default class ObjectFieldSchema extends FieldSchema {
   constructor (setup = {}, form) {
      super(setup, form);
      const { subForm } = setup;

      if (!subForm) {
         throw new Error('The param "subForm" is required for Object type fields!');
      }

      this.type = Object;
   }
}
