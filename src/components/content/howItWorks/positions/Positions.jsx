import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotCardImg from "../../home/img/BotCardImg";
import PageNavigationFooter from "@/components/footers/pageNavigationFooter/PageNavigationFooter";

export default function Positions() {
   return (
      <div className="how-it-works-content positions">
         <StandardPageHeader pageTitle="Positions" titleLabel="How it works" Background={BotCardImg} />

         <div className="text-content container">
            <p>In CandlePilot, a Position is an active or completed trade created by a Slot when strategy conditions are met. It is the direct trading result of your automation logic in live or demo mode.</p>

            <p>Positions connect strategy decisions to execution outcomes. They hold the entry and exit data, risk levels, fees, and performance values needed to understand how each trade behaved over time.</p>

            <h2>What a Position Represents</h2>

            <p>Each position records core execution and performance information, including:</p>

            <ul className="bullet-list">
               <li>Trade direction (long or short)</li>
               <li>Market context such as symbol, interval, and market type</li>
               <li>Entry and exit values such as open, close, stop, and target pricing</li>
               <li>Status lifecycle (opened or closed)</li>
               <li>Margin, leverage, quantity, and balance-related fields</li>
               <li>PnL, realized profit, ROI, and trade fee data</li>
               <li>Linked wallet, slot, bot, and related orders</li>
               <li>Verification and fix metadata for recovery scenarios</li>
            </ul>

            <h2>How Positions Work in Practice</h2>

            <ol className="numbered-list">
               <li>
                  <strong>Signal and open</strong>
                  A slot evaluates strategy conditions and opens a position when entry requirements are satisfied.
               </li>
               <li>
                  <strong>Track in real time</strong>
                  While opened, the position is updated with current pricing, floating PnL, and calculated performance values.
               </li>
               <li>
                  <strong>Manage risk and exits</strong>
                  The system monitors stop, take-profit, and trailing behavior based on configuration.
               </li>
               <li>
                  <strong>Close and settle</strong>
                  When exit conditions are met, the position is closed and final values are persisted.
               </li>
               <li>
                  <strong>Review outcomes</strong>
                  Closed positions feed your analysis so you can evaluate strategy quality and adjust setup.
               </li>
            </ol>

            <h2>Position Status and Lifecycle</h2>

            <p>Position status represents trade phase:</p>

            <ul className="bullet-list">
               <li>Opened: the trade is currently active</li>
               <li>Closed: the trade has been completed and finalized</li>
            </ul>

            <p>CandlePilot also keeps integrity and recovery support for position flows:</p>

            <ul className="bullet-list">
               <li>Verification flags help confirm data consistency</li>
               <li>Error markers identify trades that need intervention</li>
               <li>Fix flows allow controlled correction for problematic closures</li>
            </ul>

            <h2>Why Positions Matter</h2>

            <p>Positions are the truth layer of your trading results. They show how strategy logic performs under real market movement and where optimizations are needed.</p>

            <p>This gives you:</p>

            <ul className="bullet-list">
               <li>Clear evidence of execution quality</li>
               <li>Transparent tracking of wins, losses, and costs</li>
               <li>Better insight into risk-to-return behavior</li>
               <li>A reliable base for strategy refinement</li>
            </ul>

            <h2>Positions in One Sentence</h2>

            <p>A Position in CandlePilot is the recorded lifecycle of one automated trade, from entry to exit, with all risk and performance data needed for control and analysis.</p>
         </div>

         <PageNavigationFooter nextPage={{ label: "Pilots", link: "/how-it-works/pilots" }} previousPage={{ label: "Slots", link: "/how-it-works/slots" }} />
      </div>
   );
}
