import Form from '@/models/Form';
import CheckButtonGroupSchema from '@/models/Form/fieldTypes/CheckButtonGroupSchema';
import config from '@/config.json';
import TimeFieldSchema from '@/models/Form/fieldTypes/TimeFieldSchema';

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
      new TimeFieldSchema({
         key: 'startTime',
         label: 'Start Time',
         required: true
      }),
      new TimeFieldSchema({
         key: 'endTime',
         label: 'End Time',
         required: true
      })
   ]
});

export default createScheduleForm;
