export async function comparisonChange(ev, API, doc, rule, setToCompare) {
   const { target: { value } } = ev;

   try {
      const updated = await API.ajax.authPost('/bot/update-rule', {
         botUID: doc._id,
         ruleUID: rule._id,
         docData: { comparison: value }
      });

      if (updated.error) {
         throw updated;
      }

      if (updated.success) {
         setToCompare(false);
      }
   } catch (err) {
      throw err;
   }
}

export function parseRuleTitle(operator) {
   switch (operator) {
      case '=':
         return 'EQUAL';
      case '!=':
         return 'DIFFERENT';
      case '>':
         return 'GRATER THAN';
      case '>=':
         return 'GRATER OR EQUAL THAN';
      case '<':
         return 'LESS THAN';
      case '<=':
         return 'LESS OR EQUAL THAN';
      default: {
         return 'BOOLEAN';
      }
   }
}

export async function deleteRule(API, rule, botUID) {
   try {
      const deleted = await API.ajax.authDelete('/bot/delete-rule', {
         ruleUID: rule._id,
         botUID: botUID
      });

      if (deleted.error) {
         throw deleted;
      }
   } catch (err) {
      throw err; 
   }
}
