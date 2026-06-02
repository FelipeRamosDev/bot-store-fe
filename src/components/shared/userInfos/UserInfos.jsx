import Card from "@/components/common/card/Card";
import PlanTile from "@/components/tiles/planTile/PlanTile";
import { DBQuery } from "@/contexts/DBQuery";

export default function UserInfos({ user, billingAddress }) {
   const cardProps = {
      padding: 's',
      className: 'info-card',
   }

   return (
      <div className="info-section">
         <div className="info-content">
            <Card {...cardProps}>
               <div className="info-prop">
                  <label>Email:</label>
                  <span>{user?.email}</span>
               </div>
               <div className="info-prop">
                  <label>Phone:</label>
                  <span>{user?.phone || "---"}</span>
               </div>
               <div className="info-prop">
                  <label>Birthdate:</label>
                  <span>{user?.birthdate ? new Date(user.birthdate).toLocaleDateString() : "---"}</span>
               </div>
            </Card>

            <Card {...cardProps}>
               <div className="info-prop">
                  <label>Address Line 1:</label>
                  <span>{billingAddress?.address1}</span>
               </div>
               <div className="info-prop">
                  <label>Address Line 2:</label>
                  <span>{billingAddress?.address2 || "---"}</span>
               </div>
               <div className="info-prop">
                  <label>City:</label>
                  <span>{billingAddress?.city || "---"}</span>
               </div>
               <div className="info-prop">
                  <label>State:</label>
                  <span>{billingAddress?.state || "---"}</span>
               </div>
               <div className="info-prop">
                  <label>Postal Code:</label>
                  <span>{billingAddress?.postalCode || "---"}</span>
               </div>
            </Card>
         </div>

         <div className="info-sidebar">
            {user && <DBQuery type="doc" collection="plans" filter={{ productId: user?.subscribedPlan?.productId }}>
               <PlanTile subscribedPlan={user?.subscribedPlan} />
            </DBQuery>}

            <Card {...cardProps}>
               <div className="info-prop">
                  <label>Created At:</label>
                  <span>{new Date(user?.createdAt).toLocaleString()}</span>
               </div>
               <div className="info-prop">
                  <label>Last Updated:</label>
                  <span>{new Date(user?.modifiedAt).toLocaleString()}</span>
               </div>
            </Card>
         </div>
      </div>
   );
}