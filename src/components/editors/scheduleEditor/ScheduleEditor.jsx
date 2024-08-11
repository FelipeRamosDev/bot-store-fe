import { useState, useContext } from 'react';
import { Divider } from '@mui/material';
import './ScheduleEditor.scss';
import ScheduleTile from '@/components/tiles/scheduleTile/ScheduleTile';
import TopBorderButton from '@/components/buttons/topBorderButton/TopBorderButton';
import CreateScheduleForm from '@/components/forms/createScheduleForm/CreateScheduleForm';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

export default function ScheduleEditor({ masterUID }) {
   const [ editorState, setEditorState ] = useState('display');
   const { query = [] } = useContext(DBQueryContext);

   if (editorState === 'display') {
      return <div className="schedules-editor">
         {query.map((doc) => <ScheduleTile key={Math.random()} schedule={doc} />)}

         {!query.length && <NoDocumentsTile Icon={false} message="There is any schedules created yet!" noBorder={true} />}
         <TopBorderButton onClick={() => setEditorState('edit')}>Edit</TopBorderButton>
      </div>
   }

   if (editorState === 'edit') {
      return <div className="schedules-editor">
         {query.map((doc) => <div key={Math.random()} className="edit-wrap">
            <ScheduleTile editMode={true} schedule={doc} setView={setEditorState} />
         </div>)}

         {!query.length && <NoDocumentsTile Icon={false} message="There is any schedules created yet!" noBorder={true} />}
         <div className="buttons-wrap">
            <TopBorderButton color="error" onClick={() => setEditorState('display')}>Cancel</TopBorderButton>
            <TopBorderButton onClick={() => setEditorState('create')}>Create</TopBorderButton>
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
