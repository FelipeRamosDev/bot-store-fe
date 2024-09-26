import './FormBase.scss';
import { createContext, useEffect, useState, useContext } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import AlertModal from '@/components/modals/base/alertModal/AlertModal';
import { parseValidationErrorMsg } from '@/helpers/format';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';
import AuthUserContext from '@/contexts/AuthUser';

const FormBaseContext = createContext();
export default FormBaseContext;

/**
 * `FormBase` component provides a base structure for creating and managing forms with validation,
 * submission handling, and loading states. It uses context to manage form state and errors.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.formSet - The form configuration object containing schema and methods.
 * @param {string} [props.formID=''] - Optional ID for the form element.
 * @param {string} [props.className=''] - Optional CSS class name for the form container.
 * @param {string} [props.submitLabel='Send'] - Label for the submit button.
 * @param {boolean} [props.appendUserToBody=false] - Flag to append user ID to the form data.
 * @param {Function} [props.onSubmit=async () => {}] - Function to call on form submission.
 * @param {Function} [props.onReady=async () => {}] - Function to call when the form is ready to use.
 * @param {boolean} [props.clearPrevent=false] - Prevent the form to be cleared on initialization.
 * @param {Boolean} [props.hideSubmit] - If true, the submit button will not be displayed.
 * @param {Object} [props.editData] - Data to populate the form for editing.
 * @param {ReactNode} props.children - Child components or form fields to be rendered inside the form.
 *
 * @returns {JSX.Element} - The rendered form with context provider and handling for loading and alert states.
 */
export function FormBase({
   anchorRef,
   formSet,
   formID = '',
   className = '',
   submitLabel = 'Send',
   appendUserToBody = false,
   onSubmit = async () => {},
   onReady = () => {},
   hideSubmit = false,
   clearPrevent = false,
   editData,
   children,
   ...props
}) {
   const [ loading, setLoading ] = useState(false);
   const [ errors, setErrors ] = useState({});
   const [ alertDialog, setAlertDialog ] = useState();
   const [ form, setForm ] = useState();
   const auth = useContext(AuthUserContext);

   // Append user ID to form data if needed
   if (auth?.user?._id && appendUserToBody) {
      formSet.setUser(auth.user._id);
   }

   useEffect(() => {
      const stringOldSchema = JSON.stringify(formSet?._schema?.keys().toArray());
      const stringNewSchema = JSON.stringify(form?._schema.keys().toArray());

      // Initialize the Form instance
      if (!form || stringOldSchema !== stringNewSchema) {
         formSet.formSetter(setForm);
         formSet.errorSetter(setErrors);

         if (editData && Object.keys(editData).length) {
            formSet.setEditData(editData);
         } else if (!clearPrevent) {
            formSet.clearAll();
         }

         formSet.fetchDependencies().then(({ success }) => {
            if (!success) return;

            setForm(formSet);
         }).catch(err => {
            throw err;
         });
      }
   }, [ form, formSet, editData ]);

   useEffect(() => {
      if (form) {
         setTimeout(() => onReady(), 0);
      }
   }, [ form, onReady ]);

   /**
    * Handle form submission, including validation and error handling.
    * @param {Event} ev - The submit event.
    */
   const handleSubmit = async (ev) => {
      ev.preventDefault();

      const validated = form.validateForm();
      if (validated.hasError) {
         setErrors(validated.errors);
         return;
      }

      try {
         setLoading(true);

         const submitValidation = await onSubmit.call(form, form.toObject());
         if (submitValidation?.hasError) {
            return;
         }

         return form?.clearAll();
      } catch (error) {
         const serverValidationErrors = parseValidationErrorMsg(error);

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
      {form && <form ref={anchorRef} className={`${formID} form-base ${className}`} onSubmit={handleSubmit} {...props}>
         {children}

         {!hideSubmit && <div className="buttons">
            <LoadingButton
               type="submit"
               variant="contained"
               color="tertiary"
               loading={loading}
            >{submitLabel}</LoadingButton>
         </div>}
      </form>}
   </FormBaseContext.Provider>;
}
