import './SlotsGrid.scss';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import SlotTile from "@/components/tiles/slotTile/SlotTile";

export default function SlotsGrid({ slots = [], className = '' }) {
   return <div className={`slots-grid ${className}`}>
      <ContentHeader>
         <h2 className="header-title">Slots</h2>
      </ContentHeader>

      {slots.map(slot => (
         <SlotTile key={Math.random()} slot={slot} />
      ))}
   </div>;
}
