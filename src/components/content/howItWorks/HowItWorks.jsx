import HomeBannerImage from "@/components/banners/homeTopBanner/homeBannerImage/HomeBannerImage";
import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import Link from "next/link";

const HOW_IT_WORKS_ITEMS = [
   {
      title: "What Is CandlePilot",
      href: "/how-it-works/what-is-candlepilot",
      lines: [
         "Understand the core purpose of the CandlePilot platform.",
         "See how automation, strategy design, and execution are connected.",
         "Learn the end-to-end workflow from setup to performance review.",
         "Start here to get the big-picture view before diving into details."
      ]
   },
   {
      title: "Wallets",
      href: "/how-it-works/wallets",
      lines: [
         "Learn how wallets organize your trading operation structure.",
         "See how multiple wallets can separate goals, risk, and strategy groups.",
         "Understand statuses, lifecycle states, and control actions.",
         "Use this section to model clean, scalable account management."
      ]
   },
   {
      title: "Slots",
      href: "/how-it-works/slots",
      lines: [
         "Understand slots as the execution channels inside a wallet.",
         "Learn how each slot runs a pilot with dedicated configuration.",
         "See how allocation, runtime status, and controls work in practice.",
         "Use slots to split and manage operations with precision."
      ]
   },
   {
      title: "Positions",
      href: "/how-it-works/positions",
      lines: [
         "See how positions represent opened and closed trade lifecycles.",
         "Track entry, exit, risk, fee, and performance data per trade.",
         "Understand verification and fix flows for recovery scenarios.",
         "Use position analysis to improve strategy quality over time."
      ]
   },
   {
      title: "Pilots",
      href: "/how-it-works/pilots",
      lines: [
         "Explore how pilots define your trading logic and behavior.",
         "Understand threads, blocks, rules, and values in one strategy tree.",
         "See how pilots can be private, draft, or shared in the Pilot Store.",
         "Use this guide to build reusable and structured automation logic."
      ]
   }
];

export default function HowItWorks() {
   return (
      <div className="how-it-works-content">
         <StandardPageHeader pageTitle="How it works" titleLabel="How it works" Background={HomeBannerImage} />

         <div className="text-content container">
            <p>This page is your index for all CandlePilot How It Works guides. Choose a topic below to go directly to the section and read a focused explanation.</p>

            <ul className="bullet-list">
               {HOW_IT_WORKS_ITEMS.map((item) => (
                  <li key={item.href}>
                     <h2>
                        <Link href={item.href}>{item.title}</Link>
                     </h2>

                     <p>
                        {item.lines[0]}<br />
                        {item.lines[1]}<br />
                        {item.lines[2]}<br />
                        {item.lines[3]}
                     </p>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}
