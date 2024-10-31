'use client';
import { parseClassName } from '@/helpers/parser';
import { SwipeableDrawer } from '@mui/material';
import { useState } from 'react';

export default function ContentFoldSidebar({
   className,
   contentClassName,
   sidebarClassName,
   drawerBleeding = 56,
   anchorSide = 'bottom',
   openDrawer,
   setOpenDrawer,
   children,
   window
}) {
   const [ open, setOpen ] = useState(false);
 
   const toggleDrawer = (newOpen) => () => {
      if (setOpenDrawer) {
         setOpenDrawer(newOpen);
      } else {
         setOpen(newOpen);
      }
   };
 
   // This is used only for the example
   const container = window !== undefined ? () => window().document.body : undefined;
   const content = children?.length ? children[0] : '';
   const sidebar = children?.length ? children[1] : '';

   return (
      <div className={parseClassName(className, ['content-fold-sidebar'])}>
         <div className={parseClassName(contentClassName, ['content'])}>
            {content}
         </div>

         <div className={parseClassName(sidebarClassName, ['sidebar'])}>
            <SwipeableDrawer
               container={container}
               anchor={anchorSide}
               open={setOpenDrawer ? openDrawer : open}
               onClose={toggleDrawer(false)}
               onOpen={toggleDrawer(true)}
               swipeAreaWidth={drawerBleeding}
               disableSwipeToOpen={false}
               ModalProps={{ keepMounted: true }}
            >
               {sidebar}
            </SwipeableDrawer>
         </div>
      </div>
   );
}
