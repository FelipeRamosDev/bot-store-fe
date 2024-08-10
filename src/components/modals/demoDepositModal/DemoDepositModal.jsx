import './DemoDepositModal.scss';
import { useContext } from 'react';
import ContentModal from '../base/contentModal/ContentModal';
import DemoDepositForm from '@/components/forms/demoDepositForm/DemoDepositForm';
import APIContext from '@/contexts/4HandsAPI';

export default function DemoDepositModal({ open, setOpen, master = {} }) {
   const API = useContext(APIContext);

   const onDeposit = async (data) => {
      try {
         const deposited = await API.ajax.authPut('/transfer/deposit-withdraw', data);
         
         if (deposited.error) {
            debugger;
         }

         setOpen(false);
      } catch (err) {
         debugger
      }
   }

   return <ContentModal
      title="Demo Deposit"
      padding="m"
      size="small"
      open={open}
      onClose={() => setOpen(false)}
   >
      <DemoDepositForm onSubmit={onDeposit} masterUID={master._id} />
   </ContentModal>
}
