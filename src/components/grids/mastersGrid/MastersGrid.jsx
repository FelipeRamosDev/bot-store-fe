'use client';
import './MastersGrid.scss';
import { useContext, useState } from 'react';
import MasterTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';
import DBQueryContext from '@/contexts/DBQuery';
import Skeleton from '@mui/material/Skeleton';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';
import ContentModal from '@/components/modals/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';

export default function MastersGrid() {
   const [ createMasterModal, setCreateMasterModal ] = useState();
   const { query = [], isLoading } = useContext(DBQueryContext);
   const masters = query;
   const skeletonNum = 3;
   const skeletons = new Array(skeletonNum).fill('', 0, skeletonNum);

   return <div className="masters-grid">
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
            onClick={() => setCreateMasterModal(true)}
         />
      )}

      {!isLoading && (query.length > 0) && masters.map(master => (
         <MasterTileDefault
            key={Math.random()}
            master={master}
            className="tile"
         />
      ))}

      <ContentModal
         title="Create Master"
         padding="m"
         size="x-large"
         open={createMasterModal}
         onClose={() => setCreateMasterModal(false)}
      >
         <CreateMasterForm />
      </ContentModal>
   </div>
}
