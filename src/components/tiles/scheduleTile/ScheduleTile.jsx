import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import './ScheduleTile.scss';
import config from '@/config.json';
import CloseIcon from '@mui/icons-material/Close';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';
import PrettyDate from '@/components/displays/prettyDate/PrettyDate';

/**
 * A component that displays information about a schedule, with options for editing or deleting the schedule.
 * 
 * This component renders schedule details based on its type, such as runtime or goals, and provides an option to delete the schedule if in edit mode.
 * 
 * @param {Object} props - The props for the component.
 * @param {boolean} [props.editMode=false] - A flag to indicate if the component is in edit mode, showing the delete button if true.
 * @param {Object} [props.schedule={}] - The schedule data to display, including details like weekdays, start time, end time, and goal type.
 * @param {Function} [props.setView=() => {}] - A function to update the view state, typically used to switch between display modes.
 * 
 * @returns {React.Element} The rendered ScheduleTile component displaying schedule information and an optional delete button.
 */
export default function ScheduleTile({ editMode = false, schedule = {}, setView = () => {}, ...props }) {
   const API = useContext(APIContext);

   /**
    * Handles the deletion of a schedule by making an API call and updating the view state.
    * 
    * @async
    * @function
    * @returns {Promise<void>} A promise that resolves when the schedule is successfully deleted.
    * @throws {Error} Throws an error if the deletion fails.
    */
   const handleDelete = async () => {
      try {
         const deleted = await API.ajax.authDelete('/master-account/delete-schedule', { scheduleUID: schedule._id });

         if (deleted.error) {
            throw deleted;
         }

         setView('display');
      } catch (err) {
         throw err;
      }
   }

   return <>
      <div className="schedule-tile" {...props}>
         {schedule.type === 'runtime' && <div className="weekdays">
            {config.dateTime.weekdays.map(item => {
               const contain = schedule.weekdays.find(day => day === item);

               if (!schedule.weekdays || !Array.isArray(schedule.weekdays)) {
                  return;
               }

               return <span key={Math.random()} className={`day ${!contain ? 'disabled' : ''}`}>{item}</span>;
            })}
         </div>}

         {schedule.type === 'runtime' && <div className="start-end-time">
            <div className="time start">
               <label>Start Time</label>
               <p>{schedule.startTime}</p>
            </div>
            <div className="time end">
               <label>End Time</label>
               <p>{schedule.endTime}</p>
            </div>
         </div>}

         {schedule.type === 'goals' && <div className="scheduled-date">
            {schedule.goalType === 'dailyGain' && <label color="gain">DAILY GAIN! Scheduled Resume:</label>}
            {schedule.goalType === 'dailyLoss' && <label color="loss">DAILY LOSS! Scheduled Resume:</label>}
            {schedule.goalType === 'MonthlyGain' && <label color="gain">MONTHLY GAIN! Scheduled Resume:</label>}
            {schedule.goalType === 'MonthlyLoss' && <label color="loss">MONTHLY LOSS! Scheduled Resume:</label>}
            <p><PrettyDate time={schedule.scheduledDate} /></p>
         </div>}
      </div>

      {editMode && <div className="button-wrap">
         <RoundIconButton className="delete-schedule" Icon={CloseIcon} size="small" onClick={handleDelete} />
      </div>}
   </>
}
