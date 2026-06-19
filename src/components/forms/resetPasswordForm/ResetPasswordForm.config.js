import Form from '@/models/Form';
import PasswordFieldSchema from '@/models/Form/fieldTypes/PasswordFieldSchema';
import { passwordValidators } from '../registerForm/RegisterForm.config';

const forgotPasswordForm = new Form({
   formID: 'reset-password-form',
   schema: [
      new PasswordFieldSchema({
         key: 'password',
         label: 'Password',
         placeholder: 'Your password',
         required: true,
         validators: passwordValidators
      }),
      new PasswordFieldSchema({
         key: 'confirmPassword',
         label: 'Confirm Password',
         placeholder: 'Enter the same password',
         required: true,
         validators: [
            function(value) {
               if (this.form.getValue('password') !== value) {
                  this.setError('PASSWORD_NOT_MATCH', `The passwords doesn't match!`);
               } else {
                  this.clearError('PASSWORD_NOT_MATCH');
               }
            }
         ]
      })
   ]
});

export default forgotPasswordForm;
