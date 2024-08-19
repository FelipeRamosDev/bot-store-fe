import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import './PositionsGrid.scss';
import PositionTile from '@/components/tiles/positionTile/PositionTile';

export default function PositionsGrid({ title = 'Positions', className = '', positions = [], ...props }) {
   return <div className={`positions-grid ${className}`} {...props}>
      <ContentHeader>
         <h3 className="header-title">{title}</h3>
      </ContentHeader>

      {positions.map(position => <PositionTile key={Math.random()} position={position} />)}
   </div>
}
