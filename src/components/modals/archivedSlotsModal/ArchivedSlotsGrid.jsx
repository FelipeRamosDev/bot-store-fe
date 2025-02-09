import SlotsGrid from "@/components/grids/slotsGrid/SlotsGrid";
import DBQueryContext from "@/contexts/DBQuery";
import { useContext } from "react";

export default function ArchivedSlotsGrid({ master }) {
   const { query } = useContext(DBQueryContext);

   return <SlotsGrid master={master} slots={query} hideHeader hideNoDocumentsTile />
}
