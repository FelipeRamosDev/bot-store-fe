import Form from '@/models/Form';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';

const botValueForm = new Form({
   schema: [
      new SelectFieldSchema({
         key: 'functionUID',
         label: 'Function Value',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
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
      })
   ]
});

export default botValueForm;
