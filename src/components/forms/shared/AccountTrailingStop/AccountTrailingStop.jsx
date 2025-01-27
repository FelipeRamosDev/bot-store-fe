import Card from "@/components/common/card/Card";
import FormInput from "@/components/forms/formBase/FormInput";
import { useContext, useEffect, useState } from "react";
import FormBaseContext from "@/components/forms/formBase/FormBase";

export default function AccountTrailingStop({ isMaster = false }) {
   const { form } = useContext(FormBaseContext) || {};

   const useTrailingStopSchema = form?.getSchema('trailingStop.useTrailingStop');
   const useMasterDefaultsSchema = form?.getSchema('trailingStop.useMasterDefaults');
   const useActivationPriceSchema = form?.getSchema('trailingStop.useActivationPrice');
   const autoCallbackSchema = form?.getSchema('trailingStop.autoCallback');
   const callbackRatioSchema = form?.getSchema('trailingStop.callbackRatio');
   const callbackUnitSchema = form?.getSchema('trailingStop.callbackUnit');
   const callbackStopGapPercentSchema = form?.getSchema('trailingStop.callbackStopGapPercent');

   const [ states, setStates ] = useState({
      useTrailingStop: useTrailingStopSchema?.defaultValue,
      useActivationPrice: useActivationPriceSchema?.defaultValue,
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
            useActivationPrice: Boolean(trailingStopData.useActivationPrice),
            useMasterDefaults: Boolean(trailingStopData.useMasterDefaults),
            autoCallback: Boolean(trailingStopData.autoCallback),
            callbackRatio: trailingStopData.callbackRatio,
            callbackUnit: trailingStopData.callbackUnit,
            callbackStopGapPercent: trailingStopData.callbackStopGapPercent,
         });
      } 
   }, [form?.editData?.trailingStop]);

   return (
      <Card className="account-trailing-stop" padding="xs" elevation={15}>
         <h3 className="header-title">Trailing Stop</h3>
         {!isMaster && <FormInput path="trailingStop.useMasterDefaults" onCustomChange={(value) => handleStateChanges('useMasterDefaults', value)} />}

         {(!states.useMasterDefaults || isMaster) && (<>
            <div className="switcher-group">
               <FormInput path="trailingStop.useTrailingStop" onCustomChange={(value) => handleStateChanges('useTrailingStop', value)} />
               <FormInput path="trailingStop.useActivationPrice" onCustomChange={(value) => handleStateChanges('useActivationPrice', value)} />

               {states.useTrailingStop && (
                  <FormInput path="trailingStop.autoCallback" onCustomChange={(value) => handleStateChanges('autoCallback', value)} />
               )}
            </div>

            {!states.autoCallback && states.useTrailingStop && (
               <FormInput path="trailingStop.callbackUnit" onCustomChange={(value) => handleStateChanges('callbackUnit', value)} />
            )}

            {(!states.autoCallback && states.useTrailingStop && states.callbackUnit === 'asset-percent') && (
               <FormInput path="trailingStop.callbackRatio" />
            )}

            {(!states.autoCallback && states.useTrailingStop && states.callbackUnit === 'stop-gap') && (
               <FormInput path="trailingStop.callbackStopGapPercent" />
            )}

            {states.useTrailingStop && states.useActivationPrice && (
               <FormInput path="trailingStop.activationLevel" />
            )}
         </>)}
      </Card>
   )
}