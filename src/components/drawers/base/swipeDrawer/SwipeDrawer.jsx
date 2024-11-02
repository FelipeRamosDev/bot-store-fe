import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import { parseClassName } from '@/helpers/parser';
import { SwipeableDrawer } from '@mui/material';
import { useRef, useState } from 'react';

export default function SwipeDrawer({
   containerRef,
   headerTitle,
   HeaderIcon,
   hideHeader = false,
   anchorSide = 'right',
   drawerBleeding = 57,
   disableSwipeToOpen = true,
   openDrawer,
   setOpenDrawer,
   ModalProps,
   SwipeAreaProps,
   className,
   children
}) {
   const [ open, setOpen ] = useState(false);
   const drawer = useRef();

   const toggleDrawer = (newOpen) => () => {
      if (setOpenDrawer) {
         setOpenDrawer(newOpen);
      } else {
         setOpen(newOpen);
      }
   };

   return (
      <SwipeableDrawer
         ref={drawer}
         className={parseClassName(className, ['swipe-drawer'])}
         container={containerRef}
         anchor={anchorSide}
         open={setOpenDrawer ? openDrawer : open}
         onClose={toggleDrawer(false)}
         onOpen={toggleDrawer(true)}
         swipeAreaWidth={drawerBleeding}
         disableSwipeToOpen={disableSwipeToOpen}
         ModalProps={{ keepMounted: true, ...ModalProps }}
         SwipeAreaProps={{ className: 'swipe-area', ...SwipeAreaProps }}
      >
         {!hideHeader && (
            <div className="drawer-header">
               <HeaderIcon className="header-icon" />
               <h3 className="header-title">{headerTitle}</h3>
            </div>
         )}
         <ContentFullwidth className="drawer-content" useContainer>
            {children}
         </ContentFullwidth>
      </SwipeableDrawer>
   );
}
