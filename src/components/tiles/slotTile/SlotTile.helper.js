/**
 * Runs a specified slot by making an API request to the server.
 * 
 * This function sends a request to start a slot. It manages state transitions for disabling UI elements and handling alerts.
 * 
 * @async
 * @param {Object} API - The API context object used for making requests.
 * @param {Object} slot - The slot object containing the slot details, including its ID.
 * @param {boolean} isDisabled - A flag indicating if the slot is currently disabled.
 * @param {Function} setDisabled - A function to set the disabled state of the slot.
 * @param {Function} setAlert - A function to trigger an alert when the slot cannot be run.
 * 
 * @returns {Promise<void>} A promise that resolves when the slot is successfully run.
 * @throws {Error} Throws an error if the API request fails or the slot cannot be started.
 */
export async function runSlot(API, slot, isDisabled, setDisabled, setAlert) {
   if (!API || !slot) return;

   if (isDisabled) {
      return setAlert(true);
   } else {
      setDisabled(true);
   }

   try {
      const response = await API.ajax.authPost('/slots/run', {
         slotUID: slot._id
      });

      if (response.error) {
         throw response;
      }
   } catch (err) {
      throw err;
   }
}

/**
 * Stops a specified slot by making an API request to the server.
 * 
 * This function sends a request to stop a slot. It manages state transitions for disabling UI elements and handling alerts.
 * 
 * @async
 * @param {Object} API - The API context object used for making requests.
 * @param {Object} slot - The slot object containing the slot details, including its ID.
 * @param {boolean} isDisabled - A flag indicating if the slot is currently disabled.
 * @param {Function} setDisabled - A function to set the disabled state of the slot.
 * @param {Function} setAlert - A function to trigger an alert when the slot cannot be stopped.
 * 
 * @returns {Promise<void>} A promise that resolves when the slot is successfully stopped.
 * @throws {Error} Throws an error if the API request fails or the slot cannot be stopped.
 */
export async function stopSlot(API, slot, isDisabled, setDisabled, setAlert) {
   if (!API || !slot) return;

   if (isDisabled) {
      return setAlert(true);
   } else {
      setDisabled(true);
   }

   try {
      const response = await API.ajax.authPost('/slots/stop', {
         slotUID: slot._id
      });

      if (response.error) {
         throw response;
      }
   } catch (err) {
      throw err;
   }
}
