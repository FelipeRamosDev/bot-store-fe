export function isElementOnScreen(elmRef, cursorPosition) {
   if (!elmRef?.current) return;

   const triggerStart = window.innerHeight * cursorPosition;
   const elmPos = elmRef.current.getBoundingClientRect();

   if (triggerStart > elmPos.top) {
      return true;
   } else {
      return false;
   }
}
