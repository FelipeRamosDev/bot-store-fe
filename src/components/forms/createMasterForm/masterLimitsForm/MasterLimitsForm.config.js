import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import NumberFieldSchema from '@/models/Form/fieldTypes/NumberFieldSchema';
import ObjectFieldSchema from '@/models/Form/fieldTypes/ObjectFieldSchema';
import SliderFieldSchema from '@/models/Form/fieldTypes/SliderFieldSchema';

const masterLimitsForm = {
   schema: [
      new SliderFieldSchema({ key: 'tradesMinInterval', defaultValue: 1, min: 1, max: 1440, label: 'Min. interval between trades' }),
      new SliderFieldSchema({ key: 'marginRatioCommit', defaultValue: 25, min: 1, max: 85, label: 'Margin Ratio' }),
      new ObjectFieldSchema({
         key: 'monthlyLoss',
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
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               }),
            ]
         }
      }),
      new ObjectFieldSchema({
         key: 'dailyLoss',
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
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               }),
            ]
         }
      }),
      new ObjectFieldSchema({
         key: 'tradeLoss',
         subForm: {
            schema: [
               new NumberFieldSchema({
                  key: 'money',
                  label: 'Loss (USD)',
                  placeholder: 'Enter a value...',
                  required: true,
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
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               }),
            ]
         }
      }),
      new ObjectFieldSchema({
         key: 'monthlyGain',
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
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               }),
            ]
         }
      }),
      new ObjectFieldSchema({
         key: 'dailyGain',
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
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
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
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               }),
            ]
         }
      })
   ]
};

export default masterLimitsForm;
