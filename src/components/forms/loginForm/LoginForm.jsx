import { useEffect, useRef, useState } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import Form from '@/models/Form';
import TextInput from '@/components/inputs/textInput/TextInput';
import { loginForm } from './LoginForm.config';
import AlertModal from '@/components/modals/alertModal/AlertModal';

export default function LoginForm({ className, onSubmit, ...props }) {
   const [ loading, setLoading ] = useState();
   const [ errors, setErrors ] = useState();
   const [ alertDialog, setAlertDialog ] = useState();
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
         setAlertDialog(error);
      } finally {
         setLoading(false);
      }
   }

   return (<>
      <AlertModal
         open={alertDialog} handleOk={() => setAlertDialog(false)}
         title="Error"
      >
         <p>{alertDialog?.message}</p>
      </AlertModal>

      <form className={`login-form ${className}`} {...props} onSubmit={handleSubmit}>
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
            <LoadingButton
               type="submit"
               variant="contained"
               color="tertiary"
               loading={loading}
            >Get In</LoadingButton>
         </div>
      </form>
   </>);
}
