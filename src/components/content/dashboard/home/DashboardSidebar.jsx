import ActivitiesTable from "@/components/tables/activitiesTable/ActivitiesTable";
import UserInstance from "@/components/tiles/userInstance/Userinstance";

const DUMMY_USER_INSTANCE = {
   status: 'online'
};

const DUMMY_ACTIVITIES = [
   { type: 'message', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
   { type: 'error', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
   { type: 'message', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
   { type: 'message', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
   { type: 'warn', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
   { type: 'message', subject: 'faiaofnasiofasin', summary: 'fdsfsd' },
]

export default function DashboardSidebar() {
   return <>
      <UserInstance instance={DUMMY_USER_INSTANCE} />
      <ActivitiesTable activities={DUMMY_ACTIVITIES} />
   </>;
}
