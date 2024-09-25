import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import PasswordFieldSchema from '@/models/Form/fieldTypes/PasswordFieldSchema';

const loginForm = new Form({
   formID: 'login-form',
   schema: [
      new TextFieldSchema({
         key: 'email',
         label: 'E-mail',
         placeholder: 'emailname@domail.com',
         inputMode: 'email',
         required: true
      }),
      new PasswordFieldSchema({
         key: 'password',
         label: 'Password',
         placeholder: 'Your password',
         required: true
      })
   ]
});

export default loginForm;
