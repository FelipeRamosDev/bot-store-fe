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
