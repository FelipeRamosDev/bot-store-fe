import Wallets from "@/components/content/howItWorks/wallets/Wallets";
import BasePage from "@/templates/basePage/BasePage";

export default function WalletsPage() {
   return (
      <BasePage className="wallets" fullContainer={false}>
         <Wallets />
      </BasePage>
   );
}

