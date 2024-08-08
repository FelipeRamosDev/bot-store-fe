import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';

export default new Form({
   schema: [
      new RadioGroupSchema({
         key: 'type',
         label: 'Slot Type',
         required: true,
         options: [
            { value: 'slot-live', label: 'LIVE' },
            { value: 'slot-demo', label: 'DEMO' },
         ]
      }),
      new TextFieldSchema({
         key: 'name',
         label: 'Slot Name',
         placeholder: 'Slot name identification',
      }),
      new SelectFieldSchema({
         key: 'bot',
         label: 'Choose a bot',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         options: function (form) {
            const dependency = form.getDependency('bots');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(doc => ({
                  label: doc.name,
                  value: doc._id
               }));
            } else {
               return [];
            }
         }
      })
   ]
});
