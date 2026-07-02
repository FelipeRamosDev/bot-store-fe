'use client';

import ContentSidebarDrawer from "@/components/layout/contentSidebarDrawer/ContentSidebarDrawer";
import { useState } from "react";
import DashboardHeader from "../../dashboard/home/DashboardHeader";
import AdminHomeContent from "./AdminHomeContent";
import AdminHomeSidebar from "./AdminHomeSidebar";

export default function AdminHome() {
   const [ sidebarState, setSidebarState ] = useState(false);

   return (
      <ContentSidebarDrawer
         isFullContainer={true}
         sidebarState={sidebarState}
         setSidebarState={setSidebarState}
      >
         <AdminHomeContent />
         <AdminHomeSidebar />

         <DashboardHeader setSidebarState={setSidebarState} />
      </ContentSidebarDrawer>
   );
}
