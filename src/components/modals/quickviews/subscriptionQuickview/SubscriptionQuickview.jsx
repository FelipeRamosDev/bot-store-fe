import ContentModal from "../../base/contentModal/ContentModal";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import Card from "@/components/common/card/Card";
import Markdown from "@/components/common/Markdown/Markdown";
import UserTile from "@/components/tiles/userTile/UserTile";

const cardProps = {
   padding: 's',
   className: 'info-card',
};

export default function SubscriptionQuickview({ subscription, onClose = () => { } }) {
   const isOpen = !!subscription;

   const plan = subscription?.plan || {};
   const price = subscription?.price || {};

   return (
      <ContentModal
         className="subscription-quickview"
         title="Subscription Quickview"
         open={isOpen}
         padding="m"
         size="large"
         onClose={onClose}
      >
         <ContentHeader>
            <h3>{plan?.name}</h3>
         </ContentHeader>

         <div className="info-section">
            <div className="info-content">
               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Status:</label>
                     <span>{subscription?.status || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Collection Method:</label>
                     <span>{subscription?.collectionMethod || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Currency:</label>
                     <span>{subscription?.currency?.toUpperCase() || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Quantity:</label>
                     <span>{subscription?.quantity ?? "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Livemode:</label>
                     <span>{subscription?.livemode ? "Yes" : "No"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Created:</label>
                     <span>{subscription?.createdDate ? new Date(subscription.createdDate).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Start Date:</label>
                     <span>{subscription?.startDate ? new Date(subscription.startDate).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Billing Cycle Anchor:</label>
                     <span>{subscription?.billingCycleAnchorDate ? new Date(subscription.billingCycleAnchorDate).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Current Period Start:</label>
                     <span>{subscription?.currentPeriodStart ? new Date(subscription.currentPeriodStart).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Current Period End:</label>
                     <span>{subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleString() : "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Cancel At Period End:</label>
                     <span>{subscription?.cancelAtPeriodEnd ? "Yes" : "No"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Cancel At:</label>
                     <span>{subscription?.cancelAt ? new Date(subscription.cancelAt).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Canceled At:</label>
                     <span>{subscription?.canceledAt ? new Date(subscription.canceledAt).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Ended At:</label>
                     <span>{subscription?.endedAt ? new Date(subscription.endedAt).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Trial Start:</label>
                     <span>{subscription?.trialStart ? new Date(subscription.trialStart).toLocaleString() : "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Trial End:</label>
                     <span>{subscription?.trialEnd ? new Date(subscription.trialEnd).toLocaleString() : "---"}</span>
                  </div>
               </Card>
            </div>

            <div className="info-sidebar">
               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Plan Name:</label>
                     <span>{plan?.name || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Summary:</label>
                     <span>{plan?.summary || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Interval:</label>
                     <span>{plan?.interval || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Amount:</label>
                     <span>{plan?.amount || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Features:</label>
                     <Markdown value={plan?.features || "---"} />
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Price Interval:</label>
                     <span>{price?.interval || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Price Amount:</label>
                     <span>{price?.amount || "---"}</span>
                  </div>
               </Card>

               <UserTile user={subscription?.user} />
            </div>
         </div>
      </ContentModal>
   );
}
