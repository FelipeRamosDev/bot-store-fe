import { useContext } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createPriceForm from './CreatePriceForm.config';

export default function CreatePriceForm({ planUID, className, onSubmit = () => {}, onSuccess = () => {}, ...props }) {
   const API = useContext(APIContext);
   createPriceForm.setValue('plan', planUID);

   const handleCreate = async (data) => {
      onSubmit(data);

      try {
         const created = await API.ajax.authPut('/prices/create', data);

         if (created.error) {
            throw created;
         }

         if (created.success) {
            onSuccess(created);
         } else {
            throw new Error('Unknown error when creating price!');
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <FormBase
         formID="create-price"
         submitLabel="Save"
         formSet={createPriceForm}
         onSubmit={handleCreate}
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="name" />
         </div>

         <div className="input-wrap">
            <FormInput path="features" />
         </div>

         <div className="input-wrap">
            <FormInput path="priceId" />
         </div>

         <div className="input-wrap">
            <FormInput path="price" />
         </div>

         <div className="input-wrap">
            <FormInput path="type" />
         </div>

         <div className="input-wrap">
            <FormInput path="interval" />
         </div>

         <div className="input-wrap">
            <FormInput path="currency" />
         </div>
      </FormBase>
   );
}
