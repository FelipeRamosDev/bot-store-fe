import { DBQuery } from '@/contexts/DBQuery';
import Card from '@/components/common/card/Card';
import ScheduleEditor from '@/components/editors/scheduleEditor/ScheduleEditor';

export default function MasterSchedules({ master = {} }) {
   return <Card className="master-schedules" padding="xs">
      <h3 className="card-title text-center">Master Schedules</h3>

      <ScheduleEditor masterUID={master._id} />
   </Card>
}
