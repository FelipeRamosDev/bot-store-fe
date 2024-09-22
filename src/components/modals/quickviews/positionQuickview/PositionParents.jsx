import ContentSplit from "@/components/layout/contentSplit/ContentSplit";
import MastersTileDefault from "@/components/tiles/masterTileDefault/MasterTileDefault";
import SlotTile from "@/components/tiles/slotTile/SlotTile";

export default function PositionParents({ position }) {
   if (!position) return <></>;

   return (
      <ContentSplit className="position-parents">
         <SlotTile slot={position.botSlot} minified={true} />

         <MastersTileDefault master={position.master} minified={true} />
      </ContentSplit>
   );
}
