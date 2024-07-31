import { Button } from '@mui/material';
import TextInput from '@/inputs/textInput/TextInput';
import { useEffect, useRef, useState } from 'react';
import Form from '@/models/Form';
import { loginForm } from './LoginForm.config';

export default function LoginForm({ className, ...props }) {
   const [ errors, setErrors ] = useState();
   const form = useRef();

   useEffect(() => {
      // Declaring the Form instance
      if (!form.current) {
         form.current = new Form({
            ...loginForm,
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
      <form className={`login-form ${className}`} {...props}>
         <div className="input-wrap">
            <TextInput
               label="E-mail"
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
         </div>

         <div className="buttons">
            <Button
               type="submit"
               variant="contained"
               color="tertiary"
            >Get In</Button>
         </div>
      </form>
   );
}
