import Form from '@/models/Form';
import PasswordFieldSchema from '@/models/Form/fieldTypes/PasswordFieldSchema';

const exchangeAPIForm = new Form({
   schema: [
      new PasswordFieldSchema({
         key: 'binanceAPIKey',
         label: 'API Key',
         placeholder: 'Paste the key here...'
      }),
      new PasswordFieldSchema({
         key: 'binanceSecretKey',
         label: 'Secret Key',
         placeholder: 'Paste the key here...'
      })
   ]
});

export default exchangeAPIForm;
