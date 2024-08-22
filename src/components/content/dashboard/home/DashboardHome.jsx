'use client';
import './DashboardHome.scss';
import { useState } from 'react';
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import DashboardSidebar from "./DashboardSidebar";
import ContentSidebar from "@/components/layout/contentSidebar/ContentSidebar";

export default function DashboardHome() {
   const [ createMasterModal, setCreateMasterModal ] = useState(false);

   return <ContentSidebar isFullContainer={true}>
      <DashboardContent createMasterModal={setCreateMasterModal} />
      <DashboardSidebar />

      <DashboardHeader
         createMasterModal={createMasterModal}
         setCreateMasterModal={setCreateMasterModal}
      />
   </ContentSidebar>
}
