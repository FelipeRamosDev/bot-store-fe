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
