import './CreateScheduleForm.scss';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createScheduleForm from './CreateScheduleForm.config';

export default function CreateScheduleForm({ className, onSubmit, ...props }) {
   return (<FormBase
      formID="create-schedule"
      formSet={createScheduleForm}
      submitLabel="Save"
      onSubmit={onSubmit}
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
