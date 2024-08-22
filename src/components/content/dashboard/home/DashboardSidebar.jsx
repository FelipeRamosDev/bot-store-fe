'use client';

import { useContext } from 'react';
import ActivitiesTable from "@/components/tables/activitiesTable/ActivitiesTable";
import RecentBotsTable from "@/components/tables/recentBotsTable/RecentBotsTable";
import UserInstanceTileDash from "@/components/tiles/userInstance/Userinstance";
import { DBQuery } from '@/contexts/DBQuery';
import AuthUserContext from "@/contexts/AuthUser";

/**
 * DashboardSidebar component renders the sidebar content for the dashboard page.
 * 
 * It includes:
 * - `UserInstanceTileDash`: A component displaying user instance details.
 * - `ActivitiesTable`: A table displaying recent activities related to the user.
 * - `RecentBotsTable`: A table displaying recent bots data.
 * 
 * It uses the `AuthUserContext` to fetch user information and `DBQuery` components to query relevant data from the database.
 * 
 * @returns {JSX.Element} The rendered sidebar with user instances, activities, and bots tables.
 */
export default function DashboardSidebar() {
   const { user } = useContext(AuthUserContext);

   if (!user) {
      return <></>;
   }

   return (
      <>
         <DBQuery
            type="doc"
            collection="user_instances"
            filter={{ user: user._id }}
            subscribe={true}
         >
            <UserInstanceTileDash />
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
      </>
   );
}
