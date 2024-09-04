import FormInput from '../formBase/FormInput';

export default function BotValueFormFunction({ onCustomChange }) {
   return (<>
      <FormInput path="functionUID" onCustomChange={onCustomChange} />
   </>);
}
