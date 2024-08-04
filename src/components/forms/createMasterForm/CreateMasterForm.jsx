import { Stack } from '@mui/material';
import Card from '@/components/common/card/Card';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/inputs/formInput/FormInput';
import createMasterForm from './CreateMasterForm.config';

export default function CreateMasterForm({ className = '', ...props }) {
   async function onSubmit(data) {
      return await new Promise((resolve) => {
         setTimeout(() => {
            console.log(data);
            resolve();
         }, 5000);
      });
   }

   return (<FormBase
      formID="create-master"
      formSet={createMasterForm}
      submitLabel="Create"
      onSubmit={onSubmit}
   >
      <Stack flexDirection="row" justifyContent="space-between" gap="1.5rem" marginBottom="2rem">
         <Stack flexDirection="column" flex={1} gap="1rem">
            <FormInput path="name" />

            <FormInput path="description" multiline={true} />
         </Stack>

         <Stack flexDirection="row" flex={1}>
            <Card padding="xs" elevation={10}>
               <h4 className="card-title">Configurations</h4>

               <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                  <FormInput path="limits.tradeLoss.money" />

                  <FormInput path="limits.tradeLoss.percent" />
               </Stack>

               <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                  <FormInput path="limits.dailyLoss.money" />

                  <FormInput path="limits.dailyLoss.percent" />
               </Stack>
            </Card>
         </Stack>
      </Stack>
   </FormBase>);
}
