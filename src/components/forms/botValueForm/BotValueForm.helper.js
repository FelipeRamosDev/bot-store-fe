import Form from '@/models/Form';

/**
 * Handles form submission for creating or updating a bot value.
 * 
 * @param {Object} data - The form data to be sent to the server.
 * @param {Object} API - The API context for making requests.
 * @param {Object} user - The user context with user details.
 * @param {boolean} editMode - Indicates whether the form is in edit mode.
 * @param {Object} [editData] - The data to pre-fill the form in edit mode (optional).
 * @param {Object} [paramsForm] - The form for function parameters (optional).
 * @param {Function} onSuccess - Callback function to be called on successful submission.
 * 
 * @returns {Promise<void>}
 */
export async function onCreateSubmit(data, API, user, editMode, editData, paramsForm, onSuccess) {
   let reqHttp;

   if (!editMode) {
      reqHttp = async () => await API.ajax.authPut('/bot/add-value', data);
   } else {
      reqHttp = async () => await API.ajax.authPost('/bot/update-value', {
         userUID: user._id,
         valueUID: editData._id,
         botUID: editData.parentBot,
         toUpdate: data
      });
   }

   try {
      if (paramsForm) {
         data.configs = paramsForm.toJSON();
      }

      const response = await reqHttp();
      if (response.error) {
         throw response;
      }
      
      if (response.success) {
         onSuccess(response);
      }
   } catch (err) {
      throw err;
   }
}

/**
 * Configures the form based on the selected function.
 * 
 * @param {string} value - The ID of the selected function.
 * @param {Object} functions - Reference to the functions data.
 * @param {Object} botValueForm - The bot value form object.
 * @param {boolean} editMode - Indicates whether the form is in edit mode.
 * @param {Object} [editData] - The data to pre-fill the form in edit mode (optional).
 * @param {Function} setParamsForm - Function to set the parameters form.
 */
export function presetForm(value, functions, botValueForm, editMode, editData, setParamsForm) {
   if (!functions.current) {
      functions.current = botValueForm.getDependency('functions')?.data;
   }

   const selected = functions.current?.find(item => item.id === value);
   const functionSchema = selected?.options;

   if (functionSchema) {
      const newForm = Form.buildFromBESchema(functionSchema);

      if (editMode && typeof editData?.configs === 'string' && value === editData.functionUID?._id) {
         const parsedConfigs = JSON.parse(editData.configs);
         Object.keys(parsedConfigs).map(key => newForm.setValue(key, parsedConfigs[key]));
      }

      setParamsForm(newForm);
   }
}

/**
 * Parses the primary title for a list item based on its type.
 * 
 * @param {Object} valueDoc - The value document to parse.
 * @returns {string} The title for the list item.
 */
export function parseListTitle(valueDoc) {
   if (valueDoc.valueType === 'function') {
      return valueDoc.functionUID?.title;
   }

   if (valueDoc.valueType === 'primitive') {
      return `Primitive (${valueDoc.primitiveType})`;
   }
}

/**
 * Parses the secondary subtitle for a list item based on its type.
 * 
 * @param {Object} valueDoc - The value document to parse.
 * @returns {string} The subtitle for the list item.
 */
export function parseListSubTitle(valueDoc) {
   if (valueDoc.valueType === 'function') {
      const params = JSON.parse(valueDoc.configs);
      const stringParams = Object.keys(params).map(key => `${key}: ${params[key]}`).join(' | ');
      
      return stringParams;
   }

   if (valueDoc.valueType === 'primitive') {
      return valueDoc.primitiveValue;
   }
}

/**
 * Handles the selection of a bot value from the list and updates the bot or rule accordingly.
 * 
 * @param {Object} valueDoc - The selected value document.
 * @param {Object} API - The API context for making requests.
 * @param {Object} user - The user context with user details.
 * @param {Object} bot - The bot data.
 * @param {Array} [parentThreads] - The parent threads to be appended (optional).
 * @param {Object} [parentRule] - The parent rule to be updated (optional).
 * @param {Function} onSuccess - Callback function to be called on successful selection.
 * 
 * @returns {Promise<void>}
 */
export async function listSelect(valueDoc, API, user, bot, parentThreads, parentRule, onSuccess) {
   let updated;

   try {
      if (parentThreads) {
         updated = await API.ajax.authPost('/bot/update-value', {
            userUID: user._id,
            valueUID: valueDoc._id,
            botUID: bot._id,
            appendThread: parentThreads
         });
      } else {
         updated = await API.ajax.authPost('/bot/update-rule', {
            appendValue: valueDoc._id,
            ruleUID: parentRule?._id,
            botUID: bot._id
         });
      }

      if (updated.error) {
         throw updated;
      }

      if (updated.success) {
         onSuccess(updated);
      }
   } catch (err) {
      throw err;
   }
}
