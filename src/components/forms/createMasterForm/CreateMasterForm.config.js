import Form from '@/models/Form';

import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import MasterLimitsFormConfig from './masterLimitsForm/MasterLimitsForm.config';

const createMasterForm = new Form({
   schema: [
      new RadioGroupSchema({
         key: 'type',
         required: true,
         label: 'Account Type',
         defaultValue: 'master-live',
         options: [
            { label: 'LIVE', value: 'master-live' },
            { label: 'DEMO', value: 'master-demo' }
         ]
      }),
      new TextFieldSchema({
         key: 'name',
         required: true,
         label: 'Account Name',
         placeholder: 'Enter a name...'
      }),
      new TextFieldSchema({
         key: 'description',
         label: 'Description',
         placeholder: 'Enter a description for the account...'
      }),
      new ObjectFieldSchema({
         key: 'limits',
         subForm: MasterLimitsFormConfig
      })
   ]
});

export default createMasterForm;
