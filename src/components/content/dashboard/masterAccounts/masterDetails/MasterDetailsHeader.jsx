'use client';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { formatMasterBadges } from '@/helpers/format';

export default function MasterDetailsHeader({  }) {
   const { doc, isLoading } = useContext(DBQueryContext);
   const { badgeColor, accountType } = formatMasterBadges(doc);

   if (isLoading) {
      return <></>;
   }

   return <ContentHeader>
      <div className="header-title">
         <StatusBadge color={badgeColor}>{accountType}</StatusBadge>

         <h1 className="title">{doc.name}</h1>
         <p className="description">{doc.description}</p>
      </div>
   </ContentHeader>;
}
