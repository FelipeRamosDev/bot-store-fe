import { useContext, useEffect, useState } from "react";
import TopAlertBar from "../../base/topAlertBar/TopAlertBar";
import AuthUserContext from "@/contexts/AuthUser";

export default function AddressMissing() {
   const { user } = useContext(AuthUserContext)
   const [ show, setShow ] = useState(false);

   function close() {
      setShow(false);
   }

   useEffect(() => {
      if (!user?.billingAddress) {
         setShow(true);
      } else {
         setShow(false);
      }
   }, [user]);

   return (
      <TopAlertBar
         show={show}
         close={close}
      >
         It's required to add an address in order to use your account. Please fill in the address fields below.
      </TopAlertBar>
   );
} 
