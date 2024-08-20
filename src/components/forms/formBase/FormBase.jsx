import './FormBase.scss';
import { createContext, useEffect, useState, useContext } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import AlertModal from '@/components/modals/base/alertModal/AlertModal';
import { parseValidationErrorMsg } from '@/helpers/format';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';
import AuthUserContext from '@/contexts/AuthUser';

const FormBaseContext = createContext();
export default FormBaseContext;

export function FormBase({
   formSet,
   formID = '',
   className = '',
   submitLabel = 'Send',
   appendUserToBody = false,
   onSubmit = async () => {},
   editData,
   children,
   ...props
}) {
   const [ loading, setLoading ] = useState(false);
   const [ errors, setErrors ] = useState({});
   const [ alertDialog, setAlertDialog ] = useState();
   const [ form, setForm ] = useState();
   const auth = useContext(AuthUserContext);

   if (auth?.user?._id && appendUserToBody) {
      formSet.setUser(auth.user._id);
   }

   useEffect(() => {
      // Starting the Form instance
      if (!form) {
         formSet.formSetter(setForm);
         formSet.errorSetter(setErrors);

         if (editData && Object.keys(editData).length) {
            formSet.setEditData(editData);
         }

         formSet.fetchDependencies().then(({ success }) => {
            if (!success) return;

            setForm(formSet);
         }).catch(err => {
            throw err;
         });
      }
   }, [ form, formSet ]);

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

      {form && <form className={`${formID} form-base ${className}`} onSubmit={handleSubmit} {...props}>
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
