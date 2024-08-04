import { useEffect, useRef, useState } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import Form from '@/models/Form';
import TextInput from '@/components/inputs/textInput/TextInput';
import createMasterForm from './CreateMasterForm.config';
import AlertModal from '@/components/modals/alertModal/AlertModal';
import { Stack } from '@mui/material';
import Card from '@/components/common/card/Card';
import FormInput from '@/components/inputs/formInput/FormInput';

export default function CreateMasterForm({ className = '', onSubmit = () => {}, ...props }) {
   const [ loading, setLoading ] = useState();
   const [ errors, setErrors ] = useState();
   const [ alertDialog, setAlertDialog ] = useState();
   const [ form, setForm ] = useState();

   useEffect(() => {
      // Declaring the Form instance
      if (!form) {
         createMasterForm.errorSetter(setErrors);
         setForm(createMasterForm);

         window.form = form;
      }
   }, []);

   const handleInput = (ev, key) => {
      const value = ev?.target?.value;
      form.setValue(key, value);
   }

   const handleSubmit = async (ev) => {
      ev.preventDefault();

      const validated = form.validateForm();
      if (validated.hasError) {
         setErrors(validated.errors);
         return;
      }

      try {
         setLoading(true);
         return await onSubmit(form);
      } catch (error) {
         setAlertDialog(error);
      } finally {
         setLoading(false);
      }
   }

   return (<>
      <AlertModal
         open={alertDialog} handleOk={() => setAlertDialog(false)}
         title="Error"
      >
         <p>{alertDialog?.message}</p>
      </AlertModal>

      <form className={`create-master-form ${className}`} {...props} onSubmit={handleSubmit}>
         <Stack flexDirection="row" justifyContent="space-between" gap="1.5rem" marginBottom="2rem">
            <Stack flexDirection="column" flex={1} gap="1rem">
               <FormInput
                  path="name"
                  form={form}
                  errors={errors}
               />

               <FormInput
                  path="description"
                  form={form}
                  errors={errors}
                  multiline={true}
               />
            </Stack>

            <Stack flexDirection="row" flex={1}>
               <Card padding="xs" elevation={10}>
                  <h4 className="card-title">Configurations</h4>

                  <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                     <FormInput
                        path="limits.tradeLoss.money"
                        form={form}
                        errors={errors}
                     />

                     <FormInput
                        path="limits.tradeLoss.percent"
                        form={form}
                        errors={errors}
                     />
                  </Stack>

                  <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                     <FormInput
                        path="limits.dailyLoss.money"
                        form={form}
                        errors={errors}
                     />

                     <FormInput
                        path="limits.dailyLoss.percent"
                        form={form}
                        errors={errors}
                     />
                  </Stack>
               </Card>
            </Stack>
         </Stack>

         <div className="buttons">
            <LoadingButton
               type="submit"
               variant="contained"
               color="secondary"
               loading={loading}
            >Create</LoadingButton>
         </div>
      </form>
   </>);
}
