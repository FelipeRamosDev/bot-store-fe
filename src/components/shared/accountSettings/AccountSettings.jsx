import './AccountSettings.scss';
import Card from '@/components/common/card/Card';
import SettingRow from './settingRow/SettingRow';
import Price from '@/components/displays/price/Price';
import Percent from '@/components/displays/percent/Percent';

const DISPLAY_CONFIG = { noColor: true };

export default function AccountSettings({ account }) {
   if (!account) {
      return <></>;
   }

   const { limits } = account;

   return <Card className="account-settings" padding="xs" elevation={30}>
      <SettingRow label="Max. Leverage" value={`${limits.leverage}x`} />
      <SettingRow label="Min Trades Interval" value={`${limits.tradesMinInterval}H`} />
      <SettingRow label="Margin Ratio" value={`${limits.marginRatioCommit}%`} />

      <SettingRow
         Label={() => <>
            <label>Trade Loss</label>
            <label>Trade Gain</label>
         </>}
         Value={() => <>
            <p><Price amount={limits.tradeLoss.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.tradeLoss.percent} {...DISPLAY_CONFIG} /></p>
            <p><Price amount={limits.tradeGain.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.tradeGain.percent} {...DISPLAY_CONFIG} /></p>
         </>}
      />

      <SettingRow
         Label={() => <>
            <label>Day Loss</label>
            <label>Day Gain</label>
         </>}
         Value={() => <>
           <p><Price amount={limits.dailyLoss.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.dailyLoss.percent} {...DISPLAY_CONFIG} /></p>
           <p><Price amount={limits.dailyGain.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.dailyGain.percent} {...DISPLAY_CONFIG} /></p>
         </>}
      />

      <SettingRow
         Label={() => <>
            <label>Month Loss</label>
            <label>Month Gain</label>
         </>}
         Value={() => <>
            <p><Price amount={limits.monthlyLoss.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.monthlyLoss.percent} {...DISPLAY_CONFIG} /></p>
            <p><Price amount={limits.monthlyGain.money} {...DISPLAY_CONFIG} /> / <Percent value={limits.monthlyGain.percent} {...DISPLAY_CONFIG} /></p>
         </>}
      />
   </Card>;
}
