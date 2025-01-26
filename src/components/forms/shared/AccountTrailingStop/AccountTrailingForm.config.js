import SliderFieldSchema from '@/models/Form/fieldTypes/SliderFieldSchema';
import SwitchFieldSchema from '@/models/Form/fieldTypes/SwitchFieldSchema';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';

const slotTrailingForm = {
   schema: [
      new SwitchFieldSchema({
         key: 'useTrailingStop',
         defaultValue: false,
         label: 'Trailing Stop'
      }),
      new SwitchFieldSchema({
         key: 'useMasterDefaults',
         defaultValue: true,
         label: `Use trailing stop master's defaults`
      }),
      new SwitchFieldSchema({
         key: 'autoCallback',
         defaultValue: true,
         label: 'Auto callback ratio (Recommended)'
      }),
      new SliderFieldSchema({
         key: 'callbackStopGapPercent',
         defaultValue: 100,
         min: 1,
         max: 100,
         label: 'Stop Gap Unit (%)'
      }),
      new SliderFieldSchema({
         key: 'callbackRatio',
         defaultValue: 0,
         min: 0,
         max: 10,
         label: 'Callback Ratio (%)'
      }),
      new CheckButtonGroupSchema({
         key: 'callbackUnit',
         options: [
            { label: 'Stop Gap', value: 'stop-gap' },
            { label: 'Asset\'s Percent', value: 'asset-percent' },
         ]
      })
   ]
};

export default slotTrailingForm;
