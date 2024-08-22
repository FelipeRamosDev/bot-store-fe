export async function runSlot(API, slot, isDisabled, setDisabled, setAlert) {
   if (!API || !slot) return;

   if (isDisabled) {
      return setAlert(true);
   } else {
      setDisabled(true);
   }

   try {
      const running = await API.ajax.authPost('/slots/run', {
         slotUID: slot._id
      });

      if (running.error) {
         throw running;
      }
   } catch (err) {
      throw err;
   }
}

export async function stopSlot(API, slot, isDisabled, setDisabled, setAlert) {
   if (!API || !slot) return;

   if (isDisabled) {
      return setAlert(true);
   } else {
      setDisabled(true);
   }

   try {
      const running = await API.ajax.authPost('/slots/stop', {
         slotUID: slot._id
      });

      if (running.error) {
         throw running;
      }
   } catch (err) {
      throw err;
   }
} 
