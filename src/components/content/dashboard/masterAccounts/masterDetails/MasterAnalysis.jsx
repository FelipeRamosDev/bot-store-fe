import { useContext, useEffect, useState } from 'react';
import SwipeDrawer from '@/components/drawers/base/swipeDrawerTab/SwipeDrawerTab';
import APIContext from '@/contexts/4HandsAPI';
import MasterAccumulatedChart from './charts/MasterAccumutaledChart';
import MasterDailyAvgChart from './charts/MasterDailyAvgChart';
import MasterProfitRatioChart from './charts/MasterProfitRatioChart';
import MasterWinLossChart from './charts/MasterWinLossChart';
import QueryStats from '@mui/icons-material/QueryStats';

export default function MasterAnalysis({ master = {} }) {
   const API = useContext(APIContext);
   const [ analysisData, setAnalysisData ] = useState();
   const masterUID = master._id;

   const wlRateProp24h = {
      winPropName: 'winsRate24h',
      lossPropName: 'losesRate24h',
      period: '24h',
      type: 'Rate',
      analysisData
   };

   const wlRateProp30d = {
      winPropName: 'winsRate30d',
      lossPropName: 'losesRate30d',
      period: '30d',
      type: 'Rate',
      analysisData
   };

   const wlUSDProp24h = {
      winPropName: 'winsAvgUSD24h',
      lossPropName: 'losesAvgUSD24h',
      period: '24h',
      type: 'Avg. USD',
      analysisData
   };

   const wlUSDProp30d = {
      winPropName: 'winsAvgUSD30d',
      lossPropName: 'losesAvgUSD30d',
      period: '30d',
      type: 'Avg. USD',
      analysisData
   };

   useEffect(() => {
      API.ajax.authGet('/master-account/analysis-data', { masterUID }).then(response => {
         if (response.success) {
            setAnalysisData(response.data);
         }
      }).catch(err => {
         throw err;
      });
   }, [ API.ajax, masterUID ]);

   return (
      <SwipeDrawer
         className="master-analysis"
         headerTitle="Analysis Charts"
         HeaderIcon={QueryStats}
      >
         <div className="charts">
            <MasterAccumulatedChart analysisData={analysisData} />
            <MasterDailyAvgChart analysisData={analysisData} />
            <MasterProfitRatioChart analysisData={analysisData} />
         </div>

         <div className="charts">
            <MasterWinLossChart {...wlRateProp24h} />
            <MasterWinLossChart {...wlRateProp30d} />
            <MasterWinLossChart {...wlUSDProp24h} />
            <MasterWinLossChart {...wlUSDProp30d} />
         </div>
      </SwipeDrawer>
   );
}
