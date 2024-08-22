'use client';
import { useContext, useRef, useState } from 'react';
import FormBaseContext from '@/components/forms/formBase/FormBase';

export default function FormInput({ path, ...props }) {
   const { form, errors, loading } = useContext(FormBaseContext);
   const [ schemaState, setSchema ] = useState();
   const fixDefaultValue = useRef();

   if (!form) {
      return <></>;
   }

   const schema = form.getSchema(path);
   if (!schema) {
      return <></>;
   }

   if (!schemaState) {
      schema.appendDispatch(setSchema);
      setSchema(schema);
   }

   const handleInput = (ev) => {
      const value = ev?.target?.value;
      form.setValue(path, value);

      if (!form.editMode) {
         const validadedErrors = form.getFieldErrors();
         const errorStr = JSON.stringify(errors);
   
         if (errorStr !== JSON.stringify(validadedErrors)) {
            form.setErrors(validadedErrors);
         }
      }

      schema.onInput.call(form, value, schema);
   }

   if (!fixDefaultValue.current) {
      fixDefaultValue.current = form.getValue(path) || '';
   }

   if (schema.Input) {
      return <schema.Input
         schema={schemaState}
         onChange={handleInput}
         errors={errors[path]}
         defaultValue={fixDefaultValue.current}
         disabled={loading}
         {...props}
      />;
   }

   return <></>;
}
