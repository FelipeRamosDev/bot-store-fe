import './AccountSettings.scss';
import Card from '@/components/common/card/Card';
import SettingRow from './settingRow/SettingRow';
import Price from '@/components/displays/price/Price';
import Percent from '@/components/displays/percent/Percent';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Edit, Settings } from '@mui/icons-material';

const DISPLAY_CONFIG = { noColor: true, dashedZero: true };

export default function AccountSettings({ account }) {
   if (!account) {
      return <></>;
   }

   const { limits: { tradesMinInterval, marginRatioCommit, tradeLoss, tradeGain, dailyLoss, dailyGain, monthlyLoss, monthlyGain } } = account;
   const displayTrade = (tradeLoss.money || tradeGain.money || tradeLoss.percent || tradeGain.percent);
   const displayDay = (dailyLoss.money || dailyGain.money || dailyLoss.percent || dailyGain.percent);
   const displayMonth = (monthlyLoss.money || monthlyGain.money || monthlyLoss.percent || monthlyGain.percent);

   function Toolbar() {
      return <RoundIconButton size="small" Icon={Edit} onClick={() => console.log('Edit')} />;
   }

   function ParsePricePercent({ money, percent }) {
      if (money || percent) {
         return <p>
            {money ? <Price amount={money} {...DISPLAY_CONFIG} /> : ''} {money && percent ? ' / ' : ''} {percent ? <Percent value={percent} {...DISPLAY_CONFIG} /> : ''}
         </p>;
      }
   }

   function ParseLabel({ money, percent, children }) {
      if (money || percent) {
         return <label>{children}</label>
      }
   }

   return <Card className="account-settings" padding="xs" elevation={30}>
      <ContentHeader Toolbar={Toolbar}>
         <Settings className="icon" /> <h3 className="card-title">Settings</h3>
      </ContentHeader>

      <SettingRow label="Min Trades Interval" value={`${tradesMinInterval}H`} />
      <SettingRow label="Margin Ratio" value={`${marginRatioCommit}%`} />

      {displayTrade ? <SettingRow
         Label={() => <>
            <ParseLabel money={tradeLoss.money} percent={tradeLoss.percent}>Trade Loss</ParseLabel>
            <ParseLabel money={tradeGain.money} percent={tradeGain.percent}>Trade Gain</ParseLabel>
         </>}
         Value={() => <>
            <ParsePricePercent money={tradeLoss.money} percent={tradeLoss.percent} />
            <ParsePricePercent money={tradeGain.money} percent={tradeGain.percent} />
         </>}
      /> : ''}

      {displayDay ? <SettingRow
         Label={() => <>
            <ParseLabel money={dailyLoss.money} percent={dailyLoss.percent}>Day Loss</ParseLabel>
            <ParseLabel money={dailyGain.money} percent={dailyGain.percent}>Day Gain</ParseLabel>
         </>}
         Value={() => <>
           <ParsePricePercent money={dailyLoss.money} percent={dailyLoss.percent} />
           <ParsePricePercent money={dailyGain.money} percent={dailyGain.percent} />
         </>}
      /> : ''}

      {displayMonth ? <SettingRow
         Label={() => <>
            <ParseLabel money={monthlyLoss.money} percent={monthlyLoss.percent}>Month Loss</ParseLabel>
            <ParseLabel money={monthlyGain.money} percent={monthlyGain.percent}>Month Gain</ParseLabel>
         </>}
         Value={() => <>
            <ParsePricePercent money={monthlyLoss.money} percent={monthlyLoss.percent} />
            <ParsePricePercent money={monthlyGain.money} percent={monthlyGain.percent} />
         </>}
      /> : ''}
   </Card>;
}
