'use client';
import { useContext, useMemo, useRef } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { formatMasterBadges } from '@/helpers/format';
import MasterMenu from '@/components/menus/dropdown/masterMenu/MasterMenu';
import { MenuProvider } from '@/contexts/MenuContext';

/**
 * MasterDetailsHeader component displays the header section of the master details page,
 * including the master account's status badge, name, description, and a menu for further actions.
 * 
 * @returns {JSX.Element} The rendered header component.
 */
export default function MasterDetailsHeader() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const { badgeColor, accountType } = formatMasterBadges(doc);
   const stableDoc = useRef();

   // Store a stable reference to the document to avoid unnecessary re-renders
   if (!stableDoc.current) {
      stableDoc.current = doc;
   }

   // Memoized content to prevent re-rendering on every update
   const contentMemo = useMemo(() => {
      return (
         <ContentHeader
            Toolbar={() => (
               <MasterMenu
                  noTrasition={true}
                  isDemo={(stableDoc.current?.type === 'master-demo')}
                  master={stableDoc.current}
               />
            )}
         >
            <div className="header-title">
               <StatusBadge color={badgeColor}>{accountType}</StatusBadge>
               <h1 className="title">{stableDoc.current?.name}</h1>
               <p className="description">{stableDoc.current?.description}</p>
            </div>
         </ContentHeader>
      );
   }, [accountType, badgeColor]);

   // Render nothing if data is still loading
   if (isLoading) {
      return <></>;
   }

   return (
      <MenuProvider>
         {contentMemo}
      </MenuProvider>
   );
}
