import './BotValueForm.scss';
import { useState, useRef, useContext, useEffect } from 'react';
import { FormBase } from '../formBase/FormBase';
import botValueForm from './BotValueForm.config';
import BotValueFormFunction from './BotValueFormFunction';
import BotValueFormPrimitive from './BotValuePrimitive';
import Button from '@mui/material/Button';
import Form from '@/models/Form';
import FormInput from '../formBase/FormInput';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';

export default function BotValueForm({ initView = 'ask', editMode = false, editData, bot, slug, valueType = 'function', onSuccess = () => {} }) {
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
            botUID: editData.bot,
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

   if (formType === 'ask') {
      return (
         <div className="buttons-wrap">
            <Button color="info" fullWidth={true} onClick={() => setFormType('create')}>
               Create New One
            </Button>

            <Button color="info" fullWidth={true} onClick={() => setFormType('existent')}>
               Use Existent One
            </Button>
         </div>
      );
   }

   if (formType === 'create') {
      if (!editMode) {
         botValueForm.setValue('author', user?._id);
         botValueForm.setValue('bot', bot?._id);
         botValueForm.setValue('slug', slug);
         botValueForm.setValue('valueType', valueType);
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
      return <></>;
   }

   return <></>;
}
