import { useState } from 'react';
import { DBQuery } from '@/contexts/DBQuery';
import Card from '@/components/common/card/Card';
import ScheduleEditor from '@/components/editors/scheduleEditor/ScheduleEditor';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Edit, ArrowBack, CalendarMonth } from '@mui/icons-material';

export default function MasterSchedules({ master = {} }) {
   const [ editorState, setEditorState ] = useState('display');

   function Toolbar() {
      if (editorState === 'display') {
         return <RoundIconButton size="small" Icon={Edit} onClick={() => setEditorState('edit')} />;
      } else if (editorState === 'edit') {
         return <RoundIconButton size="small" Icon={ArrowBack} onClick={() => setEditorState('display')} />;
      } else if (editorState === 'create') {
         return <RoundIconButton size="small" Icon={ArrowBack} onClick={() => setEditorState('edit')} />;
      }
   }

   return <Card className="master-schedules" padding="xs">
      <ContentHeader Toolbar={Toolbar}>
         <CalendarMonth className="icon" /> <h3 className="card-title">Master Schedules</h3>
      </ContentHeader>

      <DBQuery type="query" collection="schedules" filter={{ master: master._id }}>
         <ScheduleEditor masterUID={master._id} editorState={editorState} setEditorState={setEditorState} />
      </DBQuery>
   </Card>
}
