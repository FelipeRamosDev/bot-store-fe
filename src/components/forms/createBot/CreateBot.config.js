import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

const createBotForm = new Form({
   schema: [
      new TextFieldSchema({
         key: 'name',
         label: 'Bot Name',
         required: true
      }),
      new TextFieldSchema({
         key: 'description',
         label: 'Summary'
      })
   ]
});

export default createBotForm;
