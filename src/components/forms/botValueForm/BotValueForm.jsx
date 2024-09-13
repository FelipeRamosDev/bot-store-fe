import './BotValueForm.scss';
import { useState, useRef, useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import botValueForm from './BotValueForm.config';
import BotValueFormFunction from './BotValueFormFunction';
import BotValueFormPrimitive from './BotValuePrimitive';
import Button from '@mui/material/Button';
import Form from '@/models/Form';
import FormInput from '../formBase/FormInput';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';
import ListDocPicker from '@/components/inputs/listDocPicker/ListDocPicker';
import FunctionsIcon from '@mui/icons-material/Functions';
import AbcIcon from '@mui/icons-material/Abc';

export default function BotValueForm({ initView = 'ask', parentRule, editMode = false, editData, bot, slug, valueType = 'function', onSuccess = () => {} }) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const [ formType, setFormType ] = useState(initView);
   const [ paramsForm, setParamsForm ] = useState();
   const functions = useRef();
   const formNode = useRef();
   const paramsFormNode = useRef();

   async function onSubmit(data) {
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

   function handleSetForm(value) {
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

   function parseListTitle(valueDoc) {
      if (valueDoc.valueType === 'function') {
         return valueDoc.functionUID?.title;
      }

      if (valueDoc.valueType === 'primitive') {
         return `Primitive (${valueDoc.primitiveType})`;
      }
   }

   function parseListSubTitle(valueDoc) {
      if (valueDoc.valueType === 'function') {
         const params = JSON.parse(valueDoc.configs);
         const stringParams = Object.keys(params).map(key => `${key}: ${params[key]}`).join(' | ');
         
         return stringParams;
      }

      if (valueDoc.valueType === 'primitive') {
         return valueDoc.primitiveValue;
      }
   }

   async function handleListSelect(valueDoc) {
      let updated;

      try {
         if (slug) {
            updated = await API.ajax.authPost('/bot/update-value', {
               userUID: user._id,
               valueUID: valueDoc._id,
               botUID: bot._id,
               toUpdate: { slug }
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

   if (formType === 'ask') {
      return (
         <div className="buttons-wrap">
            <Button
               color="info"
               fullWidth={true}
               onClick={() => setFormType('create')}
            >
               Create New One
            </Button>

            <Button
               color="info"
               fullWidth={true}
               onClick={() => setFormType('existent')}
               disabled={!Boolean(bot?.values?.length)}
            >
               Use Existent One
            </Button>
         </div>
      );
   }

   if (formType === 'create') {
      if (!editMode) {
         botValueForm.setValue('author', user?._id);
         botValueForm.setValue('parentBot', bot?._id);
         botValueForm.setValue('slug', slug);
         botValueForm.setValue('valueType', valueType);

         if (parentRule) {
            botValueForm.setValue('parentRule', parentRule._id);
         }
      }

      botValueForm.setDependency({
         id: 'functions',
         queryType: 'query',
         collection: 'functions',
         filter: {}
      });

      const paramsFormFields = [];
      paramsForm?._schema.forEach(item => paramsFormFields.push(item));

      return (<>
         <FormBase
            anchorRef={formNode}
            formID="bot-value-form"
            formSet={botValueForm}
            onSubmit={onSubmit}
            hideSubmit={true}
            editData={editData}
            submitLabel="Save"
            onReady={() => {
               const functionUID = editData?.functionUID?._id;

               if (editData?.functionUID?._id && !paramsForm) {
                  handleSetForm(functionUID);
               }
            }}
         >
            {valueType === 'function' && <BotValueFormFunction onCustomChange={handleSetForm} />}
            {valueType === 'primitive' && <BotValueFormPrimitive />}
         </FormBase>

         {paramsForm && <FormBase
            anchorRef={paramsFormNode}
            formID="function-params-form"
            formSet={paramsForm}
            editData={editData?.configs ? JSON.parse(editData?.configs) : undefined}
            hideSubmit={true}
         >
            {paramsFormFields.map(item => <FormInput key={item.key} path={item.key} />)}
         </FormBase>}

         <div className="bot-value-form button-wrap">
            <Button color="success" onClick={() => {
               formNode.current?.requestSubmit();
               paramsFormNode.current?.requestSubmit();
            }}>
               Submit
            </Button>
         </div>
      </>);
   }

   if (formType === 'existent') {
      return (
         <div className="existent-value">
            <h4 className="title">Choose an existent bot value to use</h4>

            <ListDocPicker
               docList={bot.values}
               onSelect={handleListSelect}
               parsePrimary={parseListTitle}
               parseSecondary={parseListSubTitle}
               AvatarIcon={({ doc }) => (doc.valueType === 'function') ? <FunctionsIcon /> : <AbcIcon />}
            />
         </div>
      )
   }

   return <></>;
}
