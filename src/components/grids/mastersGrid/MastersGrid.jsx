'use client';
import './MastersGrid.scss';
import { useContext } from 'react';
import MasterTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';
import DBQueryContext from '@/contexts/DBQuery';
import Skeleton from '@mui/material/Skeleton';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

export default function MastersGrid({ createMasterModal, verticalAlign = false, hideIfEmpty = false }) {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const masters = query;
   const skeletonNum = 3;
   const skeletons = new Array(skeletonNum).fill('', 0, skeletonNum);

   if (hideIfEmpty && !masters.length) {
      return <></>;
   }

   return <div className={`masters-grid ${verticalAlign ? 'vertical-align' : ''}`}>
      {isLoading && skeletons.map(() => (
         <Skeleton
            key={Math.random()}
            className="tile"
            variant="rounded"
            height={100}
         />
      ))}

      {!isLoading && (query.length === 0) && (
         <NoDocumentsTile
            message={`You doesn't have any master account yet. Create one to start!`}
            onClick={() => createMasterModal(true)}
         />
      )}

      {!isLoading && (query.length > 0) && masters.map(master => (
         <MasterTileDefault
            key={Math.random()}
            master={master}
            className="tile"
         />
      ))}
   </div>
}
