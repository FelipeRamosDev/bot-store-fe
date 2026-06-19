import { useContext } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createScheduleForm from './CreateScheduleForm.config';

/**
 * `CreateScheduleForm` component renders a form for creating a schedule.
 * It initializes the form with default values for `masterUID` and `type`, 
 * and handles form submission to create a new schedule.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.masterUID - The unique identifier of the master account 
 *                                    to associate with the schedule.
 * @param {string} [props.className] - Optional CSS class to apply to the form.
 * @param {Function} [props.onSubmit] - Optional callback function to be called 
 *                                       when the form is submitted.
 * @param {Function} [props.onSuccess] - Optional callback function to be called 
 *                                        when the schedule is successfully created.
 * @returns {JSX.Element} - The rendered form for creating a schedule.
 */
export default function CreateScheduleForm({ masterUID, className, onSubmit = () => {}, onSuccess = () => {}, ...props }) {
   const API = useContext(APIContext);

   // Set default values for the form fields
   createScheduleForm.setValue('master', masterUID);
   createScheduleForm.setValue('type', 'runtime');

   /**
    * Handles the creation of a new schedule.
    * Calls the `onSubmit` callback, sends a request to the API to create the schedule,
    * and calls `onSuccess` if the schedule is created successfully.
    *
    * @param {Object} data - The form data to be submitted for creating the schedule.
    * @returns {Promise<void>} - A promise that resolves when the schedule is created 
    *                            or rejects with an error if the creation fails.
    */
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

   return (
      <FormBase
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
      </FormBase>
   );
}
