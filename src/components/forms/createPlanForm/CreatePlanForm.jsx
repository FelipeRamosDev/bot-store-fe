import { useContext } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createPlanForm from './CreatePlanForm.config';

export default function CreatePlanForm({ className, onSubmit = () => {}, onSuccess = () => {}, ...props }) {
   const API = useContext(APIContext);

   const handleCreate = async (data) => {
      onSubmit(data);

      try {
         const created = await API.ajax.authPut('/plans/create', data);

         if (created.error) {
            throw created;
         }

         if (created.success) {
            onSuccess(created);
         } else {
            throw new Error('Unknown error when creating plan!');
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <FormBase
         formID="create-plan"
         formSet={createPlanForm}
         submitLabel="Save"
         onSubmit={handleCreate}
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="name" />
         </div>
         <div className="input-wrap">
            <FormInput path="productId" />
         </div>

         <div className="input-wrap">
            <FormInput path="summary" />
         </div>
      </FormBase>
   );
}
