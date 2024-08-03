import TextInput from '@/components/inputs/textInput/TextInput';
import { useEffect, useRef, useState } from 'react';
import Form from '@/models/Form';
import { registerForm } from './RegisterForm.config';
import AlertModal from '@/components/modals/alertModal/AlertModal';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import { parseValidationErrorMsg } from '@/helpers/format';

export default function RegisterForm({ className, onSubmit, ...props }) {
   const [ loading, setLoading ] = useState();
   const [ errors, setErrors ] = useState();
   const [ alertDialog, setAlertDialog ] = useState();
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

   const handleSubmit = async (ev) => {
      ev.preventDefault();
      const validated = form.current.validateForm();

      if (validated.hasError) {
         setErrors(validated.errors);
         return;
      }

      try {
         setLoading(true);
         return await onSubmit(form.current);
      } catch (error) {
         const serverValidationErrors = parseValidationErrorMsg(error?.message);

         if (serverValidationErrors) {
            setAlertDialog({ error, message: serverValidationErrors });
         } else {
            setAlertDialog(error);
         }
      } finally {
         setLoading(false);
      }
   }

   return (<>
      <AlertModal
         open={alertDialog} handleOk={() => setAlertDialog(false)}
         title="Login Error"
      >
         <p>{alertDialog?.message}</p>
      </AlertModal>

      <form className={`register-form ${className}`} {...props} onSubmit={handleSubmit}>
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
            <LoadingButton
               type="submit"
               variant="contained"
               color="tertiary"
               loading={loading}
            >Sign Up</LoadingButton>
         </div>
      </form>
   </>);
}
