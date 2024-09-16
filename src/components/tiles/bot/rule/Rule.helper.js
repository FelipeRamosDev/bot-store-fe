/**
 * Updates the comparison operator of a rule and handles the response.
 * 
 * @async
 * @function
 * @param {Object} ev - The event object containing the new comparison value.
 * @param {Object} API - The API context for making requests.
 * @param {Object} doc - The current document context.
 * @param {Object} rule - The rule to be updated.
 * @param {Function} setToCompare - Function to update the comparison state.
 * 
 * @throws {Error} Throws an error if the API request fails.
 */
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

/**
 * Parses a comparison operator into a human-readable string.
 * 
 * @function
 * @param {string} operator - The comparison operator to be parsed.
 * @returns {string} The parsed rule title.
 */
export function parseRuleTitle(operator) {
   switch (operator) {
      case '=':
         return 'EQUAL';
      case '!=':
         return 'DIFFERENT';
      case '>':
         return 'GREATER THAN';
      case '>=':
         return 'GREATER OR EQUAL THAN';
      case '<':
         return 'LESS THAN';
      case '<=':
         return 'LESS OR EQUAL THAN';
      default:
         return 'BOOLEAN';
   }
}

/**
 * Deletes a rule from the bot and handles the response.
 * 
 * @async
 * @function
 * @param {Object} API - The API context for making requests.
 * @param {Object} rule - The rule to be deleted.
 * @param {string} botUID - The unique identifier of the bot.
 * 
 * @throws {Error} Throws an error if the API request fails.
 */
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
