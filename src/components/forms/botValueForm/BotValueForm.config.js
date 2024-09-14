import Form from '@/models/Form';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

function validatePrimitive(value) {
   const valueType = this.form.getValue('valueType');

   if (valueType === 'primitive' && !value) {
      this.setError('MISSING_PARAM', `It's required to provide the "Primitive Type" and "Primitive Value" for Primitive Values!`);
      return false;
   } else {
      this.clearError('MISSING_PARAM');
      return true;
   }
}

function validateDynamic(value) {
   const valueType = this.form.getValue('valueType');

   if (valueType === 'function' && !value) {
      this.setError('MISSING_PARAM', `It's required to provide the "Function Value" for Dynamic Values!`);
      return false;
   } else {
      this.clearError('MISSING_PARAM');
      return true;
   }
}

const botValueForm = new Form({
   schema: [
      new SelectFieldSchema({
         key: 'functionUID',
         label: 'Function Value',
         placeholder: 'Pick an option',
         useDependencies: true,
         validators: [ validateDynamic ],
         options: function (form) {
            const dependency = form.getDependency('functions');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(doc => ({
                  label: doc.title,
                  value: doc._id
               }));
            } else {
               return [];
            }
         }
      }),
      new CheckButtonGroupSchema({
         key: 'primitiveType',
         options: [
            { label: 'Text', value: 'string' },
            { label: 'Number', value: 'number' },
            { label: 'Boolean', value: 'boolean' }
         ],
         validators: [ validatePrimitive ],
      }),
      new TextFieldSchema({
         key: 'primitiveValue',
         label: 'Primitive Value',
         placeholder: 'Enter the value...',
         validators: [ validatePrimitive ]
      }),
      new TextFieldSchema({
         key: 'parentThread'
      })
   ]
});

export default botValueForm;
