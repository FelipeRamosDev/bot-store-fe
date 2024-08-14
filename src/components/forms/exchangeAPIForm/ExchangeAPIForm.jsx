import { useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import exchangeAPIForm from './ExchangeAPIForm.js';
import APIContext from '@/contexts/4HandsAPI';

export default function ExchangeAPIForm({ className, onSuccess, ...props }) {
   const API = useContext(APIContext);

   const handleSaveKey = async (data) => {
      try {
         const saved = await API.ajax.authPut('/user/binance-keys/save-keys', data);

         if (saved.error) {
            throw saved;
         }

         onSuccess(saved);
      } catch (err) {
         throw err;
      }
   }

   return (
      <FormBase
         formID="exchange-api"
         formSet={exchangeAPIForm}
         submitLabel="Save"
         onSubmit={handleSaveKey}
         {...props}
      >
         <div className="input-wrap">
            <FormInput path="binanceAPIKey" />
         </div>

         <div className="input-wrap">
            <FormInput path="binanceSecretKey" />
         </div>
      </FormBase>
   );
}
