import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import HomeBannerImage from "@/components/banners/homeTopBanner/homeBannerImage/HomeBannerImage";
import PageNavigationFooter from "@/components/footers/pageNavigationFooter/PageNavigationFooter";

export default function WhatsIsCandlePilot() {
   return (
      <div className="how-it-works-content what-is-candlepilot">
         <StandardPageHeader pageTitle="What Is CandlePilot" titleLabel="How it works" Background={HomeBannerImage} />

         <div className="text-content container">
            <p>CandlePilot is a crypto trading automation platform that helps you create, manage, and run trading bots with more structure and control. Instead of manually watching charts all day, you can define rules, automate decisions, and monitor performance in one place.</p>

            <p>At its core, CandlePilot is designed to make advanced trading automation more accessible. You can connect your exchange account, configure strategy logic, and launch bots based on your preferred market conditions, risk profile, and goals.</p>

            <h2>How CandlePilot Works</h2>

            <p>CandlePilot gives you a complete workflow for automated trading:</p>
            <ol className="numbered-list">
               <li>
                  <strong>Connect and configure</strong>
                  Connect your account and set up the essentials needed for bot execution.
               </li>
               <li>
                  <strong>Build your strategy</strong>
                  Create bot logic using events, conditions, and customizable values.
               </li>
               <li>
                  <strong>Run and monitor</strong>
                  Deploy bots in active slots and follow their behavior in real time.
               </li>
               <li>
                  <strong>Analyze and improve</strong>
                  Review results, positions, and activity history to optimize performance over time.
               </li>
            </ol>

            <h2>Why CandlePilot</h2>

            <p>CandlePilot is built for traders who want more than simple signal alerts. It combines automation, strategy flexibility, and operational visibility in one platform.</p>

            <p>Key benefits include:</p>

            <ul className="bullet-list">
               <li>Strategy-based automation instead of manual execution</li>
               <li>Centralized dashboard for bots, positions, and account activity</li>
               <li>Configurable rules for entries, exits, and risk behavior</li>
               <li>Real-time operational flow with structured bot lifecycle management</li>
               <li>Subscription-based access to platform capabilities and updates</li>
            </ul>

            <h2>Who CandlePilot Is For</h2>

            <p>CandlePilot is for traders who want to:</p>

            <ul className="bullet-list">
               <li>Save time by automating repetitive actions</li>
               <li>Reduce emotional decision-making</li>
               <li>Test and refine strategy logic in a structured environment</li>
               <li>Scale from manual trading to system-driven execution</li>
            </ul>

            <h2>Important Note About Risk</h2>

            <p>CandlePilot is a tool for automation, not a guarantee of profit. All trading involves risk, including potential loss of capital. Results depend on market conditions, strategy quality, risk management, and user decisions. You should always trade responsibly and only with capital you can afford to risk.</p>

            <h2>CandlePilot in One Sentence</h2>

            <p>CandlePilot is your operational platform for building, running, and improving automated crypto trading strategies with clarity, control, and scalability.</p>
         </div>

         <PageNavigationFooter nextPage={{ label: "Wallets", link: "/how-it-works/wallets" }} />
      </div>
   );
}
