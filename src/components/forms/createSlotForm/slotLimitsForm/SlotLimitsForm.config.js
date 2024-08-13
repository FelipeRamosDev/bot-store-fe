import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import SliderFieldSchema from '@/models/Form/fieldTypes/SliderFieldSchema';

const slotLimitsForm = {
   schema: [
      new SliderFieldSchema({ key: 'leverage', defaultValue: 0, min: 1, max: 125, label: 'Max. Leverage Allowed' }),
      new NumberFieldSchema({ key: 'tradesMinInterval', defaultValue: 0, min: 0, max: 1440, label: 'Min. interval between trades' }),
      new NumberFieldSchema({ key: 'marginRatioCommit', defaultValue: 0, min: 0, max: 85, label: 'Margin Ratio' }),
      new ObjectFieldSchema({
         key: 'tradeLoss',
         subForm: {
            schema: [
               new NumberFieldSchema({
                  key: 'money',
                  label: 'Loss (USD)',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               }),
               new NumberFieldSchema({
                  key: 'percent',
                  label: 'Loss (%)',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               }),
               new TextFieldSchema({
                  key: 'customResumeDayTime',
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...'
               }),
            ]
         }
      }),
      new ObjectFieldSchema({
         key: 'tradeGain',
         subForm: {
            schema: [
               new NumberFieldSchema({
                  key: 'money',
                  label: 'Gain (USD)',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               }),
               new NumberFieldSchema({
                  key: 'percent',
                  label: 'Gain (%)',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               }),
               new TextFieldSchema({
                  key: 'customResumeDayTime',
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...'
               }),
            ]
         }
      })
   ]
};

export default slotLimitsForm;
