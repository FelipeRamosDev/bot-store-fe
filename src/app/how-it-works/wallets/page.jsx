import Wallets from "@/components/content/howItWorks/wallets/Wallets";
import BasePage from "@/templates/basePage/BasePage";

export const metadata = {
   title: 'Wallets | CandlePilot',
   description: 'Understand how wallets are connected and used.',
};

export default function WalletsPage() {
   return (
      <BasePage className="wallets" fullContainer={false}>
         <Wallets />
      </BasePage>
   );
}

