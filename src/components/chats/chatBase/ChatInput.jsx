'use client';

import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import Form from "@/models/Form";
import TextFieldSchema from "@/models/Form/fieldTypes/TextFieldSchema";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useChatContext } from "./ChatBase";

export default function ChatInput() {
   const { onSubmit, newHistoryItem } = useChatContext(); // Access chat context if needed for sending messages

   const formConfig = new Form({
      schema: [
         new TextFieldSchema({
            key: "message",
            placeholder: "Type your message here...",
         })
      ]
   });

   const handleSubmit = async (formData) => {
      newHistoryItem({
         messageId: `temp-${Date.now()}`,
         role: 'user',
         content: formData.message
      });

      if (onSubmit) {
         await onSubmit(formData);
      }
   }

   return (
      <FormBase
         formID="chat-input-form"
         className="chat-input"
         formSet={formConfig}
         onSubmit={handleSubmit}
         hideSubmit
      >
         <FormInput
            path="message"
            minRows={3}
            maxRows={8}
            multiline
         />

         <RoundIconButton
            type="submit"
            color="info"
            className="chat-send-button"
            Icon={SubdirectoryArrowRightIcon}
         />
      </FormBase>
   );
}
