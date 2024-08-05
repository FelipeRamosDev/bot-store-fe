import registerForm from './RegisterForm.config';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';

export default function RegisterForm({ className, onSubmit, ...props }) {
   return (
      <FormBase
         formSet={registerForm}
         submitLabel="Create"
         onSubmit={onSubmit}
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="firstName" />
            <FormInput path="lastName" />
         </div>

         <div className="input-wrap">
            <FormInput path="email" />
         </div>

         <div className="input-wrap">
            <FormInput path="password" />
            <FormInput path="confirmPassword" />
         </div>
      </FormBase>
   );
}
