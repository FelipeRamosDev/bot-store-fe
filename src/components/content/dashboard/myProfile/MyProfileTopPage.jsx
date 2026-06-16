import Card from "@/components/common/card/Card";
import { useContext } from "react";
import AuthUserContext from "@/contexts/AuthUser";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import Form from "@/models/Form";
import FileInputFieldSchema from "@/models/Form/fieldTypes/FileInputFieldSchema";
import useUser from "@/hooks/useUser";
import Avatar from "@/components/common/avatar/Avatar";
import { useRouter } from "next/navigation";

export default function MyProfileTopPage() {
   const { user } = useContext(AuthUserContext);
   const { avatar: { uploadAvatar } } = useUser();
   const router = useRouter();

   const formSet = new Form({
      schema: [
         new FileInputFieldSchema({
            key: 'avatar'
         })
      ]
   });

   const handleFileInputChange = async (files) => {
      const [file] = files;

      if (!file) {
         return;
      }

      try {
         await uploadAvatar(file);
         router.refresh();
      } catch (error) {
         console.error('Error uploading file:', error);
      }
   }

   return (
      <div className="top-page container">
         <Card className="top-page-card">
            <h1 className="top-page-title">{user?.fullName}</h1>

            <div className="content-wrap">
               <FormBase
                  formID="user-avatar"
                  formSet={formSet}
                  hideSubmit
               >
                  <Avatar avatarUrl={user?.avatarUrl} size={150}>
                     <span className="overlay-text">Edit Avatar</span>

                     <FormInput path="avatar" onChange={(files) => handleFileInputChange(files)} />
                  </Avatar>
               </FormBase>
            </div>
         </Card>
      </div>
   );
}