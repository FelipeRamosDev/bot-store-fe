import Markdown from "@/components/common/Markdown/Markdown";
import { parseClassName } from "@/helpers/parser";
import { useEffect, useRef, useState } from "react";

export default function TextDisplay({ className, isExpandable, children }) {
   const [expandedH, setExpandedH] = useState();
   const [displayShowMore, setDisplayShowMore] = useState();
   const textArea = useRef();
   const classesWrap = ['text-display'];
   const classesText = ['textarea'];

   if (isExpandable) {
      classesText.unshift('expandable');
   }

   function handleExpland() {
      setExpandedH(prev => {
         const height = textArea.current?.scrollHeight;

         if (prev) {
            return null;
         }

         return height;
      });
   }

   useEffect(() => {
      if (!textArea.current) return;

      setDisplayShowMore(textArea.current.offsetHeight < textArea.current.scrollHeight);
   }, [textArea.current?.scrollHeight]);

   return (
      <div className={parseClassName(className, classesWrap)}>
         <Markdown
            ref={textArea}
            className={parseClassName('', classesText)}
            style={{ height: expandedH }}
            value={children}
         />

         {displayShowMore && <span className="link" onClick={handleExpland}>{!Boolean(expandedH) ? 'Show More' : 'Show Less'}</span>}
      </div>
   );
}
