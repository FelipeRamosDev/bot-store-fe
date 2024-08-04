import { useEffect, useRef, useState } from 'react';
import LoadingButton from '@/components/buttons/spinnerButton/SpinnerButton';
import Form from '@/models/Form';
import TextInput from '@/components/inputs/textInput/TextInput';
import createMasterForm from './CreateMasterForm.config';
import AlertModal from '@/components/modals/alertModal/AlertModal';
import { Stack } from '@mui/material';
import Card from '@/components/common/card/Card';

export default function CreateMasterForm({ className = '', onSubmit = () => {}, ...props }) {
   const [ loading, setLoading ] = useState();
   const [ errors, setErrors ] = useState();
   const [ alertDialog, setAlertDialog ] = useState();
   const form = useRef();

   useEffect(() => {
      // Declaring the Form instance
      if (!form.current) {
         form.current = new Form({
            ...createMasterForm,
            onChange: function () {
               setErrors(this.getFieldErrors());
            }
         });
      }
   }, []);

   const handleInput = (ev, key) => {
      const value = ev?.target?.value;
      form.current.setValue(key, value);
   }

   const handleSubmit = async (ev) => {
      ev.preventDefault();

      const validated = form.current.validateForm();
      if (validated.hasError) {
         setErrors(validated.errors);
         return;
      }

      try {
         setLoading(true);
         return await onSubmit(form.current);
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
               <TextInput
                  label="Account Name"
                  placeholder="Enter a name..."
                  onChange={(ev) => handleInput(ev, 'name')}
                  errors={errors?.name}
               />

               <TextInput
                  label="Description"
                  placeholder="You can describe the account..."
                  onChange={(ev) => handleInput(ev, 'description')}
                  errors={errors?.description}
                  multiline={true}
               />
            </Stack>

            <Stack flexDirection="row" flex={1}>
               <Card padding="xs" elevation={10}>
                  <h4 className="card-title">Configurations</h4>

                  <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                     <TextInput
                        label="Trade Amount"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'money')}
                     />
                     <TextInput
                        label="Trade Percent"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'percent')}
                     />
                  </Stack>

                  <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                     <TextInput
                        label="Daily Amount"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'money')}
                     />
                     <TextInput
                        label="Daily Percent"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'percent')}
                     />
                  </Stack>

                  <Stack flexDirection="row" gap="1rem" marginBottom="1rem">
                     <TextInput
                        label="Monthly Amount"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'money')}
                     />
                     <TextInput
                        label="Monthly Percent"
                        placeholder=""
                        onChange={(ev) => handleInput(ev, 'percent')}
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
