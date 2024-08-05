'use client';
import { useContext, useRef } from 'react';
import TextInput from '@/components/inputs/textInput/TextInput';
import FormBaseContext from '@/components/forms/formBase/FormBase';
import RadioGroupInput from '@/components/inputs/radioGroupInput/RadioGroupInput';

export default function FormInput({ path, ...props }) {
   const { form, errors, loading } = useContext(FormBaseContext);
   const fixDefaultValue = useRef();

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

   if (!fixDefaultValue.current) {
      fixDefaultValue.current = form.getValue(path) || '';
   }

   switch (schema.inputType) {
      case 'text':
      case 'number':
         return <TextInput
            type={schema.inputType}
            label={schema.label}
            placeholder={schema.placeholder}
            onChange={handleInput}
            errors={errors[path]}
            defaultValue={fixDefaultValue.current}
            disabled={loading}
            {...props}
         />

      case 'radio-group':
         return <RadioGroupInput
            options={schema.options}
            label={schema.label}
            placeholder={schema.placeholder}
            onChange={handleInput}
            errors={errors[path]}
            defaultValue={fixDefaultValue.current}
            disabled={loading}
            {...props}
         />
   }
}
