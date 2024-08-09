import { useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import createSlotForm from './CreateSlot.config';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import AuthUserContext from '@/contexts/AuthUser';

export default function CreateSlot({ defaultType, onSubmit }) {
   const auth = useContext(AuthUserContext);
   createSlotForm.setValue('type', defaultType);

   if (auth?.user) {
      createSlotForm.setDependency({
         id: 'bots',
         queryType: 'query',
         collection: 'bots',
         filter: { $or: [
            { status: 'private', user: auth.user._id },
            { status: 'public' }
         ]}
      });
   }

   return (
      <FormBase
         formID="slot-form"
         submitLabel="Create"
         formSet={createSlotForm}
         onSubmit={onSubmit}
      >
         <ContentSplit breakpoint="l">
            <>
               <div className="input-wrap">
                  <FormInput path="name" />
               </div>

               <div className="input-wrap">
                  <FormInput path="assets" />
               </div>

               <div className="input-wrap">
                  <FormInput path="bot" />
               </div>
            </>
            <>
               Test
            </>
         </ContentSplit>
      </FormBase>
   );
}