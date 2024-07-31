export async function register(ev, form, API, router) {
   ev.preventDefault();

   try {
      const parsedBody = form.toObject();
      const created = await API.auth.register(parsedBody);
      
      return created;
   } catch (err) {
      throw err;
   }
}

export async function login(ev, form, API, router) {
   ev.preventDefault();

   try {
   } catch (err) {
      throw err;
   }
}
