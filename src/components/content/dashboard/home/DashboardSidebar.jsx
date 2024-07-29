import UserInstance from "@/components/tiles/userInstance/Userinstance";

const DUMMY_USER_INSTANCE = {
   status: 'online'
};

export default function DashboardSidebar() {
   return <>
      <UserInstance instance={DUMMY_USER_INSTANCE} />
   </>;
}
