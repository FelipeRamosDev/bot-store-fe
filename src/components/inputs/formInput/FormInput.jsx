'use client';
import { useContext } from 'react';
import TextInput from '@/components/inputs/textInput/TextInput';
import FormBaseContext from '@/components/forms/formBase/FormBase';

export default function FormInput({ path, ...props }) {
   const { form, errors, loading } = useContext(FormBaseContext);

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
      disabled={loading}
      {...props}
   />
}
