import './ScheduleEditor.scss';
import { useContext } from 'react';
import ScheduleTile from '@/components/tiles/scheduleTile/ScheduleTile';
import TopBorderButton from '@/components/buttons/topBorderButton/TopBorderButton';
import CreateScheduleForm from '@/components/forms/createScheduleForm/CreateScheduleForm';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

/**
 * `ScheduleEditor` component for displaying, editing, and creating schedules.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.masterUID - The unique identifier for the master.
 * @param {string} props.editorState - The current state of the editor ('display', 'edit', 'create').
 * @param {Function} props.setEditorState - Function to update the editor state.
 *
 * @returns {JSX.Element} - Rendered component.
 */
export default function ScheduleEditor({ masterUID, editorState, setEditorState }) {
   const { query = [] } = useContext(DBQueryContext);
   const goalsSchedule = query.find(item => item.type === 'goals' && item.isActive);
   const runtimeSchedules = query.filter(item => item._id !== goalsSchedule?._id);

   if (editorState === 'display') {
      return <div className="schedules-editor">
         {runtimeSchedules.map((doc) => <ScheduleTile key={Math.random()} schedule={doc} />)}
         {goalsSchedule && <ScheduleTile schedule={goalsSchedule} setView={setEditorState} />}

         {!query.length && <NoDocumentsTile Icon={false} message="There is any schedules created yet!" noBorder={true} />}
      </div>
   }

   if (editorState === 'edit') {
      return <div className="schedules-editor">
         {runtimeSchedules.map((doc) => <div key={Math.random()} className="edit-wrap">
            <ScheduleTile editMode={true} schedule={doc} setView={setEditorState} />
         </div>)}

         {!query.length && <NoDocumentsTile Icon={false} message="There is any schedules created yet!" noBorder={true} />}
         <div className="buttons-wrap">
            <TopBorderButton onClick={() => setEditorState('create')}>ADD</TopBorderButton>
         </div>
      </div>
   }

   if (editorState === 'create') {
      return <div className="schedules-editor">
         <CreateScheduleForm masterUID={masterUID} onSuccess={() => setEditorState('display') } />
      </div>
   }

   return <></>;
}
