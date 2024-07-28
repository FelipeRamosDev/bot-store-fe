import ContentSidebar from "@/components/layout/ContentSidebar";
import DashboardContent from "./DashboardContent";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardHome() {
   return <ContentSidebar isFullContainer={true}>
      <DashboardContent />
      <DashboardSidebar />
   </ContentSidebar>
}
