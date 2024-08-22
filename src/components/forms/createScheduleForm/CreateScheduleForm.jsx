import { useContext } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createScheduleForm from './CreateScheduleForm.config';

export default function CreateScheduleForm({ masterUID, className, onSubmit = () => {}, onSuccess = () => {}, ...props }) {
   const API = useContext(APIContext);

   createScheduleForm.setValue('master', masterUID);
   createScheduleForm.setValue('type', 'runtime');

   const handleCreate = async (data) => {
      onSubmit(data);

      try {
         const created = await API.ajax.authPut('/master-account/create-schedule', data);

         if (created.error) {
            throw created;
         }

         if (created.success) {
            onSuccess(created);
         } else {
            throw new Error('Unknown error when creating schedule!');
         }
      } catch (err) {
         throw err;
      }
   }

   return (<FormBase
      formID="create-schedule"
      formSet={createScheduleForm}
      submitLabel="Save"
      onSubmit={handleCreate}
      {...props}
   >
      <div className="input-wrap">
         <FormInput path="weekdays" />
      </div>
      <div className="input-wrap">
         <FormInput path="startTime" />
         <FormInput path="endTime" />
      </div>
   </FormBase>);
}
