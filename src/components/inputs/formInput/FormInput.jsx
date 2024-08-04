import TextInput from '@/components/inputs/textInput/TextInput';

export default function FormInput({ form, path, errors = {}, ...props }) {
   if (!form) {
      return <></>;
   }

   const schema = form.getSchema(path);
   if (!schema) {
      return <></>;
   }

   const handleInput = (ev) => {
      const value = ev?.target?.value;
      form.setValue(path, value);

      const validadedErrors = form.getFieldErrors();
      const errorStr = JSON.stringify(errors);
      if (errorStr !== JSON.stringify(validadedErrors)) {
         form.setErrors(validadedErrors);
      }
   }

   return <TextInput
      type={schema.inputType}
      label={schema.label}
      placeholder={schema.placeholder}
      onChange={handleInput}
      errors={errors[path]}
      defaultValue={form.getValue(path) || ''}
      {...props}
   />
}
