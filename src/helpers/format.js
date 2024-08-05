function formatFractional(amount, fractional) {
   if (typeof amount !== 'number' || typeof fractional !== 'number' || fractional < 0) {
      throw new Error('Invalid input: amount and fractional should be numbers and fractional should be non-negative');
   }

   return Number(amount.toFixed(fractional).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

function toMoney(amount, opt) {
   const { fractional = 2, symbol } = Object(opt);
   const value = formatFractional(amount, fractional);

   if (symbol) {
      return `${symbol} ${value}`;
   } else {
      return value;
   }
}

function toMoneyString(amount, opt) {
   const { fractional = 2, symbol = '$' } = Object(opt);
   return toMoney(amount, { fractional, symbol });
}


function parseValidationErrorMsg(msg) {
   if (msg.indexOf('ValidateModel validation failed:') === 0) {
      const removeTitle = msg.replace('ValidateModel validation failed: ', '');
      const listTheErrors = removeTitle.split(',');

      return listTheErrors.map(item => {
         const parsed = item.split(': ');
         return '- ' + parsed[1];
      }).join('\n');
   }
}

function formatMasterBadges(master) {
   let edgeColor = 'disabled';
   let badgeColor = 'disabled';
   let accountType = '---';

   if (!master) {
      return {};
   }

   if (master.pnl === 0) {
      edgeColor = 'disabled';
   } else if (master.pnl > 0) {
      edgeColor = 'success';
   } else if (master.pnl < 0) {
      edgeColor = 'error';
   }

   if (master.type === 'master-live') {
      accountType = 'LIVE';
      badgeColor = 'success';
   } else if(master.type === 'master-demo') {
      accountType = 'DEMO';
      badgeColor = 'warn';
   }

   return {
      edgeColor,
      badgeColor,
      accountType
   };
}

module.exports = {
   toMoney,
   toMoneyString,
   formatFractional,
   parseValidationErrorMsg,
   formatMasterBadges
};
