/**
 * Handles the status change for a bot by sending an update request to the server.
 * 
 * @param {Object} ev - The event object from the status change action, typically a change event from a form control.
 * @param {Object} API - The API context object used to make authenticated requests.
 * @param {Object} doc - The bot document containing the current bot details.
 * 
 * @throws Will throw an error if the request fails or if the server responds with an error.
 * 
 * @returns {Promise<void>} A promise that resolves when the status change request is successfully completed.
 */
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
