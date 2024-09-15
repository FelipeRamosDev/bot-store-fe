import Form from '@/models/Form';

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

export function parseListTitle(valueDoc) {
   if (valueDoc.valueType === 'function') {
      return valueDoc.functionUID?.title;
   }

   if (valueDoc.valueType === 'primitive') {
      return `Primitive (${valueDoc.primitiveType})`;
   }
}

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

export function onEditSubmit(formNode, paramsFormNode) {
   formNode.current?.requestSubmit();
   paramsFormNode.current?.requestSubmit();
}
