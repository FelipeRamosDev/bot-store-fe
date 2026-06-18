import DBQueryContext, { DBQuery } from "@/contexts/DBQuery";
import ContentModal from "../../base/contentModal/ContentModal";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentHeader from "@/components/headers/contentHeader/ContentHeader";
import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import { Add, DataArray } from "@mui/icons-material";
import PricesTable from "@/components/tables/pricesTable/PricesTable";
import CreatePriceModal from "../../createPriceModal/CreatePriceModal";
import PriceQuickview from "../priceQuickview/PriceQuickview";
import RubberButton from "@/components/buttons/rubberButton/RubberButton";
import CreatePlanForm from "@/components/forms/createPlanForm/CreatePlanForm";
import Markdown from "@/components/common/Markdown/Markdown";

export default function PlanQuickview({ setModal = () => { } }) {
   const { query = [] } = useContext(DBQueryContext);
   const [newPriceModal, setNewPriceModal] = useState(false);
   const [editPlan, setEditPlan] = useState(false);
   const searchParams = useSearchParams();
   const planIndex = searchParams.get("plan");
   const router = useRouter();

   const plan = query.find(p => p.index === Number(planIndex));
   const isOpen = Boolean(plan);

   useEffect(() => {
      if (!isOpen) {
         setEditPlan(false)
      }
   }, [isOpen]);

   return (
      <ContentModal
         className="plan-quickview"
         title={`${plan?.name} Quickview`}
         open={isOpen}
         padding="m"
         size="medium"
         onClose={() => setModal(null)}
      >
         {!editPlan && <div className="plan-properties">
            <div className="plan-property">
               <label>Plan Name</label>
               <p className="property-value">{plan?.name}</p>
            </div>
            <div className="plan-property">
               <label>Product ID</label>
               <p className="property-value">{plan?.productId}</p>
            </div>
            <div className="plan-property">
               <label>Summary</label>
               <Markdown className="property-value" value={plan?.summary || '---'} />
            </div>
            <div className="plan-property">
               <label>Features</label>
               <Markdown className="property-value" value={plan?.features || '---'} />
            </div>
            <div className="plan-property">
               <label>Wallet Limit</label>
               <p className="property-value">{plan?.walletLimit}</p>
            </div>
            <div className="plan-property">
               <label>Slot Limit</label>
               <p className="property-value">{plan?.slotLimit}</p>
            </div>
            <div className="plan-property">
               <label>Wallet Limit (Demo)</label>
               <p className="property-value">{plan?.walletLimitDemo}</p>
            </div>
            <div className="plan-property">
               <label>Slot Limit (Demo)</label>
               <p className="property-value">{plan?.slotLimitDemo}</p>
            </div>
         </div>}

         {!editPlan && <RubberButton fullWidth color="success" onClick={() => setEditPlan(true)}>Edit Plan</RubberButton>}
         {editPlan && <CreatePlanForm
            editData={plan}
            onSuccess={() => {
               setEditPlan(false);
               router.refresh();
            }}
         />}

         <div className="plan-prices">
            <ContentHeader
               Toolbar={() => <RoundIconButton Icon={Add} onClick={() => setNewPriceModal(true)} />}
            >
               <DataArray /> <h3 className="card-title">Pricing</h3>
            </ContentHeader>

            {!newPriceModal && (
               <DBQuery
                  type="query"
                  collection="prices"
                  filter={{ plan: plan?.id }}
               >
                  <PricesTable />
                  <PriceQuickview setModal={() => {
                     const params = new URLSearchParams(searchParams);
                     params.delete("price");
                     router.push(`?${params.toString()}`);
                  }} />
               </DBQuery>
            )}
         </div>

         <CreatePriceModal planUID={plan?.id} open={newPriceModal} setModal={setNewPriceModal} />
      </ContentModal>
   );
}
