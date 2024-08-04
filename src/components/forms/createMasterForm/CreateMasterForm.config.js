import MasterLimitsFormConfig from "./masterLimitsForm/MasterLimitsForm.config";
import Form from '@/models/Form';

export default new Form({
   schema: [
      {
         key: 'name',
         type: String,
         required: true,
         label: 'Account Name',
         placeholder: 'Enter a name...'
      },
      {
         key: 'description',
         type: String,
         label: 'Description',
         placeholder: 'Enter a description for the account...'
      },
      {
         key: 'limits',
         type: Object,
         subForm: MasterLimitsFormConfig
      }
   ]
});
