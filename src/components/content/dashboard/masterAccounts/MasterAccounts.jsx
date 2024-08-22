import ContentSidebar from "@/components/layout/contentSidebar/ContentSidebar";

/**
 * MasterAccounts component renders a page layout for master accounts.
 * It uses ContentSidebar to provide a structured layout with a sidebar.
 *
 * @returns {JSX.Element} The rendered component with a title and sidebar.
 */
export default function MasterAccounts() {
   return (
      <ContentSidebar>
         <h1>Master Accounts</h1>
         <h2>Sidebar</h2>
      </ContentSidebar>
   );
}
