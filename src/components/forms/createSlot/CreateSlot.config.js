import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';

const createSlotForm = new Form({
   dependencies: [
      {
         id: 'symbolsData',
         queryType: 'endpoint',
         httpRequest: {
            method: 'GET',
            endpoint: '/exchange/get-assets'
         }
      }
   ],
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
      }),
      new SelectFieldSchema({
         key: 'assets',
         label: 'Crypto Symbol',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         options: function (form) {
            const dependency = form.getDependency('symbolsData');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(item => ({
                  label: item.symbol,
                  value: item.symbol
               }));
            } else {
               return [];
            }
         }
      })
   ]
});

export default createSlotForm;
