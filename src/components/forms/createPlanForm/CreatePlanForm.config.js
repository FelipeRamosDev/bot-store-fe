import Form from '@/models/Form';
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';
import SwitchFieldSchema from '@/models/Form/fieldTypes/SwitchFieldSchema';
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
      new SwitchFieldSchema({
         key: 'isAiUsage',
         label: 'AI Usage Plan',
         defaultValue: false
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
      new NumberFieldSchema({
         key: 'walletLimit',
         label: 'Wallet Limit',
         required: true
      }),
      new NumberFieldSchema({
         key: 'slotLimit',
         label: 'Slot Limit',
         required: true
      }),
      new NumberFieldSchema({
         key: 'walletLimitDemo',
         label: 'Wallet Limit (Demo)',
         required: true
      }),
      new NumberFieldSchema({
         key: 'slotLimitDemo',
         label: 'Slot Limit (Demo)',
         required: true
      }),
   ]
});

export default createPlanForm;
