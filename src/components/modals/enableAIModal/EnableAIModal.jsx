import { Button } from "@mui/material";
import ContentModal from "../base/contentModal/ContentModal";
import useSubscriptions from "@/hooks/useSubscriptions";

export default function EnableAIModal({ open, onClose }) {
   const { enableAIUsage } = useSubscriptions();

   const handleEnableAIUsage = async () => {
      try {
         await enableAIUsage();
         onClose();
      } catch (error) {
         console.error('Error enabling AI usage:', error);
      }
   };

   return (
      <ContentModal open={open} onClose={onClose} title="AI Usage Consent" padding="s">
         <Button variant="contained" color="tertiary" onClick={handleEnableAIUsage} fullWidth>
            I Agree and Confirm
         </Button>
      </ContentModal>
   );
}
