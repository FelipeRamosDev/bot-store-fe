import PositionLimits from './PositionLimits';
import PositionDetails from './PositionDetails';

export default function PositionSidebar({ position = {}, isMobile }) {
   return <>
      <PositionLimits position={position} />

      {position.type === 'position-live' && <PositionDetails position={position} />}
   </>
}
