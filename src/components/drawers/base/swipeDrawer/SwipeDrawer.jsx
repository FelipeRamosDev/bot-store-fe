import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import { parseClassName } from '@/helpers/parser';
import { SwipeableDrawer } from '@mui/material';
import { useRef, useState } from 'react';

export default function SwipeDrawer({
   containerRef,
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
         <ContentFullwidth className="drawer-content" useContainer>
            {children}
         </ContentFullwidth>
      </SwipeableDrawer>
   );
}
