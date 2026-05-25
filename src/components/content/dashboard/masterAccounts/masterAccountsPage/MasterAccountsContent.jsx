'use client';
import { Add, Wallet } from '@mui/icons-material';
import MastersTable from '@/components/tables/mastersTable/MastersTable';
import SectionHeaderBanner from '@/components/banners/sectionHeaderBanner/SectionHeaderBanner';
import CreateMasterModal from '@/components/modals/createMasterModal/CreateMasterModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MasterFilter from '@/components/filters/masterFilter/MasterFilter';

export default function MasterAccountsContent() {
   const [ createModal, setCreateModal ] = useState(false);
   const router = useRouter();

   return (<>
      <SectionHeaderBanner
         type="flex-view"
         title="Master Accounts"
         buttonLabel="New"
         CustomImage={() => <Wallet className="icon" />}
         startIcon={<Add />}
         onButtonClick={() => setCreateModal(true)}
      />

      <MasterFilter />
      <MastersTable />
      <CreateMasterModal open={createModal} setOpen={setCreateModal} onSuccess={() => router.refresh()} />
   </>);
}
