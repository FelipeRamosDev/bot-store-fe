import { useEffect } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import createSlotForm from './CreateSlot.config';

export default function CreateSlot({ defaultType, onSubmit }) {
   createSlotForm.setValue('type', defaultType);

   return (
      <FormBase
         formID="slot-form"
         submitLabel="Create"
         formSet={createSlotForm}
         onSubmit={onSubmit}
      >
         <div className="input-wrap">
            <FormInput path="name" />
         </div>
         <div className="input-wrap">
            <FormInput path="bot" />
         </div>
      </FormBase>
   );
}