import ContentSplit from "@/components/layout/contentSplit/ContentSplit";
import MastersTileDefault from "@/components/tiles/masterTileDefault/MasterTileDefault";
import SlotTile from "@/components/tiles/slotTile/SlotTile";

/**
 * PositionParents component displays related slot and master information for a given position.
 * It uses a split layout to render both a SlotTile and MastersTileDefault, which are minified versions.
 *
 * @param {object} position - The position object containing information about the bot slot and master.
 *    @param {object} position.botSlot - The slot object representing the bot slot associated with the position.
 *    @param {object} position.master - The master object associated with the position.
 * 
 * @returns {JSX.Element} A split layout displaying the slot and master tiles, or an empty fragment if no position is provided.
 */
export default function PositionParents({ position }) {
   if (!position) return <></>;

   return (
      <ContentSplit className="position-parents">
         <SlotTile slot={position.botSlot} minified={true} />

         <MastersTileDefault master={position.master} minified={true} />
      </ContentSplit>
   );
}
