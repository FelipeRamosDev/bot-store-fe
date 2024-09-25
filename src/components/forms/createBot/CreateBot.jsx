import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import APIContext from '@/contexts/4HandsAPI';
import createBotForm from './CreateBot.config';
import AuthUserContext from '@/contexts/AuthUser';

/**
 * A form component for creating or editing a bot.
 * 
 * This component uses the `FormBase` component to render a form with inputs for 
 * the bot's name and description. It handles form submission by sending data 
 * to an API endpoint and then redirects to the bot's detail page upon success.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} [props.editMode=false] - Indicates if the form is in edit mode.
 * @param {Object} [props.editData] - The current bot data.
 * 
 * @returns {JSX.Element} The rendered form component.
 */
export default function CreateBotForm({ editData, onSuccess = () => {} }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const editMode = Boolean(editData);

   /**
    * Handles form submission by sending the form data to the API.
    * Redirects to the bot's detail page upon successful creation.
    * 
    * @param {Object} data - The form data.
    * @returns {Promise<void>} A promise that resolves when the operation is complete.
    */
   async function onSubmit(data) {
      data.author = user._id;

      try {
         if (!editMode) {
            const created = await API.ajax.authPut('/bot/create', data);
            if (created.error) {
               throw created;
            }


         } else {
            const saved = await API.ajax.authPost('/bot/update', {
               botUID: editData._id,
               toUpdate: data
            });

            if (saved.error) {
               throw saved;
            }
         }

         return onSuccess();
      } catch (err) {
         throw err;
      }
   }

   return (
      <FormBase
         formID="bot-form"
         submitLabel={editMode ? 'Save' : 'Create'}
         formSet={createBotForm}
         editData={editData}
         onSubmit={onSubmit}
      >
         <FormInput path="name" />
         <FormInput path="description" multiline={true} minRows={5} />
      </FormBase>
   );
}
