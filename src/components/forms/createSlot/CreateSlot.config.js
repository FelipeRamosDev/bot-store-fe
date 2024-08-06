import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';

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
         placeholder: 'Slot name identification'
      }),
   ]
});
