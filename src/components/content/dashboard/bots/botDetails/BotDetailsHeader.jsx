'use client';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import Card from '@/components/common/card/Card';

export default function BotDetailsHeader() {
   const { doc = {} } = useContext(DBQueryContext);

   return <div className="page-header">
      <div className="cover"></div>

      <div className="bot-info">
         <div className="full-container">
            <div className="avatar"></div>

            <div className="summary">
               <h1 className="title">{doc.name}</h1>
               <p className="brief">{doc.description}</p>
            </div>

            <Card className="infos" padding="s" elevation={40}>
               
            </Card>
         </div>
      </div>
   </div>;
}
