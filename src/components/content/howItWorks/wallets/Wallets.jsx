import HomeBannerImage from "@/components/banners/homeTopBanner/homeBannerImage/HomeBannerImage";
import PageNavigationFooter from "@/components/footers/pageNavigationFooter/PageNavigationFooter";
import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";

export default function Wallets() {
   return (
      <div className="how-it-works-content wallets">
         <StandardPageHeader pageTitle="Wallets" titleLabel="How it works" Background={HomeBannerImage} />

         <div className="text-content container">
            <p>In CandlePilot, a Wallet is your central trading container.</p>

            <p>A Wallet is the central trading container where your automation runs. It connects your strategy execution to your exchange account, organizes your bot slots, and tracks your operational and performance data in one place.</p>

            <h2>What a Wallet Represents</h2>

            <p>A Wallet is the control center for a trading setup. It includes:</p>

            <ul className="bullet-list">
               <li>Account identity and type (Demo or Live)</li>
               <li>Trading status (Running, Paused, or Error)</li>
               <li>Account state (Active or Archived)</li>
               <li>Allocated slots that execute bots</li>
               <li>Wallet-level metrics such as balance, PnL, and ROI</li>
               <li>Risk and protection settings, including limits and trailing stop</li>
               <li>Schedules and goal-based runtime controls</li>
               <li>Transfer history and operational results</li>
            </ul>

            <h2>How Wallets Work in Practice</h2>

            <ol className="numbered-list">
               <li>
                  <strong>Create a Wallet</strong>
                  You create a Wallet as either demo or live, depending on your trading mode.
               </li>
               <li>
                  <strong>Assign Slots</strong>
                  Each Wallet can have multiple slots. Slots are where your bots actually run.
               </li>
               <li>
                  <strong>Allocate Capital Logic</strong>
                  Wallet allocation is managed by percentage. The platform tracks how much allocation is available as slots consume it.
               </li>
               <li>
                  <strong>Run or Pause Operations</strong>
                  You can run all slots in a Wallet or stop them from the Wallet controls.
               </li>
               <li>
                  <strong>Monitor Performance</strong>
                  Wallet-level performance consolidates bot activity into key indicators like PnL and ROI.
               </li>
            </ol>

            <h2>Wallet Status and Lifecycle</h2>

            <p>Wallet Status describes runtime behavior:</p>

            <ul className="bullet-list">
               <li>Running: slots are active and allowed to execute</li>
               <li>Paused: execution is temporarily halted</li>
               <li>Error: execution has been interrupted by an issue</li>
            </ul>

            <p>Wallet State describes data lifecycle:</p>

            <ul className="bullet-list">
               <li>Active: available for normal operations</li>
               <li>Archived: hidden from active operation flow</li>
            </ul>

            <p>Important: a Wallet must have all slots stopped before it can be archived.</p>

            <h2>Why Wallets Matter</h2>

            <p>Wallets let you separate and organize different trading operations. Instead of mixing all bots in one place, you can create dedicated Wallets by strategy, account objective, or risk profile.</p>

            <p>This gives you:</p>

            <ul className="bullet-list">
               <li>Better control over execution</li>
               <li>Cleaner strategy separation</li>
               <li>More consistent risk organization</li>
               <li>Easier monitoring and analysis</li>
            </ul>

            <h2>Live vs Demo Wallets</h2>

            <p>Demo Wallets are for simulation and testing your setup behavior. Live Wallets are tied to real exchange execution and real account performance.</p>

            <p>Both use the same operational concept: one control layer that manages multiple slot executions.</p>

            <h2>CandlePilot Wallets in One Sentence</h2>

            <p>A Wallet in CandlePilot is the central unit that controls slots, manages risk and allocation, and consolidates performance for your automated trading operation.</p>
         </div>

         <PageNavigationFooter nextPage={{ label: "Slots", link: "/how-it-works/slots" }} previousPage={{ label: "What is CandlePilot", link: "/how-it-works/what-is-candlepilot" }} />
      </div>
   );
}
