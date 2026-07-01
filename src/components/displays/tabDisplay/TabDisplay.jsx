import { parseCSS } from "@/helpers/parser";
import { Button } from "@mui/material";
import { useState } from "react";

/**
 * 
 * @param {*} params - Component properties
 * @param {string} params.className - Additional CSS class names for the component.
 * @param {Array} params.items - An array of tab items, each containing an `id` and `buttonLabel`.
 * @param {string} params.items[].id - The unique identifier for the tab item.
 * @param {string} params.items[].buttonLabel - The label to display on the tab button.
 * @param {string} params.items[].title - The title to display on the header of the tab content.
 * @param {React.ReactElement} params.items[].Content - The content to display when the tab is active.
 * @returns {JSX.Element} The rendered component.
 */
export default function TabDisplay({ className, items = [] }) {
   const [activeTab, setActiveTab] = useState(items.length > 0 ? items[0].id : null);
   const activeItem = items.find(item => item.id === activeTab);

   return (
      <div className={parseCSS('tab-display', className)}>
         <div className="tab-header">
            <div className="tab-header-content full-container">
               <div className="tabs">
                  {items.map((item) => {
                     const { id, buttonLabel } = item;
                     const tabCSS = parseCSS('tab-button', activeTab === id ? 'active' : '');

                     return <Button
                        key={id}
                        className={tabCSS}
                        onClick={() => setActiveTab(id)}
                     >
                        {buttonLabel}
                     </Button>
                  })}
               </div>

               <h2 className="tab-title">{activeItem.title || ''}</h2>
            </div>
         </div>

         <div className="tab-content full-container">
            {activeItem && <activeItem.Content className={activeItem.id} />}
         </div>
      </div>
   );
}
