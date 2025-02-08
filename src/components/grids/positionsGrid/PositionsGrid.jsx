import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import PositionTile from '@/components/tiles/positionTile/PositionTile';
import PositionQuickview from '@/components/modals/quickviews/positionQuickview/PositionQuickview';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

/**
 * PositionsGrid component displays a grid of positions with an optional title.
 *
 * This component is used to render a list of position tiles within a grid layout. 
 * It includes a header with a customizable title and dynamically generates tiles 
 * based on the provided positions data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.title='Positions'] - The title to be displayed in the header.
 * @param {string} [props.className=''] - Optional additional class names for styling.
 * @param {Array} [props.positions=[]] - Array of position objects to be displayed as tiles.
 * @param {...Object} [props] - Additional props to be passed to the container div.
 *
 * @example
 * const positions = [
 *   { id: '1', name: 'Position 1', status: 'open' },
 *   { id: '2', name: 'Position 2', status: 'closed' }
 * ];
 *
 * return <PositionsGrid title="My Positions" positions={positions} />;
 *
 * @returns {JSX.Element} A grid layout displaying position tiles with an optional title.
 */
export default function PositionsGrid({ title = 'Positions', className = '', positions = [], ...props }) {
   const [ modalPosition, setModalPosition ] = useState('');
   const [ expanded, setExpanded ] = useState(false);
   let position;

   if (modalPosition) {
      positions.map(item => {
         if (item._id === modalPosition) {
            position = item;
         }
      });
   }

   return <div className={`positions-grid ${className}`} {...props}>
      <ContentHeader className="header-wrap" onClick={() => setExpanded(prev => !prev)}>
         <h3 className="header-title">{title}</h3>

         {expanded && <RemoveIcon fontSize="medium" />}
         {!expanded && <AddIcon fontSize="medium" />}
      </ContentHeader>

      {expanded && positions.map(position => <PositionTile key={position._id} position={position} openPosition={setModalPosition} />)}

      <PositionQuickview position={position} onClose={() => setModalPosition('')} />
   </div>
}
