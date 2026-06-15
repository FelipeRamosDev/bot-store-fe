import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotsTableImg from "../../home/img/BotsTableImg";
import PageNavigationFooter from "@/components/footers/pageNavigationFooter/PageNavigationFooter";

export default function Slots() {
   return (
      <div className="how-it-works-content slots">
         <StandardPageHeader pageTitle="Slots" titleLabel="How it works" Background={BotsTableImg} />

         <div className="text-content container">
            <p>In CandlePilot, a Slot is the execution unit inside a Wallet. It is the place where a bot actually runs with its own market setup, allocation, and runtime status.</p>

            <p>Think of the Wallet as the operation container and each Slot as an active strategy channel. A single Wallet can contain multiple Slots running different bots, assets, or intervals at the same time.</p>

            <h2>What a Slot Represents</h2>

            <p>A Slot defines how one automation stream will operate. It includes:</p>

            <ul className="bullet-list">
               <li>Linked bot and linked wallet</li>
               <li>Execution type (demo or live)</li>
               <li>Market scope such as assets and interval</li>
               <li>Runtime status (running, paused, stopped, and transitional states)</li>
               <li>Operational state (active or archived)</li>
               <li>Wallet allocation percentage</li>
               <li>Risk controls, limits, and trailing settings</li>
               <li>Performance metrics such as balance, PnL, and ROI</li>
            </ul>

            <h2>How Slots Work in Practice</h2>

            <ol className="numbered-list">
               <li>
                  <strong>Create a Slot</strong>
                  Create a slot inside a Wallet and link it to the bot strategy you want to execute.
               </li>
               <li>
                  <strong>Configure market behavior</strong>
                  Define assets, interval, and behavior settings so the slot knows where and how to operate.
               </li>
               <li>
                  <strong>Assign allocation</strong>
                  Set wallet allocation for the slot so capital usage is distributed as planned.
               </li>
               <li>
                  <strong>Run or stop execution</strong>
                  Start the slot when ready, pause or stop when needed, and manage it from Wallet controls.
               </li>
               <li>
                  <strong>Track and refine</strong>
                  Monitor slot-level metrics and outcomes, then adjust setup to improve consistency.
               </li>
            </ol>

            <h2>Slot Status and Lifecycle</h2>

            <p>Slot status communicates runtime behavior:</p>

            <ul className="bullet-list">
               <li>Running: slot is actively evaluating and executing</li>
               <li>Paused: execution is temporarily suspended</li>
               <li>Stopped: slot is inactive</li>
               <li>Error: slot requires attention due to an execution issue</li>
               <li>Transitional statuses: opening, closing, stopping, or fixing position flows</li>
            </ul>

            <p>Slot state communicates data lifecycle:</p>

            <ul className="bullet-list">
               <li>Active: available for normal operation</li>
               <li>Archived: preserved but removed from active workflow</li>
            </ul>

            <h2>Why Slots Matter</h2>

            <p>Slots give you precision and modularity. Instead of running all strategies as one block, you can split operations into controlled units that are easier to manage, compare, and optimize.</p>

            <p>This gives you:</p>

            <ul className="bullet-list">
               <li>Clear strategy separation inside each Wallet</li>
               <li>Granular control over allocation and execution</li>
               <li>Independent monitoring of performance per slot</li>
               <li>Better troubleshooting when one setup needs intervention</li>
            </ul>

            <h2>Slots in One Sentence</h2>

            <p>A Slot in CandlePilot is a dedicated execution channel inside a Wallet that runs one bot setup with its own allocation, status, and performance tracking.</p>
         </div>

         <PageNavigationFooter nextPage={{ label: "Positions", link: "/how-it-works/positions" }} previousPage={{ label: "Wallets", link: "/how-it-works/wallets" }} />
      </div>
   );
}
