import { useState } from 'react';
import { Divider, Button } from '@mui/material';
import './ScheduleEditor.scss';
import ScheduleTile from '@/components/tiles/scheduleTile/ScheduleTile';
import TopBorderButton from '@/components/buttons/topBorderButton/TopBorderButton';

export default function ScheduleEditor({ masterUID }) {
   const [ editorState, setEditorState ] = useState('display');

   if (editorState === 'display') {
      return <div className="schedules-editor">
         <ScheduleTile schedule={{
            startTime: '08:00:00',
            endTime: '19:00:00',
            weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI']
         }} />

         <Divider />

         <ScheduleTile schedule={{
            startTime: '08:00:00',
            endTime: '19:00:00',
            weekdays: ['SUN', 'SAT']
         }} />

         <TopBorderButton onClick={() => setEditorState('edit')}>Edit</TopBorderButton>
      </div>
   }

   if (editorState === 'edit') {
      return <div className="schedules-editor">
         <div className="edit-wrap">
            <ScheduleTile editMode={true} schedule={{
               startTime: '08:00:00',
               endTime: '19:00:00',
               weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI']
            }} />
         </div>

         <Divider />


         <div className="edit-wrap">
            <ScheduleTile editMode={true} schedule={{
               startTime: '08:00:00',
               endTime: '19:00:00',
               weekdays: ['SUN', 'SAT']
            }} />
         </div>

         <div className="buttons-wrap">
            <TopBorderButton color="error" onClick={() => setEditorState('display')}>Cancel</TopBorderButton>
            <TopBorderButton onClick={() => setEditorState('create')}>Create</TopBorderButton>
         </div>
      </div>
   }

   if (editorState === 'create') {
      return <div className="schedules-editor">
         <TopBorderButton color="error" onClick={() => setEditorState('display')}>Cancel</TopBorderButton>
      </div>
   }

   return <></>;
}
