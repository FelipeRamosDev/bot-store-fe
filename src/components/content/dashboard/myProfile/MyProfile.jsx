'use client';

import MyProfileTopPage from "./MyProfileTopPage";
import MyProfileInfos from "./MyProfileInfos";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import AddressMissing from "@/components/bars/topBars/addressMissing/AddressMissing";

export default function MyProfile() {
   const [mounted, setMounted] = useState(false);

   function MissingAddressBar() {
      return mounted && createPortal(
         <AddressMissing />,
         document.getElementById('topbar-portal')
      );
   }

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <div className="my-profile">
         <MissingAddressBar />

         <MyProfileTopPage />
         <MyProfileInfos />
      </div>
   );
}
