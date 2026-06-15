import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import BotThreadImg from "../../home/img/BotThreadImg";
import PageNavigationFooter from "@/components/footers/pageNavigationFooter/PageNavigationFooter";

export default function Pilots() {
   return (
      <div className="how-it-works-content pilots">
         <StandardPageHeader pageTitle="Pilots" titleLabel="How it works" Background={BotThreadImg} />

         <div className="text-content container">
            <p>In CandlePilot, Pilots are the bots that define your trading logic. You can build your own pilot from scratch or use pilots created by other users when they are available in the Pilot Store.</p>

            <p>A pilot is more than a simple signal. It is a structured decision system made of Threads, Blocks, Rules, and Values that control when to open, close, protect, and adjust positions.</p>

            <h2>What a Pilot Represents</h2>

            <p>Each pilot combines strategy design and execution constraints, including:</p>

            <ul className="bullet-list">
               <li>Identity and ownership (author and visibility status)</li>
               <li>Market scope with allowed symbols and intervals</li>
               <li>Execution event threads for open, close, stop loss, take profit, and trailing behavior</li>
               <li>Nested decision blocks with logical operators (AND/OR)</li>
               <li>Evaluation rules with comparisons like &lt;, &gt;, =, and !=</li>
               <li>Reusable values, either primitive values or function-based values</li>
               <li>Current strategy result references used for performance tracking</li>
            </ul>

            <h2>Pilot Structure Deep Dive</h2>

            <p>At strategy level, pilots are organized in layers:</p>

            <ol className="numbered-list">
               <li>
                  <strong>Threads</strong>
                  Threads represent event flows such as Open Long, Open Short, Close Long, Close Short, Stop Loss, Take Profit, and Trailing Stop.
               </li>
               <li>
                  <strong>Blocks</strong>
                  Each thread starts with a root block, and blocks can contain nested blocks for more complex logic trees.
               </li>
               <li>
                  <strong>Rules</strong>
                  Rules are evaluation nodes inside blocks. They define condition checks and comparison behavior.
               </li>
               <li>
                  <strong>Values</strong>
                  Values are rule inputs and thread-linked parameters. They can be primitive values (number, string, boolean, date) or dynamic function values with configs.
               </li>
            </ol>

            <p>This structure allows you to model from simple conditions to advanced multi-step decision trees.</p>

            <h2>How Pilots Work in Practice</h2>

            <ol className="numbered-list">
               <li>
                  <strong>Create or choose a pilot</strong>
                  Start by creating your own pilot or selecting one from the Pilot Store.
               </li>
               <li>
                  <strong>Define strategy constraints</strong>
                  Set allowed symbols and intervals to limit where the pilot can operate.
               </li>
               <li>
                  <strong>Build thread logic</strong>
                  Add event threads and compose logic using blocks, rules, and values.
               </li>
               <li>
                  <strong>Configure protection behavior</strong>
                  Define stop loss, take profit, and trailing logic as part of the pilot structure.
               </li>
               <li>
                  <strong>Publish or keep private</strong>
                  Keep your pilot private, keep it as draft, or publish it so it can appear in the Pilot Store.
               </li>
            </ol>

            <h2>Pilot Store and Sharing</h2>

            <p>The Pilot Store is where public pilots are listed for discovery. This lets users learn from existing strategy designs and adopt reusable logic patterns.</p>

            <p>A pilot can be in different visibility statuses:</p>

            <ul className="bullet-list">
               <li>Draft: still being prepared</li>
               <li>Private: visible for personal use</li>
               <li>Public: available in the Pilot Store</li>
            </ul>

            <p>Users can create their own pilots and also leverage shared ecosystem pilots available through store visibility.</p>

            <h2>Why Pilots Matter</h2>

            <p>Pilots are the strategy brain of CandlePilot. They separate decision logic from execution containers, so you can reuse, refine, and evolve strategies without rebuilding your entire operation.</p>

            <p>This gives you:</p>

            <ul className="bullet-list">
               <li>Reusable strategy components</li>
               <li>Clear visual logic structure</li>
               <li>Controlled publication and sharing</li>
               <li>Faster iteration from idea to execution</li>
            </ul>

            <h2>Pilots in One Sentence</h2>

            <p>A Pilot in CandlePilot is a structured bot strategy that combines threads, blocks, rules, and values to automate trading decisions, and it can be privately managed or shared through the Pilot Store.</p>
         </div>

         <PageNavigationFooter previousPage={{ label: "Positions", link: "/how-it-works/positions" }} />
      </div>
   );
}
