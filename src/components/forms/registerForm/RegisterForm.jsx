import registerForm from './RegisterForm.config';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';

/**
 * `RegisterForm` component for user registration.
 *
 * This component renders a registration form with fields for first name, last name, email, password, and confirm password.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS class name to apply to the component.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 *
 * @returns {JSX.Element} - Rendered registration form component.
 */
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
