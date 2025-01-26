import Card from "@/components/common/card/Card";
import FormInput from "@/components/forms/formBase/FormInput";
import { useContext, useEffect, useState } from "react";
import FormBaseContext from "@/components/forms/formBase/FormBase";

export default function AccountTrailingStop({ isMaster = false }) {
   const { form } = useContext(FormBaseContext) || {};

   const useTrailingStopSchema = form?.getSchema('trailingStop.useTrailingStop');
   const useMasterDefaultsSchema = form?.getSchema('trailingStop.useMasterDefaults');
   const autoCallbackSchema = form?.getSchema('trailingStop.autoCallback');
   const callbackRatioSchema = form?.getSchema('trailingStop.callbackRatio');
   const callbackUnitSchema = form?.getSchema('trailingStop.callbackUnit');
   const callbackStopGapPercentSchema = form?.getSchema('trailingStop.callbackStopGapPercent');

   const [ states, setStates ] = useState({
      useTrailingStop: useTrailingStopSchema?.defaultValue,
      useMasterDefaults: useMasterDefaultsSchema?.defaultValue,
      autoCallback: autoCallbackSchema?.defaultValue,
      callbackRatio: callbackRatioSchema?.defaultValue,
      callbackUnit: callbackUnitSchema?.defaultValue,
      callbackStopGapPercent: callbackStopGapPercentSchema?.defaultValue
   });

   function handleStateChanges(key, value) {
      setStates(prev => ({ ...prev, [key]: value }));
   };

   useEffect(() => {
      const trailingStopData = form?.editData?.trailingStop;

      if (trailingStopData) {
         setStates({
            useTrailingStop: Boolean(trailingStopData.useTrailingStop),
            useMasterDefaults: Boolean(trailingStopData.useMasterDefaults),
            autoCallback: Boolean(trailingStopData.autoCallback),
            callbackRatio: trailingStopData.callbackRatio,
            callbackUnit: trailingStopData.callbackUnit,
            callbackStopGapPercent: trailingStopData.callbackStopGapPercent,
         });
      } 
   }, []);

   return (
      <Card padding="xs" elevation={15}>
         {!isMaster && <FormInput path="trailingStop.useMasterDefaults" onCustomChange={(value) => handleStateChanges('useMasterDefaults', value)} />}

         {(!states.useMasterDefaults || isMaster) && (<>
            <FormInput path="trailingStop.useTrailingStop" onCustomChange={(value) => handleStateChanges('useTrailingStop', value)} />
            {states.useTrailingStop && <FormInput path="trailingStop.autoCallback" onCustomChange={(value) => handleStateChanges('autoCallback', value)} />}
            {!states.autoCallback && states.useTrailingStop && <FormInput path="trailingStop.callbackUnit" onCustomChange={(value) => handleStateChanges('callbackUnit', value)} />}

            {(!states.autoCallback && states.useTrailingStop && states.callbackUnit === 'asset-percent') && (
               <FormInput path="trailingStop.callbackRatio" />
            )}

            {(!states.autoCallback && states.useTrailingStop && states.callbackUnit === 'stop-gap') && (
               <FormInput path="trailingStop.callbackStopGapPercent" />
            )}
         </>)}
      </Card>
   )
}