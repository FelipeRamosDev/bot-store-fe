import HelpTooltip from "@/components/tooltips/helpTooltip/HelpTooltip";

export default function NotionalRoiTooltip() {
   const formula = 'ROI: (Realized Amount x 100) / Initial Notional';
   const descr = `Shows the money amount realized, after discounted the Binance commissions, and between parenteses, you can see the ROI based on the INITIAL NOTIONAL amount.`;
   const note = `Note: ROI stands for Return on Investment.`;

   return (
      <HelpTooltip headerTitle="Realized (ROI)">
         <span>{formula}</span>

         <p>{descr}</p>
         <i>{note}</i>
      </HelpTooltip>
   );
}
