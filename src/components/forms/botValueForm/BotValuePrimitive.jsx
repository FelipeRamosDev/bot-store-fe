import FormInput from '../formBase/FormInput';

/**
 * A form component for inputting primitive bot values.
 * 
 * This component renders two form inputs: one for the type of the primitive value
 * and one for the value itself. It uses the `FormInput` component to manage these inputs.
 * 
 * @returns {JSX.Element} The rendered form component.
 */
export default function BotValueFormPrimitive({}) {
   return (<>
      <FormInput path="primitiveType" />
      <FormInput path="primitiveValue" />
   </>);
}

