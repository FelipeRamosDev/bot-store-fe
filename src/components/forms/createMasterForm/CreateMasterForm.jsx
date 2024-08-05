import { Stack } from '@mui/material';
import { FormBase } from '../formBase/FormBase';
import FormInput from '@/components/forms/formBase/FormInput';
import createMasterForm from './CreateMasterForm.config';
import MasterLimitsForm from './masterLimitsForm/MasterLimitsForm';
import Card from '@/components/common/card/Card';
import RadioGroup from '@/components/inputs/radioGroupInput/RadioGroupInput';

export default function CreateMasterForm() {
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
            <FormInput path="type" />

            <FormInput path="name" />
            <FormInput path="description" multiline={true} minRows={5} />

            <Card padding="xs" elevation={15}>
               <h3 className="card-title">Risk Management</h3>

               <Stack flexDirection="row" flex={1} gap="1rem">
                  <FormInput path="limits.leverage" />
                  <FormInput path="limits.tradesMinInterval" />
                  <FormInput path="limits.marginRatioCommit" />
               </Stack>
            </Card>
         </Stack>

         <MasterLimitsForm />
      </Stack>
   </FormBase>);
}
