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

export default function CreateMasterForm({ onSuccess }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUser);

   async function onSubmit(data) {
      data.user = user._id;

      try {
         const created = await API.ajax.authPut('/master-account/create', data);
         
         if (created.error) {
            throw created;
         }

         if (created.success) {
            onSuccess(created.masterAccount);
         }
      } catch (err) {
         throw err;
      }
   }

   return (<FormBase
      formID="create-master"
      formSet={createMasterForm}
      submitLabel="Create"
      onSubmit={onSubmit}
   >
      <Stack flexDirection="row" justifyContent="space-between" gap="1.5rem" marginBottom="2rem">
         <Stack flexDirection="column" flex={1} gap="1rem">
            <FormInput path="type" />

            <FormInput path="name" />
            <FormInput path="description" multiline={true} minRows={5} />

            <Card padding="xs" elevation={15}>
               <h3 className="card-title">Risk Management</h3>

               <Stack flexDirection="row" flex={1} gap="1rem">
                  <FormInput path="limits.leverage" />
                  <FormInput path="limits.tradesMinInterval" />
                  <FormInput path="limits.marginRatioCommit" />
               </Stack>
            </Card>
         </Stack>

         <MasterLimitsForm />
      </Stack>
   </FormBase>);
}
