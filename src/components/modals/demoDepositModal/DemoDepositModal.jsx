import { useContext } from 'react';
import ContentModal from '../base/contentModal/ContentModal';
import DemoDepositForm from '@/components/forms/demoDepositForm/DemoDepositForm';
import APIContext from '@/contexts/4HandsAPI';

/**
 * A modal for handling demo deposits.
 *
 * @param {Object} props - The properties to customize the demo deposit modal.
 * @param {boolean} [props.open=false] - Controls whether the modal is open or closed.
 * @param {function} [props.setOpen=() => {}] - Function to control the modal's open state.
 * @param {Object} [props.master={}] - The master account for which the deposit is made. Should contain at least the `_id` property.
 *
 * @returns {React.Element} The rendered modal for demo deposits.
 */
export default function DemoDepositModal({
   open = false,
   setOpen = () => {},
   master = {}
}) {
   const API = useContext(APIContext);

   /**
    * Handles the deposit operation.
    * Sends a deposit request to the API and closes the modal if successful.
    * Throws an error if the API request fails.
    *
    * @param {Object} data - The data for the deposit request.
    * @async
    * @throws {Error} Throws an error if the deposit request fails.
    */
   const onDeposit = async (data) => {
      try {
         const deposited = await API.ajax.authPut('/transfer/deposit-withdraw', data);
         
         if (deposited.error) {
            throw deposited;
         }

         setOpen(false);
      } catch (err) {
         throw err;
      }
   }

   return (
      <ContentModal
         title="Demo Deposit"
         padding="m"
         size="small"
         open={open}
         onClose={() => setOpen(false)}
      >
         <DemoDepositForm onSubmit={onDeposit} masterUID={master._id} />
      </ContentModal>
   );
}
