'use client';
import { useContext } from 'react';
import ActivitiesTable from "@/components/tables/activitiesTable/ActivitiesTable";
import RecentBotsTable from "@/components/tables/recentBotsTable/RecentBotsTable";
import UserInstance from "@/components/tiles/userInstance/Userinstance";
import { DBQuery } from '@/contexts/DBQuery';
import AuthUserContext from "@/contexts/AuthUser";

export default function DashboardSidebar() {
   const { user } = useContext(AuthUserContext);

   if (!user) {
      return <></>;
   }

   return <>
      <DBQuery
         type="doc"
         collection="user_instances"
         filter={{ user: user._id }}
         subscribe={true}
      >
         <UserInstance />
      </DBQuery>

      <DBQuery
         type="query"
         collection="activities"
         filter={{ user: user._id }}
         subscribe={true}
      >
         <ActivitiesTable />
      </DBQuery>

      <DBQuery type="query" collection="bots">
         <RecentBotsTable />
      </DBQuery>
   </>;
}
