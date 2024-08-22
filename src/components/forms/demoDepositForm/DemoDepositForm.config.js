import Form from '@/models/Form'
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

const demoDepositForm = new Form({
   schema: [
      new TextFieldSchema({
         key: 'type',
         required: true,
         defaultValue: 'deposit'
      }),
      new TextFieldSchema({
         key: 'master',
         required: true
      }),
      new NumberFieldSchema({
         key: 'value',
         required: true,
         label: 'Amount to Deposit',
         placeholder: 'Enter the amount...'
      })
   ]
});

export default demoDepositForm;
