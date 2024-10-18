import { useState } from 'react';
import SectionHeaderBanner from '@/components/banners/sectionHeaderBanner/SectionHeaderBanner';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';

export default function CreateBotBanner() {
   const [ createBotModal, setCreateBotModal ] = useState(false);

   return (<>
      <SectionHeaderBanner
         onButtonClick={() => setCreateBotModal(true)}
         title="Build your Pilot"
         description="Create your trader pilot bot."
         buttonLabel="Create One"
         noAnimation={true}
      />

      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
   </>);
}
