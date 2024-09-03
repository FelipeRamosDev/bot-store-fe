import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import APIContext from '@/contexts/4HandsAPI';
import createBotForm from './CreateBot.config';
import AuthUserContext from '@/contexts/AuthUser';

export default function CreateBotForm({ editMode }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const router = useRouter();

   async function onSubmit(data) {
      data.author = user._id;

      try {
         const created = await API.ajax.authPut('/bot/create', data);
         if (created.error) {
            return created;
         }

         if (created.success) {
            router.push(`/dashboard/bots/${created.bot?.index}`);
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <FormBase
         formID="bot-form"
         submitLabel={editMode ? 'Save' : 'Create'}
         formSet={createBotForm}
         onSubmit={onSubmit}
      >
         <FormInput path="name" />
         <FormInput path="description" multiline={true} minRows={5} />
      </FormBase>
   );
}
