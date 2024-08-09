import { Stack } from '@mui/material';
import FormInput from '@/components/forms/formBase/FormInput';

export default function MasterLimitsSet({ type }) {
   if (!type) {
      throw new Error('The "type" param is required!');
   }

   return <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
      <FormInput path={`limits.${type}.money`} />
      <FormInput path={`limits.${type}.percent`} />
      <FormInput path={`limits.${type}.customResumeDayTime`} />
   </Stack>
}
