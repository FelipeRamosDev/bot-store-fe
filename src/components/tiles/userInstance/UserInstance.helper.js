/**
 * Parses the status of a user instance to generate corresponding messages and button states.
 *
 * @param {Object} instance - The user instance object containing status information.
 * @param {string} instance.status - The current status of the user instance (e.g., 'online', 'offline', 'starting', 'starting-userstream', 'error').
 * 
 * @returns {Object} An object containing:
 * - `displayStatus` {string} - A human-readable status message for display.
 * - `message` {string} - A detailed message about the current status of the instance.
 * - `btnColor` {string} - The color to use for the button based on the instance's status ('success', 'warn', 'disabled').
 * - `disabled` {boolean} - Whether the button should be disabled based on the instance's status.
 */
export function parseMessages(instance) {
   if (!instance) return {};

   let message = '';
   let displayStatus = '';
   let btnColor;
   let disabled = false;

   if (instance.status === 'online') {
      displayStatus = 'Online';
      message = 'The user instance is ONLINE and ready to use.';
      btnColor = 'success';
   }

   if (instance.status === 'offline') {
      displayStatus = 'Offline';
      message = 'You need to turn on the instance to run the slots!';
      btnColor = 'warn';
   }

   if (instance.status === 'starting') {
      displayStatus = 'Starting Instance';
      message = 'Your instance is currently starting...';
      btnColor = 'disabled';
      disabled = true;
   }

   if (instance.status === 'starting-userstream') {
      displayStatus = 'Opening User Stream';
      message = 'User stream connection is currently opening...';
      btnColor = 'disabled';
      disabled = true;
   }

   if (instance.status === 'error') {
      displayStatus = 'Error Caught';
      message = 'Message here';
      disabled = true;
   }

   return {
      displayStatus,
      message,
      btnColor,
      disabled
   };
}

/**
 * Sends a request to start or shut down a user instance based on its current status.
 *
 * @param {Object} API - The API context object used to make HTTP requests.
 * @param {Object} instance - The user instance object containing status information.
 * @param {string} instance.status - The current status of the user instance (e.g., 'online', 'offline').
 * 
 * @returns {Promise<Object>} The response from the API after attempting to start or shut down the instance.
 */
export async function switchPower(API, instance) {
   if (!instance) return;

   if (instance.status === 'online') {
      return await API.ajax.authPost('/user/instance-control', { action: 'shutdown' });
   }
   
   else if (instance.status === 'offline') {
      return await API.ajax.authPost('/user/instance-control', { action: 'start' });
   }
}
