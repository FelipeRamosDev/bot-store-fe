import HelpTooltip from "@/components/tooltips/helpTooltip/HelpTooltip";

export default function MarginRoiTooltip() {
   const formula = 'ROI: (PNL x 100) / Initial Margin';
   const descr = `Shows the PNL money amount, and between parenteses, you can see the ROI based on the INITIAL MARGIN amount.`;
   const note = `Note: ROI stands for Return on Investment.`;

   return (
      <HelpTooltip headerTitle="PNL (ROI)">
         <span>{formula}</span>

         <p>{descr}</p>
      </HelpTooltip>
   );
}
