import './BotValueForm.scss';
import { onCreateSubmit, presetForm, parseListTitle, parseListSubTitle, listSelect, onEditSubmit } from './BotValueForm.helper';
import { useState, useRef, useContext } from 'react';
import { FormBase } from '../formBase/FormBase';
import botValueForm from './BotValueForm.config';
import BotValueFormFunction from './BotValueFormFunction';
import BotValueFormPrimitive from './BotValuePrimitive';
import Button from '@mui/material/Button';
import FormInput from '../formBase/FormInput';
import AuthUserContext from '@/contexts/AuthUser';
import APIContext from '@/contexts/4HandsAPI';
import ListDocPicker from '@/components/inputs/listDocPicker/ListDocPicker';
import FunctionsIcon from '@mui/icons-material/Functions';
import AbcIcon from '@mui/icons-material/Abc';

/**
 * A form component for creating or selecting bot values.
 * 
 * This component provides different modes for handling bot values:
 * - "ask" mode: Offers options to create a new bot value or use an existing one.
 * - "create" mode: Allows for the creation of a new bot value, with additional forms for function parameters if needed.
 * - "existent" mode: Allows the user to select an existing bot value from a list.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.initView='ask'] - The initial view mode for the form ("ask", "create", or "existent").
 * @param {Object} [props.parentRule] - The parent rule for the bot value (optional).
 * @param {Array} [props.parentThreads] - The parent threads for the bot value (optional).
 * @param {boolean} [props.editMode=false] - Whether the form is in edit mode.
 * @param {Object} [props.editData] - The data to pre-fill the form in edit mode (optional).
 * @param {Object} [props.bot] - The bot data (optional).
 * @param {string} [props.slug] - The slug for the bot value (optional).
 * @param {string} [props.valueType='function'] - The type of value ("function" or "primitive").
 * @param {Function} [props.onSuccess=() => {}] - Callback function to be called on successful submission.
 * 
 * @returns {JSX.Element} The rendered form component.
 */
export default function BotValueForm({
   initView = 'ask',
   parentRule,
   parentThreads,
   editMode = false,
   editData,
   bot,
   slug,
   valueType = 'function',
   onSuccess = () => {}
}) {
   const API = useContext(APIContext);
   const { user } = useContext(AuthUserContext);
   const [ formType, setFormType ] = useState(initView);
   const [ paramsForm, setParamsForm ] = useState();
   const functions = useRef();
   const formNode = useRef();
   const paramsFormNode = useRef();

   const handleSubmit = async (data) => await onCreateSubmit(data, API, user, editMode, editData, paramsForm, onSuccess);
   const handleSetForm = (data) => presetForm(data, functions, botValueForm, editMode, editData, setParamsForm);
   const handleListSelect = (valueDoc) => listSelect(valueDoc, API, user, bot, parentThreads, parentRule, onSuccess);
   const handleEditSubmit = () => onEditSubmit(formNode, paramsFormNode);

   // ASK MODE
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

   // CREATE MODE
   if (formType === 'create') {
      if (!editMode) {
         botValueForm.setValue('author', user?._id);
         botValueForm.setValue('parentBot', bot?._id);
         botValueForm.setValue('slug', slug);
         botValueForm.setValue('valueType', valueType);

         if (parentRule) {
            botValueForm.setValue('parentRule', parentRule._id);
         }

         if (parentThreads) {
            botValueForm.setValue('parentThreads', parentThreads);
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
            onSubmit={handleSubmit}
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
            <Button color="success" onClick={handleEditSubmit}>Submit</Button>
         </div>
      </>);
   }

   // LINK EXISTENT MODE
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
