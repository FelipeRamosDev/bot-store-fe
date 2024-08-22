import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import demoDepositForm from './DemoDepositForm.config';

/**
 * `DemoDepositForm` component provides a form for depositing funds into a demo account.
 * It uses `FormBase` for handling form state, validation, and submission.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.className - Optional CSS class name for the form container.
 * @param {string} props.masterUID - The unique identifier for the master account to which the deposit will be attributed.
 * @param {Function} props.onSubmit - Callback function to be called upon successful form submission.
 * @param {Object} [props.children] - Additional children components to render inside the form.
 *
 * @returns {JSX.Element} - The rendered form for depositing funds with submission handling.
 */
export default function DemoDepositForm({ className, masterUID, onSubmit, ...props }) {
   // Set the masterUID value in the form configuration
   demoDepositForm.setValue('master', masterUID);

   return (
      <FormBase
         formID="demo-deposit"
         formSet={demoDepositForm}
         submitLabel="Deposit"
         onSubmit={onSubmit}
         {...props}
      >
         <FormInput path="value" />
      </FormBase>
   );
}
