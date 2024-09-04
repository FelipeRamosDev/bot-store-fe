'use client';
import { useContext, useRef, useState } from 'react';
import FormBaseContext from '@/components/forms/formBase/FormBase';

/**
 * `FormInput` component for rendering form inputs with validation and state management.
 *
 * This component uses context from `FormBaseContext` to manage form state and validation.
 * It dynamically renders an input component based on the schema provided by the form context.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.path - The path to the form field in the form schema.
 * @param {string} [props.className] - Optional CSS class name to apply to the input.
 * @param {boolean} [props.disabled] - Boolean to disable the input.
 * @param {any} [props.defaultValue] - Default value for the input.
 * @param {Function} [props.onChange] - Optional callback function to handle input changes.
 *
 * @returns {JSX.Element} - Rendered input component based on the schema, or an empty fragment if no schema is found.
 */
export default function FormInput({ path, onCustomChange = () => {}, ...props }) {
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

      onCustomChange(value);
      schema.onInput.call(form, value, schema);
   }

   if (!fixDefaultValue.current) {
      fixDefaultValue.current = form.getValue(path) || '';
   }

   if (schema.Input) {
      return <schema.Input
         className="form-input"
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
