import Form from '@/models/Form';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';
import SearchSelectFieldSchema from '@/models/Form/fieldTypes/SearchSelectFieldSchema';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import CryptoListItem from '../createSlotForm/CryptoListItem';

const createBotForm = new Form({
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
      new TextFieldSchema({
         key: 'name',
         label: 'Bot Name',
         required: true
      }),
      new TextFieldSchema({
         key: 'description',
         label: 'Summary'
      }),
      new CheckButtonGroupSchema({
         key: 'allowedIntervals',
         label: 'Allowed Intervals',
         multiValue: true,
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
            { label: '1w', value: '1w' }
         ]
      }),
      new SearchSelectFieldSchema({
         key: 'allowedSymbols',
         label: 'Allowed Symbols',
         placeholder: 'Choose...',
         required: true,
         useDependencies: true,
         multiOptions: true,
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
         }
      }),
   ]
});

export default createBotForm;
