import { useContext } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';


export default function LogicalOperatorForm({ className, botUID, block, onSuccess, ...props }) {
   const API = useContext(APIContext);

   const handleChange = async ({ target: { value }}) => {
      if (value !== 'and' && value !== 'or') return;

      try {
         const blockUID = block._id;
         const updated = await API.ajax.authPost('/bot/update-block', {
            blockUID,
            botUID,
            toUpdate: { ifType: value }
         });

         if (updated.error) {
            throw updated;
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <CheckButtonGroupInput className="logical-operator" onChange={handleChange} schema={{
         defaultValue: block?.ifType,
         options: [
            { label: 'AND', value: 'and' },
            { label: 'OR', value: 'or' }
         ]
      }} />
   );
}
