'use client';
import { useContext } from 'react';
import { Stack } from '@mui/material';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createMasterForm from './CreateMasterForm.config';
import MasterLimitsForm from './masterLimitsForm/MasterLimitsForm';
import Card from '@/components/common/card/Card';
import APIContext from '@/contexts/4HandsAPI';
import AuthUser from '@/contexts/AuthUser';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';

export default function CreateMasterForm({ onSuccess, editMode = false, master }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUser);

   async function onSubmit(data) {
      data.user = user._id;
      let reqHttp;

      if (editMode) {
         const toUpdate = { masterUID: master._id, data };
         reqHttp = async () => await API.ajax.authPost('/master-account/edit', toUpdate);
      } else {
         reqHttp = async () => await API.ajax.authPut('/master-account/create', data);
      }

      try {
         const response = await reqHttp();
         
         if (response.error) {
            throw response;
         }

         if (response.success) {
            onSuccess(response.masterAccount);
         }
      } catch (err) {
         throw err;
      }
   }

   return (<FormBase
      formID="create-master"
      formSet={createMasterForm}
      submitLabel={editMode ? 'Save' : 'Create'}
      onSubmit={onSubmit}
      editData={master}
   >
      <ContentSplit breakpoint="l">
         <Stack flexDirection="column" flex={1} gap="1rem">
            {!editMode && <FormInput path="type" />}

            <FormInput path="name" />
            <FormInput path="description" multiline={true} minRows={5} />

            <Card padding="xs" elevation={15}>
               <h3 className="card-title">Risk Management</h3>

               <Stack flex={1} gap="1rem">
                  <FormInput path="limits.tradesMinInterval" />
                  <FormInput path="limits.marginRatioCommit" />
               </Stack>
            </Card>
         </Stack>

         <MasterLimitsForm />
      </ContentSplit>
   </FormBase>);
}
