import registerForm from './RegisterForm.config';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import { RuleControl } from '@/components/common/RuleControl';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import { Business } from '@mui/icons-material';

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
export default function RegisterForm({ className, editData, onSubmit, ...props }) {
   const inputProps = {
      size: 'small'
   };

   return (
      <FormBase
         formID="register-form"
         formSet={registerForm}
         submitLabel={editData ? "Save Changes" : "Sign Up"}
         onSubmit={onSubmit}
         editData={editData}
         submitBtnFullwidth
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="firstName" {...inputProps} />
            <FormInput path="lastName" {...inputProps} />
         </div>

         {!editData && <div className="input-wrap">
            <FormInput path="email" {...inputProps} />
            <FormInput path="phone" {...inputProps} />
         </div>}

         <div className="input-wrap">
            <FormInput path="birthdate" {...inputProps} />
         </div>

         <RuleControl rules={['master', 'admin']}>
            <div className="input-wrap">
               <FormInput path="rules" {...inputProps} />
            </div>
         </RuleControl>

         {!editData && <div className="input-wrap">
            <FormInput path="password" {...inputProps} />
            <FormInput path="confirmPassword" {...inputProps} />
         </div>}

         <ContentHeader className="billing-header">
            <Business fontSize="small" /> <h4 className="header-title">Billing Address</h4>
         </ContentHeader>
         <div className="input-wrap">
            <FormInput path="billingAddress.address1" {...inputProps} />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.address2" {...inputProps} />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.city" {...inputProps} />
            <FormInput path="billingAddress.state" {...inputProps} />
         </div>

         <div className="input-wrap">
            <FormInput path="billingAddress.postalCode" {...inputProps} />
            <FormInput path="billingAddress.country" {...inputProps} />
         </div>
      </FormBase>
   );
}
