import { useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import createSlotForm from './CreateSlotForm.config';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';
import Card from '@/components/common/card/Card';
import { Stack } from '@mui/material';
import SlotLimitsForm from './slotLimitsForm/SlotLimitsForm';

export default function CreateSlot({ slot = {}, master = {}, defaultType, onSuccess = () => {}, editMode = false }) {
   const auth = useContext(AuthUserContext);
   const API = useContext(APIContext);
   const userUID = auth?.user?._id;
   const slotUID = slot._id;
   const masterUID = master._id || slot.master;
   
   createSlotForm.setValue('type', defaultType);
   async function handleSubmit(data) {
      let reqHttp;

      if (editMode) {
         const toUpdate = { slotUID, data };
         reqHttp = async () => await API.ajax.authPost('/slots/edit', toUpdate);
      } else {
         reqHttp = async () => await API.ajax.authPut('/slots/create', data);
      }

      try {
         const created = await reqHttp();
         
         if (created.error) {
            throw created;
         }

         onSuccess(created);
      } catch (err) {
         throw err;
      }
   }

   if (userUID && masterUID) {
      createSlotForm.setValue('master', masterUID);
      createSlotForm.setDependency({
         id: 'bots',
         queryType: 'query',
         collection: 'bots',
         filter: { $or: [
            { status: 'private', user: userUID },
            { status: 'public' }
         ]}
      });
   }

   return (
      <FormBase
         formID="slot-form"
         submitLabel={editMode ? 'Save' : 'Create'}
         formSet={createSlotForm}
         appendUserToBody={true}
         onSubmit={handleSubmit}
         editData={slot}
      >
         <ContentSplit breakpoint="l">
            <>
               <div className="input-wrap">
                  <FormInput path="name" />
               </div>

               <div className="input-wrap">
                  <FormInput path="bot" />
               </div>

               <div className="input-wrap">
                  <FormInput path="assets" />
               </div>

               <Card className="input-wrap" padding="xs" elevation={15}>
                  <FormInput path="interval" />
               </Card>
            </>
            <>
               <Card padding="xs" elevation={15}>
                  <h3 className="card-title">Risk Management</h3>
                  <p className="help-info text-center">You can customize the risk configurations or use the same as master account.</p>

                  <Stack flex={1} gap="1rem">
                     <FormInput path="limits.tradesMinInterval" />
                     <FormInput path="limits.marginRatioCommit" />
                     <FormInput path="limits.leverage" />
                  </Stack>
               </Card>

               <SlotLimitsForm />
            </>
         </ContentSplit>
      </FormBase>
   );
}