import MasterLimitConfigForm from './masterLimitSet/MasterLimitSet.config';

export default {
   schema: [
      { key: 'leverage', type: Number, defaultValue: 120 },
      { key: 'tradesMinInterval', type: Number, defaultValue: 1, min: 1, max: 1440 },
      { key: 'marginRatioCommit', type: Number, defaultValue: 20, min: 1, max: 85 },
      { key: 'monthlyLoss', type: Object, subForm: MasterLimitConfigForm },
      { key: 'dailyLoss', type: Object, subForm: MasterLimitConfigForm },
      { key: 'tradeLoss', type: Object, subForm: MasterLimitConfigForm },
      { key: 'monthlyGain', type: Object, subForm: MasterLimitConfigForm },
      { key: 'dailyGain', type: Object, subForm: MasterLimitConfigForm },
      { key: 'tradeGain', type: Object, subForm: MasterLimitConfigForm },
   ]
}
