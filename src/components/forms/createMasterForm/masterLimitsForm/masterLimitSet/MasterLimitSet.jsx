import { Stack } from '@mui/material';
import FormInput from '@/components/forms/formBase/FormInput';

/**
 * `MasterLimitsSet` component for displaying a set of input fields related to limits.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.type - The type of limits to display (e.g., 'daily', 'monthly').
 *
 * @throws {Error} Throws an error if the `type` parameter is not provided.
 *
 * @returns {JSX.Element} - Rendered component with input fields for limits.
 */
export default function MasterLimitsSet({ type }) {
   // Ensure the `type` prop is provided
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
