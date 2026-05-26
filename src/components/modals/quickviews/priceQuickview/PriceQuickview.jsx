import DBQueryContext from "@/contexts/DBQuery";
import ContentModal from "../../base/contentModal/ContentModal";
import { useContext } from "react";
import { useSearchParams } from "next/navigation";

export default function PriceQuickview({ setModal = () => { } }) {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const searchParams = useSearchParams();
   const priceIndex = searchParams.get("price");

   const price = query.find(p => p.index === Number(priceIndex));
   const isOpen = Boolean(price);

   return (
      <ContentModal
         className="price-quickview"
         title={`${price?.name} Quickview`}
         open={isOpen}
         padding="m"
         size="medium"
         onClose={() => setModal(null)}
      >
         <div className="price-properties">
            <div className="price-property">
               <label>Price Name</label>
               <p className="property-value">{price?.name}</p>
            </div>
            <div className="price-property">
               <label>Features</label>
               <p className="property-value">{price?.features}</p>
            </div>
            <div className="price-property">
               <label>Price ID</label>
               <p className="property-value">{price?.priceId}</p>
            </div>
            <div className="price-property">
               <label>Price Type</label>
               <p className="property-value">{price?.type}</p>
            </div>
            <div className="price-property">
               <label>Price</label>
               <p className="property-value">{price?.price}</p>
            </div>
            <div className="price-property">
               <label>Billing Interval</label>
               <p className="property-value">{price?.interval}</p>
            </div>
            <div className="price-property">
               <label>Currency</label>
               <p className="property-value">{price?.currency}</p>
            </div>
         </div>
      </ContentModal>
   );
}
