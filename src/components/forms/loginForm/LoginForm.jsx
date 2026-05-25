import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import loginForm from './LoginForm.config';

/**
 * `LoginForm` component for user login.
 *
 * This component renders a login form with fields for email and password.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS class name to apply to the component.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 *
 * @returns {JSX.Element} - Rendered login form component.
 */
export default function LoginForm({ className, onSubmit, ...props }) {
   return (
      <FormBase
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
      </FormBase>
   );
}
