import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import loginForm from './LoginForm.config';

export default function LoginForm({ className, onSubmit, ...props }) {
   return (<FormBase
      formID="login"
      formSet={loginForm}
      submitLabel="Get In"
      onSubmit={onSubmit}
      {...props}
   >
      <div className="input-wrap">
         <FormInput path="email" />
      </div>

      <div className="input-wrap">
         <FormInput path="password" />
      </div>
   </FormBase>);
}
