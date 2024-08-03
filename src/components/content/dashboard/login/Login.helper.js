export async function register(form, API) {
   const parsedBody = form.toObject();

   try {
      const created = await API.auth.register(parsedBody);
      
      return created;
   } catch (err) {
      throw err;
   }
}

export async function login(form, API, router) {
   const parsedBody = form.toObject();

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
