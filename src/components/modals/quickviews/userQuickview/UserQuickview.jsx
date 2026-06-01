import DBQueryContext, { DBQuery } from "@/contexts/DBQuery";
import ContentModal from "../../base/contentModal/ContentModal";
import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/common/card/Card";
import MastersTable from "@/components/tables/mastersTable/MastersTable";
import SlotsTable from "@/components/tables/slotsTable/SlotsTable";
import PositionsTable from "@/components/tables/positionsTable/PositionsTable";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import PlanTile from "@/components/tiles/planTile/PlanTile";
import TransactionsTable from "@/components/tables/stripe/transactionsTable/TransactionsTable";

export default function UserQuickview({ setModal = () => { } }) {
   const { query = [] } = useContext(DBQueryContext);
   const searchParams = useSearchParams();
   const userIndex = searchParams.get("user");
   const isOpen = !!userIndex;
   const user = query.find(item => item.index === Number(userIndex));
   const billingAddress = user?.billingAddress || {};
   const cardProps = {
      padding: 's',
      className: 'info-card',
   }

   return (
      <ContentModal
         className="user-quickview"
         title={`User Quickview`}
         open={isOpen}
         padding="m"
         size="large"
         onClose={() => setModal(null)}
      >
         <ContentHeader>
            <h3>{user?.fullName}</h3>
         </ContentHeader>

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

         <ContentHeader>
            <h4 className="header-title">Transactions</h4>
         </ContentHeader>
         {user?.stripeCustomer?.id &&<TransactionsTable customerId={user?.stripeCustomer?.id} />}

         <ContentHeader>
            <h4 className="header-title">Master Accounts</h4>
         </ContentHeader>
         {user && <DBQuery type="query" collection="master_accounts" filter={{ user: user?._id }} limit={5}>
            <MastersTable />
         </DBQuery>}

         <ContentHeader>
            <h4 className="header-title">Slots</h4>
         </ContentHeader>
         {user && <DBQuery type="query" collection="slots" filter={{ user: user?._id }} limit={5}>
            <SlotsTable />
         </DBQuery>}

         <ContentHeader>
            <h4 className="header-title">Positions</h4>
         </ContentHeader>
         {user && <DBQuery type="query" collection="positions" filter={{ user: user?._id }} limit={5}>
            <PositionsTable />
         </DBQuery>}
      </ContentModal>
   );
}
