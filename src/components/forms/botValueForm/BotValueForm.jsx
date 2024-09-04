import './BotValueForm.scss';
import { useState, useRef, useEffect, useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import botValueForm from './BotValueForm.config';
import BotValueFormFunction from './BotValueFormFunction';
import Button from '@mui/material/Button';
import Form from '@/models/Form';
import FormInput from '../formBase/FormInput';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';

export default function BotValueForm({ bot, slug, valueType = 'function', onSuccess = () => {} }) {
   const { user } = useContext(AuthUserContext);
   const API = useContext(APIContext);
   const [ formType, setFormType ] = useState('ask');
   const [ paramsForm, setParamsForm ] = useState();
   const functions = useRef();
   const formNode = useRef();
   const paramsFormNode = useRef();

   async function onSubmit(data) {
      try {
         data.configs = paramsForm.toJSON();

         const created = await API.ajax.authPut('/bot/add-value', data);
         if (created.error) {
            throw created;
         }
         
         if (created.success) {
            onSuccess(created);
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
         setParamsForm(Form.buildFromBESchema(functionSchema));
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
      botValueForm.setValue('author', user?._id);
      botValueForm.setValue('bot', bot._id);
      botValueForm.setValue('slug', slug);
      botValueForm.setValue('valueType', valueType);

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
            submitLabel="Save"
         >
            {valueType === 'function' && <BotValueFormFunction onCustomChange={handleSetForm} />}
         </FormBase>

         {paramsForm && <FormBase
            anchorRef={paramsFormNode}
            formID="function-params-form"
            formSet={paramsForm}
            hideSubmit={true}
         >
            {paramsFormFields.map(item => <FormInput key={item.key} path={item.key} />)}
         </FormBase>}

         <Button onClick={() => {
            formNode.current?.requestSubmit();
            paramsFormNode.current?.requestSubmit();
         }}>Submit</Button>
      </>);
   }

   if (formType === 'existent') {
      return <></>;
   }

   return <></>;
}
