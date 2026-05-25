import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import PositionTile from '@/components/tiles/positionTile/PositionTile';
import PositionQuickview from '@/components/modals/quickviews/positionQuickview/PositionQuickview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect, useState } from 'react';

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
   const [ expanded, setExpanded ] = useState('expanded');
   let position;

   const toggleExpanded = () => {
      setExpanded(prev => {
         const newVal = prev === 'expanded' ? 'folded' : 'expanded';

         localStorage.setItem('ongoing_positions_expanded', newVal);
         return newVal;
      });
   }

   if (modalPosition) {
      positions.map(item => {
         if (item._id === modalPosition) {
            position = item;
         }
      });
   }

   useEffect(() => {
      const localExpanded = localStorage.getItem('ongoing_positions_expanded');

      if (localExpanded) {
         setExpanded(localExpanded);
      }
   }, []);

   return <div className={`positions-grid ${className}`} {...props}>
      <ContentHeader className="header-wrap" onClick={toggleExpanded}>
         <h3 className="header-title">{title}</h3>

         {expanded === 'expanded' && <ExpandLessIcon fontSize="medium" />}
         {expanded === 'folded' && <ExpandMoreIcon fontSize="medium" />}
      </ContentHeader>

      {expanded === 'expanded' && positions.map(position => <PositionTile key={position._id} position={position} openPosition={setModalPosition} />)}

      <PositionQuickview position={position} onClose={() => setModalPosition('')} />
   </div>
}
