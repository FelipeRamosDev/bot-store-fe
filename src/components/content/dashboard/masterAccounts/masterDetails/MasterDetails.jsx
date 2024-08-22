'use client';
import './MasterDetails.scss';
import { useState } from 'react';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import MasterDetailsHeader from './MasterDetailsHeader';
import MasterDetailsContent from './MasterDetailsContent';
import MasterDetailsSidebar from './masterDetailsSidebar/MasterDetailsSidebar';
import { DBQuery } from '@/contexts/DBQuery';
import ExchangeKeysMissingTopbar from '@/components/bars/topBars/exchangeKeysMissing/ExchangeKeysMissing';
import CreateSlotModal from '@/components/modals/createSlotModal/CreateSlotModal';
import DeleteSlotConfirmDialog from '@/components/modals/deleteSlotConfirmDialog/DeleteSlotCofirmDialog';

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

   return (<>
      <DBQuery type="doc" collection="master_accounts" filter={{ index }} subscribe={true}>
         <ExchangeKeysMissingTopbar />

         <ContentSidebar className="master-details" isFullContainer={true}>
            <MasterDetailsContent uInstance={uInstance} setEditSlotModal={setEditSlotModal} setDeleteConfirmDialog={setDeleteConfirmDialog} />
            <MasterDetailsSidebar setUInstance={setUInstance} />

            <MasterDetailsHeader />
         </ContentSidebar>
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
