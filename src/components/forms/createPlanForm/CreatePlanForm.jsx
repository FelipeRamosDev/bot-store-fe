import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createPlanForm from './CreatePlanForm.config';
import usePlans from '@/hooks/usePlans';

export default function CreatePlanForm({ className, editData, onSubmit = () => { }, onSuccess = () => { }, ...props }) {
   const { create, update } = usePlans();

   const handleCreate = async (data) => {
      onSubmit(data);

      try {
         await create(data);
         onSuccess();
      } catch (err) {
         throw err;
      }
   }

   const handleUpdate = async (data) => {
      try {
         await update(editData._id, data);
         onSuccess();
      } catch (error) {
         throw error;
      }
   }

   return (
      <FormBase
         formID="create-plan"
         formSet={createPlanForm}
         submitLabel="Save"
         editData={editData}
         onSubmit={editData ? handleUpdate : handleCreate}
         submitBtnFullwidth
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="name" />
         </div>
         <div className="input-wrap">
            <FormInput path="productId" />
         </div>

         <div className="input-wrap">
            <FormInput path="isAiUsage" />
         </div>

         <div className="input-wrap">
            <FormInput path="summary" />
         </div>

         <div className="input-wrap">
            <FormInput path="features" />
         </div>
         <div className="input-wrap">
            <FormInput path="walletLimit" />
            <FormInput path="slotLimit" />
         </div>
         <div className="input-wrap">
            <FormInput path="walletLimitDemo" />
            <FormInput path="slotLimitDemo" />
         </div>
      </FormBase>
   );
}
