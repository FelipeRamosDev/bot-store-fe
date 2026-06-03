import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

const createPlanForm = new Form({
   formID: 'create-plan',
   schema: [
      new TextFieldSchema({
         key: 'name',
         label: 'Plan Name',
         required: true
      }),
      new TextFieldSchema({
         key: 'productId',
         label: 'Product ID',
         required: true
      }),
      new TextFieldSchema({
         key: 'summary',
         label: 'Summary',
         required: false,
         multiline: true
      }),
      new TextFieldSchema({
         key: 'features',
         label: 'Features',
         multiline: true
      }),
   ]
});

export default createPlanForm;
