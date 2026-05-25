import { useContext } from 'react';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import { FormBase } from '../formBase/FormBase';
import FormInput from '../formBase/FormInput';
import fixPositionForm from './FixPositionForm.config';
import HandymanIcon from '@mui/icons-material/Handyman';
import APIContext from '@/contexts/4HandsAPI';

export default function FixPositionForm({ className, position, error = {}, closeModal = () => {} }) {
   const API = useContext(APIContext);

   const handleSubmit = async (data) => {
      if (!position?._id) return;
      const positionUID = position?._id;
      let positionData;

      if (Object.keys(data).length) {
         positionData = data;
      }

      try {
         const fixed = await API.ajax.authPost('/positions/fix', { positionUID, positionData, errorName: error.name });

         if (fixed.error) {
            throw fixed;
         }

         window.location.reload();
      } catch (err) {
         throw err;
      } finally {
         closeModal();
      }
   }

   return (
      <FormBase
         className={className}
         formID="fix-position-form"
         formSet={fixPositionForm}
         editData={position}
         submitLabel="SEND FIX"
         submitBtnColor="rubber"
         submitButtonStartIcon={<HandymanIcon fontSize="small" />}
         onSubmit={handleSubmit}
         submitBtnFullwidth
      >
         <ContentSplit className="field-group">
            <FormInput path="openOrderId" />
            <FormInput path="closeOrderId" />
         </ContentSplit>
      </FormBase>
   );
}
