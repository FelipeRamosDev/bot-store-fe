'use client';

import './DashboardHome.scss';
import { useState } from 'react';
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import DashboardSidebar from "./DashboardSidebar";
import ContentSidebar from "@/components/layout/contentSidebar/ContentSidebar";

/**
 * DashboardHome component serves as the main layout for the dashboard page.
 * 
 * It includes:
 * - `DashboardHeader`: A header component with functionality for creating a new master account.
 * - `DashboardContent`: The main content area of the dashboard, displaying data related to master accounts, slots, and positions.
 * - `DashboardSidebar`: A sidebar component for additional navigation or controls.
 * - `ContentSidebar`: A layout component that wraps the dashboard content and sidebar with additional styling.
 * 
 * It maintains local state to control the visibility of the "Create Master" modal.
 * 
 * @returns {JSX.Element} The rendered dashboard layout with header, content, and sidebar.
 */
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
