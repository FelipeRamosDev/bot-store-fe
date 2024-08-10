import Form from '@/models/Form';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';
import TextFieldSchema from '@/models/Form/fieldTypes/TextFieldSchema';
import config from '@/config.json';

const createScheduleForm = new Form({
   formID: 'create-schedule',
   schema: [
      new CheckButtonGroupSchema({
         key: 'weekdays',
         required: true,
         multiValue: true,
         defaultValue: config.dateTime.weekdays,
         options: config.dateTime.weekdays.map(day => ({ label: day, value: day }))
      }),
      new TextFieldSchema({
         key: 'startTime',
         label: 'Start Time',
         required: true
      }),
      new TextFieldSchema({
         key: 'endTime',
         label: 'End Time',
         required: true
      })
   ]
});

export default createScheduleForm;
