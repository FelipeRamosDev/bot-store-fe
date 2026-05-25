import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

const forgotPasswordForm = new Form({
   formID: 'forgotpassword-form',
   schema: [
      new TextFieldSchema({
         key: 'email',
         label: 'Account E-mail',
         placeholder: 'emailname@domail.com',
         inputMode: 'email',
         required: true
      })
   ]
});

export default forgotPasswordForm;
