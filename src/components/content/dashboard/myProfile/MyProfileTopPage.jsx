import Card from "@/components/common/card/Card";
import PersonIcon from '@mui/icons-material/Person';
import { Edit } from "@mui/icons-material";
import { useContext } from "react";
import AuthUserContext from "@/contexts/AuthUser";

export default function MyProfileTopPage() {
   const { user } = useContext(AuthUserContext);

   return (
      <div className="top-page container">
         <Card className="top-page-card">
            <h1 className="top-page-title">{user?.fullName}</h1>

            <div className="content-wrap">
               <div className="avatar-wrap">
                  <PersonIcon className="avatar-icon" />

                  <div className="overlay">
                     <Edit className="overlay-icon" />
                     <span className="overlay-text">Edit Avatar</span>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
}