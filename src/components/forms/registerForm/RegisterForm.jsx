import registerForm from './RegisterForm.config';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import { RuleControl } from '@/components/common/RuleControl';

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
         <RuleControl rules={['master', 'admin']}>
            <div className="input-wrap">
               <FormInput path="rules" />
            </div>
         </RuleControl>

         <div className="input-wrap">
            <FormInput path="firstName" />
            <FormInput path="lastName" />
         </div>

         <div className="input-wrap">
            <FormInput path="email" />
            <FormInput path="phone" />
         </div>

         <div className="input-wrap">
            <FormInput path="password" />
            <FormInput path="confirmPassword" />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.address1" />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.address2" />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.city" />
            <FormInput path="billingAddress.state" />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.postalCode" />
            <FormInput path="billingAddress.country" />
         </div>
      </FormBase>
   );
}
