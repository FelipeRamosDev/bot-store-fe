import ProfitRatioChart from "@/components/charts/profitRatioChart/ProfitRatioChart";
import ContentModal from "../base/contentModal/ContentModal";
import AvgDailyROI from '@/components/charts/avgDailyROSChart/AvgDailyROSChart';
import AccumROIChart from '@/components/charts/accumROSChart/AccumROSChart';
import WinLossChart from '@/components/charts/winLossChart/WinLossChart';
import { useContext, useEffect, useRef, useState } from "react";
import usePilot from "@/hooks/usePilot";
import DBQueryContext from "@/contexts/DBQuery";

export default function PilotChartsModal({ open, onClose }) {
   const [resultsLine, setResultsLine] = useState([]);
   const { doc } = useContext(DBQueryContext);
   const { getPilotResults } = usePilot();
   const isRequested = useRef(false);

   useEffect(() => {
      if (!open || !doc?._id || isRequested.current) {
         return;
      }

      isRequested.current = true;
      getPilotResults(doc._id).then(results => {
         setResultsLine(results);
      }).catch(error => {
         console.error(error)
      });
   }, [open, getPilotResults, doc?._id]);

   return (
      <ContentModal
         open={open}
         title="Pilot's Results"
         className="pilot-charts-modal"
         onClose={onClose}
         size="large"
         padding="m"
      >
         <ProfitRatioChart results={resultsLine} />
         <AvgDailyROI results={resultsLine} />
         <AccumROIChart results={resultsLine} period="24h" />
         <AccumROIChart results={resultsLine} period="30d" />
         <WinLossChart results={resultsLine} period="24h" type="roi" />
         <WinLossChart results={resultsLine} period="30d" type="roi" />
         <WinLossChart results={resultsLine} period="24h" type="rate" />
         <WinLossChart results={resultsLine} period="30d" type="rate" />
      </ContentModal>
   );
}
