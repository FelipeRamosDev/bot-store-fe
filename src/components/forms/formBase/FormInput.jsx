'use client';
import { useContext, useRef } from 'react';
import FormBaseContext from '@/components/forms/formBase/FormBase';

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

   if (schema.Input) {
      return <schema.Input
         schema={schema}
         onChange={handleInput}
         errors={errors[path]}
         defaultValue={fixDefaultValue.current}
         disabled={loading}
         {...props}
      />;
   }

   return <></>;
}
