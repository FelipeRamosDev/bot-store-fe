import Form from '@/models/Form';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import RadioGroupSchema from '@/models/Form/fieldTypes/RadioGroupSchema';
import SelectFieldSchema from '@/models/Form/fieldTypes/SelectFieldSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import slotLimitsForm from './slotLimitsForm/SlotLimitsForm.config';
import slotTrailingForm from '../shared/AccountTrailingStop/AccountTrailingForm.config';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';
import SearchSelectFieldSchema from '@/models/Form/fieldTypes/SearchSelectFieldSchema';
import CryptoListItem from './CryptoListItem';
import PilotListItem from './PilotListItem';

const createSlotForm = new Form({
   dependencies: [
      {
         id: 'symbolsData',
         queryType: 'endpoint',
         httpRequest: {
            method: 'GET',
            endpoint: '/exchange/get-symbol-ticks'
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
      new SearchSelectFieldSchema({
         key: 'bot',
         label: 'Choose a bot',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         ListItem: PilotListItem,
         options: function (form) {
            const dependency = form.getDependency('bots');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(doc => ({
                  ...doc,
                  label: doc.name,
                  value: doc._id
               }));
            } else {
               return [];
            }
         }
      }),
      new SearchSelectFieldSchema({
         key: 'assets',
         label: 'Crypto Symbol',
         placeholder: 'Pick an option',
         required: true,
         useDependencies: true,
         ListItem: CryptoListItem,
         options: function (form) {
            const dependency = form.getDependency('symbolsData');

            if (dependency && Array.isArray(dependency.data)) {
               return dependency.data.map(item => ({
                  ...item,
                  label: item.symbol,
                  value: item.symbol
               }));
            } else {
               return [];
            }
         },
         onInput: function (value, schema) {
            const assets = this.getDependency('symbolsData');
            const assetsData = assets?.data;
            const currAssetData = assetsData.find(item => item.symbol === value);
            const leverageSchema = this.getSchema('limits.leverage');

            if (currAssetData && leverageSchema) {
               if (currAssetData.maxLeverage !== leverageSchema.max) {
                  leverageSchema.dispatch(prev => {
                     prev.max = currAssetData.maxLeverage;
                     return prev;
                  });
               }
            }
         },
         parseInput: function (value) {
            const currentName = this.form.getValue('name');

            if (!currentName && value) {
               const name = value.replace(/USDT|USDC/g, '');
               this.form.setValue('name', name);
            }

            return [ value ];
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
      }),
      new ObjectFieldSchema({
         key: 'trailingStop',
         subForm: slotTrailingForm
      })
   ]
});

export default createSlotForm;
