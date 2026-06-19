import { useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import exchangeAPIForm from './ExchangeAPIForm.config';
import APIContext from '@/contexts/4HandsAPI';

/**
 * `ExchangeAPIForm` component provides a form for saving API keys for exchange integration.
 * It uses `FormBase` to handle form state, validation, and submission.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS class name for the form container.
 * @param {Function} [props.onSuccess] - Callback function to be called upon successful form submission.
 * @param {Object} [props.children] - Additional children components to render inside the form.
 *
 * @returns {JSX.Element} - The rendered form for API key input with submission handling.
 */
export default function ExchangeAPIForm({ className, onSuccess, ...props }) {
   const API = useContext(APIContext);

   /**
    * Handle saving the API key data.
    * @param {Object} data - The form data to be sent to the server.
    * @returns {Promise<void>} - A promise that resolves when the data has been successfully saved.
    * @throws {Error} - Throws an error if the API request fails.
    */
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
