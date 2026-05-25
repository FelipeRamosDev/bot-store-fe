'use client';

import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import resetPasswordForm from './ResetPasswordForm.config';

/**
 * `ResetPasswordForm` component for reset password.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS class name to apply to the component.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 *
 * @returns {JSX.Element} - Rendered login form component.
 */
export default function ResetPasswordForm({ className, onSubmit, ...props }) {
   return (
      <FormBase
         formID="reset-password-form"
         formSet={resetPasswordForm}
         submitLabel="Reset Password"
         onSubmit={onSubmit}
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="password" />
         </div>
         <div className="input-wrap">
            <FormInput path="confirmPassword" />
         </div>
      </FormBase>
   );
}
