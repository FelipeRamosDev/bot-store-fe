import { Stack } from '@mui/material';
import FormInput from '@/components/forms/formBase/FormInput';

/**
 * `SlotLimitsSet` component renders a set of form inputs for configuring limits.
 * It displays inputs for money, percentage, and custom resume day time based on
 * the specified type. The inputs are arranged in a row with spacing.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.type - The type of limits being configured, which determines 
 *                               the specific form fields to display.
 * @returns {JSX.Element} - The rendered set of form inputs for the specified limit type.
 * @throws {Error} - Throws an error if the "type" prop is not provided.
 */
export default function SlotLimitsSet({ type }) {
   if (!type) {
      throw new Error('The "type" param is required!');
   }

   return (
      <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
         <FormInput path={`limits.${type}.money`} />
         <FormInput path={`limits.${type}.percent`} />
         <FormInput path={`limits.${type}.customResumeDayTime`} />
      </Stack>
   );
}
