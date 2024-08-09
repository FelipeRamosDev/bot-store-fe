export async function runSlot(API, slot) {
   if (!API || !slot) return;

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

export async function stopSlot(API, slot) {
   if (!API || !slot) return;

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
