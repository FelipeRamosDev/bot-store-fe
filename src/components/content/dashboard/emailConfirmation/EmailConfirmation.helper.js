/**
 * Confirms an email address using the provided confirmation token.
 * 
 * This function sends a POST request to the API to confirm the email address.
 * If the confirmation is successful, it redirects the user to the login page.
 * 
 * @param {Object} API - The API context containing methods for making API requests.
 * @param {string} confirmationToken - The token used to confirm the email address.
 * @param {Object} router - The Next.js router object used to navigate to different pages.
 * 
 * @returns {Promise<void>} A promise that resolves when the email confirmation process is complete.
 * 
 * @throws {Error} Throws an error if the API request fails.
 */
export async function confirmEmail(API, confirmationToken, router) {
   try {
      const verified = await API.ajax.authPost('/auth/confirm-email', { confirmationtoken: confirmationToken });

      if (verified.success) {
         router.push('/dashboard/login');
      }
   } catch (err) {
      throw err;
   }
}
