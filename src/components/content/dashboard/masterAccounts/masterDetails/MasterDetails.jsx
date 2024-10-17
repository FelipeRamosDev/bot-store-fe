'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import MasterDetailsHeader from './MasterDetailsHeader';
import MasterDetailsContent from './MasterDetailsContent';
import MasterDetailsSidebar from './masterDetailsSidebar/MasterDetailsSidebar';
import { DBQuery } from '@/contexts/DBQuery';
import ExchangeKeysMissingTopbar from '@/components/bars/topBars/exchangeKeysMissing/ExchangeKeysMissing';
import CreateSlotModal from '@/components/modals/createSlotModal/CreateSlotModal';
import DeleteSlotConfirmDialog from '@/components/modals/deleteSlotConfirmDialog/DeleteSlotCofirmDialog';
import MasterClosedPositions from './MasterClosedPositions';

/**
 * MasterDetails component displays detailed information and management options for a specific master account.
 *
 * @param {Object} props - Component props.
 * @param {string} props.index - The index of the master account to be displayed.
 * @returns {JSX.Element} The rendered component.
 */
export default function MasterDetails({ index }) {
   const [ uInstance, setUInstance ] = useState();
   const [ editSlotModal, setEditSlotModal  ] = useState();
   const [ deleteConfirmDialog, setDeleteConfirmDialog ] = useState();
   const [ mounted, setMounted ] = useState(false);

   function ToolbarPortal() {
      return mounted && createPortal(<ExchangeKeysMissingTopbar />, document.getElementById('topbar-portal'));
   }

   useEffect(() => {
      setMounted(true);
   }, []);

   return (<>
      <DBQuery type="doc" collection="master_accounts" filter={{ index }} subscribe={true}>
         <ToolbarPortal />

         <ContentSidebar className="master-details" isFullContainer={true}>
            <MasterDetailsContent uInstance={uInstance} setEditSlotModal={setEditSlotModal} setDeleteConfirmDialog={setDeleteConfirmDialog} />
            <MasterDetailsSidebar setUInstance={setUInstance} />

            <MasterDetailsHeader />
         </ContentSidebar>

         <MasterClosedPositions />
      </DBQuery>

      <CreateSlotModal
         editMode={true}
         open={Boolean(editSlotModal)}
         setOpen={setEditSlotModal}
         slot={editSlotModal}
      />

      <DeleteSlotConfirmDialog
         slot={deleteConfirmDialog}
         open={Boolean(deleteConfirmDialog)}
         setOpen={setDeleteConfirmDialog}
      />
   </>);
}
