import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import APIContext from '@/contexts/4HandsAPI';
import QueryStats from '@mui/icons-material/QueryStats';
import { useContext, useEffect, useMemo, useState } from 'react';
import MasterAccumulatedChart from './charts/MasterAccumutaledChart';
import MasterDailyAvgChart from './charts/MasterDailyAvgChart';
import MasterProfitRatioChart from './charts/MasterProfitRatioChart';
import MasterWinLossChart from './charts/MasterWinLossChart';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function MasterAnalysis({ master = {} }) {
   const API = useContext(APIContext);
   const [ analysisData, setAnalysisData ] = useState();
   const [ showCharts, setShowCharts ] = useState(false);
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
      <div className="master-analysis">
         <ContentHeader Toolbar={() => <>
            <Button
               startIcon={!showCharts ? <VisibilityIcon /> : <VisibilityOffIcon />}
               color={showCharts ? 'error' : 'tertiary'}
               sx={{ minWidth: 150 }}
               onClick={() => setShowCharts(prev => !prev)}
            >{showCharts ? 'hide charts' : 'show charts'}</Button>
         </>}>
            <QueryStats />
            <h2 className="header-title">Master Analysis</h2>
         </ContentHeader>

         {showCharts && <div className="charts">
            {masterAccumulated}
            {masterDailyAvg}
            {masterProfitRatio}
         </div>}
         {showCharts && <div className="charts">
            {masterWinLossRate24h}
            {masterWinLossRate30d}
            {masterWinLossUSD24h}
            {masterWinLossUSD30d}
         </div>}
      </div>
   );
}
