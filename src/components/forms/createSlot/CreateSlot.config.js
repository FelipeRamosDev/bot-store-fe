import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';

export default new Form({
   dependencies: [
      { id: 'bots', collection: 'bots', filter: {} }
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
         placeholder: 'Slot name identification'
      }),
      new SelectFieldSchema({
         key: 'bot',
         label: 'Choose a bot',
         placeholder: 'Pick an option',
         options: [
            { label: 'Bot 1', value: 'bot-1' },
            { label: 'Bot 2', value: 'bot-2' },
            { label: 'Bot 3', value: 'bot-3' },
            { label: 'Bot 4', value: 'bot-4' },
         ]
      })
   ]
});
