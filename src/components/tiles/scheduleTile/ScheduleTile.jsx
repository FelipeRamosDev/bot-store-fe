import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import './ScheduleTile.scss';
import config from '@/config.json';
import CloseIcon from '@mui/icons-material/Close';

export default function ScheduleTile({ editMode = false, schedule = {} }) {
   return <>
      <div className="schedule-tile">
         <div className="weekdays">
            {config.dateTime.weekdays.map(item => {
               const contain = schedule.weekdays.find(day => day === item);

               if (!schedule.weekdays || !Array.isArray(schedule.weekdays)) {
                  return;
               }

               return <span className={`day ${!contain ? 'disabled' : ''}`}>{item}</span>;
            })}
         </div>

         <div className="start-end-time">
            <div className="time start">
               <label>Start Time</label>
               <p>{schedule.startTime}</p>
            </div>
            <div className="time end">
               <label>End Time</label>
               <p>{schedule.endTime}</p>
            </div>
         </div>
      </div>

      {editMode && <div className="button-wrap">
         <RoundIconButton className="delete-schedule" Icon={CloseIcon} size="small" />
      </div>}
   </>
}
