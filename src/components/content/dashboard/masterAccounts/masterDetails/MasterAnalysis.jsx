import { useContext, useEffect, useMemo, useState } from 'react';
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

   const masterAccumulated = useMemo(() => <MasterAccumulatedChart analysisData={analysisData} />, [ analysisData ]);
   const masterDailyAvg = useMemo(() => <MasterDailyAvgChart analysisData={analysisData} />, [ analysisData ]);

   const masterProfitRatio = useMemo(() => <MasterProfitRatioChart analysisData={analysisData} />, [ analysisData ]);
   const masterWinLossRate24h = useMemo(() => <MasterWinLossChart {...wlRateProp24h} />, [ analysisData ]);
   const masterWinLossRate30d = useMemo(() => <MasterWinLossChart {...wlRateProp30d} />, [ analysisData ]);
   const masterWinLossUSD24h = useMemo(() => <MasterWinLossChart {...wlUSDProp24h} />, [ analysisData ]);
   const masterWinLossUSD30d = useMemo(() => <MasterWinLossChart {...wlUSDProp30d} />, [ analysisData ]);

   return (
      <SwipeDrawer
         className="master-analysis"
         headerTitle="Analysis Charts"
         HeaderIcon={QueryStats}
         // drawerBleeding={57}
      >
         <div className="charts">
            {masterAccumulated}
            {masterDailyAvg}
            {masterProfitRatio}
         </div>

         <div className="charts">
            {masterWinLossRate24h}
            {masterWinLossRate30d}
            {masterWinLossUSD24h}
            {masterWinLossUSD30d}
         </div>
      </SwipeDrawer>
   );
}
