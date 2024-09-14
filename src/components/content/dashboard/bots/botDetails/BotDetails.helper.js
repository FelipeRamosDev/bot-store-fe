export async function handleStatusChange(ev, API, doc) {
   const value = ev?.target?.value;

   try {
      const changed = await API.ajax.authPost('/bot/status-transition', {
         botUID: doc._id,
         newStatus: value
      });

      if (changed.error) {
         throw changed;
      }
   } catch (err) {
      throw err;
   }
}
