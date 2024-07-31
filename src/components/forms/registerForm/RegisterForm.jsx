import { Button } from '@mui/material';
import TextInput from '@/inputs/textInput/TextInput';
import { useEffect, useRef, useState } from 'react';
import Form from '@/models/Form';
import { registerForm } from './RegisterForm.config';

export default function RegisterForm({ className, onSubmit, ...props }) {
   const [ errors, setErrors ] = useState();
   const form = useRef();

   useEffect(() => {
      // Declaring the Form instance
      if (!form.current) {
         form.current = new Form({
            ...registerForm,
            onChange: function () {
               setErrors(this.getFieldErrors());
            }
         });
      }
   }, []);

   const handleInput = (ev, key) => {
      const value = ev?.target?.value;
      form.current.setValue(key, value);
   }

   return (
      <form className={`register-form ${className}`} {...props} onSubmit={(ev) => {
         onSubmit(ev, form.current);
      }}>
         <div className="input-wrap">
            <TextInput
               label="First Name"
               placeholder="Your first name"
               onChange={(ev) => handleInput(ev, 'firstName')}
               errors={errors?.firstName}
            />

            <TextInput
               label="Last Name"
               placeholder="Your last name"
               onChange={(ev) => handleInput(ev, 'lastName')}
               errors={errors?.lastName}
            />
         </div>

         <div className="input-wrap">
            <TextInput
               label="E-mail"
               type="email"
               placeholder="emailname@domail.com"
               onChange={(ev) => handleInput(ev, 'email')}
               errors={errors?.email}
            />
         </div>

         <div className="input-wrap">
            <TextInput
               type="password"
               label="Password"
               placeholder="Your password"
               onChange={(ev) => handleInput(ev, 'password')}
               errors={errors?.password}
            />

            <TextInput
               type="password"
               label="Confirm Password"
               placeholder="Enter the same password"
               onChange={(ev) => handleInput(ev, 'confirmPassword')}
               errors={errors?.confirmPassword}
            />
         </div>

         <div className="buttons">
            <Button
               type="submit"
               variant="contained"
               color="tertiary"
            >Sign Up</Button>
         </div>
      </form>
   );
}
