import BotValueForm from "@/components/forms/botValueForm/BotValueForm";
import ContentModal from "../base/contentModal/ContentModal";

export default function BotValueModal({ bot, open, setModal = () => {} }) {
   const isOpen = Boolean(open);
   const { slug, valueType } = Object(open);

   return (
      <ContentModal
         title="Bot Value"
         open={isOpen}
         padding="s"
         size="medium"
         onClose={() => setModal(null)}
      >
         <BotValueForm slug={slug} valueType={valueType} bot={bot} onSuccess={() => setModal(null)} />
      </ContentModal>
   );
}

