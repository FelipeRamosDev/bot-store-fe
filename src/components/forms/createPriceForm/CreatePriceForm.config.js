import Form from '@/models/Form';
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';

const createPriceForm = new Form({
   formID: 'create-price',
   schema: [
      new TextFieldSchema({
         key: 'name',
         label: 'Price Name',
         required: true
      }),
      new TextFieldSchema({
         key: 'features',
         label: 'Features',
         inputMode: 'textarea',
      }),
      new TextFieldSchema({
         key: 'priceId',
         label: 'Price ID',
         required: true
      }),
      new SelectFieldSchema({
         key: 'type',
         label: 'Price Type',
         required: true,
         options: [
            { label: 'Flat Rate', value: 'flat-rate' }
         ]
      }),
      new NumberFieldSchema({
         key: 'price',
         label: 'Price',
         required: true
      }),
      new SelectFieldSchema({
         key: 'interval',
         label: 'Billing Interval',
         required: true,
         options: [
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Yearly', value: 'Yearly' },
         ]
      }),
      new SelectFieldSchema({
         key: 'currency',
         label: 'Currency',
         required: true,
         options: [
            { label: 'USD', value: 'USD' },
            { label: 'BRL', value: 'BRL' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'JPY', value: 'JPY' },
            { label: 'AUD', value: 'AUD' },
            { label: 'CAD', value: 'CAD' },
            { label: 'CHF', value: 'CHF' },
            { label: 'CNY', value: 'CNY' },
            { label: 'SEK', value: 'SEK' },
            { label: 'NZD', value: 'NZD' },
         ]
      }),
   ]
});

export default createPriceForm;
