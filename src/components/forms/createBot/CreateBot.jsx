import { useContext, useRef, useState } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import APIContext from '@/contexts/4HandsAPI';
import createBotForm from './CreateBot.config';
import AuthUserContext from '@/contexts/AuthUser';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import usePilot from '@/hooks/usePilot';
import Avatar from '@/components/common/avatar/Avatar';

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
export default function CreateBotForm({ editData, onSuccess = () => { } }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const { uploadAvatar } = usePilot();
   const [avatarUrl, setAvatarUrl] = useState();
   const avatarFile = useRef();
   const editMode = Boolean(editData);

   function handleAvatarChange(files) {
      const [file] = files;

      if (file) {
         const url = URL.createObjectURL(file);

         avatarFile.current = file;
         setAvatarUrl(url);
      }
   }

   async function onSubmit(data) {
      data.author = user._id;
      const avatar = avatarFile.current;

      try {
         if (!editMode) {
            const created = await API.ajax.authPut('/bot/create', { ...data, avatar: undefined });
            if (created.error) {
               throw created;
            }

            if (avatar) {
               try {
                  await uploadAvatar(avatar, created.bot.UID);
               } catch (err) {
                  console.error('Error uploading avatar:', err);
                  throw err;
               }
            }

            return onSuccess(created.bot);
         } else {
            const saved = await API.ajax.authPost('/bot/update', {
               botUID: editData._id,
               toUpdate: data
            });

            if (saved.error) {
               throw saved;
            }

            return onSuccess(saved);
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
         editData={editData}
         onSubmit={onSubmit}
      >
         <ContentSplit>
            <>
               {!editMode && (
                  <Avatar avatarUrl={avatarUrl} size={220}>
                     <FormInput path="avatar" onChange={handleAvatarChange} />
                  </Avatar>
               )}

               <FormInput path="name" />
               <FormInput path="subTitle" />
               <FormInput path="description" multiline={true} minRows={5} />
            </>

            <>
               <FormInput path="allowedIntervals" />
               <FormInput path="allowedSymbols" />
            </>
         </ContentSplit>
      </FormBase>
   );
}
