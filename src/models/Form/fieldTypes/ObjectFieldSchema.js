import FieldSchema from "../FieldSchema";

/**
 * ObjectFieldSchema Class
 *
 * This class extends the `FieldSchema` class to define a schema for object fields.
 * It specifies that the field type is `Object` and requires a `subForm` parameter for nested forms.
 *
 * @extends FieldSchema
 */
export default class ObjectFieldSchema extends FieldSchema {
   /**
    * Creates an instance of ObjectFieldSchema.
    *
    * @param {Object} setup - Configuration settings for the object field schema.
    * @param {Function} form - The form instance that this field schema belongs to.
    * @throws {Error} If the `subForm` parameter is not provided.
    */
   constructor(setup = {}, form) {
      super(setup, form);
      const { subForm } = setup;

      if (!subForm) {
         throw new Error('The param "subForm" is required for Object type fields!');
      }

      this.type = Object; // Specifies that the type of field is Object.
   }
}
