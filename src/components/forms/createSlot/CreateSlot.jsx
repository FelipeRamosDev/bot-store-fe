import { useContext, useState } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import createSlotForm from './CreateSlot.config';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';
import Card from '@/components/common/card/Card';
import { Stack } from '@mui/material';
import CheckBoxInput from '@/components/inputs/checkBoxInput/CheckBoxInput';
import SlotLimitsForm from './slotLimitsForm/SlotLimitsForm';

export default function CreateSlot({ master = {}, defaultType, onSuccess = () => {} }) {
   const [ customRisk, setCustomRisk ] = useState(false);
   const auth = useContext(AuthUserContext);
   const API = useContext(APIContext);
   const userUID = auth?.user?._id;
   const masterUID = master._id;
   
   createSlotForm.setValue('type', defaultType);
   async function handleSubmit(data) {
      try {
         const created = await API.ajax.authPut('/slots/create', data);
         
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
         submitLabel="Create"
         formSet={createSlotForm}
         appendUserToBody={true}
         onSubmit={handleSubmit}
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

                  <CheckBoxInput label="Custom risk management" onChange={(value) => setCustomRisk(value)} color="tertiary" />
                  {customRisk && <Stack flexDirection="row" flex={1} gap="1rem">
                     <FormInput path="limits.leverage" />
                     <FormInput path="limits.tradesMinInterval" />
                     <FormInput path="limits.marginRatioCommit" />
                  </Stack>}
               </Card>

               <SlotLimitsForm />
            </>
         </ContentSplit>
      </FormBase>
   );
}