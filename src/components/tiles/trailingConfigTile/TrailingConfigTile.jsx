import Card from '@/components/common/card/Card';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function TrailingConfigTile({ master }) {
   const { useTrailingStop, autoCallback, callbackRatio } = Object(master?.trailingStop);
   const iconSize = '2rem';

   function booleanParse(value) {
      if (value) {
         return <CheckCircleIcon fontSize={iconSize} />
      } else {
         return <CancelIcon fontSize={iconSize} />
      }
   }

   function callbackParse() {
      if (autoCallback) {
         return 'Automatic (100%)';
      }

      if (callbackRatio) {
         return callbackRatio;
      } else {
         return <CancelIcon fontSize={iconSize} />;
      }
   }

   if (!master) {
      return <></>;
   }

   return (
      <Card className="trailing-config-tile" padding="xs" radius="s">
         <ContentHeader>
            <LegendToggleIcon className="icon" /> <h3 className="card-title">Trailing Stop</h3>
         </ContentHeader>

         <div className="configs-grid">
            <div className="value-wrap">
               <label>Use Trailing</label>
               
               {booleanParse(useTrailingStop)}
            </div>

            <div className="value-wrap">
               <label>Callback Ratio</label>
               
               {callbackParse()}
            </div>
         </div>
      </Card>
   )
}
