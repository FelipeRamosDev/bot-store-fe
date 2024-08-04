import MasterLimitConfigForm from './masterLimitSet/MasterLimitSet.config';

export default {
   schema: [
      { key: 'leverage', type: Number, defaultValue: 120, label: 'Max. Leverage Allowed' },
      { key: 'tradesMinInterval', type: Number, defaultValue: 1, min: 1, max: 1440, label: 'Min. interval between trades' },
      { key: 'marginRatioCommit', type: Number, defaultValue: 20, min: 1, max: 85, label: 'Margin Ratio' },
      {
         key: 'monthlyLoss', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Loss Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Loss Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
      {
         key: 'dailyLoss', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Loss Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Loss Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
      {
         key: 'tradeLoss', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Loss Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Loss Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
      {
         key: 'monthlyGain', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Gain Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Gain Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
      {
         key: 'dailyGain', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Gain Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Gain Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
      {
         key: 'tradeGain', type: Object, subForm: {
            schema: [
               {
                  key: 'money',
                  type: Number,
                  label: 'Gain Amount',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'percent',
                  type: Number,
                  label: 'Gain Percent',
                  placeholder: 'Enter a value...',
                  defaultValue: 0
               },
               {
                  key: 'customResumeDayTime',
                  type: String,
                  label: 'Time of day to return',
                  placeholder: 'Enter a time...',
                  defaultValue: '09:30:00'
               },
            ]
         }
      },
   ]
}
