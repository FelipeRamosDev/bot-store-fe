'use client';
import { useState, useRef, useEffect } from 'react';
import { parseClassName } from '@/helpers/parser';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import SwipeUpIcon from '@mui/icons-material/SwipeUp';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import config from '@/config.json';

/**
 * A customizable swipeable drawer component with content, header, and swipe area.
 * The drawer opens from a specified anchor side (default: bottom) with swipe and click functionality.
 *
 * @param {Object} props - The components props.
 * @param {string} props.className - Additional class names for custom styling.
 * @param {object} props.containerRef - Reference to the container element for the drawer.
 * @param {boolean} props.openDrawer - Controls the open/close state of the drawer externally.
 * @param {function} props.setOpenDrawer - Function to toggle the external open state.
 * @param {object} props.ModalProps - Props for the Modal component within the drawer.
 * @param {React.Component} props.SwipeAreaContent - Optional custom component for the swipe area.
 * @param {string} props.headerTitle - Title for the header displayed in the swipe area.
 * @param {React.Component} props.HeaderIcon - Optional icon component for the header.
 * @param {'top'|'bottom'} [props.anchorSide='bottom'] - Side of the screen where the drawer will anchor (default: 'bottom').
 * @param {number} [props.drawerBleeding=57] - Height of the visible portion of the drawer before opening.
 * @param {object} props.SwipeAreaProps - Additional props for the swipe area.
 * @param {boolean} [props.disableSwipeToOpen=false] - If true, disables swipe-to-open functionality.
 * @param {React.ReactNode} props.children - Content to be rendered inside the drawer.
 * 
 * @returns {React.Component} Swipeable drawer component with customizable content and header.
 */
export default function SwipeDrawerTab({
   className,
   containerRef,
   openDrawer,
   setOpenDrawer,
   ModalProps,
   SwipeAreaContent,
   headerTitle,
   HeaderIcon,
   anchorSide = 'bottom',
   drawerBleeding = 46,
   SwipeAreaProps = {},
   disableSwipeToOpen = false,
   children
}) {
   const [ open, setOpen ] = useState(false);
   const drawer = useRef();
   const height = drawerBleeding + 4;

   const toggleDrawer = (newOpen) => () => {
      if (setOpenDrawer) {
         setOpenDrawer(newOpen);
      } else {
         setOpen(newOpen);
      }
   };

   function SwipeAreaDefaultContent() {
      return (
         <ContentHeader Toolbar={() => (<>
            <SwipeUpIcon className="swipe-icon swipe up" />
            <SwipeDownIcon className="swipe-icon swipe down" />

            <TouchAppIcon className="swipe-icon click" />
         </>)}>
            {HeaderIcon && <HeaderIcon />}
            <h2 className="header-title">{headerTitle}</h2>
         </ContentHeader>
      );
   }

   function SwipeAreaChildren() {
      const style = { top: -height, height };

      if (!SwipeAreaContent) {
         SwipeAreaContent = SwipeAreaDefaultContent;
      }

      return (
         <div
            className="swipe-tab"
            style={style}
            onClick={() => setOpen(prev => !prev)}
         >
            <SwipeAreaContent />
         </div>
      )
   }

   function Puller() {
      const style = { top: -(height - 9) };

      return <div className="puller" style={style}></div>
   }

   useEffect(() => {
      if (drawer.current) {
         const area = document.querySelector('.swipe-area');
         const listener = () => setOpen(prev => !prev);
         
         if (area && window.innerWidth > config.breakpoints.m) {
            area.removeEventListener('click', listener);
            area.addEventListener('click', listener);
         }
      }
   }, [ drawer.current ]);

   return (<>
      <SwipeableDrawer
         ref={drawer}
         className={parseClassName(className, [ 'swipe-drawer-tab', anchorSide ])}
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
         <Puller />
         <SwipeAreaChildren />

         <ContentFullwidth className="drawer-content" useContainer>
            {children}
         </ContentFullwidth>
      </SwipeableDrawer>
   </>);
}
