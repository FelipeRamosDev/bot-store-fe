import Card from "@/components/common/card/Card";
import PersonIcon from '@mui/icons-material/Person';
import { Edit } from "@mui/icons-material";
import { useContext, useState } from "react";
import AuthUserContext from "@/contexts/AuthUser";
import { FormBase } from "@/components/forms/formBase/FormBase";
import FormInput from "@/components/forms/formBase/FormInput";
import Form from "@/models/Form";
import FileInputFieldSchema from "@/models/Form/fieldTypes/FileInputFieldSchema";
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function MyProfileTopPage() {
   const { user } = useContext(AuthUserContext);
   const { avatar: { uploadAvatar} } = useUser();
   const [avatarError, setAvatarError] = useState(false);

   const formSet = new Form({
      schema: [
         new FileInputFieldSchema({
            key: 'avatar',
            label: 'Upload your avatar',
         })
      ]
   });

   const handleFileInputChange = async (files) => {
      const [ file ] = files;
      
      if (!file) {
         return;
      }

      try {
         await uploadAvatar(file);
      } catch (error) {
         console.error('Error uploading file:', error);
      }
   }

   return (
      <div className="top-page container">
         <Card className="top-page-card">
            <h1 className="top-page-title">{user?.fullName}</h1>

            <div className="content-wrap">
               <div className="avatar-wrap">
                  {(!user?.avatarUrl || avatarError) && <PersonIcon className="avatar-icon" />}
                  {user?.avatarUrl && !avatarError && (
                     <Image
                        className="avatar-image"
                        alt="user avatar"
                        src={user?.avatarUrl}
                        onError={() => setAvatarError(true)}
                        fill
                     />
                  )}

                  <FormBase
                     className={`overlay ${!user?.avatarUrl || avatarError ? 'empty' : ''}`}
                     formID="user-avatar"
                     formSet={formSet}
                     hideSubmit
                  >
                     <Edit className="overlay-icon" />
                     <span className="overlay-text">Edit Avatar</span>

                     <FormInput path="avatar" onChange={(files) => handleFileInputChange(files)} />
                  </FormBase>
               </div>
            </div>
         </Card>
      </div>
   );
}