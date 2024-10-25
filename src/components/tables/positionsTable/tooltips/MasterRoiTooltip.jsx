import HelpTooltip from "@/components/tooltips/helpTooltip/HelpTooltip";

export default function MasterRoiTooltip() {
   const formula = 'ROI: (PNL x 100) / Wallet Balance';
   const descr = `This refers to the ROI over the parent master account balance.`;
   const note = `Note: ROI stands for Return on Investment.`;

   return (
      <HelpTooltip headerTitle="ROI / Balance">
         <span>{formula}</span>

         <p>{descr}</p>
      </HelpTooltip>
   );
}
