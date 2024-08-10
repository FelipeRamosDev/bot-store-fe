import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import demoDepositForm from './DemoDepositForm.config';

export default function DemoDepositForm({ className, masterUID, onSubmit, ...props }) {
   demoDepositForm.setValue('master', masterUID);

   return (<FormBase
      formID="demo-deposit"
      formSet={demoDepositForm}
      submitLabel="Deposit"
      onSubmit={onSubmit}
      {...props}
   >
      <FormInput path="value" />
   </FormBase>);
}

