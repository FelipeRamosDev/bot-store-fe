import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import forgotPasswordForm from './ForgotPasswordForm.config';
import Link from 'next/link';

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
export default function ForgotPasswordForm({ className, onSubmit, ...props }) {

   return (
      <FormBase
         formID="login"
         formSet={forgotPasswordForm}
         submitLabel="Reset Password"
         onSubmit={onSubmit}
         {...props}
      >
         <div className="input-wrap forgot-password">
            <FormInput path="email" />
            <Link className="link" href="/dashboard/login">{'<< Back to login'}</Link>
         </div>
      </FormBase>
   );
}
