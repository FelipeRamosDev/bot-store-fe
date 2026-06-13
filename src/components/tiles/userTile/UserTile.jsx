import Avatar from "@/components/common/avatar/Avatar";
import Card from "@/components/common/card/Card";

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
            <Avatar avatarUrl={user?.avatarUrl} size={64} />
         </div>

         <h3 className="tile-title">{user?.fullName || '---'}</h3>
         <a className="tile-subtitle link" href={`mailto:${user?.email || ''}`}>{user?.email || '---'}</a>
         <a className="phone link" href={`tel:${user?.phone || ''}`}>{user?.phone || '---'}</a>
      </Card>
   );
}
