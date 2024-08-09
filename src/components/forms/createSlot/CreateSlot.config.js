import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import slotLimitsForm from './slotLimitsForm/SlotLimitsForm.config';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';

const createSlotForm = new Form({
   dependencies: [
      {
         id: 'symbolsData',
         queryType: 'endpoint',
         httpRequest: {
            method: 'GET',
            endpoint: '/exchange/get-assets'
         }
      }
   ],
   schema: [
      new RadioGroupSchema({
         key: 'type',
         label: 'Slot Type',
         required: true,
         options: [
            { value: 'slot-live', label: 'LIVE' },
            { value: 'slot-demo', label: 'DEMO' },
         ]
      }),
      new TextFieldSchema({
         key: 'name',
         label: 'Slot Name',
         placeholder: 'Slot name identification',
      }),
      new SelectFieldSchema({
         key: 'bot',
         label: 'Choose a bot',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         options: function (form) {
            const dependency = form.getDependency('bots');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(doc => ({
                  label: doc.name,
                  value: doc._id
               }));
            } else {
               return [];
            }
         }
      }),
      new SelectFieldSchema({
         key: 'assets',
         label: 'Crypto Symbol',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         options: function (form) {
            const dependency = form.getDependency('symbolsData');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(item => ({
                  label: item.symbol,
                  value: item.symbol
               }));
            } else {
               return [];
            }
         }
      }),
      new CheckButtonGroupSchema({
         key: 'interval',
         required: true,
         label: 'Chart Interval',
         options: [
            { label: '1min', value: '1m' },
            { label: '3min', value: '3m' },
            { label: '5min', value: '5m' },
            { label: '15min', value: '15m' },
            { label: '30min', value: '30m' },
            { label: '1h', value: '1h' },
            { label: '2h', value: '2h' },
            { label: '4h', value: '4h' },
            { label: '8h', value: '8h' },
            { label: '12h', value: '12h' },
            { label: '1d', value: '1d' },
            { label: '1w', value: '1w' },
         ]
      }),
      new ObjectFieldSchema({
         key: 'limits',
         subForm: slotLimitsForm
      })
   ]
});

export default createSlotForm;
