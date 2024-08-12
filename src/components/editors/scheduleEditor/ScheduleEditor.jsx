import './ScheduleEditor.scss';
import { useContext } from 'react';
import ScheduleTile from '@/components/tiles/scheduleTile/ScheduleTile';
import TopBorderButton from '@/components/buttons/topBorderButton/TopBorderButton';
import CreateScheduleForm from '@/components/forms/createScheduleForm/CreateScheduleForm';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

export default function ScheduleEditor({ masterUID, editorState, setEditorState }) {
   const { query = [] } = useContext(DBQueryContext);

   if (editorState === 'display') {
      return <div className="schedules-editor">
         {query.map((doc) => <ScheduleTile key={Math.random()} schedule={doc} />)}

         {!query.length && <NoDocumentsTile Icon={false} message="There is any schedules created yet!" noBorder={true} />}
      </div>
   }

   if (editorState === 'edit') {
      return <div className="schedules-editor">
         {query.map((doc) => <div key={Math.random()} className="edit-wrap">
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
