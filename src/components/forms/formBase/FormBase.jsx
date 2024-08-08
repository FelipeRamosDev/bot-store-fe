import { createContext, useEffect, useState } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import AlertModal from '@/components/modals/alertModal/AlertModal';
import { parseValidationErrorMsg } from '@/helpers/format';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';

const FormBaseContext = createContext();
export default FormBaseContext;

export function FormBase({
   formSet,
   formID = '',
   className = '',
   submitLabel = 'Send',
   onSubmit = async () => {},
   children,
   ...props
}) {
   const [ loading, setLoading ] = useState(false);
   const [ errors, setErrors ] = useState({});
   const [ alertDialog, setAlertDialog ] = useState();
   const [ form, setForm ] = useState();

   useEffect(() => {
      // Starting the Form instance
      if (!form) {
         formSet.errorSetter(setErrors);

         formSet.fetchDependencies().then(({ success }) => {
            if (!success) return;

            setForm(formSet);
         }).catch(err => {
            throw err;
         });
      }
   }, []);

   const handleSubmit = async (ev) => {
      ev.preventDefault();

      const validated = form.validateForm();
      if (validated.hasError) {
         setErrors(validated.errors);
         return;
      }

      try {
         setLoading(true);

         return await onSubmit.call(form, form.toObject());
      } catch (error) {
         const serverValidationErrors = parseValidationErrorMsg(error?.message);

         if (serverValidationErrors) {
            setAlertDialog({ error, message: serverValidationErrors });
         } else {
            setAlertDialog(error);
         }
      } finally {
         setLoading(false);
      }
   }

   return <FormBaseContext.Provider value={{ form, errors, loading }}>
      <AlertModal
         open={alertDialog}
         handleOk={() => setAlertDialog(false)}
         title="Error"
      >
         <p>{alertDialog?.message}</p>
      </AlertModal>

      {!form && <FitSpinner spinner={'Loading Dependencies'} noBackground={true} />}

      {form && <form className={`${formID} form-base ${className}`} {...props} onSubmit={handleSubmit}>
         {children}

         <div className="buttons">
            <LoadingButton
               type="submit"
               variant="contained"
               color="tertiary"
               loading={loading}
            >{submitLabel}</LoadingButton>
         </div>
      </form>}
   </FormBaseContext.Provider>;
}
