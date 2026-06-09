import Card from "@/components/common/card/Card";
import { Person } from "@mui/icons-material";
import Image from "next/image";

export default function UserTile({ user }) {
   if (!user) {
      return (
         <Card className="user-tile" padding="s">
            <h3 className="tile-title">User Not Found</h3>
         </Card>
      );
   }

   return (
      <Card className="user-tile" padding="s">
         <div className="avatar-wrapper">
            <div className="avatar-container">
               {user.avatarURL ? (
                  <Image
                     className="avatar"
                     src={user.avatarUrl}
                     alt={`${user.fullName}'s avatar`}
                     width={64}
                     height={64}
                  />
               ) : (
                  <Person className="avatar-placeholder" />
               )}
            </div>
         </div>

         <h3 className="tile-title">{user?.fullName || '---'}</h3>
         <a className="tile-subtitle link" href={`mailto:${user?.email || ''}`}>{user?.email || '---'}</a>
         <a className="phone link" href={`tel:${user?.phone || ''}`}>{user?.phone || '---'}</a>
      </Card>
   );
}
