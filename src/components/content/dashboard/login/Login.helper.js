/**
 * Registers a new user with the provided details.
 *
 * @param {Object} parsedBody - The registration details, including user data.
 * @param {Object} API - The API object used to interact with authentication endpoints.
 * @param {Object} router - The router object used to navigate programmatically.
 * @returns {Promise<void>} A promise that resolves when the registration is complete and redirects to the homepage.
 * @throws {Error} Throws an error if registration fails or if an unexpected issue occurs.
 */
export async function register(parsedBody, API, router) {
   try {
      const created = await API.auth.register(parsedBody);

      if (created) {
         router.push('/');
      }
   } catch (err) {
      throw err;
   }
}

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} parsedBody - The login credentials, including email and password.
 * @param {Object} API - The API object used to interact with authentication endpoints.
 * @param {Object} router - The router object used to navigate programmatically.
 * @returns {Promise<void>} A promise that resolves when the login is successful and redirects to the dashboard.
 * @throws {Error} Throws an error if login fails or if an unexpected issue occurs.
 */
export async function login(parsedBody, API, router) {
   try {
      const logged = await API.auth.login(parsedBody.email, parsedBody.password);

      if (logged.error) {
         throw logged;
      }

      if (logged) {
         router.push('/dashboard');
      }
   } catch (err) {
      throw err;
   }
}
