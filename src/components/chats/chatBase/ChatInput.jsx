'use client';

import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import Form from "@/models/Form";
import TextFieldSchema from "@/models/Form/fieldTypes/TextFieldSchema";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useChatContext } from "./ChatBase";

export default function ChatInput() {
   const {  } = useChatContext(); // Access chat context if needed for sending messages

   const formConfig = new Form({
      schema: [
         new TextFieldSchema({
            key: "message",
            placeholder: "Type your message here...",
         })
      ]
   });

   const handleSubmit = async (data) => {
      return { success: true, data };
   };

   return (
      <FormBase
         formID="chat-input-form"
         className="chat-input"
         formSet={formConfig}
         onSubmit={handleSubmit}
         hideSubmit
      >
         <FormInput path="message" multiline minRows={3} maxRows={8} />

         <RoundIconButton
            type="submit"
            color="info"
            className="chat-send-button"
            Icon={SubdirectoryArrowRightIcon}
         />
      </FormBase>
   );
}
