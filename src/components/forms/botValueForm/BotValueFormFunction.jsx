import FormInput from '../formBase/FormInput';

/**
 * A form component for inputting function bot values.
 * 
 * This component renders a single form input for the function UID. It uses the `FormInput` 
 * component to manage this input and allows for custom change handling via the `onCustomChange` prop.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onCustomChange - A custom function to handle changes to the form input.
 * 
 * @returns {JSX.Element} The rendered form component.
 */
export default function BotValueFormFunction({ onCustomChange }) {
   return <FormInput path="functionUID" onCustomChange={onCustomChange} />;
}
