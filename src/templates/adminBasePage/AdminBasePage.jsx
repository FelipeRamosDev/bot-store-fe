import RootAuthProvider from "@/providers/RootAuthProvider";
import BasePage from "../basePage/BasePage";
import TopHeaderAdmin from "@/components/headers/topHeader/TopHeaderAdmin";

export default function AdminBasePage({ children, className, ...props }) {
   return (
      <RootAuthProvider rules={['master']} {...props}>
         <BasePage className={className} headerMenu="auth" CustomHeader={TopHeaderAdmin} fullContainer>
            {children}
         </BasePage>
      </RootAuthProvider>
   );
}
