import RootAuthProvider from "@/providers/RootAuthProvider";
import BasePage from "../basePage/BasePage";
import TopHeaderAuth from "@/components/headers/topHeader/TopHeaderAuth";

export default function AdminBasePage({ children, className, ...props }) {
   return (
      <RootAuthProvider rules={['master']} {...props}>
         <BasePage className={className} headerMenu="auth" CustomHeader={TopHeaderAuth} fullContainer>
            {children}
         </BasePage>
      </RootAuthProvider>
   );
}
