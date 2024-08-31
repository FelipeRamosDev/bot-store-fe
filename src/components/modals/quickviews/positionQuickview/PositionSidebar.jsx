import PositionLimits from './PositionLimits';
import PositionDetails from './PositionDetails';

export default function PositionSidebar({ position = {} }) {
   return <>
      <PositionLimits position={position} />

      {position.type === 'position-live' && <PositionDetails position={position} />}
   </>
}
