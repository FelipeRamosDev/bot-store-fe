import Card from "@/components/common/card/Card";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import SubscriptionsTable from "@/components/tables/stripe/subscriptionsTable/SubscriptionsTable";
import TransactionsTable from "@/components/tables/stripe/transactionsTable/TransactionsTable";
import PlanTile from "@/components/tiles/planTile/PlanTile";
import { DBQuery } from "@/contexts/DBQuery";
import { Business, Receipt, Subscriptions } from "@mui/icons-material";

export default function UserInfos({ user, billingAddress, hideSubscriptionBtn = false, isAdmin = false }) {
   const customerId = user?.stripeCustomer?.id;

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

            <ContentHeader>
               <Business /> <h4 className="header-title">Billing Address</h4>
            </ContentHeader>
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

            <ContentHeader>
               <Receipt /> <h4 className="header-title">Transactions</h4>
            </ContentHeader>
            <TransactionsTable isAdmin={isAdmin} customerId={customerId} />
         </div>

         <div className="info-sidebar">
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

            {user && <DBQuery type="doc" collection="plans" filter={{ productId: user?.subscribedPlan?.productId }}>
               <PlanTile subscribedPlan={user?.subscribedPlan} hideSubscriptionBtn={hideSubscriptionBtn} />
            </DBQuery>}

            <ContentHeader>
               <Subscriptions /> <h4 className="header-title">Subscriptions History</h4>
            </ContentHeader>
            {customerId && <SubscriptionsTable isAdmin={isAdmin} customerId={customerId} />}
         </div>
      </div>
   );
}