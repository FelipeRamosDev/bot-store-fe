'use client';
import { useContext, useMemo, useRef } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { formatMasterBadges } from '@/helpers/format';
import MasterMenu from '@/components/menus/dropdown/masterMenu/MasterMenu';
import { MenuProvider } from '@/contexts/MenuContext';

export default function MasterDetailsHeader({ }) {
   const { doc, isLoading } = useContext(DBQueryContext);
   const { badgeColor, accountType } = formatMasterBadges(doc);
   const stableDoc = useRef();

   if (!stableDoc.current) {
      stableDoc.current = doc;
   }

   const contentMemo = useMemo(() => {
      return <ContentHeader Toolbar={() => <MasterMenu noTrasition={true} isDemo={(stableDoc.current?.type === 'master-demo')} master={stableDoc.current} />}>
         <div className="header-title">
            <StatusBadge color={badgeColor}>{accountType}</StatusBadge>

            <h1 className="title">{stableDoc.current?.name}</h1>
            <p className="description">{stableDoc.current?.description}</p>
         </div>
      </ContentHeader>
   }, [accountType, badgeColor]);

   if (isLoading) {
      return <></>;
   }

   return <MenuProvider>
      {contentMemo}
   </MenuProvider>;
}
