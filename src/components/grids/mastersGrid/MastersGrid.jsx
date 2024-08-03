'use client';
import './MastersGrid.scss';
import { useContext } from 'react';
import MasterTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';
import DBQueryContext from '@/contexts/DBQuery';

export default function MastersGrid() {
   const { socket, query = [] } = useContext(DBQueryContext);
   const masters = query;

   return <div className="masters-grid">
      {masters.map(master => (
         <MasterTileDefault key={Math.random()} master={master} className="tile" />
      ))}
   </div>
}
