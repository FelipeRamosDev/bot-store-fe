import Form from '@/models/Form';
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';

const fixPositionForm = new Form({
   schema: [
      new NumberFieldSchema({
         key: 'openOrderId',
         label: 'Open Order ID'
      }),
      new NumberFieldSchema({
         key: 'closeOrderId',
         label: 'Close Order ID',
      }),
   ]
});

export default fixPositionForm;
