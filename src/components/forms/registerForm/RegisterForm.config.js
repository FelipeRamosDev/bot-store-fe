import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import PasswordFieldSchema from '@/models/Form/fieldTypes/PasswordFieldSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import SearchSelectFieldSchema from '@/models/Form/fieldTypes/SearchSelectFieldSchema';
import configs from '@/config';
import { ListItem } from '@mui/material';
import TimeFieldSchema from '@/models/Form/fieldTypes/TimeFieldSchema';

export const passwordValidators = [
   function (value) {
      const lowercaseRegex = /[a-z]/;

      if (!lowercaseRegex.test(value)) {
         this.setError('LOWERCASE_REQUIRED', 'Lowercase character is required!');
         return false;
      } else {
         this.clearError('LOWERCASE_REQUIRED');
         return true;
      }
   },
   function (value) {
      const uppercaseRegex = /[A-Z]/;

      if (!uppercaseRegex.test(value)) {
         this.setError('UPPERCASE_REQUIRED', 'Uppercase character is required!');
         return false;
      } else {
         this.clearError('UPPERCASE_REQUIRED');
         return true;
      }
   },
   function (value) {
      const numberRegex = /\d/;

      if (!numberRegex.test(value)) {
         this.setError('NUMBER_REQUIRED', 'Number character is required!');
         return false;
      } else {
         this.clearError('NUMBER_REQUIRED');
         return true;
      }
   },
   function (value) {
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (!specialCharRegex.test(value)) {
         this.setError('SPECIAL_CHAR_REQUIRED', 'Special character is required!');
         return false;
      } else {
         this.clearError('SPECIAL_CHAR_REQUIRED');
         return true;
      }
   },
   function (value) {
      if (typeof value === 'string' && value.length < 8) {
         this.setError('MIN_CHAR_REQUIRED', 'Minimum character is required!');
         return false;
      } else if (typeof value === 'string') {
         this.clearError('MIN_CHAR_REQUIRED');
         return true;
      } else {
         return false;
      }
   }
];

const registerForm = new Form({
   formID: 'register-form',
   schema: [
      new SearchSelectFieldSchema({
         key: 'rules',
         label: 'Rules',
         multiOptions: true,
         options: () => configs.allowedRules.map(role => ({ label: role, value: role.toLowerCase() })),
         ListItem: ({ option, itemProps }) => (
            <ListItem value={option.value} {...itemProps}>
               {option.label}
            </ListItem>
         )
      }),
      new TextFieldSchema({
         key: 'firstName',
         label: 'First Name',
         placeholder: 'Your first name',
         required: true
      }),
      new TextFieldSchema({
         key: 'lastName',
         label: 'Last Name',
         placeholder: 'Your last name',
         required: true
      }),
      new TextFieldSchema({
         key: 'email',
         label: 'E-mail',
         placeholder: 'emailname@domail.com',
         inputMode: 'email',
         required: true,
         validators: [
            function (value) {
               const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

               if (!emailRegex.test(value)) {
                  this.setError('BAD_PASSWORD_FORMAT', 'The email provided is out of e-mail standards! For example: "joseph@gmail.com"');
                  return false;
               } else {
                  this.clearError('BAD_PASSWORD_FORMAT');
                  return true;
               }
            }
         ]
      }),
      new TextFieldSchema({
         key: 'phone',
         label: 'Phone',
         placeholder: 'Your phone number',
         inputMode: 'tel',
         required: true,
      }),
      new TextFieldSchema({
         key: 'birthdate',
         label: 'Birthdate',
         placeholder: 'Your birthdate',
         inputMode: 'date',
         required: true,
      }),
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
            function (value) {
               if (this.form.getValue('password') !== value) {
                  this.setError('PASSWORD_NOT_MATCH', `The passwords doesn't match!`);
               } else {
                  this.clearError('PASSWORD_NOT_MATCH');
               }
            }
         ]
      }),
      new ObjectFieldSchema({
         key: 'billingAddress',
         subForm: {
            schema: [
               new TextFieldSchema({
                  key: 'address1',
                  label: 'Address 1',
                  placeholder: 'Your address',
                  required: true
               }),
               new TextFieldSchema({
                  key: 'address2',
                  label: 'Address 2',
                  placeholder: 'Your address',
                  required: false
               }),
               new TextFieldSchema({
                  key: 'city',
                  label: 'City',
                  placeholder: 'Your city',
                  required: true
               }),
               new TextFieldSchema({
                  key: 'state',
                  label: 'State',
                  placeholder: 'Your state',
                  required: true
               }),
               new TextFieldSchema({
                  key: 'postalCode',
                  label: 'Postal Code',
                  placeholder: 'Your postal code',
                  required: true
               }),
               new TextFieldSchema({
                  key: 'country',
                  label: 'Country',
                  placeholder: 'Your country',
                  required: true
               }),
            ]
         }
      }),
   ]
});

export default registerForm;
