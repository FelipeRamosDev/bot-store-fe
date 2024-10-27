import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import APIContext from '@/contexts/4HandsAPI';
import QueryStats from '@mui/icons-material/QueryStats';
import { useContext, useEffect, useMemo, useState } from 'react';
import MasterAccumulatedChart from './charts/MasterAccumutaledChart';
import MasterProfitRatioChart from './charts/MasterProfitRatioChart';

export default function MasterAnalysis({ master = {} }) {
   const API = useContext(APIContext);
   const [ analysisData, setAnalysisData ] = useState()
   const masterUID = master._id;

   useEffect(() => {
      API.ajax.authGet('/master-account/analysis-data', { masterUID }).then(response => {
         if (response.success) {
            setAnalysisData(response.data);
         }
      }).catch(err => {
         throw err;
      });
   }, [ API.ajax, masterUID ]);

   const masterAccumulated = useMemo(() => <MasterAccumulatedChart analysisData={analysisData} />, [analysisData]);
   const masterProfitRatio = useMemo(() => <MasterProfitRatioChart analysisData={analysisData} />, [analysisData]);
   return (
      <div className="master-analysis">
         <ContentHeader>
            <QueryStats />
            <h2 className="header-title">Master Analysis</h2>
         </ContentHeader>

         <div className="charts">
            {masterAccumulated}
            {masterProfitRatio}
         </div>
      </div>
   );
}
