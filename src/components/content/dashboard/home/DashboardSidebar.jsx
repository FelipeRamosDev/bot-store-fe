import ActivitiesTable from "@/components/tables/activitiesTable/ActivitiesTable";
import RecentBotsTable from "@/components/tables/recentBotsTable/RecentBotsTable";
import UserInstance from "@/components/tiles/userInstance/Userinstance";

const DUMMY_USER_INSTANCE = {
   status: 'online'
};

const DUMMY_ACTIVITIES = [
   { type: 'msg', subject: 'Subject Here', summary: 'Reference site about Lorem Ipsum, giving information on its origins.' },
   { type: 'error', subject: 'Subject Here', summary: 'Reference site about Lorem Ipsum, giving information on its origins.' },
   { type: 'warn', subject: 'Subject Here', summary: 'Reference site about Lorem Ipsum, giving information on its origins.' },
];

const DUMMY_BOTS = [
   { name: 'Peter Griffin', score: 1562 },
   { name: 'Bender', score: -485 },
   { name: 'Burns', score: 4500 },
   { name: 'Terminator', score: -300 },
];

export default function DashboardSidebar() {
   return <>
      <UserInstance instance={DUMMY_USER_INSTANCE} />
      <ActivitiesTable activities={DUMMY_ACTIVITIES} />
      <RecentBotsTable bots={DUMMY_BOTS} />
   </>;
}
