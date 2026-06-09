import ContentModal from "../../base/contentModal/ContentModal";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import Card from "@/components/common/card/Card";

const cardProps = {
   padding: 's',
   className: 'info-card',
};

export default function TransactionQuickview({ transaction, onClose = () => { } }) {
   const isOpen = !!transaction;

   const card = transaction?.card || {};
   const billingAddress = transaction?.billingAddress || {};
   const outcome = transaction?.outcome || {};

   if (!transaction) {
      return null;
   }

   return (
      <ContentModal
         className="transaction-quickview"
         title="Transaction Quickview"
         open={isOpen}
         padding="m"
         size="large"
         onClose={onClose}
      >
         <ContentHeader>
            <h3>{transaction?.description || transaction?.calculatedStatementDescriptor || "Transaction Details"}</h3>
         </ContentHeader>

         <div className="info-section">
            <div className="info-content">
               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Status:</label>
                     <span>{transaction?.statusLabel || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Mode:</label>
                     <span>{transaction?.mode || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Paid:</label>
                     <span>{transaction?.paid ? "Yes" : "No"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Captured:</label>
                     <span>{transaction?.captured ? "Yes" : "No"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Refunded:</label>
                     <span>{transaction?.refunded ? "Yes" : "No"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Disputed:</label>
                     <span>{transaction?.disputed ? "Yes" : "No"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Created:</label>
                     <span>{transaction?.created || "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Amount:</label>
                     <span>{transaction?.amount || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Amount Captured:</label>
                     <span>{transaction?.amountCaptured || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Amount Refunded:</label>
                     <span>{transaction?.amountRefunded || "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Card Brand:</label>
                     <span>{card?.brand || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Card Number:</label>
                     <span>{card?.last4 || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Expiry:</label>
                     <span>{card?.expiry || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Funding:</label>
                     <span>{card?.funding || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Network:</label>
                     <span>{card?.network || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Card Country:</label>
                     <span>{card?.country || "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Billing Name:</label>
                     <span>{billingAddress?.name || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Billing Email:</label>
                     <span>{billingAddress?.email || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Billing Phone:</label>
                     <span>{billingAddress?.phone || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Billing Address:</label>
                     <span>{billingAddress?.formatted || "---"}</span>
                  </div>
               </Card>

               {(transaction?.failureCode || transaction?.failureMessage) && (
                  <Card {...cardProps}>
                     <div className="info-prop">
                        <label>Failure Code:</label>
                        <span>{transaction?.failureCode || "---"}</span>
                     </div>
                     <div className="info-prop">
                        <label>Failure Message:</label>
                        <span>{transaction?.failureMessage || "---"}</span>
                     </div>
                  </Card>
               )}
            </div>

            <div className="info-sidebar">
               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Transaction ID:</label>
                     <span>{transaction?.id || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Payment Intent:</label>
                     <span>{transaction?.paymentIntent || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Payment Method:</label>
                     <span>{transaction?.paymentMethod || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Balance Transaction:</label>
                     <span>{transaction?.balanceTransaction || "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Name:</label>
                     <span>{`${transaction?.user?.firstName || "---"} ${transaction?.user?.lastName || ""}`}</span>
                  </div>
                  <div className="info-prop">
                     <label>Email:</label>
                     <span>{transaction?.user?.email || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Phone:</label>
                     <span>{transaction?.user?.phone || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Customer ID:</label>
                     <span>{transaction?.customer || "---"}</span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Receipt Number:</label>
                     <span>{transaction?.receiptNumber || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Receipt Email:</label>
                     <span>{transaction?.receiptEmail || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Receipt URL:</label>
                     <span>
                        {transaction?.receiptUrl
                           ? <a href={transaction.receiptUrl} target="_blank" rel="noreferrer">View Receipt</a>
                           : "---"}
                     </span>
                  </div>
               </Card>

               <Card {...cardProps}>
                  <div className="info-prop">
                     <label>Outcome:</label>
                     <span>{outcome?.status || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Outcome Type:</label>
                     <span>{outcome?.type || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Risk Level:</label>
                     <span>{outcome?.riskLevel || "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Risk Score:</label>
                     <span>{outcome?.riskScore ?? "---"}</span>
                  </div>
                  <div className="info-prop">
                     <label>Message:</label>
                     <span>{outcome?.message || "---"}</span>
                  </div>
               </Card>
            </div>
         </div>
      </ContentModal>
   );
}
