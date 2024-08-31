'use client';
import './MastersGrid.scss';
import { useContext } from 'react';
import MasterTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';
import DBQueryContext from '@/contexts/DBQuery';
import Skeleton from '@mui/material/Skeleton';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

/**
 * MastersGrid component displays a grid of master account tiles with optional loading and empty states.
 *
 * This component is used to render a grid of master tiles fetched from a database context. 
 * It shows loading skeletons while data is being fetched and provides an option to display
 * a no documents message if there are no master accounts available. It also allows for the
 * creation of new master accounts through a provided modal callback.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} [props.createMasterModal] - Function to open the modal for creating a new master account.
 * @param {boolean} [props.verticalAlign=false] - Flag to apply vertical alignment in the grid layout.
 * @param {boolean} [props.hideIfEmpty=false] - Flag to hide the grid when there are no master accounts.
 *
 * @example
 * const handleCreateMasterModal = (open) => {
 *   // Function to handle opening the create master modal
 * };
 *
 * return (
 *   <MastersGrid 
 *     createMasterModal={handleCreateMasterModal} 
 *     verticalAlign={true} 
 *     hideIfEmpty={false} 
 *   />
 * );
 *
 * @returns {JSX.Element} A grid layout displaying master tiles with loading skeletons and no documents message if needed.
 */
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

      {!isLoading && (query.length === 0) && createMasterModal && (
         <NoDocumentsTile
            message={`You doesn't have any master account yet. Create one to start!`}
            onClick={() => createMasterModal(true)}
         />
      )}

      {!isLoading && (query.length > 0) && masters.map(master => (
         <MasterTileDefault
            key={master._id}
            master={master}
            className="tile"
         />
      ))}
   </div>
}
